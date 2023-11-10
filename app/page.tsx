import { Header } from "@/components/header/header";
import { Main } from "@/components/main/main";
import { PasswordField } from "@/components/password/passwordField";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header secondaryHeader="Login Menu"></Header>
      <Main>
        <div className="card m-8 flex align-center w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <Image
              className="ml-.5"
              height={190}
              width={300}
              src="/debit-card.jpg"
              alt="shoes"
            ></Image>
          </div>
          <PasswordField></PasswordField>
        </div>
      </Main>
    </>
  );
}
