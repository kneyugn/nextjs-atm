import connectDB from "@/lib/db/db";
import Account from "@/lib/db/models/account";
import Transaction from "@/lib/db/models/transaction";
import {
  createTransactionId,
  formatErrorMessage,
  getAccount,
  validateUserIput,
} from "@/lib/utils/helper";
import { ATMError, TransactionType } from "@/lib/utils/types";

export async function POST(req: Request): Promise<Response> {
  const { cardId, amount } = await req.json();

  const mongoose = await connectDB();

  if (!mongoose) {
    return new Response(
      JSON.stringify(
        formatErrorMessage(`Could not establish connection to MongoDB`)
      ),
      {
        status: 500,
      }
    );
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    validateUserIput(cardId, amount);
    const account = await getAccount(cardId);

    const currentTime = new Date();
    const newBalance = account.balance + parseInt(amount);
    await Account.updateOne(
      { cardId: cardId },
      { balance: newBalance, updatedAt: currentTime }
    );
    const transactionCreated = await new Transaction({
      amount: parseInt(amount),
      cardId: cardId,
      createdAt: currentTime,
      transactionType: TransactionType.Deposit,
      transactionId: createTransactionId(),
    }).save();
    await session.commitTransaction();
    session.endSession();
    const updatedAccount = await Account.findOne({ cardId: cardId });
    return Response.json(transactionCreated);
  } catch (error) {
    if (error instanceof ATMError) {
      return new Response(formatErrorMessage(error.message), {
        status: error.statusCode,
      });
    }

    await session.abortTransaction();
    session.endSession();
    return new Response(
      formatErrorMessage(`Could not establish connection to MongoDB`),
      {
        status: 500,
      }
    );
  }
}
