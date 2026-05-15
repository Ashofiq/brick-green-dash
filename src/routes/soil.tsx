import { createFileRoute } from "@tanstack/react-router";
import { Mountain, Plus } from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { DataTable, Badge } from "./production";

export const Route = createFileRoute("/soil")({
  component: SoilPage,
});

function SoilPage() {
  const rows = [
    ["১৫ মে", "জমির মালিক — কাশেম", "১২ ট্রাক", "৳ ২৪,০০০", <Badge key="1" tone="success">পরিশোধিত</Badge>],
    ["১৪ মে", "মাঝিপাড়া খনি", "৮ ট্রাক", "৳ ১৬,০০০", <Badge key="2" tone="warning">বাকি</Badge>],
    ["১৩ মে", "জমির মালিক — হাবিব", "১৫ ট্রাক", "৳ ৩০,০০০", <Badge key="3" tone="success">পরিশোধিত</Badge>],
  ];
  return (
    <AppLayout>
      <PageHeader icon={Mountain} title="মাটি ব্যবস্থাপনা" subtitle="মাটি সংগ্রহ ও মজুদ"
        actions={<button className="h-11 inline-flex items-center gap-2 rounded-xl border-2 border-success bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-success"><Plus className="h-4 w-4" /> মাটি যোগ করুন</button>} />

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "মোট মজুদ", v: "৬৮০ টন" },
          { l: "এই মাসের সংগ্রহ", v: "১,২০০ টন" },
          { l: "ব্যবহার", v: "৫২০ টন" },
          { l: "বাকি পরিশোধ", v: "৳ ৪৫,০০০" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">{s.l}</p>
            <p className="mt-1 text-2xl font-bold">{s.v}</p>
          </div>
        ))}
      </section>

      <DataTable title="মাটি সংগ্রহ" columns={["তারিখ", "উৎস", "পরিমাণ", "মূল্য", "অবস্থা"]} rows={rows} />
    </AppLayout>
  );
}
