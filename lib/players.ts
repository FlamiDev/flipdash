export interface PlayerSession {
  sessionId: string;
  expiresAt: number;
}

export type PlayerKey = "player1" | "player2";

export const activePlayers: Record<PlayerKey, PlayerSession | null> = {
  player1: null,
  player2: null,
};

export function getActivePlayer(player: PlayerKey): PlayerSession | null {
  const session = activePlayers[player];
  if (session == null) return null;
  if (Date.now() > session.expiresAt) {
    activePlayers[player] = null;
    return null;
  }
  return session;
}

export function isValidPlayerKey(value: string): value is PlayerKey {
  return value === "player1" || value === "player2";
}