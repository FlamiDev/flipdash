import { NextRequest, NextResponse } from "next/server";
import { activePlayers, isValidPlayerKey } from "./players";

const two_hours = 1000 * 60;

export function ValidatePlayer(player: string) {
    if (!isValidPlayerKey(player)) {
        return NextResponse.json({ success: false, reason: "invalid_player" }, { status: 400 });
    }
    return null;
}

export function findExistingPlayerSession(req: NextRequest): "player1" | "player2" | null {
    if (req.cookies.get("player1-session")) { 
        return "player1"; 
    } else if (req.cookies.get("player2-session")) { 
        return "player2"; 
    }
    return null;
}

export function isSessionValid(player: keyof typeof activePlayers, cookieSession?: string) {
    const session = activePlayers[player];
    if (!session) return false;
    return session.sessionId === cookieSession && Date.now() <= session.expiresAt;
}

export function isSessionExpired(player: keyof typeof activePlayers) {
    const session = activePlayers[player];
    if (!session) return true;
    return Date.now() > session.expiresAt;
}

export function refreshSession(player: keyof typeof activePlayers, sessionId: string) {
    activePlayers[player]!.expiresAt = Date.now() + two_hours;
    const res = NextResponse.json({ success: true, alreadyLoggedIn: true, sessionId });
    res.cookies.set(`${player}-session`, sessionId, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: two_hours / 1000,
    });
    return res;
}

export function createSession(player: keyof typeof activePlayers, cookieSession?: string) {
    const sessionId = cookieSession ?? Math.random().toString(36).substring(2);
    activePlayers[player] = { sessionId, expiresAt: Date.now() + two_hours };
    const res = NextResponse.json({ success: true, sessionId });
    res.cookies.set(`${player}-session`, sessionId, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: two_hours / 1000,
    });
    return res;
}

export function deleteSession(player: keyof typeof activePlayers) {
    activePlayers[player] = null;
    const res = NextResponse.json({ success: true });
    res.cookies.set(`${player}-session`, "", {
        httpOnly: true,
        path: "/",
        maxAge: 0,
    });
    return res;
}