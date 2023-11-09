export type TokenResponse = { accessToken: string; refreshToken: string };

export class ATMError extends Error {
  statusCode: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "MyCustomError";
    this.statusCode = status;
  }
}

export enum TransactionType {
  Deposit = "deposit",
  Withdraw = "withdraw",
}

export type Card = { cardId: string; name: string };