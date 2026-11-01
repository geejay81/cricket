import { useEffect, useState } from "react";
import { createGame } from "../engine/createGame";
import { playTurn } from "../engine/playTurn";
import { rollBattingDie } from "../engine/rollBattingDie";
import { rollBowlingDie } from "../engine/rollBowlingDie";
import type { MatchState } from "../types/match-state";

const COMPUTER_TURN_DELAY_MS = 650;

export function useGame() {
  const [match, setMatch] = useState<MatchState | null>(null);

  useEffect(() => {
    if (match?.phase !== "COMPUTER_BATTING") {
      return;
    }

    const timer = window.setTimeout(() => {
      const battingRoll = rollBattingDie();
      const bowlingRoll = battingRoll === "OWZTHAT" ? rollBowlingDie() : undefined;
      setMatch(playTurn(match, battingRoll, bowlingRoll));
    }, COMPUTER_TURN_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [match]);

  function startGame() {
    setMatch(createGame());
  }

  function rollPlayerTurn() {
    if (match?.phase !== "PLAYER_BATTING") {
      return;
    }

    const battingRoll = rollBattingDie();
    const bowlingRoll = battingRoll === "OWZTHAT" ? rollBowlingDie() : undefined;
    setMatch(playTurn(match, battingRoll, bowlingRoll));
  }

  return { match, startGame, rollPlayerTurn };
}
