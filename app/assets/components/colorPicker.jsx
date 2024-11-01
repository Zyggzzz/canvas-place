import React from "react";

export default function ColorPicker({ currentColor, onColorChange }) {
  return <input type="color" value={currentColor} onChange={(e) => onColorChange(e.target.value)} style={{ marginBottom: "10px" }} />;
}
