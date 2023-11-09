import connectDB from "@/lib/db/db";
import Account from "@/lib/db/models/account";
import Transaction from "@/lib/db/models/transaction";
import {
  createTransactionId,
  formatErrorMessage,
  getAccount,
  getDailyLimit,
  validateAmount,
  validateUserIput,
} from "@/lib/utils/helper";
import { ATMError, TransactionType } from "@/lib/utils/types";

// TODO: this component could be combined with deposit
export async function POST(req: Request): Promise<Response> {
  const { cardId, amount } = await req.json();

  const mongoose = await connectDB();

  if (!mongoose) {
    return new Response(
      formatErrorMessage(`Could not establish connection to MongoDB`),
      {
        status: 500,
      }
    );
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    validateUserIput(cardId, amount);
    const amountAsked = parseInt(amount);
    const account = await getAccount(cardId);
    validateAmount(amountAsked, account.balance);
    await validateTransactionLimit(cardId, amountAsked);
    const currentTime = new Date();
    const newBalance = account.balance - amountAsked;
    await Account.updateOne(
      { cardId: cardId },
      { balance: newBalance, updatedAt: currentTime }
    );
    const transaction = await new Transaction({
      amount: parseInt(amount),
      cardId: cardId,
      createdAt: currentTime,
      transactionType: TransactionType.Withdraw,
      transactionId: createTransactionId(),
    }).save();
    await session.commitTransaction();
    session.endSession();
    return Response.json(transaction);
  } catch (error) {
    if (error instanceof ATMError) {
      return new Response(formatErrorMessage(error.message), {
        status: error.statusCode,
      });
    }

    await session.abortTransaction();
    session.endSession();
    return new Response(
      formatErrorMessage(`Machine error: Could not complete transaction`),
      {
        status: 500,
      }
    );
  }
}

async function validateTransactionLimit(cardId: string, amountAsked: number) {
  const dailyLimit = getDailyLimit();
  const date = new Date();
  const result = await getTransactionByTime(date, cardId);
  const amountTaken = result?.[0]?.totalAmount ?? 0;
  const limitReached = amountTaken + amountAsked > dailyLimit;
  if (result.length > 0 && limitReached) {
    throw new ATMError("Daily transaction limit reached", 401);
  }
}

async function getTransactionByTime(date: Date, cardId: string) {
  date.setHours(date.getHours() - 24);

  return await Transaction.aggregate([
    {
      $match: {
        transactionType: TransactionType.Withdraw,
        createdAt: { $gte: date },
        cardId: cardId,
      },
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
      },
    },
  ]).exec();
}
