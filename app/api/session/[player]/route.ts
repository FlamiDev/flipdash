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
      const res = NextResponse.json({ success: false, reason: "expired" }, { status: 403 });
      res.cookies.set(`${player}-session`, "", {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
      });
      return res;
    } else {
      playerSession.expiresAt = Date.now() + two_hours;
      const res = NextResponse.json({ success: true });
      res.cookies.set(`${player}-session`, cookieSession!, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: two_hours / 1000,
      });
      return res;
    }
  }

  return NextResponse.json({ success: false, reason: "unauthorized" }, { status: 403 });
}