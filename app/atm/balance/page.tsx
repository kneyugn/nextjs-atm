import { Header } from "@/components/header/header";
import { NavigationButton } from "@/components/navigationButton/navigationButton";
import {
  formatErrorMessage,
  getCardInfoFromJwt,
  getHost,
} from "@/lib/utils/helper";
import { ATMError } from "@/lib/utils/types";
import { cookies } from "next/headers";

async function fetchAccount() {
  const cookiesStore = cookies();
  const access_token = cookiesStore.get("access_token")?.value || "";
  const refresh_token = cookiesStore.get("refresh_token")?.value || "";
  const card = getCardInfoFromJwt(access_token);
  if (card === null || typeof card === "string") {
    throw new ATMError("Card not found", 404);
  }
  const cardId = card?.cardId || "";
  const res = await fetch(`${getHost()}/api/atm/balance?cardId=${cardId}`, {
    headers: {
      cache: "no-store",
      Cookie: `access_token=${access_token};refresh_token=${refresh_token}`,
    },
  });
  return res.json();
}

export default async function AccountDeposit() {
  let account = await fetchAccount();
  const dateCreated = new Date(account.createdAt).toISOString().split("T")[0];
  return (
    <>
      <Header secondaryHeader="Account Balance"></Header>
      <main className="m-8 flex justify-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Account Balance</h2>
            <p>CardId: {account?.cardId}</p>
            <p>Account balance: ${account?.balance}</p>
            <p>Account Created: {dateCreated}</p>
            <div className="card-actions justify-end">
              <NavigationButton route="/atm" text="Go Home"></NavigationButton>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
