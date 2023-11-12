"use client"; // Error components must be Client Components

import { Header } from "@/components/header/header";
import { NavigationButton } from "@/components/navigationButton/navigationButton";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <Header secondaryHeader="Error Page"></Header>
      <main className="m-8 flex justify-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-red-500">Error: {error.message}</h2>
          </div>
          <div className="flex justify-end m-4">
            <NavigationButton route="/atm" text="Go Home"></NavigationButton>
          </div>
        </div>
      </main>
    </>
  );
}
