import type { Delivery } from "../types/delivery";
import type { MatchState } from "../types/match-state";

export function getMatchHeadline(match: MatchState): string {
  if (match.phase === "PLAYER_BATTING") return "Your innings";
  if (match.phase === "COMPUTER_BATTING") return "The chase";
  if (match.winner === "tie") return "It’s a tie!";
  return match.winner === "player" ? "You win!" : "Computer wins";
}

export function getMatchSubheading(match: MatchState): string {
  if (match.phase === "PLAYER_BATTING") {
    return "Build a total before the tenth wicket falls.";
  }
  if (match.phase === "COMPUTER_BATTING") {
    return "The computer is batting. Can it reach your target?";
  }
  return `Final score: You ${match.playerInnings?.runs ?? 0} · Computer ${match.computerInnings?.runs ?? 0}.`;
}

export function formatBowlingRoll(
  roll: NonNullable<Delivery["bowlingRoll"]>,
): string {
  return roll.replaceAll("_", " ");
}

export function getDeliveryResultText(delivery: Delivery): string {
  if (delivery.wicket) return `${delivery.bowlingRoll} — wicket!`;
  if (delivery.battingRoll === "OWZTHAT") {
    return delivery.bowlingRoll === "NO_BALL"
      ? "NO BALL — 1 run, not out"
      : "NOT OUT — batter survives";
  }
  return `${delivery.runsScored} ${delivery.runsScored === 1 ? "run" : "runs"}`;
}