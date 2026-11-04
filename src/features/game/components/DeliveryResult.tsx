import type { Delivery } from "../types/delivery";
import { formatBowlingRoll, getDeliveryResultText } from "../utils/gamePresentation";
import DieFace from "./DieFace";

type DeliveryResultProps = {
  delivery: Delivery;
};

const DeliveryResult = ({ delivery }: DeliveryResultProps) => (
  <div className="mt-5 rounded-2xl bg-slate-50 p-5" aria-live="polite">
    <div className="flex flex-wrap items-center gap-3">
      <DieFace label="Batting die" value={String(delivery.battingRoll)} />
      {delivery.bowlingRoll && (
        <DieFace label="Bowling die" value={formatBowlingRoll(delivery.bowlingRoll)} />
      )}
    </div>
    <p className={`mt-5 text-2xl font-black ${delivery.wicket ? "text-rose-700" : "text-emerald-800"}`}>
      {getDeliveryResultText(delivery)}
    </p>
  </div>
);

export default DeliveryResult;