"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "@/app/assets/css/signUp.css";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/api/auth/signUp", { username, password });
      if (response.status === 201) {
        router.push("/auth/signIn");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An error occurred";
      setError(errorMessage);
    }
  };

  return (
    <div className="page-container">
      <header className="header">Create Account</header>
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
          Create Account
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <footer className="footer">
        Already have an account?{" "}
        <a href="/auth/signIn" style={{ color: "var(--accentcolor)" }}>
          Sign In
        </a>
      </footer>
    </div>
  );
}
