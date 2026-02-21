"use client";

import { useState, useMemo } from "react";
import { invoices } from "@/data/mock-data";
import { formatCurrency, formatNumber } from "@/lib/formatters";
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
  Receipt,
  Users,
  Calendar,
  ArrowUpDown,
  Search,
} from "lucide-react";

type SortField = "subVendor" | "grossTotal";
type SortDir = "asc" | "desc";

export default function InvoicesPage() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("subVendor");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir(field === "grossTotal" ? "desc" : "asc");
    }
  };

  const filtered = useMemo(() => {
    let items = invoices.filter((inv) =>
      inv.subVendor.toLowerCase().includes(search.toLowerCase())
    );
    items.sort((a, b) => {
      if (sortField === "subVendor") {
        return sortDir === "asc"
          ? a.subVendor.localeCompare(b.subVendor)
          : b.subVendor.localeCompare(a.subVendor);
      }
      return sortDir === "asc"
        ? a.grossTotal - b.grossTotal
        : b.grossTotal - a.grossTotal;
    });
    return items;
  }, [search, sortField, sortDir]);

  const totalGross = invoices.reduce((s, i) => s + i.grossTotal, 0);
  const totalNet = invoices.reduce((s, i) => s + i.netTotal, 0);
  const vendorCount = new Set(invoices.map((i) => i.subVendor)).size;
  const currentMonth = invoices[0]?.month ?? "Feb '26";

  const stats = [
    {
      label: "Total Gross",
      value: formatCurrency(totalGross),
      icon: DollarSign,
      description: "Before retainage",
    },
    {
      label: "Total Net",
      value: formatCurrency(totalNet),
      icon: Receipt,
      description: "After retainage",
    },
    {
      label: "Vendors",
      value: formatNumber(vendorCount),
      icon: Users,
      description: "Active this period",
    },
    {
      label: "Current Month",
      value: currentMonth,
      icon: Calendar,
      description: "Billing period",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Invoice Log</h1>
        <p className="text-sm text-muted-foreground">
          Monthly subcontractor invoices and pay applications
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
      <div className="flex items-center gap-3">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search vendors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Badge variant="outline" className="ml-auto">
          {filtered.length} of {invoices.length} invoices
        </Badge>
      </div>

      {/* Data Table */}
      <Card className="shadow-sm rounded-xl overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="cursor-pointer select-none hover:text-primary transition-colors"
                    onClick={() => handleSort("subVendor")}
                  >
                    <div className="flex items-center gap-1">
                      Sub / Vendor
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </div>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Month</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Invoice Amounts
                  </TableHead>
                  <TableHead
                    className="cursor-pointer select-none text-right hover:text-primary transition-colors"
                    onClick={() => handleSort("grossTotal")}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Gross Total
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Net Total</TableHead>
                  <TableHead className="text-right hidden md:table-cell">
                    Retainage
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((inv) => {
                  const retainage = inv.grossTotal - inv.netTotal;
                  return (
                    <TableRow
                      key={inv.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="font-medium">
                        {inv.subVendor}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {inv.month}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1.5">
                          {inv.invoiceAmounts.map((amt, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs font-mono"
                            >
                              {formatCurrency(amt)}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(inv.grossTotal)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(inv.netTotal)}
                      </TableCell>
                      <TableCell className="text-right hidden md:table-cell text-muted-foreground">
                        {retainage > 0 ? formatCurrency(retainage) : "—"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Totals */}
      <Card className="shadow-sm rounded-xl border-primary/20">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Badge variant="outline" className="font-semibold">
              Period Summary
            </Badge>
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-muted-foreground">Gross: </span>
                <span className="font-semibold">
                  {formatCurrency(totalGross)}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Net: </span>
                <span className="font-semibold">
                  {formatCurrency(totalNet)}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Retainage: </span>
                <span className="font-semibold">
                  {formatCurrency(totalGross - totalNet)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
