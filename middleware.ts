export { auth as middleware } from "@/auth";
import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from "next/server";
import ratelimit from "./lib/rate-limit";

export default async function middleware(
  request: NextRequest,
  context: NextFetchEvent
): Promise<Response | undefined> {
  const ip = request?.ip ?? "127.0.0.1";

  const { success, pending } = await ratelimit.limit(ip);

  context.waitUntil(pending);

  const res = success
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/too-fast", request.url));

  return res;
}

export const config = {
  matcher: "/api",
};
