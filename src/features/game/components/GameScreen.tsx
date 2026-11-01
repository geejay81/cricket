import Button from "@/components/ui/atoms/button/Button";
import { useGame } from "../hooks/useGame";
import type { Delivery } from "../types/delivery";
import type { MatchState } from "../types/match-state";

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
      <section className="rounded-3xl bg-emerald-950 px-6 py-8 text-white shadow-xl sm:px-10 sm:py-10">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
          Owzthat · Dice cricket
        </p>
        <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              {getHeadline(match)}
            </h2>
            <p className="mt-2 max-w-xl text-emerald-100/80">
              {getSubheading(match)}
            </p>
          </div>
          {match.isComplete && (
            <Button
              onClick={startGame}
              className="shrink-0 rounded-xl bg-amber-400 font-bold text-emerald-950 hover:bg-amber-300"
            >
              Play again
            </Button>
          )}
        </div>
      </section>

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

      {match.target !== undefined && (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-center text-sm font-semibold text-amber-950">
          Target: {match.target} runs
          {computerInnings && !match.isComplete && (
            <span className="ml-2 font-normal text-amber-800">
              · {Math.max(match.target - computerInnings.runs, 0)} to win
            </span>
          )}
        </p>
      )}

      <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            {isPlayerBatting ? "Your delivery" : "Last delivery"}
          </p>
          {latestDelivery ? (
            <DeliveryResult delivery={latestDelivery} />
          ) : (
            <div className="mt-5 rounded-2xl bg-slate-50 p-6 text-slate-600">
              {match.phase === "COMPUTER_BATTING"
                ? "The computer is setting up its chase…"
                : "Ready when you are. Roll the batting die to start your innings."}
            </div>
          )}
          <div className="mt-6">
            {isPlayerBatting ? (
              <Button
                onClick={rollPlayerTurn}
                className="w-full rounded-xl bg-emerald-700 py-3 font-bold shadow-sm transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                Roll the dice
              </Button>
            ) : match.phase === "COMPUTER_BATTING" ? (
              <div
                role="status"
                className="flex items-center justify-center gap-3 rounded-xl bg-slate-100 px-4 py-3 font-semibold text-slate-600"
              >
                <span className="size-2 animate-pulse rounded-full bg-amber-500" />
                Computer batting…
              </div>
            ) : (
              <p className="rounded-xl bg-emerald-50 px-4 py-3 text-center font-semibold text-emerald-900">
                Match complete
              </p>
            )}
          </div>
          <p className="mt-3 text-center text-xs text-slate-500">
            OWZTHAT appeals are resolved automatically with the bowling die.
          </p>
        </div>

        <DeliveryHistory match={match} />
      </section>
    </div>
  );
};

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      <section className="overflow-hidden rounded-3xl bg-emerald-950 px-6 py-10 text-white shadow-xl sm:px-10 sm:py-14">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
          A classic cricket game, reimagined
        </p>
        <div className="mt-6 grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="max-w-2xl text-4xl font-black tracking-tight sm:text-6xl">
              Roll the dice.
              <br />
              <span className="text-amber-300">Own the innings.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-emerald-100/80">
              Bat your way to a big score, survive the appeals, then watch the
              computer chase your target. No account needed.
            </p>
            <Button
              onClick={onStart}
              className="mt-8 rounded-xl bg-amber-400 px-6 py-3 font-bold text-emerald-950 shadow-lg transition hover:bg-amber-300"
            >
              Start a match <span aria-hidden="true">→</span>
            </Button>
          </div>
          <div
            aria-hidden="true"
            className="hidden size-44 rotate-6 items-center justify-center rounded-4xl border border-white/15 bg-white/10 text-7xl shadow-2xl md:flex"
          >
            🎲
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <RuleCard number="01" title="You bat first" description="Roll for runs or risk an OWZTHAT appeal." />
        <RuleCard number="02" title="Ten wickets" description="Your innings ends when all ten wickets fall." />
        <RuleCard number="03" title="Chase is on" description="The computer bats second. Highest score wins." />
      </section>
    </div>
  );
}

function RuleCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-black tracking-[0.2em] text-emerald-700">{number}</p>
      <h3 className="mt-3 font-bold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}

function ScoreCard({ label, runs, wickets, active }: { label: string; runs: number; wickets: number; active: boolean }) {
  return (
    <article className={`rounded-2xl border p-5 shadow-sm ${active ? "border-emerald-700 bg-emerald-50 ring-2 ring-emerald-700/10" : "border-slate-200 bg-white"}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-600">{label}</p>
        {active && <span className="rounded-full bg-emerald-700 px-2.5 py-1 text-xs font-bold text-white">Batting</span>}
      </div>
      <p className="mt-3 text-4xl font-black tracking-tight text-slate-950">
        {runs}<span className="ml-2 text-2xl font-semibold text-slate-400">/ {wickets}</span>
      </p>
      <p className="mt-1 text-xs text-slate-500">runs / wickets</p>
    </article>
  );
}

function DeliveryResult({ delivery }: { delivery: Delivery }) {
  const result = delivery.wicket
    ? `${delivery.bowlingRoll} — wicket!`
    : delivery.battingRoll === "OWZTHAT"
      ? delivery.bowlingRoll === "NO_BALL"
        ? "NO BALL — 1 run, not out"
        : "NOT OUT — batter survives"
      : `${delivery.runsScored} ${delivery.runsScored === 1 ? "run" : "runs"}`;

  return (
    <div className="mt-5 rounded-2xl bg-slate-50 p-5" aria-live="polite">
      <div className="flex flex-wrap items-center gap-3">
        <DieFace label="Batting die" value={String(delivery.battingRoll)} />
        {delivery.bowlingRoll && <DieFace label="Bowling die" value={formatBowlingRoll(delivery.bowlingRoll)} />}
      </div>
      <p className={`mt-5 text-2xl font-black ${delivery.wicket ? "text-rose-700" : "text-emerald-800"}`}>
        {result}
      </p>
    </div>
  );
}

function DieFace({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">{label}</p>
      <div className="flex size-20 items-center justify-center rounded-2xl border border-slate-200 bg-white text-center text-xl font-black text-slate-900 shadow-sm">
        {value}
      </div>
    </div>
  );
}

function DeliveryHistory({ match }: { match: MatchState }) {
  const isPlayerBatting = match.phase === "PLAYER_BATTING";
  const deliveries = isPlayerBatting
    ? match.playerInnings?.deliveries ?? []
    : match.computerInnings?.deliveries ?? [];
  const recent = deliveries.slice(-6).reverse();

  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900">{isPlayerBatting ? "Your over" : "Chase"}</h3>
        <span className="text-xs font-medium text-slate-500">{deliveries.length} {deliveries.length === 1 ? "delivery" : "deliveries"}</span>
      </div>
      {recent.length > 0 ? (
        <ol className="mt-4 divide-y divide-slate-100">
          {recent.map((delivery, index) => (
            <li key={`${deliveries.length - index}-${delivery.battingRoll}`} className="flex items-center justify-between gap-3 py-3 text-sm">
              <span className="text-slate-500">Ball {deliveries.length - index}</span>
              <span className="font-semibold text-slate-800">
                {delivery.battingRoll === "OWZTHAT" ? `Appeal · ${formatBowlingRoll(delivery.bowlingRoll ?? "NOT_OUT")}` : `${delivery.battingRoll} runs`}
              </span>
              <span className={delivery.wicket ? "font-bold text-rose-700" : "font-bold text-emerald-700"}>
                {delivery.wicket ? "WICKET" : delivery.runsScored > 0 ? `+${delivery.runsScored}` : "·"}
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-4 text-sm leading-6 text-slate-500">Your delivery-by-delivery scorecard will appear here.</p>
      )}
    </aside>
  );
}

function getHeadline(match: MatchState): string {
  if (match.phase === "PLAYER_BATTING") return "Your innings";
  if (match.phase === "COMPUTER_BATTING") return "The chase";
  if (match.winner === "tie") return "It’s a tie!";
  return match.winner === "player" ? "You win!" : "Computer wins";
}

function getSubheading(match: MatchState): string {
  if (match.phase === "PLAYER_BATTING") return "Build a total before the tenth wicket falls.";
  if (match.phase === "COMPUTER_BATTING") return "The computer is batting. Can it reach your target?";
  return `Final score: You ${match.playerInnings?.runs ?? 0} · Computer ${match.computerInnings?.runs ?? 0}.`;
}

function formatBowlingRoll(roll: NonNullable<Delivery["bowlingRoll"]>): string {
  return roll.replaceAll("_", " ");
}

export default GameScreen;
