"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  LayoutDashboard,
  DollarSign,
  ClipboardList,
  Receipt,
  FileText,
  CheckSquare,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/cost-analysis", label: "Cost Analysis", icon: DollarSign },
  { href: "/job-cost", label: "Job Cost", icon: ClipboardList },
  { href: "/pay-applications", label: "Pay Applications", icon: Receipt },
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/checklists", label: "Checklists", icon: CheckSquare },
];

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/cost-analysis": "Cost Analysis",
  "/job-cost": "Job Cost",
  "/pay-applications": "Pay Applications",
  "/invoices": "Invoices",
  "/checklists": "Checklists",
};

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  // Check for partial matches (sub-routes)
  for (const [path, title] of Object.entries(pageTitles)) {
    if (path !== "/" && pathname.startsWith(path)) return title;
  }
  return "Dashboard";
}

export function AppHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <header className="h-14 border-b border-border bg-background flex items-center px-6">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="md:hidden p-2 -ml-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              {/* Logo */}
              <div className="p-4 border-b border-border flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                  <span className="text-primary-foreground font-bold text-sm">U</span>
                </div>
                <div className="overflow-hidden">
                  <h1 className="font-semibold text-sm leading-tight">UrbanBuild PM</h1>
                  <p className="text-[10px] text-muted-foreground">Construction Management</p>
                </div>
              </div>

              {/* Nav */}
              <nav className="flex-1 p-2 space-y-1">
                {navItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary border-l-2 border-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>

          <h2 className="text-sm font-medium">{pageTitle}</h2>
        </div>
      </div>
    </header>
  );
}
