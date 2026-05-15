import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Factory, Eye, EyeOff, Phone, Lock, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left brand panel */}
      <aside className="relative hidden lg:flex flex-col justify-between border-r-2 border-border-strong bg-primary text-primary-foreground p-10 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-foreground/10 blur-2xl" />
        <div className="absolute -left-16 bottom-10 h-60 w-60 rounded-full bg-success/30 blur-2xl" />

        <div className="relative flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-primary-foreground/30 bg-primary-foreground/15">
            <Factory className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-bold leading-tight">ইট ভাটা</p>
            <p className="text-xs opacity-90">ম্যানেজমেন্ট সফটওয়্যার</p>
          </div>
        </div>

        <div className="relative space-y-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-primary-foreground/30 bg-primary-foreground/10 px-3 py-1 text-xs font-bold">
              <Sparkles className="h-3.5 w-3.5" /> সহজ · দ্রুত · নির্ভরযোগ্য
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight">
              আপনার ইট ভাটার <br /> পুরো হিসাব এক জায়গায়
            </h1>
            <p className="mt-3 text-base opacity-90 max-w-md">
              উৎপাদন, শ্রমিক, খরচ, ডেলিভারি ও অর্ডার — গ্রামের মালিকদের জন্য
              সহজ বাংলা ড্যাশবোর্ড।
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-3 max-w-md">
            {[
              "দৈনিক আয় / খরচ",
              "কাস্টমার বাকি",
              "ট্রাক ডেলিভারি",
              "প্রিন্ট ইনভয়েস",
            ].map((f) => (
              <li
                key={f}
                className="rounded-xl border-2 border-primary-foreground/30 bg-primary-foreground/10 px-3 py-2 text-sm font-semibold"
              >
                ✓ {f}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs opacity-80">
          © {new Date().getFullYear()} ইট ভাটা ম্যানেজমেন্ট
        </p>
      </aside>

      {/* Right form */}
      <main className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          {/* Mobile brand */}
          <div className="mb-6 flex items-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-border-strong bg-primary text-primary-foreground shadow-card">
              <Factory className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-bold">ইট ভাটা</p>
              <p className="text-xs text-muted-foreground">ম্যানেজমেন্ট</p>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-border-strong bg-card p-6 sm:p-8 shadow-card">
            <div className="flex items-center gap-2 text-sm font-bold text-primary">
              <ShieldCheck className="h-4 w-4" /> নিরাপদ লগইন
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold">স্বাগতম 👋</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              আপনার অ্যাকাউন্টে লগইন করুন এবং ভাটা পরিচালনা শুরু করুন।
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold">
                  <Phone className="h-4 w-4" /> মোবাইল নম্বর
                </label>
                <input
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="০১৭xxxxxxxx"
                  className="h-12 w-full rounded-xl border-2 border-border bg-background px-3 text-base font-medium focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="flex items-center gap-1.5 text-sm font-semibold">
                    <Lock className="h-4 w-4" /> পাসওয়ার্ড
                  </label>
                  <Link to="/login" className="text-xs font-semibold text-primary hover:underline">
                    ভুলে গেছেন?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-12 w-full rounded-xl border-2 border-border bg-background px-3 pr-12 text-base font-medium focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-lg border-2 border-border bg-background text-muted-foreground hover:bg-secondary"
                  >
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm font-medium">
                <input type="checkbox" className="h-4 w-4 rounded border-2 border-border accent-primary" defaultChecked />
                আমাকে মনে রাখুন
              </label>

              <button
                type="submit"
                className="h-12 w-full rounded-xl border-2 border-success bg-primary text-base font-bold text-primary-foreground shadow-card transition-all hover:opacity-95 active:translate-y-0.5 inline-flex items-center justify-center gap-2"
              >
                লগইন করুন <ArrowRight className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-border" />
                <span className="text-xs font-semibold text-muted-foreground">অথবা</span>
                <span className="h-px flex-1 bg-border" />
              </div>

              <button
                type="button"
                className="h-12 w-full rounded-xl border-2 border-border bg-background text-sm font-bold hover:bg-secondary"
              >
                OTP দিয়ে লগইন
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              নতুন ব্যবহারকারী?{" "}
              <Link to="/login" className="font-bold text-primary hover:underline">
                একাউন্ট তৈরি করুন
              </Link>
            </p>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            লগইন করে আপনি আমাদের শর্তাবলী মেনে নিচ্ছেন
          </p>
        </div>
      </main>
    </div>
  );
}
