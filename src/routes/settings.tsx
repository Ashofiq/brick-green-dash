import { createFileRoute } from "@tanstack/react-router";
import { Settings, User, Building2, Bell, Shield } from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

const inputCls = "h-12 w-full rounded-xl border-2 border-border bg-background px-3 text-sm font-medium focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30";

function SettingsPage() {
  return (
    <AppLayout>
      <PageHeader icon={Settings} title="সেটিংস" subtitle="ভাটার তথ্য, ব্যবহারকারী ও পছন্দ" />

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card icon={Building2} title="ভাটার তথ্য">
          <div className="grid grid-cols-1 gap-3">
            <Input label="ভাটার নাম" defaultValue="রহিম ব্রিকস" />
            <Input label="মালিকের নাম" defaultValue="রহিম মিয়া" />
            <Input label="ঠিকানা" defaultValue="বুড়িগঙ্গা, ঢাকা" />
            <Input label="মোবাইল" defaultValue="০১৭xxxxxxxx" />
          </div>
        </Card>

        <Card icon={User} title="ব্যবহারকারী">
          <ul className="space-y-2">
            {[
              { n: "রহিম মিয়া", r: "মালিক" },
              { n: "জাহিদ", r: "ম্যানেজার" },
              { n: "সুমন", r: "হিসাবরক্ষক" },
            ].map((u) => (
              <li key={u.n} className="flex items-center justify-between rounded-xl border-2 border-border bg-background p-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-border-strong bg-secondary font-bold text-primary">
                    {u.n.slice(0, 1)}
                  </span>
                  <div>
                    <p className="font-semibold">{u.n}</p>
                    <p className="text-xs text-muted-foreground">{u.r}</p>
                  </div>
                </div>
                <button className="h-9 px-3 rounded-lg border-2 border-border-strong bg-card text-xs font-bold">সম্পাদনা</button>
              </li>
            ))}
          </ul>
        </Card>

        <Card icon={Bell} title="বিজ্ঞপ্তি">
          {[
            "নতুন অর্ডার এলে",
            "পেমেন্ট রিমাইন্ডার",
            "স্টক কম হলে সতর্কতা",
            "শ্রমিক হাজিরা সারাংশ",
          ].map((t) => (
            <label key={t} className="flex items-center justify-between rounded-xl border-2 border-border bg-background p-3 cursor-pointer">
              <span className="text-sm font-semibold">{t}</span>
              <input type="checkbox" defaultChecked className="h-5 w-5 accent-primary" />
            </label>
          ))}
        </Card>

        <Card icon={Shield} title="নিরাপত্তা">
          <div className="space-y-3">
            <Input label="বর্তমান পাসওয়ার্ড" type="password" />
            <Input label="নতুন পাসওয়ার্ড" type="password" />
            <button className="h-12 w-full rounded-xl border-2 border-success bg-primary text-primary-foreground font-bold hover:bg-success">
              পাসওয়ার্ড পরিবর্তন
            </button>
          </div>
        </Card>
      </section>
    </AppLayout>
  );
}

function Card({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
      <div className="flex items-center gap-3 border-b-2 border-border-strong pb-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-border-strong bg-secondary text-primary"><Icon className="h-5 w-5" /></span>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <div className="mt-4 space-y-2">{children}</div>
    </div>
  );
}

function Input({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold">{label}</label>
      <input {...rest} className={inputCls} />
    </div>
  );
}
