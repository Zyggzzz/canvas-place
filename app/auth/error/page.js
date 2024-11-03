"use client";
import styles from "@/app/assets/css/error.css";

export default function ErrorPage() {
  return (
    <div className="error-page-container">
      <h1 className="error-title">Oops!</h1>
      <p className="error-message">An error occurred during authentication. Please try again.</p>
      <a href="/" className="home-link">
        Go to Home
      </a>
    </div>
  );
}
