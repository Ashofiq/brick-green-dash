import { Bell, Search, ChevronDown, CircleDot, Calendar } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function TopNavbar() {
  const today = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b-2 border-border-strong bg-card px-3 md:px-6 shadow-card">
      <SidebarTrigger className="h-10 w-10 rounded-xl border-2 border-border-strong" />

      <div className="relative hidden flex-1 max-w-md md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="খুঁজুন... (কাস্টমার, অর্ডার, রিপোর্ট)"
          className="h-11 rounded-xl border-2 border-border bg-background pl-10 focus-visible:border-border-strong focus-visible:ring-2 focus-visible:ring-ring/30"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <Badge
          variant="outline"
          className="hidden md:inline-flex h-10 gap-2 rounded-xl border-2 border-border-strong bg-secondary px-3 text-secondary-foreground"
        >
          <CircleDot className="h-3.5 w-3.5 animate-pulse text-primary" />
          ভাটা চালু
        </Badge>

        <div className="hidden lg:flex h-10 items-center gap-2 rounded-xl border-2 border-border bg-card px-3 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {today}
        </div>

        <button className="relative h-10 w-10 rounded-xl border-2 border-border-strong bg-card hover:bg-secondary transition-colors flex items-center justify-center">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-card bg-destructive text-[10px] font-bold text-destructive-foreground">
            ৩
          </span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-10 items-center gap-2 rounded-xl border-2 border-border-strong bg-card pl-1 pr-2 md:pr-3 hover:bg-secondary transition-colors">
            <Avatar className="h-8 w-8 rounded-lg border-2 border-border">
              <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xs font-bold">
                রহ
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col items-start leading-tight">
              <span className="text-sm font-semibold">রহিম মিয়া</span>
              <span className="text-[11px] text-muted-foreground">ম্যানেজার</span>
            </div>
            <ChevronDown className="hidden md:block h-4 w-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl border-2 border-border-strong">
            <DropdownMenuLabel>আমার অ্যাকাউন্ট</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>প্রোফাইল</DropdownMenuItem>
            <DropdownMenuItem>সেটিংস</DropdownMenuItem>
            <DropdownMenuItem>সাহায্য</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">লগ আউট</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
