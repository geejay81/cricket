import type { MatchState } from "../types/match-state";

export function createGame(): MatchState {
  return {
    phase: "PLAYER_BATTING",
    innings: 1,
    playerInnings: {
      runs: 0,
      wickets: 0,
      deliveries: [],
    },
    isComplete: false,
  };
}
