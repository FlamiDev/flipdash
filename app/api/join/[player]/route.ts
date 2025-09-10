import { NextRequest, NextResponse } from "next/server";

let activePlayers: Record<"player1" | "player2", string | null> = {
  player1: null,
  player2: null,
};

function isPlayerKey(value: string): value is "player1" | "player2" {
  return value === "player1" || value === "player2";
}

export async function GET(
  req: NextRequest,
  { params }: { params: { player: string } }
) {
  const player = await params.player;

  if (!isPlayerKey(player)) {
    return NextResponse.json(
      { success: false, reason: "invalid_player" },
      { status: 400 }
    );
  }

  if (activePlayers[player]) {
    return NextResponse.json({ success: false, reason: "taken" });
  }

  const sessionId = Math.random().toString(36).substring(2);
  activePlayers[player] = sessionId;

  return NextResponse.json({ success: true, sessionId });
}