import type { BowlingRoll } from "../types/dice";

const BOWLING_OUTCOMES: readonly BowlingRoll[] = [
  "BOWLED",
  "CAUGHT",
  "LBW",
  "STUMPED",
  "NOT_OUT",
  "NO_BALL",
];

export function rollBowlingDie(random: () => number = Math.random): BowlingRoll {
  const value = random();
  if (value < 0 || value >= 1) {
    throw new RangeError("The random source must return a value in [0, 1).");
  }

  return BOWLING_OUTCOMES[Math.floor(value * BOWLING_OUTCOMES.length)];
}
