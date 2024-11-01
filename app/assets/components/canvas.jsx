import React, { useRef, useEffect } from "react";

export default function Canvas({ width, height, onCanvasReady }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    if (onCanvasReady) {
      onCanvasReady(ctx);
    }
  }, [width, height, onCanvasReady]);

  return <canvas ref={canvasRef}></canvas>;
}
