"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function PixelArtCanvas() {
  const canvasRef = useRef(null);
  const [currentColor, setCurrentColor] = useState("#000000");
  const pixelSize = 10;

  const drawPixel = (x, y, color) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(x, y, pixelSize, pixelSize);
  };

  useEffect(() => {
    const fetchPixels = async () => {
      try {
        const response = await axios.get("/api/pixelArt");
        const pixels = response.data;

        pixels.forEach((pixel) => {
          drawPixel(pixel.x, pixel.y, pixel.color);
        });
      } catch (error) {
        console.error("Error fetching pixels:", error);
      }
    };

    fetchPixels();
  }, []);

  const handleClick = async (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const pixelX = Math.floor((event.clientX - rect.left) / pixelSize) * pixelSize;
    const pixelY = Math.floor((event.clientY - rect.top) / pixelSize) * pixelSize;

    drawPixel(pixelX, pixelY, currentColor);

    try {
      await axios.post("/api/pixelArt", { x: pixelX, y: pixelY, color: currentColor });
    } catch (error) {
      console.error("Error sending pixel data:", error);
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} onClick={handleClick} width={500} height={500} style={{ border: "1px solid black", backgroundColor: "#eee" }} />
      <input type="color" value={currentColor} onChange={(e) => setCurrentColor(e.target.value)} />
    </div>
  );
}
