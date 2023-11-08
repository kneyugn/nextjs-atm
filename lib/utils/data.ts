import jwt from "jsonwebtoken";
import RefreshToken from "@/lib/db/models/refreshToken";
import { TokenResponse } from "./types";

export function getSecretKey(): string {
  return process.env.SECRET_KEY || "";
}

export function getPinMatch(): string {
  const PIN_MATCH = "1234";
  return PIN_MATCH;
}

export function getExpiryShort(): string {
  const accessTokenExpiry = "3m";
  return accessTokenExpiry;
}

export function getExpiryLong(): string {
  const accessTokenExpiry = "10m";
  return accessTokenExpiry;
}

export function createTokens(): TokenResponse {
  const accessTokenExpiry = getExpiryShort();
  const accessToken = createToken(accessTokenExpiry);

  const refreshTokenExpiry = getExpiryLong();
  const refreshToken = createToken(refreshTokenExpiry);

  return { accessToken, refreshToken };
}

export function createToken(expiryTime: string) {
  return jwt.sign(
    {
      cardId: "555-555",
      name: "Jane",
    },
    getSecretKey(),
    {
      expiresIn: expiryTime,
    }
  );
}

/**
 * 
 * Typically, we want to do some database validation that the expired token is paired with the refresh token, but there isnt time here
 * @param refreshToken 
 * @param accessToken 
 * @returns 
 */
export async function saveAndRespondWithTokens(
  refreshToken: string,
  accessToken: string
): Promise<Response> {
  try {
    await new RefreshToken({ refreshToken, accessToken }).save();
    return Response.json({ accessToken, refreshToken });
  } catch {
    return new Response("Could not save token", { status: 500 });
  }
}
