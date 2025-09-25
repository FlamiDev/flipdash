import { PlayerKey } from "@/lib/players";
import { checkLogin, expiry_time } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { setCookies } from "@/lib/cookies";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ player: string }> }
) {
  const { player } = await context.params;

  const cookieSession = req.cookies.get('session')?.value;

  if (!checkLogin(player as PlayerKey, cookieSession)) {
    return NextResponse.json({ success: false, reason: "not_logged_in" }, { status: 401 });
  } 

  const res = NextResponse.json({ success: true, reason: "logged_in" });
  setCookies(res, 'session', cookieSession!, expiry_time);
  return res;
}