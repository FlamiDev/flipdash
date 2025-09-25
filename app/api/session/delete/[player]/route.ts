import { NextRequest, NextResponse } from "next/server";
import { PlayerKey } from "@/lib/players";
import { checkLogin, deleteSession } from "@/lib/session";
import { setCookies } from "@/lib/cookies";

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ player: string }> }
) {
    const { player } = await context.params;

   const cookieSession = req.cookies.get('session')?.value;
 
   if (!checkLogin(player as PlayerKey, cookieSession)) {
     return NextResponse.json({ success: false, reason: "not_logged_in" }, { status: 401 });
   } 
 
   deleteSession(player as PlayerKey);
   const res = NextResponse.json({ success: true, reason: "logged_out" });
   setCookies(res, 'session', "", 0);
   return res;
}