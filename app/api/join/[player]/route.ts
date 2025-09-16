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

  const existingPlayer = Object.entries(activePlayers).find(
    ([p, session]) => p !== player && session && session === req.cookies.get(`${p}-session`)?.value
  );

  if (existingPlayer) {
    return NextResponse.json({ success: false, reason: "already_logged_in_elsewhere" }, { status: 403 });
  }

  if (activePlayers[player] && activePlayers[player] === cookieSession) {
    return NextResponse.json({ success: true, alreadyLoggedIn: true, sessionId: cookieSession });
  }

  if (activePlayers[player] && activePlayers[player] !== cookieSession) {
    return NextResponse.json({ success: false, reason: "taken" });
  }

  const sessionId = cookieSession ?? Math.random().toString(36).substring(2);
  activePlayers[player] = sessionId;

  const res = NextResponse.json({ success: true, sessionId });
  res.cookies.set(`${player}-session`, sessionId, { httpOnly: true, path: "/" });
  return res;
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ player: string }> }
) {
  const { player } = await context.params;
  if (!isPlayerKey(player)) {
    return NextResponse.json({ success: false, reason: "invalid_player" }, { status: 400 });
  }

  const cookieSession = req.cookies.get(`${player}-session`)?.value;

  if (activePlayers[player] && activePlayers[player] === cookieSession) {
    activePlayers[player] = null;
    const res = NextResponse.json({ success: true });
    res.cookies.set(`${player}-session`, "", { httpOnly: true, path: "/", maxAge: 0 });
    return res;
  }

  return NextResponse.json({ success: false, reason: "not_owner" }, { status: 403 });
}