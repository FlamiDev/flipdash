import { NextRequest, NextResponse } from "next/server";
import { activePlayers } from "@/lib/players";
import {
  ValidatePlayer,
  findExistingPlayerSession,
  isSessionValid,
  refreshSession,
  createSession,
} from "@/lib/session";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ player: string }> }
) {
  const { player } = await context.params;

  const validPlayer = ValidatePlayer(player);
  if (validPlayer) {
    return validPlayer; 
  }

  const cookieSession = req.cookies.get(`${player}-session`)?.value;

  if (isSessionValid(player as keyof typeof activePlayers, cookieSession)) {
    return refreshSession(player as keyof typeof activePlayers, cookieSession!);
  }

  const alreadyLoggedInAs = findExistingPlayerSession(req);
  if (alreadyLoggedInAs && alreadyLoggedInAs !== player) {
    return NextResponse.json({ success: false, reason: "already_logged_in_elsewhere" }, { status: 403 });
  }

  if (
    activePlayers[player as keyof typeof activePlayers] &&
    activePlayers[player as keyof typeof activePlayers]!.sessionId !== cookieSession &&
    Date.now() <= activePlayers[player as keyof typeof activePlayers]!.expiresAt
  ) {
    return NextResponse.json({ success: false, reason: "taken" });
  }

  return createSession(player as keyof typeof activePlayers, cookieSession);
}