import { Header } from "@/components/header/header";
import { NavigationButton } from "@/components/navigationButton/page";
import { getDailyLimit } from "@/lib/utils/helper";

export default function ATMMenu() {
  return (
    <>
      <Header secondaryHeader={"Main Menu"}></Header>
      <main className="m-8">
        <div className="flex gap-4">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Check Balance</h3>
              <p>Check your account balance.</p>
              <div className="card-actions justify-end">
                <NavigationButton
                  route="atm/balance"
                  text="View Balance"
                ></NavigationButton>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Make a deposit.</h3>
              <p>
                Making a deposit is quick and easy. Just select the amount or
                add a custom amount.
              </p>{" "}
              <div className="card-actions justify-end">
                <NavigationButton
                  route="atm/deposit"
                  text="Deposit"
                ></NavigationButton>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Withdraw from account.</h3>
              <p>
                Your money when you need it. You can withdraw up to $
                {getDailyLimit()}
              </p>
              <div className="card-actions justify-end">
                <NavigationButton
                  route="atm/withdraw"
                  text="Withdraw"
                ></NavigationButton>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
