"use client";

import { useRouter } from "next/navigation";

async function makeTransaction(cardId: string, amount: number) {
  const res = await fetch(`/api/atm/deposit`, {
    method: "POST",
    body: JSON.stringify({
      cardId: cardId,
      amount: amount,
    }),
  });
  return await res.json();
}

export function StaticTransaction(props: {
  amount: string;
  text: string;
  cardId: string;
}) {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        const { transactionId } = await makeTransaction(
          props.cardId,
          parseInt(props.amount)
        );
        router.push(`/atm/transaction/${transactionId}`);
      }}
      className="btn btn-primary"
    >
      {props.text}
    </button>
  );
}

export function DynamicTransaction(props: { text: string; cardId: string }) {
  const router = useRouter();
  return (
    <>
      <form
        className="form-control w-full max-w-xs"
        onSubmit={async (e) => {
          e.preventDefault();
          const amount = e.currentTarget.customAmount?.value;
          await makeTransaction(props.cardId, parseInt(amount));
          const { transactionId } = await makeTransaction(
            props.cardId,
            parseInt(amount)
          );
          router.push(`/atm/transaction/${transactionId}`);
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
            max={100}
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
