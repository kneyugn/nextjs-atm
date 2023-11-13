import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getHost } from "./lib/utils/helper";

// [TODO]: back button does not trigger middleware:
// for /, it should route to /atm if user is already logged in
// [TODO] nodejs runtime not available for middleware.ts
export async function middleware(request: NextRequest) {
  const access_token = request.cookies.get("access_token")?.value;
  const refresh_token = request.cookies.get("refresh_token")?.value;
  const verifyEndpoint = `${getHost()}/api/token/verify`;
  const res = await fetch(verifyEndpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access_token=${access_token};refresh_token=${refresh_token}`,
    },
  });

  if (!res.ok) {
    request.cookies.delete("access_token");
    request.cookies.delete("refresh_token");
    return NextResponse.redirect(new URL(`${getHost()}/`));
  }
  const newToken = await res.json();
  request.cookies.set("access_token", newToken);
  return NextResponse.next();
}

// TODO: simplify matcher
export const config = {
  matcher: [
    "/atm/:path*",
    "/api/atm/verify",
    "/api/atm/balance",
    "/api/atm/deposit",
    "/api/atm/withdraw",
    "/api/atm/transaction/:path*",
    "/api/atm/invalidate",
  ],
};
