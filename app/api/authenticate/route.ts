import {
  createAccount,
  createTokens,
  createcardId,
  formatErrorMessage,
  getPinMatch,
} from "@/lib/utils/helper";
import connectDB from "@/lib/db/db";
import RefreshToken from "@/lib/db/models/refreshToken";

import { cookies } from "next/headers";

connectDB();

export async function POST(req: Request): Promise<Response> {
  const { pin } = await req.json();

  const newCardId = createcardId();
  const { accessToken, refreshToken } = createTokens(newCardId);

  try {
    await createAccount(newCardId); // for data seeding
    await new RefreshToken({ refreshToken, accessToken, valid: true }).save();
    
  } catch {
    return new Response(
      JSON.stringify(formatErrorMessage("Could not create account / tokens")),
      {
        status: 500,
      }
    );
  }

  if (pin === getPinMatch()) {
    const cookieStore = cookies();
    cookieStore.set("access_token", accessToken);
    cookieStore.set("refresh_token", refreshToken);
    return Response.json({ accessToken, refreshToken });
  } else {
    return new Response(formatErrorMessage("Pin is incorrect"), {
      status: 401,
    });
  }
}
