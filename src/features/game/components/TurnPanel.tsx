import Button from "@/components/ui/atoms/button/Button";
import type { Delivery } from "../types/delivery";
import type { MatchState } from "../types/match-state";
import DeliveryResult from "./DeliveryResult";

type TurnPanelProps = {
  match: MatchState;
  isPlayerBatting: boolean;
  latestDelivery?: Delivery;
  onRoll: () => void;
};

const TurnPanel = ({ match, isPlayerBatting, latestDelivery, onRoll }: TurnPanelProps) => (
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
          onClick={onRoll}
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
);

export default TurnPanel;