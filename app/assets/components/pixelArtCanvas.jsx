import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "@/app/assets/css/artBoard.css";

export default function PixelArtCanvas() {
  const canvasRef = useRef(null);
  const [currentColor, setCurrentColor] = useState("#000000");
  const pixelSize = 10;
  const pollInterval = 10000;

  const drawPixel = (x, y, color) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(x, y, pixelSize, pixelSize);
  };

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

  useEffect(() => {
    const interval = setInterval(fetchPixels, pollInterval);

    fetchPixels();

    return () => clearInterval(interval);
  }, []);

  const handleClick = async (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const pixelX = Math.floor(((event.clientX - rect.left) * scaleX) / pixelSize) * pixelSize;
    const pixelY = Math.floor(((event.clientY - rect.top) * scaleY) / pixelSize) * pixelSize;

    drawPixel(pixelX, pixelY, currentColor);

    try {
      await axios.post("/api/pixelArt", { x: pixelX, y: pixelY, color: currentColor });
      fetchPixels();
    } catch (error) {
      console.error("Error sending pixel data:", error);
    }
  };

  return (
    <div className="canvas-container">
      <div className="artboard-container">
        <h1>Draw Your Art</h1>
        <div className="canvas-frame">
          <canvas ref={canvasRef} onClick={handleClick} width={1900} height={900} className="pixel-canvas" />
        </div>
        <div className="color-picker-container">
          <label className="color-label">Choose Color:</label>
          <input type="color" value={currentColor} onChange={(e) => setCurrentColor(e.target.value)} className="color-picker" />
        </div>
      </div>
      <footer className="footer">Made with ♥ </footer>
    </div>
  );
}
