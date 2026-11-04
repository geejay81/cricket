import type { Delivery } from "../types/delivery";
import type { BattingRoll, BowlingRoll } from "../types/dice";
import type { InningsState } from "../types/innings-state";
import type { MatchState } from "../types/match-state";
import { calculateWinner } from "./calculateWinner";
import { MAX_WICKETS } from "./constants";
import { switchInnings } from "./switchInnings";

const WICKET_OUTCOMES: readonly BowlingRoll[] = [
  "BOWLED",
  "CAUGHT",
  "LBW",
  "STUMPED",
];

export function playTurn(
  match: MatchState,
  battingRoll: BattingRoll,
  bowlingRoll?: BowlingRoll,
): MatchState {
  if (match.isComplete) {
    throw new Error("The match is already complete.");
  }

  if (match.phase === "PLAYER_BATTING") {
    if (!match.playerInnings) {
      throw new Error("Player innings are missing from the match state.");
    }

    const playerInnings = applyDelivery(
      match.playerInnings,
      battingRoll,
      bowlingRoll,
    );
    const updatedMatch = { ...match, playerInnings };

    return playerInnings.wickets >= MAX_WICKETS
      ? switchInnings(updatedMatch)
      : updatedMatch;
  }

  if (match.phase === "COMPUTER_BATTING") {
    if (!match.computerInnings || match.target === undefined) {
      throw new Error("Computer innings or the chase target is missing.");
    }

    const computerInnings = applyDelivery(
      match.computerInnings,
      battingRoll,
      bowlingRoll,
    );
    const matchComplete =
      computerInnings.wickets >= MAX_WICKETS ||
      computerInnings.runs >= match.target;

    if (!matchComplete) {
      return { ...match, computerInnings };
    }

    return {
      ...match,
      computerInnings,
      phase: "MATCH_COMPLETE",
      winner: calculateWinner(match.playerInnings?.runs ?? 0, computerInnings.runs),
      isComplete: true,
    };
  }

  throw new Error("The match is not in an active innings.");
}

function applyDelivery(
  innings: InningsState,
  battingRoll: BattingRoll,
  bowlingRoll?: BowlingRoll,
): InningsState {
  if (battingRoll === "OWZTHAT" && bowlingRoll === undefined) {
    throw new Error("A bowling roll is required to resolve an appeal.");
  }

  const wicket =
    battingRoll === "OWZTHAT" &&
    bowlingRoll !== undefined &&
    WICKET_OUTCOMES.includes(bowlingRoll);
  const runsScored =
    typeof battingRoll === "number"
      ? battingRoll
      : bowlingRoll === "NO_BALL"
        ? 1
        : 0;
  const delivery: Delivery = {
    battingRoll,
    ...(battingRoll === "OWZTHAT" ? { bowlingRoll } : {}),
    runsScored,
    wicket,
  };

  return {
    runs: innings.runs + runsScored,
    wickets: innings.wickets + Number(wicket),
    deliveries: [...innings.deliveries, delivery],
  };
}
