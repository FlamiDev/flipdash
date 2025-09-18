export interface PlayerSession {
  sessionId: string;
  expiresAt: number;
}

export const activePlayers: Record<"player1" | "player2", PlayerSession | null> = {
  player1: null,
  player2: null,
};

export function isValidPlayerKey(value: string): value is "player1" | "player2" {
  const res = value === "player1" || value === "player2";
  return res;
}