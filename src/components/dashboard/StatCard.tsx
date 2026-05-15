import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  value: string;
  unit?: string;
  change: number;
  spark: number[];
  tone?: "primary" | "warning" | "danger" | "success";
};

const toneMap = {
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-destructive",
};

export function StatCard({ icon: Icon, title, value, unit, change, spark, tone = "primary" }: Props) {
  const positive = change >= 0;
  const max = Math.max(...spark);
  const min = Math.min(...spark);
  const w = 100;
  const h = 36;
  const points = spark
    .map((v, i) => {
      const x = (i / (spark.length - 1)) * w;
      const y = h - ((v - min) / Math.max(1, max - min)) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="rounded-2xl border-2 border-border-strong bg-card p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl border-2 border-border-strong bg-secondary ${toneMap[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div
          className={`flex items-center gap-1 rounded-full border-2 px-2 py-0.5 text-xs font-bold ${
            positive
              ? "border-border-strong bg-secondary text-success"
              : "border-destructive/40 bg-destructive/10 text-destructive"
          }`}
        >
          {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {Math.abs(change)}%
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
          {value}
          {unit && <span className="ml-1 text-sm font-medium text-muted-foreground">{unit}</span>}
        </p>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 h-9 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`g-${title}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          className={toneMap[tone]}
          fill={`url(#g-${title})`}
          points={`0,${h} ${points} ${w},${h}`}
        />
        <polyline
          className={toneMap[tone]}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    </div>
  );
}
