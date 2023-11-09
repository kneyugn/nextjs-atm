"use client";

import { ATMError, TransactionType } from "@/lib/utils/types";
import { useRouter } from "next/navigation";

async function makeTransaction(
  cardId: string,
  amount: number,
  transactionType: TransactionType
) {
  const url =
    transactionType === TransactionType.Withdraw
      ? "/api/atm/withdraw"
      : "/api/atm/deposit";
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      cardId: cardId,
      amount: amount,
    }),
  });
  const transactionData = await res.json();
  if (!res.ok) {
    throw new ATMError(transactionData.message, res.status);
  }
  return transactionData;
}

export function StaticTransaction(props: {
  amount: string;
  text: string;
  cardId: string;
  transactionType: TransactionType;
}) {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={async () => {
          try {
            const { transactionId } = await makeTransaction(
              props.cardId,
              parseInt(props.amount),
              props.transactionType
            );
            router.push(`/atm/transaction/${transactionId}`);
          } catch (err: any) {
            router.push(`/atm/error/${err.message}`);
          }
        }}
        className="btn btn-primary"
      >
        {props.text}
      </button>
    </div>
  );
}

export function DynamicTransaction(props: {
  text: string;
  cardId: string;
  transactionType: TransactionType;
}) {
  const router = useRouter();
  return (
    <>
      <form
        className="form-control w-full max-w-xs"
        onSubmit={async (e) => {
          e.preventDefault();
          const amount = e.currentTarget.customAmount?.value;
          try {
            const { transactionId } = await makeTransaction(
              props.cardId,
              parseInt(amount),
              props.transactionType
            );
            router.push(`/atm/transaction/${transactionId}`);
          } catch (err: any) {
            router.push(`/atm/error/${err.message}`);
          }
        }}
      >
        <div className="">
          <label htmlFor="customTransaction" className="label">
            <span className="label-text">Enter amount</span>
          </label>
          <input
            name="customAmount"
            id="customTransaction"
            type="number"
            min={10}
            max={2000}
            className="input input-bordered w-full"
          />
        </div>
        <button type="submit" className="mt-4 btn btn-primary">
          {props.text}
        </button>
      </form>
    </>
  );
}
