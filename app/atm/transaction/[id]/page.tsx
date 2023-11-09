import { Header } from "@/components/header/header";
import { NavigationButton } from "@/components/navigationButton/page";
import { getHost } from "@/lib/utils/helper";

async function getTransaction(transactionId: string) {
  try {
    const res = await fetch(
      `${getHost()}/api/atm/transaction?transactionId=${transactionId}`
    );
    return res.json();
  } catch (err) {
    return null;
  }
}

export default async function TransactionReceipt({
  params,
}: {
  params: { id: string };
}) {
  const transactionDetails = await getTransaction(params.id);

  return (
    <>
      <Header secondaryHeader="Deposit Receipt"></Header>
      <main className="m-8 flex justify-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Transaction completed!</h2>
            <p>Transaction Amount: ${transactionDetails.amount}</p>
            <p>Account balance: ${transactionDetails.balance}</p>
            <p>Transaction type: {transactionDetails.transactionType}</p>
            <p>Date of transaction: {transactionDetails.createdAt}</p>
            {/* <NavigationButton
            route="/sign-out"
            text="Sign out"
            secondary={true}
          ></NavigationButton> */}
            <NavigationButton route="/atm" text="Go Home"></NavigationButton>
          </div>
        </div>
      </main>
    </>
  );
}
