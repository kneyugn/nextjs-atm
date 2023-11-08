import connectDB from "@/lib/db/db";
import RefreshToken from "@/lib/db/models/refreshToken";
import { formatErrorMessage } from "@/lib/utils/helper";
import { cookies } from "next/headers";

connectDB();

export async function POST(): Promise<Response> {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("access_token")?.value;
  const refreshToken = cookiesStore.get("refresh_token")?.value;

  if (!accessToken) {
    return new Response(formatErrorMessage("accessToken not found"), {
      status: 401,
    });
  }

  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  const filter = { $or: [{ accessToken }, { refreshToken }] };
  const update = { valid: false };

  const savedToken = await RefreshToken.updateMany(
    filter,
    update,
    options
  ).exec();

  return Response.json({ accessToken: savedToken });
}
