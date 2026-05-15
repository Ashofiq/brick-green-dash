import { Users } from "lucide-react";

const workers = [
  { name: "মোঃ জাহাঙ্গীর", role: "পাথর ভাঙা", initials: "জা", wage: "৭৫০", present: true },
  { name: "আব্দুল করিম", role: "ইট সাজানো", initials: "ক", wage: "৮০০", present: true },
  { name: "নুরুল হক", role: "মাটি কাটা", initials: "নু", wage: "৭০০", present: true },
  { name: "সালাম মিয়া", role: "চুল্লি", initials: "স", wage: "৯০০", present: false },
  { name: "ইব্রাহিম", role: "লোডার", initials: "ই", wage: "৭৫০", present: true },
];

export function WorkerList() {
  return (
    <div className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
      <div className="flex items-center justify-between border-b-2 border-border-strong pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-border-strong bg-secondary text-primary">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold">আজকের শ্রমিক</h3>
            <p className="text-sm text-muted-foreground">উপস্থিতি ও দৈনিক মজুরি</p>
          </div>
        </div>
        <span className="rounded-full border-2 border-border-strong bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
          ৪২ / ৪৮
        </span>
      </div>

      <ul className="mt-3 divide-y divide-border/60">
        {workers.map((w) => (
          <li key={w.name} className="flex items-center gap-3 py-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-border-strong bg-secondary text-sm font-bold text-primary">
              {w.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{w.name}</p>
              <p className="text-xs text-muted-foreground">{w.role}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">৳ {w.wage}</p>
              <span
                className={`mt-0.5 inline-flex items-center rounded-full border-2 px-2 py-0.5 text-[10px] font-bold ${
                  w.present
                    ? "border-border-strong bg-secondary text-success"
                    : "border-destructive/40 bg-destructive/10 text-destructive"
                }`}
              >
                {w.present ? "উপস্থিত" : "অনুপস্থিত"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
