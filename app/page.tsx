import { Header } from "@/components/header/header";
import { PasswordField } from "@/components/password/passwordField";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header secondaryHeader="Login Menu"></Header>
      <main>
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
      </main>

      <ComponentRef />
    </>
  );
}

function ComponentRef() {
  const today = new Date();
  const formattedDate = today.toISOString().slice(0, 10);

  return (
    <>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-base-300">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">
              Evergreen Finance Corporation
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <li>
                  <a>Navbar Item 1</a>
                </li>
                <li>
                  <a>Navbar Item 2</a>
                </li>
              </ul>
            </div>
          </div>
          {/* Page content here */}
          <main>
            <button className="btn">Log out</button>
            <nav>
              <ul className="menu bg-base-200 w-56 rounded-box">
                <li>
                  <h2 className="menu-title">Navigation</h2>
                  <ul>
                    <li>
                      <a>Item 1</a>
                    </li>
                    <li>
                      <a>Item 2</a>
                    </li>
                    <li>
                      <a>Item 3</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
            <nav>
              <ul className="menu bg-base-200 w-56 rounded-box">
                <li>
                  <a href="">View balance</a>
                </li>
                <li>
                  <a href="">Make a deposit</a>
                </li>
                <li>
                  <a>Make a withdrawal</a>
                </li>
                <li>
                  <a>Log out</a>
                </li>
              </ul>
            </nav>
            <ul className="menu bg-base-200 w-56 rounded-box">
              <li>
                <a>$20</a>
              </li>
              <li>
                <a>$50</a>
              </li>
              <li>
                <a>$100</a>
              </li>
              <li>
                <a>Add custom amount</a>
              </li>
            </ul>
            <h1>hello world</h1>
            <span className="loading loading-dots loading-xs"></span>
            <span className="loading loading-dots loading-sm"></span>
            <span className="loading loading-dots loading-md"></span>
            <span className="loading loading-dots loading-lg"></span>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Custom Amount:</span>
              </label>
              <input
                type="number"
                min="0"
                step="1"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <button className="btn btn-primary">Primary</button>
            <p></p>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-error w-full max-w-xs"
            />
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">What is your name?</span>
                <span className="label-text-alt">Top Right label</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
              <label className="label">
                <span className="label-text-alt">Bottom Left label</span>
                <span className="label-text-alt">Bottom Right label</span>
              </label>
            </div>
            <button className="btn btn-primary">Primary</button>
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Deposit completed!</h2>
                <p>Amount deposited: $50</p>
                <p>Account balance: $550</p>
                <p>Date of transaction: {formattedDate}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Go home</button>
                </div>
              </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Account Balance</h2>
                <p>Account balance: $550</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Go home</button>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
