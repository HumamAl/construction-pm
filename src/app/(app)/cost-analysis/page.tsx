"use client";

import { useState, useMemo } from "react";
import { costAnalysis } from "@/data/mock-data";
import { formatCurrency } from "@/lib/formatters";
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  ArrowUpDown,
  Search,
} from "lucide-react";

type SortField = "category" | "budgetAmount" | "buyoutAmount" | "variance";
type SortDir = "asc" | "desc";

export default function CostAnalysisPage() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("category");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const filtered = useMemo(() => {
    let items = costAnalysis.filter((item) =>
      item.category.toLowerCase().includes(search.toLowerCase())
    );
    items.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortDir === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
    return items;
  }, [search, sortField, sortDir]);

  const totalBudget = costAnalysis.reduce((s, i) => s + i.budgetAmount, 0);
  const totalBuyout = costAnalysis.reduce((s, i) => s + i.buyoutAmount, 0);
  const totalVariance = costAnalysis.reduce((s, i) => s + i.variance, 0);
  const overBudgetCount = costAnalysis.filter((i) => i.variance < 0).length;

  const stats = [
    {
      label: "Total Budget",
      value: formatCurrency(totalBudget),
      icon: DollarSign,
      description: "Original estimate",
    },
    {
      label: "Total Buyout",
      value: formatCurrency(totalBuyout),
      icon: DollarSign,
      description: "Contracted amount",
    },
    {
      label: "Total Variance",
      value: formatCurrency(totalVariance),
      icon: totalVariance >= 0 ? TrendingUp : TrendingDown,
      description: totalVariance >= 0 ? "Under budget" : "Over budget",
      positive: totalVariance >= 0,
    },
    {
      label: "Over Budget",
      value: `${overBudgetCount} categories`,
      icon: AlertTriangle,
      description: "Require attention",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Cost Analysis</h1>
        <p className="text-sm text-muted-foreground">
          Budget vs buyout comparison across all trades
        </p>
      </div>

      {/* Summary Stats */}
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

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Data Table */}
      <Card className="shadow-sm rounded-xl">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer select-none hover:text-primary transition-colors"
                  onClick={() => handleSort("category")}
                >
                  <div className="flex items-center gap-1">
                    Category
                    <ArrowUpDown className="h-3.5 w-3.5" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none text-right hover:text-primary transition-colors"
                  onClick={() => handleSort("budgetAmount")}
                >
                  <div className="flex items-center justify-end gap-1">
                    Budget
                    <ArrowUpDown className="h-3.5 w-3.5" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none text-right hover:text-primary transition-colors"
                  onClick={() => handleSort("buyoutAmount")}
                >
                  <div className="flex items-center justify-end gap-1">
                    Buyout
                    <ArrowUpDown className="h-3.5 w-3.5" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none text-right hover:text-primary transition-colors"
                  onClick={() => handleSort("variance")}
                >
                  <div className="flex items-center justify-end gap-1">
                    Variance
                    <ArrowUpDown className="h-3.5 w-3.5" />
                  </div>
                </TableHead>
                <TableHead className="hidden md:table-cell">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.budgetAmount)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.buyoutAmount)}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.variance > 0 ? (
                      <span className="text-[color:var(--success)] font-medium">
                        +{formatCurrency(item.variance)}
                      </span>
                    ) : item.variance < 0 ? (
                      <span className="text-destructive font-medium">
                        {formatCurrency(item.variance)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        {formatCurrency(item.variance)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                    {item.notes || "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Totals Row */}
      <Card className="shadow-sm rounded-xl border-primary/20">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm font-semibold">
                {filtered.length} of {costAnalysis.length} categories
              </Badge>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-muted-foreground">Budget: </span>
                <span className="font-semibold">
                  {formatCurrency(totalBudget)}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Buyout: </span>
                <span className="font-semibold">
                  {formatCurrency(totalBuyout)}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Variance: </span>
                <span
                  className={`font-semibold ${
                    totalVariance >= 0
                      ? "text-[color:var(--success)]"
                      : "text-destructive"
                  }`}
                >
                  {totalVariance >= 0 ? "+" : ""}
                  {formatCurrency(totalVariance)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
