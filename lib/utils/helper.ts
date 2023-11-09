import jwt from "jsonwebtoken";
import RefreshToken from "@/lib/db/models/refreshToken";
import { ATMError, Card, TokenResponse } from "./types";
import Account from "@/lib/db/models/account";
import { v4 as uuidv4 } from "uuid";

export function getPort() {
  return process.env.PORT || "3000";
}

export function getHost() {
  return `http://localhost:${process.env.PORT}`;
}

export function getSecretKey(): string {
  return process.env.SECRET_KEY || "";
}

export function getMongoURI(): string {
  return process.env.MONGO_URI || "mongodb://localhost:27017/atm";
}

export function getDailyLimit(): number {
  const LIMIT = 1000;
  return LIMIT;
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

export function createTokens(cardId: string): TokenResponse {
  const accessTokenExpiry = getExpiryShort();
  const accessToken = createToken(accessTokenExpiry, cardId);

  const refreshTokenExpiry = getExpiryLong();
  const refreshToken = createToken(refreshTokenExpiry, cardId);

  return { accessToken, refreshToken };
}

export function createToken(expiryTime: string, cardId: string) {
  return jwt.sign(
    {
      cardId: cardId,
      name: "Jane",
    },
    getSecretKey(),
    {
      expiresIn: expiryTime,
    }
  );
}

export function createcardId() {
  return uuidv4();
}

export function createTransactionId() {
  return uuidv4();
}

export async function createAccount(cardId: string) {
  const currentTime = new Date();
  await new Account({
    cardId: cardId,
    balance: 0,
    updatedAt: currentTime,
    createdAt: currentTime,
  }).save();
}

export function getCardInfoFromJwt(token: string): Card {
  return jwt.verify(token, getSecretKey()) as Card;
}

/**
 *
 * Typically, we want to do some database validation that the expired token is paired with the refresh token, but there isnt time here
 * @param refreshToken
 * @param accessToken
 * @returns
 */
export async function saveAndRespondWithTokens(
  accessToken: string,
  refreshToken: string
): Promise<Response> {
  try {
    await new RefreshToken({ refreshToken, accessToken, valid: true }).save();
    return Response.json({ accessToken, refreshToken });
  } catch {
    return new Response(formatErrorMessage("Could not save token"), {
      status: 500,
    });
  }
}

export function validateUserIput(cardId: string, amount: string) {
  if (!cardId) {
    throw new ATMError("cardId is not valid or was not provided.", 401);
  }

  if (!amount || isNaN(parseInt(amount)) || !Number.isFinite(Number(amount))) {
    throw new ATMError("amount is invalid or was not provided", 401);
  }

  const isWholeNumber = /^\d+$/.test(amount);
  if (!isWholeNumber) {
    throw new ATMError("amount should be whole values", 401);
  }
}

export async function getAccount(cardId: string) {
  const account = await Account.findOne({ cardId: cardId });

  if (!account) {
    throw new ATMError("Account is not found with cardId", 404);
  }

  return account;
}

export function validateAmount(amount: number, balance: number) {
  if (amount > balance) {
    throw new ATMError("Amount exceeds balance", 401);
  }
}

export function formatErrorMessage(message: string): string {
  return JSON.stringify({ message });
}
