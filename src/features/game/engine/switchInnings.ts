import type { MatchState } from "../types/match-state";

export function switchInnings(match: MatchState): MatchState {
  if (match.phase !== "PLAYER_BATTING" || !match.playerInnings) {
    throw new Error("The match is not ready to switch innings.");
  }

  return {
    ...match,
    phase: "COMPUTER_BATTING",
    innings: 2,
    computerInnings: {
      runs: 0,
      wickets: 0,
      deliveries: [],
    },
    target: match.playerInnings.runs + 1,
  };
}
