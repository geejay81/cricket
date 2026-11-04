type DieFaceProps = {
  label: string;
  value: string;
};

const DieFace = ({ label, value }: DieFaceProps) => (
  <div>
    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
      {label}
    </p>
    <div className={`flex size-20 items-center justify-center rounded-2xl border border-slate-200 bg-white text-center font-black leading-none text-slate-900 shadow-sm ${value.length > 4 ? "whitespace-nowrap text-xs" : "text-xl"}`}>
      {value}
    </div>
  </div>
);

export default DieFace;