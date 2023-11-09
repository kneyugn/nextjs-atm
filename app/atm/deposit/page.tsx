import { Header } from "@/components/header/header";
import {
  DynamicTransaction,
  StaticTransaction,
} from "@/components/transactionInput/transactionInput";
import { getCardInfoFromJwt } from "@/lib/utils/helper";
import { TransactionType } from "@/lib/utils/types";
import { cookies } from "next/headers";

function fetchAccount() {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("access_token")?.value || "";
  const card = getCardInfoFromJwt(accessToken);
  const cardId = card?.cardId || "";
  return cardId;
}

export default async function AccountDeposit() {
  let cardId = fetchAccount();
  return (
    <>
      <Header secondaryHeader={"Deposit"}></Header>
      <main className="m-8 flex justify-center">
        <div className="flex gap-4">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body justify-between">
              <h3 className="card-title">Deposit $10</h3>
              <div className="card-actions justify-end">
                <StaticTransaction
                  transactionType={TransactionType.Deposit}
                  amount="10"
                  text="Deposit $10"
                  cardId={cardId}
                ></StaticTransaction>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body justify-between">
              <h3 className="card-title">Deposit $20</h3>
              <div className="card-actions justify-end">
                <StaticTransaction
                  transactionType={TransactionType.Deposit}
                  amount="20"
                  text="Deposit $20"
                  cardId={cardId}
                ></StaticTransaction>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body justify-between">
              <h3 className="card-title">Deposit $50</h3>
              <div className="card-actions justify-end">
                <StaticTransaction
                  transactionType={TransactionType.Deposit}
                  amount="50"
                  text="Deposit $50"
                  cardId={cardId}
                ></StaticTransaction>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body justify-between">
              <h3 className="card-title">Deposit Custom amount</h3>
              <div className="card-actions justify-end">
                <DynamicTransaction
                  transactionType={TransactionType.Deposit}
                  text="Deposit"
                  cardId={cardId}
                ></DynamicTransaction>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
