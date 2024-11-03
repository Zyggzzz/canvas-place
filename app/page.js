"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PixelArtCanvas from "./assets/components/pixelArtCanvas";
import axios from "axios";
import styles from "@/app/assets/css/root.css";

export default function Home() {
  const router = useRouter();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axios.get("/api/protected", {
          withCredentials: true,
        });

        setStatus(response.data.status);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching protected data:", error);
        setError("Not authorized");
        router.push("/auth/signIn");
      } finally {
        setLoading(false);
      }
    };

    fetchProtectedData();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div>{status == "verified" && <PixelArtCanvas />}</div>;
}
