export interface PlayerSession {
  sessionId: string;
  expiresAt: number;
}

export const activePlayers: Record<"player1" | "player2", PlayerSession | null> = {
  player1: null,
  player2: null,
};

export function isPlayerKey(value: string): value is "player1" | "player2" {
  return value === "player1" || value === "player2";
}