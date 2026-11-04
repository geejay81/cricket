import { useGame } from "../hooks/useGame";
import DeliveryHistory from "./DeliveryHistory";
import MatchHeader from "./MatchHeader";
import ScoreCard from "./ScoreCard";
import TargetBanner from "./TargetBanner";
import TurnPanel from "./TurnPanel";
import WelcomeScreen from "./WelcomeScreen";

const GameScreen = () => {
  const { match, startGame, rollPlayerTurn } = useGame();

  if (!match) {
    return <WelcomeScreen onStart={startGame} />;
  }

  const playerInnings = match.playerInnings;
  const computerInnings = match.computerInnings;
  const isPlayerBatting = match.phase === "PLAYER_BATTING";
  const currentInnings = isPlayerBatting ? playerInnings : computerInnings;
  const latestDelivery = currentInnings?.deliveries.at(-1);

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      <MatchHeader match={match} onRestart={startGame} />

      <section aria-label="Match score" className="grid gap-4 sm:grid-cols-2">
        <ScoreCard
          label="You · 1st innings"
          runs={playerInnings?.runs ?? 0}
          wickets={playerInnings?.wickets ?? 0}
          active={isPlayerBatting}
        />
        <ScoreCard
          label="Computer · 2nd innings"
          runs={computerInnings?.runs ?? 0}
          wickets={computerInnings?.wickets ?? 0}
          active={match.phase === "COMPUTER_BATTING"}
        />
      </section>

      <TargetBanner match={match} />

      <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <TurnPanel
          match={match}
          isPlayerBatting={isPlayerBatting}
          latestDelivery={latestDelivery}
          onRoll={rollPlayerTurn}
        />
        <DeliveryHistory match={match} />
      </section>
    </div>
  );
};

export default GameScreen;
