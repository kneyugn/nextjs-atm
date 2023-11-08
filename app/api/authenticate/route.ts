import {
  createTokens,
  getPinMatch,
} from "@/lib/utils/data";
import connectDB from "@/lib/db/db";
import RefreshToken from "@/lib/db/models/refreshToken";

connectDB();

export async function POST(req: Request): Promise<Response> {
  const { pin } = await req.json();

  const { accessToken, refreshToken } = createTokens()

  try {
    await new RefreshToken({ refreshToken, accessToken }).save();
  } catch {
    return new Response("Could not create tokens", {
      status: 500,
    });
  }

  if (pin === getPinMatch()) {
    return Response.json({ accessToken, refreshToken });
  } else {
    return new Response("Pin is incorrect", {
      status: 401,
    });
  }
}
