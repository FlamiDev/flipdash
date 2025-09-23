import { NextRequest, NextResponse } from "next/server";
import { PlayerKey } from "@/lib/players";
import {
  ValidatePlayer,
  findExistingPlayerSession,
  isSessionValid,
  refreshSession,
  createSession,
  isPlayerTaken
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

  if (isSessionValid(player as PlayerKey, cookieSession)) {
    return refreshSession(player as PlayerKey, cookieSession!);
  }

  const alreadyLoggedInAs = findExistingPlayerSession(req);
  if (alreadyLoggedInAs && alreadyLoggedInAs !== player) {
    return NextResponse.json({ success: false, reason: "already_logged_in_elsewhere" }, { status: 403 });
  }

  if (isPlayerTaken(player as PlayerKey, cookieSession)) {
    return NextResponse.json({ success: false, reason: "taken" });
  }

  return createSession(player as PlayerKey, cookieSession);
}