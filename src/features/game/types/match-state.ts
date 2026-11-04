import type { Innings } from "./game";
import type { GamePhase } from "./game-phase";
import type { InningsState } from "./innings-state";

export type MatchState = {
  phase: GamePhase;
  innings: Innings;
  playerInnings?: InningsState;
  computerInnings?: InningsState;
  target?: number;
  winner?: "player" | "computer" | "tie";
  isComplete: boolean;
};