"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "@/app/assets/css/signUp.css";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/api/auth/signIn", { username, password });
      if (response.status === 200) {
        router.push("/");
      }
    } catch (error) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="page-container">
      <header className="header">Sign In</header>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <div className="form-group">
          <label className="label">Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="input-field" />
        </div>
        <div className="form-group">
          <label className="label">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-field" />
        </div>
        <button type="submit" className="submit-button">
          Sign In
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <footer className="footer">
        Don't have an account?{" "}
        <a href="/auth/signUp" style={{ color: "var(--accentcolor)" }}>
          Sign Up
        </a>
      </footer>
    </div>
  );
}
