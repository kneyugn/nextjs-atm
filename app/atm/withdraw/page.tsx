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

// TODO: this component could be combined with deposit
export default async function AccountWithdraw() {
  let cardId = fetchAccount();
  return (
    <>
      <Header secondaryHeader={"Withdraw"}></Header>
      <main className="m-8 flex justify-center">
        <div className="flex gap-4">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body justify-between">
              <h3 className="card-title">Withdraw $10</h3>
              <div className="card-actions justify-end">
                <StaticTransaction
                  transactionType={TransactionType.Withdraw}
                  amount="10"
                  text="Withdraw $10"
                  cardId={cardId}
                ></StaticTransaction>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body justify-between">
              <h3 className="card-title">Withdraw $20</h3>
              <div className="card-actions justify-end">
                <StaticTransaction
                  transactionType={TransactionType.Withdraw}
                  amount="20"
                  text="Withdraw $20"
                  cardId={cardId}
                ></StaticTransaction>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body justify-between">
              <h3 className="card-title">Withdraw $50</h3>
              <div className="card-actions justify-end">
                <StaticTransaction
                  transactionType={TransactionType.Withdraw}
                  amount="50"
                  text="Withdraw $50"
                  cardId={cardId}
                ></StaticTransaction>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body justify-between">
              <h3 className="card-title">Withdraw Custom amount</h3>
              <p>
                To test that user cannot exceed daily limit, make withdraws of
                more than $1000
              </p>
              <div className="card-actions justify-end">
                <DynamicTransaction
                  transactionType={TransactionType.Withdraw}
                  text="Withdraw"
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
