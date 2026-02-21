"use client";

import { useState, useMemo } from "react";
import { payAppItems } from "@/data/mock-data";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DollarSign,
  Receipt,
  Scale,
  TrendingUp,
  Filter,
} from "lucide-react";

export default function PayApplicationsPage() {
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  const filtered = useMemo(() => {
    if (!showActiveOnly) return payAppItems;
    return payAppItems.filter((item) => item.thisPeriod > 0);
  }, [showActiveOnly]);

  const totalScheduled = payAppItems.reduce(
    (s, i) => s + i.scheduledValue,
    0
  );
  const totalBilled = payAppItems.reduce((s, i) => s + i.totalComplete, 0);
  const totalBalance = payAppItems.reduce((s, i) => s + i.balance, 0);
  const overallPct =
    totalScheduled > 0 ? (totalBilled / totalScheduled) * 100 : 0;

  const stats = [
    {
      label: "Scheduled Value",
      value: formatCurrency(totalScheduled),
      icon: DollarSign,
      description: "Total contract value",
    },
    {
      label: "Total Billed",
      value: formatCurrency(totalBilled),
      icon: Receipt,
      description: "Work completed to date",
    },
    {
      label: "Balance to Finish",
      value: formatCurrency(totalBalance),
      icon: Scale,
      description: "Remaining value",
    },
    {
      label: "Overall Complete",
      value: formatPercent(overallPct),
      icon: TrendingUp,
      description: "Project completion",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Pay Applications</h1>
        <p className="text-sm text-muted-foreground">
          Application for payment — Schedule of Values
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

      {/* Filter Toggle */}
      <div className="flex items-center gap-3">
        <Button
          variant={showActiveOnly ? "default" : "outline"}
          size="sm"
          onClick={() => setShowActiveOnly(!showActiveOnly)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          {showActiveOnly ? "Active Only" : "All Items"}
        </Button>
        <Badge variant="outline">
          {filtered.length} of {payAppItems.length} line items
        </Badge>
        {showActiveOnly && (
          <p className="text-xs text-muted-foreground">
            Showing items with billing this period
          </p>
        )}
      </div>

      {/* Data Table */}
      <Card className="shadow-sm rounded-xl overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Scheduled Value</TableHead>
                  <TableHead className="text-right hidden md:table-cell">
                    Previous
                  </TableHead>
                  <TableHead className="text-right">This Period</TableHead>
                  <TableHead className="text-right hidden lg:table-cell">
                    Total Complete
                  </TableHead>
                  <TableHead className="w-[140px] hidden sm:table-cell">
                    % Complete
                  </TableHead>
                  <TableHead className="text-right hidden md:table-cell">
                    Balance
                  </TableHead>
                  <TableHead className="text-right hidden lg:table-cell">
                    Retainage
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((item) => (
                  <TableRow
                    key={item.item}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-mono text-sm">
                      {item.item}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.description}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.scheduledValue)}
                    </TableCell>
                    <TableCell className="text-right hidden md:table-cell">
                      {formatCurrency(item.prevComplete)}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.thisPeriod > 0 ? (
                        <span className="font-semibold text-primary">
                          {formatCurrency(item.thisPeriod)}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right hidden lg:table-cell font-semibold">
                      {formatCurrency(item.totalComplete)}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <Progress
                          value={item.percentComplete}
                          className="h-2 w-20"
                        />
                        <span className="text-xs text-muted-foreground w-12 text-right">
                          {formatPercent(item.percentComplete)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right hidden md:table-cell">
                      {formatCurrency(item.balance)}
                    </TableCell>
                    <TableCell className="text-right hidden lg:table-cell text-muted-foreground">
                      {formatCurrency(item.retainage)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Totals Summary */}
      <Card className="shadow-sm rounded-xl border-primary/20">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-semibold">
                Application Summary
              </Badge>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-muted-foreground">This Period: </span>
                <span className="font-semibold text-primary">
                  {formatCurrency(
                    payAppItems.reduce((s, i) => s + i.thisPeriod, 0)
                  )}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Total Complete: </span>
                <span className="font-semibold">
                  {formatCurrency(totalBilled)}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Retainage: </span>
                <span className="font-semibold">
                  {formatCurrency(
                    payAppItems.reduce((s, i) => s + i.retainage, 0)
                  )}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
