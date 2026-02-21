"use client";

import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Building2,
  Wallet,
  Smartphone,
  Tablet,
  Monitor,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { projectSummary, profitReports, costAnalysis } from "@/data/mock-data";
import { formatCurrency, formatPercent } from "@/lib/formatters";

// ── KPI Stats ──
const stats = [
  {
    label: "Contract Amount",
    value: formatCurrency(projectSummary.contractAmount),
    icon: DollarSign,
    sub: `${formatCurrency(projectSummary.costPerSqFt)}/sq ft`,
  },
  {
    label: "Profit Margin",
    value: formatPercent(projectSummary.profitMargin),
    icon: TrendingUp,
    sub: `Fixed fee ${formatCurrency(projectSummary.fixedFee)}`,
  },
  {
    label: "Completion",
    value: "66.3%",
    icon: Building2,
    sub: `${projectSummary.contractDays} contract days`,
  },
  {
    label: "Cash Flow",
    value: formatCurrency(projectSummary.cashFlow),
    icon: Wallet,
    sub: `Receivables ${formatCurrency(projectSummary.receivables)}`,
  },
];

// ── Schedule milestones for interactive tab ──
const milestones = [
  { name: "Preconstruction", percent: 100 },
  { name: "Sitework & Utilities", percent: 78 },
  { name: "Concrete & Tilt Wall", percent: 72 },
  { name: "Structural Steel", percent: 80 },
  { name: "Roofing", percent: 60 },
  { name: "MEP Rough-In", percent: 45 },
  { name: "Glass & Glazing", percent: 30 },
  { name: "Finishes & Close Out", percent: 0 },
];

// ── Device Mockup Components ──

function PhoneMockupContent() {
  return (
    <div className="flex flex-col gap-1.5 text-[6px]">
      {/* Status bar */}
      <div className="flex justify-between items-center px-1 text-[5px] text-muted-foreground">
        <span>9:41</span>
        <div className="flex gap-0.5">
          <div className="w-2.5 h-1 bg-foreground/30 rounded-sm" />
          <div className="w-1.5 h-1 bg-foreground/30 rounded-sm" />
        </div>
      </div>
      {/* Header */}
      <div className="bg-primary/10 rounded px-1.5 py-1">
        <div className="font-semibold text-[6px] text-foreground/80">
          Riverside CC
        </div>
        <div className="text-[5px] text-muted-foreground">RCC-2026-0147</div>
      </div>
      {/* Mini stat cards stacked */}
      <div className="flex flex-col gap-1">
        {[
          { label: "Contract", val: "$4.85M", color: "bg-primary/20" },
          { label: "Profit", val: "12.4%", color: "bg-[color:var(--success)]/20" },
          { label: "Complete", val: "66.3%", color: "bg-primary/15" },
          { label: "Cash Flow", val: "$162K", color: "bg-[color:var(--warning)]/20" },
        ].map((s) => (
          <div
            key={s.label}
            className={`${s.color} rounded px-1.5 py-1 flex justify-between items-center`}
          >
            <span className="text-muted-foreground">{s.label}</span>
            <span className="font-bold text-foreground/80">{s.val}</span>
          </div>
        ))}
      </div>
      {/* Mini chart area */}
      <div className="bg-primary/5 rounded p-1 mt-0.5">
        <div className="text-[5px] text-muted-foreground mb-0.5">
          Monthly Profit
        </div>
        <div className="flex items-end gap-[2px] h-5">
          {[28, 64, 52, 72, 59, 84].map((v, i) => (
            <div
              key={i}
              className="bg-primary/60 rounded-t-sm flex-1"
              style={{ height: `${(v / 84) * 100}%` }}
            />
          ))}
        </div>
      </div>
      {/* Mini list items */}
      <div className="flex flex-col gap-0.5">
        {["Sitework", "Concrete", "Steel"].map((item) => (
          <div
            key={item}
            className="flex justify-between items-center bg-muted/50 rounded px-1 py-0.5"
          >
            <span className="text-muted-foreground">{item}</span>
            <div className="w-6 h-1 bg-primary/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${60 + Math.random() * 30}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabletMockupContent() {
  return (
    <div className="flex h-full gap-1 text-[5px]">
      {/* Collapsed sidebar */}
      <div className="w-5 bg-muted/60 rounded-sm flex flex-col items-center gap-1.5 py-2 shrink-0">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-sm ${i === 1 ? "bg-primary/60" : "bg-foreground/10"}`}
          />
        ))}
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col gap-1 overflow-hidden">
        {/* Header bar */}
        <div className="bg-primary/10 rounded px-1 py-0.5 flex items-center justify-between">
          <span className="font-semibold text-foreground/80">Dashboard</span>
          <div className="w-3 h-3 bg-primary/20 rounded-full" />
        </div>
        {/* 2-col stat grid */}
        <div className="grid grid-cols-2 gap-1">
          {[
            { label: "Contract", val: "$4.85M" },
            { label: "Profit", val: "12.4%" },
            { label: "Complete", val: "66.3%" },
            { label: "Cash Flow", val: "$162K" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-primary/8 border border-primary/15 rounded px-1 py-0.5"
            >
              <div className="text-[4px] text-muted-foreground">{s.label}</div>
              <div className="font-bold text-foreground/80 text-[6px]">
                {s.val}
              </div>
            </div>
          ))}
        </div>
        {/* Chart area */}
        <div className="bg-primary/5 border border-primary/10 rounded p-1 flex-1">
          <div className="text-[4px] text-muted-foreground mb-0.5">
            Profit Trend
          </div>
          <svg
            viewBox="0 0 100 30"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="tabFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="oklch(0.52 0.16 240)"
                  stopOpacity="0.3"
                />
                <stop
                  offset="100%"
                  stopColor="oklch(0.52 0.16 240)"
                  stopOpacity="0.05"
                />
              </linearGradient>
            </defs>
            <path
              d="M0,25 L17,20 L33,22 L50,15 L67,18 L83,8 L100,10 L100,30 L0,30 Z"
              fill="url(#tabFill)"
            />
            <path
              d="M0,25 L17,20 L33,22 L50,15 L67,18 L83,8 L100,10"
              fill="none"
              stroke="oklch(0.52 0.16 240)"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        {/* Mini table rows */}
        <div className="flex flex-col gap-0.5">
          {["Gen. Conditions", "Sitework", "Concrete"].map((item) => (
            <div
              key={item}
              className="flex justify-between items-center bg-muted/40 rounded px-1 py-0.5"
            >
              <span className="text-muted-foreground">{item}</span>
              <span className="font-medium text-foreground/70">$385K</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DesktopMockupContent() {
  return (
    <div className="flex h-full gap-0.5 text-[4px]">
      {/* Expanded sidebar */}
      <div className="w-12 bg-muted/50 rounded-sm flex flex-col gap-1 py-1.5 px-1 shrink-0">
        <div className="font-bold text-[5px] text-foreground/80 px-0.5 mb-0.5">
          BuildApp
        </div>
        {[
          { label: "Dashboard", active: true },
          { label: "Cost Analysis", active: false },
          { label: "Job Cost", active: false },
          { label: "Pay App", active: false },
          { label: "Invoices", active: false },
          { label: "Checklists", active: false },
        ].map((n) => (
          <div
            key={n.label}
            className={`rounded px-1 py-0.5 ${n.active ? "bg-primary/15 text-primary border-l border-primary" : "text-muted-foreground"}`}
          >
            {n.label}
          </div>
        ))}
      </div>
      {/* Main area */}
      <div className="flex-1 flex flex-col gap-0.5 overflow-hidden">
        {/* Top bar */}
        <div className="bg-primary/8 rounded px-1 py-0.5 flex items-center justify-between">
          <span className="font-semibold text-[5px] text-foreground/80">
            Project Dashboard
          </span>
          <div className="flex gap-0.5">
            <div className="w-2 h-2 bg-primary/20 rounded-full" />
            <div className="w-2 h-2 bg-muted rounded-full" />
          </div>
        </div>
        {/* 4-col stats */}
        <div className="grid grid-cols-4 gap-0.5">
          {[
            { label: "Contract", val: "$4.85M" },
            { label: "Margin", val: "12.4%" },
            { label: "Complete", val: "66.3%" },
            { label: "Cash Flow", val: "$162K" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/15 rounded px-0.5 py-0.5"
            >
              <div className="text-[3px] text-muted-foreground">{s.label}</div>
              <div className="font-bold text-[5px] text-foreground/80">
                {s.val}
              </div>
            </div>
          ))}
        </div>
        {/* Chart + table side by side */}
        <div className="flex gap-0.5 flex-1 min-h-0">
          {/* Chart */}
          <div className="flex-1 bg-primary/5 border border-primary/10 rounded p-0.5">
            <div className="text-[3px] text-muted-foreground mb-0.5">
              Profit Trend
            </div>
            <svg
              viewBox="0 0 100 25"
              className="w-full h-auto"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="deskFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="oklch(0.52 0.16 240)"
                    stopOpacity="0.3"
                  />
                  <stop
                    offset="100%"
                    stopColor="oklch(0.52 0.16 240)"
                    stopOpacity="0.05"
                  />
                </linearGradient>
              </defs>
              <path
                d="M0,22 L20,18 L40,20 L60,12 L80,15 L100,6 L100,25 L0,25 Z"
                fill="url(#deskFill)"
              />
              <path
                d="M0,22 L20,18 L40,20 L60,12 L80,15 L100,6"
                fill="none"
                stroke="oklch(0.52 0.16 240)"
                strokeWidth="1.2"
              />
            </svg>
          </div>
          {/* Table */}
          <div className="flex-1 flex flex-col gap-[1px]">
            <div className="flex gap-0.5 text-[3px] text-muted-foreground font-medium px-0.5">
              <span className="flex-1">Category</span>
              <span className="w-6 text-right">Budget</span>
              <span className="w-6 text-right">Var</span>
            </div>
            {["Gen Cond", "Sitework", "Concrete", "Steel", "Roofing"].map(
              (c) => (
                <div
                  key={c}
                  className="flex gap-0.5 items-center bg-muted/30 rounded px-0.5 py-[1px]"
                >
                  <span className="flex-1 text-foreground/70">{c}</span>
                  <span className="w-6 text-right text-foreground/60">
                    $385K
                  </span>
                  <span className="w-6 text-right text-[color:var(--success)]">
                    +$23K
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Custom Tooltip ──
function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-md text-sm">
      <p className="font-medium text-foreground mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-muted-foreground">
          {entry.dataKey === "profit" ? "Monthly" : "Cumulative"}:{" "}
          <span className="font-medium text-foreground">
            {formatCurrency(entry.value)}
          </span>
        </p>
      ))}
    </div>
  );
}

// ── Budget bar helper ──
function BudgetBar({
  category,
  budget,
  buyout,
  variance,
  index,
}: {
  category: string;
  budget: number;
  buyout: number;
  variance: number;
  index: number;
}) {
  const maxBudget = Math.max(...costAnalysis.slice(0, 6).map((c) => c.budgetAmount));
  const budgetWidth = (budget / maxBudget) * 100;
  const buyoutWidth = (buyout / maxBudget) * 100;

  return (
    <div
      className="animate-in fade-in slide-in-from-left-2 fill-mode-both"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium">{category}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {formatCurrency(budget)}
          </span>
          <Badge
            variant={variance >= 0 ? "secondary" : "destructive"}
            className={
              variance >= 0
                ? "bg-[color:var(--success)]/10 text-[color:var(--success)] border-[color:var(--success)]/20 hover:bg-[color:var(--success)]/10"
                : ""
            }
          >
            {variance >= 0 ? "+" : ""}
            {formatCurrency(variance)}
          </Badge>
        </div>
      </div>
      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-primary/20 rounded-full"
          style={{ width: `${budgetWidth}%` }}
        />
        <div
          className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-500"
          style={{ width: `${buyoutWidth}%` }}
        />
      </div>
    </div>
  );
}

// ── Main Dashboard ──
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("budget");

  // Compute completion percentage from project dates
  const totalJtdCost = projectSummary.currentJobCost;
  const contractAmt = projectSummary.contractAmount;
  const completionPct = ((totalJtdCost / contractAmt) * 100).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      {/* ── Section 1: Hero ── */}
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold">{projectSummary.projectName}</h1>
          <Badge
            variant="outline"
            className="border-primary/30 text-primary text-xs"
          >
            {projectSummary.jobNumber}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Your Excel workbook, reimagined as a cross-platform app
        </p>
      </div>

      {/* ── Section 2: KPI Stats Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 shadow-lg rounded-xl p-5 hover:-translate-y-0.5 hover:shadow-xl hover:border-primary/30 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
            </div>
          );
        })}
      </div>

      {/* ── Section 3: Device Preview ── */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Cross-Platform Preview</h2>
          <p className="text-sm text-muted-foreground">
            See how your project workbook translates to every screen size
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {/* Phone */}
          <div
            className="flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
            style={{ animationDelay: "0ms" }}
          >
            <div className="relative w-[180px] h-[360px] rounded-[2rem] border-[6px] border-foreground/80 bg-background overflow-hidden shadow-xl">
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-foreground/80 rounded-full z-10" />
              <div className="pt-6 px-2 pb-2 h-full overflow-hidden">
                <PhoneMockupContent />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">
                iPhone
              </span>
            </div>
          </div>

          {/* Tablet */}
          <div
            className="flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
            style={{ animationDelay: "150ms" }}
          >
            <div className="relative w-[280px] h-[200px] rounded-[1.25rem] border-[6px] border-foreground/80 bg-background overflow-hidden shadow-xl">
              <div className="absolute top-1/2 -translate-y-1/2 right-1 w-3.5 h-3.5 bg-foreground/80 rounded-full z-10" />
              <div className="p-2 h-full overflow-hidden">
                <TabletMockupContent />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Tablet className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">
                iPad
              </span>
            </div>
          </div>

          {/* Desktop */}
          <div
            className="flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex flex-col items-center">
              {/* Monitor */}
              <div className="relative w-[320px] h-[195px] rounded-xl border-[5px] border-foreground/80 bg-background overflow-hidden shadow-xl">
                <div className="p-1.5 h-full overflow-hidden">
                  <DesktopMockupContent />
                </div>
              </div>
              {/* Stand */}
              <div className="w-16 h-4 bg-foreground/80 rounded-b-lg" />
              <div className="w-24 h-1.5 bg-foreground/60 rounded-full" />
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">
                Desktop
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 4: Monthly Profit Chart ── */}
      <div className="rounded-xl border bg-card shadow-sm p-6 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30 transition-all duration-200">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Monthly Profit Trend</h3>
          <p className="text-sm text-muted-foreground">
            Cumulative and monthly profit over time
          </p>
        </div>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={profitReports}
              margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="profitGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="oklch(0.52 0.16 240)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="oklch(0.52 0.16 240)"
                    stopOpacity={0.05}
                  />
                </linearGradient>
                <linearGradient
                  id="cumulativeGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="oklch(0.65 0.14 260)"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="oklch(0.65 0.14 260)"
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.922 0 0)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "oklch(0.556 0 0)" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "oklch(0.556 0 0)" }}
                tickFormatter={(v: number) =>
                  v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${v}`
                }
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="cumulativeProfit"
                stroke="oklch(0.65 0.14 260)"
                fill="url(#cumulativeGradient)"
                strokeWidth={2}
                dot={false}
                name="Cumulative"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="oklch(0.52 0.16 240)"
                fill="url(#profitGradient)"
                strokeWidth={2}
                dot={{ r: 3, fill: "oklch(0.52 0.16 240)" }}
                name="Monthly"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-6 mt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-primary rounded" />
            <span>Monthly Profit</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-chart-2 rounded" />
            <span>Cumulative Profit</span>
          </div>
        </div>
      </div>

      {/* ── Section 5: Interactive Tab Switcher ── */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="budget">Budget Overview</TabsTrigger>
          <TabsTrigger value="schedule">Schedule Status</TabsTrigger>
        </TabsList>

        <TabsContent value="budget">
          <div className="rounded-xl border bg-card shadow-sm p-6 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30 transition-all duration-200">
            <div className="mb-5">
              <h3 className="text-lg font-semibold">Budget vs. Buyout</h3>
              <p className="text-sm text-muted-foreground">
                Top cost categories — budget allocation vs. actual buyout amounts
              </p>
            </div>
            <div className="space-y-5">
              {costAnalysis.slice(0, 6).map((item, index) => (
                <BudgetBar
                  key={item.id}
                  category={item.category}
                  budget={item.budgetAmount}
                  buyout={item.buyoutAmount}
                  variance={item.variance}
                  index={index}
                />
              ))}
            </div>
            <div className="flex items-center gap-6 mt-5 pt-4 border-t text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-primary/20 rounded" />
                <span>Budget</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-primary rounded" />
                <span>Buyout</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <div className="rounded-xl border bg-card shadow-sm p-6 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30 transition-all duration-200">
            <div className="mb-5">
              <h3 className="text-lg font-semibold">Schedule Progress</h3>
              <p className="text-sm text-muted-foreground">
                Milestone completion status — projected finish{" "}
                {projectSummary.projectedCompletion}
              </p>
            </div>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.name}
                  className="space-y-1.5 animate-in fade-in slide-in-from-left-2 fill-mode-both"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      {milestone.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {milestone.percent}%
                      </span>
                      <Badge
                        variant="secondary"
                        className={
                          milestone.percent === 100
                            ? "bg-[color:var(--success)]/10 text-[color:var(--success)] border-[color:var(--success)]/20 hover:bg-[color:var(--success)]/10"
                            : milestone.percent > 0
                              ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/10"
                              : "bg-muted text-muted-foreground hover:bg-muted"
                        }
                      >
                        {milestone.percent === 100
                          ? "Complete"
                          : milestone.percent > 0
                            ? "In Progress"
                            : "Not Started"}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={milestone.percent} />
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t">
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span>
                  Start:{" "}
                  <span className="font-medium text-foreground">
                    {projectSummary.startDate}
                  </span>
                </span>
                <span>
                  Contract End:{" "}
                  <span className="font-medium text-foreground">
                    {projectSummary.completionDate}
                  </span>
                </span>
                <span>
                  Projected:{" "}
                  <span className="font-medium text-[color:var(--success)]">
                    {projectSummary.projectedCompletion}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
