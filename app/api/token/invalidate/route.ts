import connectDB from "@/lib/db/db";
import InvalidToken from "@/lib/db/models/invalidToken";

connectDB();

export async function POST(req: Request): Promise<Response> {
  const { token } = await req.json();

  if (!token) {
    return new Response("Token not provided", {
      status: 401,
    });
  }

  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  const updateObject = { accessToken: token };

  const savedToken = await InvalidToken.findOneAndUpdate(
    updateObject,
    updateObject,
    options
  ).exec();

  return Response.json({ accessToken: savedToken.accessToken });
}
