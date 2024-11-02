import { NextResponse } from "next/server";
import { parse } from "cookie";
import { validateToken } from "@/app/assets/js/token";

export async function GET(req) {
  const cookies = parse(req.headers.get("cookie") || "");
  const token = cookies.session_token;

  if (!token) {
    return new Response(JSON.stringify({ error: "Not authorized" }), { status: 401 });
  }

  const user = await validateToken(token);

  console.log(user);

  if (user === null) {
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
  }

  return new Response(JSON.stringify({ status: "verified" }), { status: 200 });
}
