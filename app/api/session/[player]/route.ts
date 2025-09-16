import { NextRequest, NextResponse } from "next/server";
import { activePlayers, isPlayerKey } from "@/lib/players";

const two_hours = 1000 * 60 * 60 * 2;

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ player: string }> }
) {
  const { player } = await context.params;

  if (!isPlayerKey(player)) {
    return NextResponse.json({ success: false, reason: "invalid_player" }, { status: 400 });
  }

  const cookieSession = req.cookies.get(`${player}-session`)?.value;
  const playerSession = activePlayers[player];

  if (playerSession && playerSession.sessionId === cookieSession) {
    if (Date.now() > playerSession.expiresAt) {
      activePlayers[player] = null;
      return NextResponse.json({ success: false, reason: "expired" }, { status: 403 });
    } else {
      playerSession.expiresAt = Date.now() + two_hours;
      return NextResponse.json({ success: true });
    }
  }

  return NextResponse.json({ success: false, reason: "unauthorized" }, { status: 403 });
}