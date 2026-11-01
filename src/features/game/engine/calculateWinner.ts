import type { MatchResult } from "../types/game";

export function calculateWinner(
  playerRuns: number,
  computerRuns: number,
): MatchResult {
  if (playerRuns === computerRuns) {
    return "tie";
  }

  return playerRuns > computerRuns ? "player" : "computer";
}
