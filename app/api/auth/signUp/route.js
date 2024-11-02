import { query } from "@/app/assets/js/database";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    const existingUser = await query("SELECT * FROM users WHERE username = ?", [username]);

    if (existingUser.length > 0) {
      return NextResponse.json({ error: "Username already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json({ error: "An error occurred while creating the account" }, { status: 500 });
  }
}
