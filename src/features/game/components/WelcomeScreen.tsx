import Button from "@/components/ui/atoms/button/Button";

type WelcomeScreenProps = {
  onStart: () => void;
};

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => (
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

function RuleCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-black tracking-[0.2em] text-emerald-700">{number}</p>
      <h3 className="mt-3 font-bold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}

export default WelcomeScreen;