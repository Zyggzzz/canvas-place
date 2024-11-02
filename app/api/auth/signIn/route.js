import { query } from "@/app/assets/js/database";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    const [user] = await query("SELECT * FROM users WHERE username = ?", [username]);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
      expiresIn: "7d",
    });

    const cookie = serialize("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    const session = await query("INSERT INTO sessions (token) VALUES (?)", [token]);

    const res = NextResponse.json({ message: "Login successful" });
    res.headers.append("Set-Cookie", cookie);
    return res;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
