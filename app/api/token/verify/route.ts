import jwt, { TokenExpiredError } from "jsonwebtoken";
import connectDB from "@/lib/db/db";
import InvalidToken from "@/lib/db/models/invalidToken";
import {
  createTokens,
  getSecretKey,
  saveAndRespondWithTokens,
} from "@/lib/utils/data";

connectDB();

/**
 *
 * If user is still doing transactions and the token expires, issue a new token to the user
 * If the user has logged out, the jwt can no longer be used even if it is still valid
 *
 * @param req
 * @returns
 */
export async function GET(req: Request): Promise<Response> {
  const token = new URL(req.url).searchParams.get("token");

  if (!token) {
    return new Response("Token not provided", {
      status: 401,
    });
  }

  const secretKey = getSecretKey();

  try {
    jwt.verify(token, secretKey);

    const invalidToken = await InvalidToken.findOne({
      accessToken: token,
    }).exec();

    if (invalidToken) {
      throw new Error(
        "User has logged out of system. Token can no longer be used."
      );
    }

    // jwt is still valid and has not been marked as invalid, can be returned
    return Response.json({ accessToken: token });
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      // user is still logged in and doing transactions, issue a fresh token to the user
      const { accessToken, refreshToken } = createTokens();
      return await saveAndRespondWithTokens(accessToken, refreshToken);
    }

    return new Response("Token is no longer invalid", {
      status: 401,
    });
  }
}
