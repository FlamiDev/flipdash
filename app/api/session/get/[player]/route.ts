import { NextRequest, NextResponse } from "next/server";
import { activePlayers } from "@/lib/players";
import { ValidatePlayer, isSessionValid, isSessionExpired, refreshSession, deleteSession } from "@/lib/session";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ player: string }> }
) {
  const { player } = await context.params;

  if (ValidatePlayer(player)) {
    return ValidatePlayer(player);
  }

  const cookieSession = req.cookies.get(`${player}-session`)?.value;
  const session = activePlayers[player as keyof typeof activePlayers];

  if (!session) {
    return NextResponse.json({ success: false, reason: "unauthorized" }, { status: 403 });
  }

  if (isSessionExpired(player as keyof typeof activePlayers)) {
    deleteSession(player as keyof typeof activePlayers);
    return NextResponse.json({ success: false, reason: "expired" }, { status: 403 });
  }

  if (!isSessionValid(player as keyof typeof activePlayers, cookieSession)) {
    return NextResponse.json({ success: false, reason: "unauthorized" }, { status: 403 });
  }

  return refreshSession(player as keyof typeof activePlayers, cookieSession!);
}