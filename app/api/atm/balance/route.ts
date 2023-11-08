import connectDB from "@/lib/db/db";
import Account from "@/lib/db/models/account";

connectDB();

export async function GET(req: Request): Promise<Response> {
  const cardId = new URL(req.url).searchParams.get("cardId");

  if (!cardId) {
    return new Response("card ID not provided", {
      status: 401,
    });
  }

  const account = await Account.findOne({ cardId: cardId });

  /**
   * For development / mock purposes, instead of seeding data, an account gets created on the spot to start off with 0 balance
   */
  if (!account) {
    const currentTime = new Date();
    const accountCreated = await new Account({
      cardId: cardId,
      balance: 0,
      updatedAt: currentTime,
      createdAt: currentTime,
    }).save();
    return Response.json({
      balance: accountCreated.balance,
      cardId: accountCreated.cardId,
      createdAt: accountCreated.createdAt,
      updatedAt: accountCreated.updatedAt,
    });
  }

  return Response.json({
    balance: account.balance,
    cardId: account.cardId,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  });
}
