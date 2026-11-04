import type { BattingRoll, BowlingRoll } from "./dice";

export type Delivery = {
  battingRoll: BattingRoll;
  bowlingRoll?: BowlingRoll;
  runsScored: number;
  wicket: boolean;
};