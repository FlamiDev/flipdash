import { activePlayers, isValidPlayerKey, PlayerKey, PlayerSession, getActivePlayer } from "./players";

export const expiry_time = 1000 * 60 * 60 * 2; // 2 hours

export type SessionResult =
    | { type: "invalid_player";}
    | { type: "already_logged_in"; player: PlayerKey }
    | { type: "taken" }
    | { type: "new_session"; sessionId: string; expiresAt: number };

export type SessionResultType = SessionResult["type"];

export function tryJoin(player: PlayerKey, cookieSession?: string): SessionResult {
    if (!isValidPlayerKey(player)) {
        return { type: "invalid_player"};
    }

    const loggedInAs = alreadyLoggedIn(cookieSession);
    if (loggedInAs) {
        return { type: "already_logged_in", player: loggedInAs };
    }

    if (isPlayerTaken(player)) {
        return { type: "taken"}
    }

    const newSession = createSession(player);
    return { type: "new_session", sessionId: newSession.sessionId, expiresAt: newSession.expiresAt };

}

export function checkLogin(player: PlayerKey, cookieSession?: string) {
    if (!isValidPlayerKey(player)) {
        return false;
    }
    if (!isSessionValid(player, cookieSession)) {
        return false;
    }
    refreshSession(player);
    return true;
}

function alreadyLoggedIn(cookieSession?: string): PlayerKey | null {
    const player1Session = getActivePlayer("player1");
    const player2Session = getActivePlayer("player2");

    if (!cookieSession) return null;

    if (player1Session?.sessionId === cookieSession) {
        return "player1";
    }
    if (player2Session?.sessionId === cookieSession) {
        return "player2";
    }
    return null;
}

function isPlayerTaken(player: PlayerKey) {
    const session = getActivePlayer(player);
    return session != null;
}

function isSessionValid(player: PlayerKey, cookieSession?: string) {
    const session = getActivePlayer(player);
    if (!session) return false;
    return session.sessionId === cookieSession;
}

function refreshSession(player: PlayerKey) {
    const session = getActivePlayer(player);
    if (session) {
        session.expiresAt = Date.now() + expiry_time;
    }
}

function createSession(player: PlayerKey) {
    const sessionId = crypto.randomUUID();
    const expiresAt = Date.now() + expiry_time;
    const session: PlayerSession = { sessionId, expiresAt };
    activePlayers[player] = session;
    return session;
}

export function deleteSession(player: PlayerKey) {
    activePlayers[player] = null;
}
