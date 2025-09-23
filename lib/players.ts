export interface PlayerSession {
  sessionId: string;
  expiresAt: number;
}

export type PlayerKey = "player1" | "player2";

export const activePlayers: Record<PlayerKey, PlayerSession | null> = {
  player1: null,
  player2: null,
};

export function isValidPlayerKey(value: string): value is PlayerKey {
  return value === "player1" || value === "player2";
}