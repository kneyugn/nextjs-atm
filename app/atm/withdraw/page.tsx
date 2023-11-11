import { Card } from "@/components/card/card";
import { Header } from "@/components/header/header";
import { Main } from "@/components/main/main";
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

export default async function AccountWithdraw() {
  let cardId = fetchAccount();
  const transactionMenu = [
    {
      title: "Withdraw $20",
      amount: 20,
      buttonText: "Withdraw $20",
    },
    {
      title: "Withdraw $50",
      amount: 50,
      buttonText: "Withdraw $50",
    },
    {
      title: "Withdraw $100",
      amount: 100,
      buttonText: "Withdraw $100",
    },
    {
      title: "Withdraw Custom amount",
      customAmount: true,
      buttonText: "Withdraw",
    },
  ];
  return (
    <>
      <Header secondaryHeader={"Withdraw"}></Header>
      <Main>
        {transactionMenu.map((item, idx) => {
          return (
            <>
              <Card key={idx}>
                {item.amount && !item.customAmount ? (
                  <>
                    <h3 className="card-title">{item.title}</h3>
                    <div className="card-actions justify-end">
                      <StaticTransaction
                        transactionType={TransactionType.Withdraw}
                        amount={item.amount}
                        text={item.buttonText}
                        cardId={cardId}
                      ></StaticTransaction>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="card-title">{item.title}</h3>
                    <div className="card-actions justify-end">
                      <DynamicTransaction
                        transactionType={TransactionType.Withdraw}
                        text={item.buttonText}
                        cardId={cardId}
                      ></DynamicTransaction>
                    </div>
                  </>
                )}
              </Card>
            </>
          );
        })}
      </Main>
    </>
  );
}
