import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getHost, getPort } from "./lib/utils/helper";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log(request.url);
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

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/atm",
  ],
};
