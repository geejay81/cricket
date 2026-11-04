import type { MatchState } from "../types/match-state";

type TargetBannerProps = {
  match: MatchState;
};

const TargetBanner = ({ match }: TargetBannerProps) => {
  if (match.target === undefined) return null;

  return (
    <p className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-center text-sm font-semibold text-amber-950">
      Target: {match.target} runs
      {match.computerInnings && !match.isComplete && (
        <span className="ml-2 font-normal text-amber-800">
          · {Math.max(match.target - match.computerInnings.runs, 0)} to win
        </span>
      )}
    </p>
  );
};

export default TargetBanner;