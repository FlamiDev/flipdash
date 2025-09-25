import { NextRequest, NextResponse } from "next/server";
import { PlayerKey } from "@/lib/players";
import { expiry_time, tryJoin } from "@/lib/session";
import { setCookies } from "@/lib/cookies";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ player: string }> }
) {
  const { player } = await context.params;
  const cookieSession = req.cookies.get('session')?.value;

  const result = tryJoin(player as PlayerKey, cookieSession);

  if (result.type === "new_session") {
    const res = NextResponse.json(result);
    setCookies(res, 'session', result.sessionId, expiry_time);
    return res;
  }
  return NextResponse.json(result, { status: result.type === "invalid_player" ? 400 : 403 });
}