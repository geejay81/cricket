type ScoreCardProps = {
  label: string;
  runs: number;
  wickets: number;
  active: boolean;
};

const ScoreCard = ({ label, runs, wickets, active }: ScoreCardProps) => (
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

export default ScoreCard;