"use client";

import { useState, useMemo } from "react";
import { jobCostItems } from "@/data/mock-data";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DollarSign,
  Wallet,
  PiggyBank,
  BarChart3,
} from "lucide-react";

type StatusFilter = "all" | "under" | "over" | "not-started";

export default function JobCostPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filtered = useMemo(() => {
    return jobCostItems.filter((item) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "under") return item.total < item.budget && item.total > 0;
      if (statusFilter === "over") return item.total > item.budget;
      if (statusFilter === "not-started") return item.total === 0;
      return true;
    });
  }, [statusFilter]);

  const totalSpent = jobCostItems.reduce((s, i) => s + i.total, 0);
  const totalBudget = jobCostItems.reduce((s, i) => s + i.budget, 0);
  const remaining = totalBudget - totalSpent;
  const pctCommitted = (totalSpent / totalBudget) * 100;

  const stats = [
    {
      label: "Total Spent",
      value: formatCurrency(totalSpent),
      icon: DollarSign,
      description: "Job-to-date expenditure",
    },
    {
      label: "Total Budget",
      value: formatCurrency(totalBudget),
      icon: Wallet,
      description: "Approved budget",
    },
    {
      label: "Remaining",
      value: formatCurrency(remaining),
      icon: PiggyBank,
      description: remaining >= 0 ? "Available balance" : "Over budget",
    },
    {
      label: "% Committed",
      value: formatPercent(pctCommitted),
      icon: BarChart3,
      description: "Of total budget",
    },
  ];

  const getVarianceBadge = (item: (typeof jobCostItems)[0]) => {
    if (item.total === 0) {
      return (
        <Badge
          variant="outline"
          className="bg-muted text-muted-foreground text-xs"
        >
          Not Started
        </Badge>
      );
    }
    const variance = item.budget - item.total;
    if (variance >= 0) {
      return (
        <Badge className="bg-[color:var(--success)]/10 text-[color:var(--success)] border-[color:var(--success)]/20 text-xs">
          Under Budget
        </Badge>
      );
    }
    return (
      <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
        Over Budget
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Job Cost Status</h1>
        <p className="text-sm text-muted-foreground">
          Detailed cost tracking by phase code
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={stat.label}
            className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 shadow-lg rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </div>
                <div className="rounded-lg bg-primary/10 p-2.5">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Filter by status:</span>
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as StatusFilter)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Phases</SelectItem>
            <SelectItem value="under">Under Budget</SelectItem>
            <SelectItem value="over">Over Budget</SelectItem>
            <SelectItem value="not-started">Not Started</SelectItem>
          </SelectContent>
        </Select>
        <Badge variant="outline" className="ml-auto">
          {filtered.length} of {jobCostItems.length} phases
        </Badge>
      </div>

      {/* Data Table */}
      <Card className="shadow-sm rounded-xl overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Phase</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right hidden lg:table-cell">
                    Materials
                  </TableHead>
                  <TableHead className="text-right hidden lg:table-cell">
                    Labor
                  </TableHead>
                  <TableHead className="text-right hidden xl:table-cell">
                    Equipment
                  </TableHead>
                  <TableHead className="text-right hidden md:table-cell">
                    Subcontracts
                  </TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right hidden md:table-cell">
                    Budget
                  </TableHead>
                  <TableHead className="text-right hidden md:table-cell">
                    Variance
                  </TableHead>
                  <TableHead className="w-[140px] hidden sm:table-cell">
                    Progress
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((item) => {
                  const variance = item.budget - item.total;
                  const pctSpent =
                    item.budget > 0
                      ? Math.min((item.total / item.budget) * 100, 100)
                      : 0;

                  return (
                    <TableRow
                      key={item.phaseCode}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="font-mono text-sm">
                        {item.phaseCode}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          {item.subcontractor && (
                            <p className="text-xs text-muted-foreground">
                              {item.subcontractor}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right hidden lg:table-cell">
                        {item.materials > 0
                          ? formatCurrency(item.materials)
                          : "—"}
                      </TableCell>
                      <TableCell className="text-right hidden lg:table-cell">
                        {item.labor > 0 ? formatCurrency(item.labor) : "—"}
                      </TableCell>
                      <TableCell className="text-right hidden xl:table-cell">
                        {item.equipment > 0
                          ? formatCurrency(item.equipment)
                          : "—"}
                      </TableCell>
                      <TableCell className="text-right hidden md:table-cell">
                        {item.subcontracts > 0
                          ? formatCurrency(item.subcontracts)
                          : "—"}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(item.total)}
                      </TableCell>
                      <TableCell className="text-right hidden md:table-cell">
                        {formatCurrency(item.budget)}
                      </TableCell>
                      <TableCell className="text-right hidden md:table-cell">
                        {item.total === 0 ? (
                          <span className="text-muted-foreground">—</span>
                        ) : variance >= 0 ? (
                          <span className="text-[color:var(--success)] font-medium">
                            +{formatCurrency(variance)}
                          </span>
                        ) : (
                          <span className="text-destructive font-medium">
                            {formatCurrency(variance)}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex items-center gap-2">
                          <Progress
                            value={pctSpent}
                            className="h-2 w-20"
                          />
                          <span className="text-xs text-muted-foreground w-10 text-right">
                            {formatPercent(pctSpent)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {getVarianceBadge(item)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
