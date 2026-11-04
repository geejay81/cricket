import type { MatchState } from "../types/match-state";
import { formatBowlingRoll } from "../utils/gamePresentation";

type DeliveryHistoryProps = {
  match: MatchState;
};

const DeliveryHistory = ({ match }: DeliveryHistoryProps) => {
  const isPlayerBatting = match.phase === "PLAYER_BATTING";
  const deliveries = isPlayerBatting
    ? match.playerInnings?.deliveries ?? []
    : match.computerInnings?.deliveries ?? [];
  const recent = deliveries.slice(-6).reverse();

  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900">{isPlayerBatting ? "Your over" : "Chase"}</h3>
        <span className="text-xs font-medium text-slate-500">
          {deliveries.length} {deliveries.length === 1 ? "delivery" : "deliveries"}
        </span>
      </div>
      {recent.length > 0 ? (
        <ol className="mt-4 divide-y divide-slate-100">
          {recent.map((delivery, index) => (
            <li
              key={`${deliveries.length - index}-${delivery.battingRoll}`}
              className="flex items-center justify-between gap-3 py-3 text-sm"
            >
              <span className="text-slate-500">Ball {deliveries.length - index}</span>
              <span className="font-semibold text-slate-800">
                {delivery.battingRoll === "OWZTHAT"
                  ? `Appeal · ${formatBowlingRoll(delivery.bowlingRoll ?? "NOT_OUT")}`
                  : `${delivery.battingRoll} runs`}
              </span>
              <span className={delivery.wicket ? "font-bold text-rose-700" : "font-bold text-emerald-700"}>
                {delivery.wicket ? "WICKET" : delivery.runsScored > 0 ? `+${delivery.runsScored}` : "·"}
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-4 text-sm leading-6 text-slate-500">
          Your delivery-by-delivery scorecard will appear here.
        </p>
      )}
    </aside>
  );
};

export default DeliveryHistory;