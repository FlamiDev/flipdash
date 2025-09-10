import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const player = searchParams.get("player");

  if (player !== "player1" && player !== "player2") {
    return NextResponse.json({ error: "invalid_player" }, { status: 400 });
  }

  const url = `http://localhost:3000/join/${player}`;
  const qrDataUrl = await QRCode.toDataURL(url);

  return NextResponse.json({ player, qr: qrDataUrl });
}