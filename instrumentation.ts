// TODO: ensure mongo traces show
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./instrumentation.node.ts");
  }
}


// import { registerOTel } from "@vercel/otel";

// export function register() {
//   registerOTel("next-app");
// }
