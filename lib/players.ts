export const activePlayers: Record<"player1" | "player2", string | null> = {
  player1: null,
  player2: null,
};

export function isPlayerKey(value: string): value is "player1" | "player2" {
  return value === "player1" || value === "player2";
}
