import jwt, { TokenExpiredError } from "jsonwebtoken";
import connectDB from "@/lib/db/db";
import {
  createTokens,
  formatErrorMessage,
  getCardInfoFromJwt,
  getSecretKey,
  saveAndRespondWithTokens,
} from "@/lib/utils/helper";
import { cookies } from "next/headers";
import RefreshToken from "@/lib/db/models/refreshToken";

connectDB();

/**
 *
 * If user is still doing transactions and the token expires, issue a new token to the user
 * If the user has logged out, the jwt can no longer be used even if it is still valid
 *
 * @param req
 * @returns
 */
export async function GET(): Promise<Response> {
  const cookiesStore = cookies();
  const token = cookiesStore.get("access_token")?.value;

  if (!token) {
    return new Response(formatErrorMessage("Token not provided"), {
      status: 401,
    });
  }

  const secretKey = getSecretKey();

  try {
    jwt.verify(token, secretKey);

    const invalidToken = await RefreshToken.findOne({
      accessToken: token,
    }).exec();

    if (!invalidToken.valid) {
      throw new Error(
        "User has logged out of system. Token can no longer be used."
      );
    }

    // jwt is still valid and has not been marked as invalid, can be returned
    return Response.json({ accessToken: token });
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      // user is still logged in and doing transactions, issue a fresh token to the user
      const card = getCardInfoFromJwt(token);

      if (card === null || typeof card === "string") {
        return new Response(formatErrorMessage("Could not decode from token"), {
          status: 404,
        });
      }

      const { accessToken } = createTokens(card?.cardId);
      const cookieStore = cookies();
      const refreshToken = cookieStore.get("refresh_token")?.value || "";
      return await saveAndRespondWithTokens(accessToken, refreshToken);
    }

    return new Response(formatErrorMessage("Token is no longer valid"), {
      status: 401,
    });
  }
}
