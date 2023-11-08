import connectDB from "@/lib/db/db";
import Account from "@/lib/db/models/account";
import Transaction from "@/lib/db/models/transaction";
import {
  getAccount,
  getDailyLimit,
  validateAmount,
  validateUserIput,
} from "@/lib/utils/helper";
import { ATMError, TransactionType } from "@/lib/utils/types";

export async function POST(req: Request): Promise<Response> {
  const { cardId, amount } = await req.json();

  const mongoose = await connectDB();

  if (!mongoose) {
    return new Response(`Could not establish connection to MongoDB`, {
      status: 500,
    });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    validateUserIput(cardId, amount);
    const account = await getAccount(cardId);
    validateAmount(parseInt(amount), account.balance);
    await validateTransactionLimit();

    const currentTime = new Date();
    const newBalance = account.balance - parseInt(amount);
    await Account.updateOne(
      { cardId: cardId },
      { balance: newBalance, updatedAt: currentTime }
    );
    await new Transaction({
      amount: parseInt(amount),
      cardId: cardId,
      createdAt: currentTime,
      transactionType: TransactionType.Withdraw,
    }).save();
    await session.commitTransaction();
    session.endSession();
    const updatedAccount = await Account.findOne({ cardId: cardId });
    return Response.json(updatedAccount);
  } catch (error) {
    if (error instanceof ATMError) {
      return new Response(error.message, {
        status: error.statusCode,
      });
    }

    await session.abortTransaction();
    session.endSession();
    return new Response(`Could not establish connection to MongoDB`, {
      status: 500,
    });
  }
}

async function validateTransactionLimit() {
  const dailyLimit = getDailyLimit();
  const date = new Date();
  const result = await getTransactionByTime(date);
  if (result.length > 0 && result[0].totalAmount > dailyLimit) {
    throw new ATMError("Daily transaction limit reached", 401);
  }
}

async function getTransactionByTime(date: Date) {
  date.setHours(date.getHours() - 24);

  return await Transaction.aggregate([
    {
      $match: {
        transactionType: TransactionType.Withdraw,
        createdAt: { $gte: date },
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
