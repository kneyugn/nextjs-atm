import connectDB from "@/lib/db/db";
import Transaction from "@/lib/db/models/transaction";
import Account from "@/lib/db/models/account";
import { formatErrorMessage } from "@/lib/utils/helper";

connectDB();

export async function GET(req: Request): Promise<Response> {
  const transactionId = new URL(req.url).searchParams.get("transactionId");

  if (!transactionId) {
    return new Response(formatErrorMessage("transactionId not provided"), {
      status: 401,
    });
  }

  const transaction = await Transaction.findOne({
    transactionId: transactionId,
  });

  if (!transaction) {
    return new Response(formatErrorMessage("transaction not found"), {
      status: 401,
    });
  }

  const account = await Account.findOne({
    cardId: transaction.cardId,
  });

  return Response.json({
    amount: transaction.amount,
    cardId: transaction.cardId,
    balance: account.balance,
    createdAt: transaction.createdAt,
    transactionType: transaction.transactionType,
  });
}
