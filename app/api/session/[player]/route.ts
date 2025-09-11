import { NextRequest, NextResponse } from "next/server";
import { activePlayers, isPlayerKey } from "@/lib/players";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ player: string }> }
) {
  const { player } = await context.params;

  if (!isPlayerKey(player)) {
    return NextResponse.json({ success: false, reason: "invalid_player" }, { status: 400 });
  }

  const cookieSession = req.cookies.get(`${player}-session`)?.value;

  if (activePlayers[player] && activePlayers[player] === cookieSession) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, reason: "unauthorized" }, { status: 403 });
}