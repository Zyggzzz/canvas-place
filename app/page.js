"use client";
import React, { useState } from "react";
import PixelArtCanvas from "./assets/components/pixelArtCanvas";
import styles from "./assets/css/root.css";

export default function App() {
  const [currentColor, setCurrentColor] = useState("#ff0000");

  return (
    <div className="app">
      <PixelArtCanvas currentColor={currentColor} />
    </div>
  );
}
