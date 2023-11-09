"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function PasswordField() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string>("");
  async function signIn(e: any) {
    e.preventDefault();
    const pin = e.currentTarget.pin?.value;
    try {
      const response = await fetch("/api/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pin }),
      });
      const res = await response.json();
      if (!response.ok) {
        setAuthError(res.message);
        return;
      }
      router.push("/atm");
    } catch (err) {
      setAuthError("error in authentication");
    }
  }
  return (
    <>
      <form onSubmit={signIn} className="flex flex-col align-items-stretch">
        <div className="px-8 py-2 form-control w-full">
          <label className="label">
            <span className="label-text">Enter Pin (hint: 1234):</span>
          </label>
          <input
            id="pinField"
            name="pin"
            type="password"
            onChange={() => setAuthError("")}
            className={[
              "input input-bordered w-full",
              authError && "input-error",
              "",
            ]
              .filter(Boolean)
              .join(" ")}
          />
          {authError && (
            <label htmlFor="pinField" className="label">
              <span className="label-text-alt">{authError}</span>
            </label>
          )}
        </div>
        <button
          type="submit"
          className="mx-8 mt-2 mb-8 btn btn-primary self-stretch"
        >
          Sign in
        </button>
      </form>
    </>
  );
}
