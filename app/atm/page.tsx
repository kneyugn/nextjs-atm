import { Card } from "@/components/card/card";
import { Header } from "@/components/header/header";
import { Main } from "@/components/main/main";
import { NavigationButton } from "@/components/navigationButton/navigationButton";

export default function ATMMenu() {
  const menuItems = [
    {
      title: "Check balance",
      description: "Check your account balance",
      buttonText: "Check Balance",
      route: "atm/balance",
    },
    {
      title: "Make a deposit",
      description: "",
      buttonText: "Deposit",
      route: "atm/deposit",
    },
    {
      title: "Withdraw from account",
      description: "Your money when you need it. You can withdraw up to $1000",
      buttonText: "Withdraw",
      route: "atm/withdraw",
    },
    {
      title: "Log out.",
      description: "Log out of the account. Don't forget to take your card.",
      buttonText: "Log Out",
      route: "logout",
    },
  ];
  return (
    <>
      <Header secondaryHeader={"Main Menu"}></Header>
      <Main>
        {menuItems.map((item, idx) => {
          return (
            <>
              <Card key={idx}>
                <h3 className="card-title">{item.title}</h3>
                <p>{item.description}</p>
                <div className="card-actions justify-end">
                  <NavigationButton
                    route={item.route}
                    text={item.buttonText}
                  ></NavigationButton>
                </div>
              </Card>
            </>
          );
        })}
      </Main>
    </>
  );
}
