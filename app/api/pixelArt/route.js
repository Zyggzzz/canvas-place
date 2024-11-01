// pages/api/pixelArt.js
import { query } from "@/app/assets/js/database";

export async function POST(req) {
  const { x, y, color } = await req.json();

  try {
    const existingPixel = await query("SELECT * FROM pixels WHERE x = ? AND y = ?", [x, y]);

    if (existingPixel.length > 0) {
      await query("UPDATE pixels SET color = ? WHERE x = ? AND y = ?", [color, x, y]);
      return new Response(JSON.stringify({ message: "Pixel color updated successfully" }), { status: 200 });
    } else {
      // Insert a new pixel
      await query("INSERT INTO pixels (x, y, color) VALUES (?, ?, ?)", [x, y, color]);
      return new Response(JSON.stringify({ message: "Pixel added successfully" }), { status: 200 });
    }
  } catch (error) {
    console.error("Error processing pixel:", error);
    return new Response(JSON.stringify({ error: "Failed to process pixel" }), { status: 500 });
  }
}

export async function GET() {
  try {
    const pixels = await query("SELECT x, y, color FROM pixels");
    return new Response(JSON.stringify(pixels), { status: 200 });
  } catch (error) {
    console.error("Error fetching pixels:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch pixels" }), { status: 500 });
  }
}
