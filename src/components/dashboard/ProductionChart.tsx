const data = [
  { d: "শনি", v: 18 },
  { d: "রবি", v: 22 },
  { d: "সোম", v: 19 },
  { d: "মঙ্গল", v: 26 },
  { d: "বুধ", v: 24 },
  { d: "বৃহঃ", v: 30 },
  { d: "শুক্র", v: 28 },
];

export function ProductionChart() {
  const max = Math.max(...data.map((d) => d.v));
  return (
    <div className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold">সাপ্তাহিক উৎপাদন</h3>
          <p className="text-sm text-muted-foreground">গত ৭ দিনের ইট উৎপাদন (হাজার)</p>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full border-2 border-border-strong bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
            এই সপ্তাহ
          </span>
        </div>
      </div>

      <div className="mt-6 flex h-56 items-end gap-3 md:gap-5">
        {data.map((d) => {
          const h = (d.v / max) * 100;
          return (
            <div key={d.d} className="flex flex-1 flex-col items-center gap-2">
              <div className="relative w-full flex-1 flex items-end">
                <div
                  className="w-full rounded-t-xl border-2 border-b-0 border-border-strong bg-gradient-to-t from-primary to-primary/70 transition-all hover:from-success hover:to-primary"
                  style={{ height: `${h}%` }}
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-foreground">
                    {d.v}
                  </span>
                </div>
              </div>
              <span className="text-xs font-medium text-muted-foreground">{d.d}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
