"use server";
import jwt from "jsonwebtoken";
import { query } from "./database";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function validateToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const result = await query(`SELECT * FROM sessions WHERE token = ?`, [token]);

    if (result.length === 0) {
      return null;
    }
    console.log("Token validated successfully");
    return decoded;
  } catch (error) {
    console.error("Token validation error:", error);
    return null;
  }
}
