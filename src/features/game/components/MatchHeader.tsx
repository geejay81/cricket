import Button from "@/components/ui/atoms/button/Button";
import type { MatchState } from "../types/match-state";
import { getMatchHeadline, getMatchSubheading } from "../utils/gamePresentation";

type MatchHeaderProps = {
  match: MatchState;
  onRestart: () => void;
};

const MatchHeader = ({ match, onRestart }: MatchHeaderProps) => (
  <section className="rounded-3xl bg-emerald-950 px-6 py-8 text-white shadow-xl sm:px-10 sm:py-10">
    <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
      Owzthat · Dice cricket
    </p>
    <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
          {getMatchHeadline(match)}
        </h2>
        <p className="mt-2 max-w-xl text-emerald-100/80">
          {getMatchSubheading(match)}
        </p>
      </div>
      {match.isComplete && (
        <Button
          onClick={onRestart}
          className="shrink-0 rounded-xl bg-amber-400 font-bold text-emerald-950 hover:bg-amber-300"
        >
          Play again
        </Button>
      )}
    </div>
  </section>
);

export default MatchHeader;