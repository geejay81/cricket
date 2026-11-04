import type { BattingRoll } from "../types/dice";

const BATTING_OUTCOMES: readonly BattingRoll[] = [1, 2, 3, 4, 6, "OWZTHAT"];

export function rollBattingDie(random: () => number = Math.random): BattingRoll {
  const value = random();
  if (value < 0 || value >= 1) {
    throw new RangeError("The random source must return a value in [0, 1).");
  }

  return BATTING_OUTCOMES[Math.floor(value * BATTING_OUTCOMES.length)];
}
