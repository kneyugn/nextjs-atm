import { Header } from "@/components/header/header";
import { NavigationButton } from "@/components/navigationButton/page";
import { getCardInfoFromJwt, getHost } from "@/lib/utils/helper";
import { cookies } from "next/headers";

async function fetchAccount() {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("access_token")?.value || "";
  const card = getCardInfoFromJwt(accessToken);
  const cardId = card?.cardId || "";
  const res = await fetch(`${getHost()}/api/atm/balance?cardId=${cardId}`);
  const account = res.json();
  return account;
}

export default async function AccountDeposit() {
  let account = await fetchAccount();
  const dateCreated = new Date(account.createdAt).toISOString().split("T")[0];
  return (
    <>
      <Header secondaryHeader="Account Balance"></Header>
      <main className="flex m-8">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Account Balance</h2>
            <p>CardId: {account?.cardId}</p>
            <p>Account balance: {account?.balance}</p>
            <p>Account Created: {dateCreated}</p>
            <div className="card-actions justify-end">
              <NavigationButton
                route="/sign-out"
                text="Sign out"
                secondary={true}
              ></NavigationButton>
              <NavigationButton route="/atm" text="Go Home"></NavigationButton>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
