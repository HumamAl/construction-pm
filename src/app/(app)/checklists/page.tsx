"use client";

import { useState, useMemo } from "react";
import { checklists } from "@/data/mock-data";
import { formatDate } from "@/lib/formatters";
import type { ProjectStatus } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
  ClipboardCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";

const statusColorMap: Record<
  ProjectStatus,
  { bg: string; text: string }
> = {
  "Closed/Done": {
    bg: "bg-[color:var(--success)]/10",
    text: "text-[color:var(--success)]",
  },
  Approved: {
    bg: "bg-primary/10",
    text: "text-primary",
  },
  "In Progress": {
    bg: "bg-[color:var(--warning)]/10",
    text: "text-[color:var(--warning)]",
  },
  Submitted: {
    bg: "bg-primary/20",
    text: "text-primary",
  },
  "Not Started": {
    bg: "bg-muted",
    text: "text-muted-foreground",
  },
  "N/A": {
    bg: "bg-muted/50",
    text: "text-muted-foreground/70",
  },
};

function StatusBadge({ status }: { status: ProjectStatus }) {
  const colors = statusColorMap[status] ?? statusColorMap["N/A"];
  return (
    <Badge className={`${colors.bg} ${colors.text} border-0 text-xs`}>
      {status}
    </Badge>
  );
}

function getPhaseProgress(phase: (typeof checklists)[0]) {
  const done = phase.items.filter(
    (i) =>
      i.status === "Closed/Done" || i.status === "Approved" || i.status === "N/A"
  ).length;
  return {
    done,
    total: phase.items.length,
    pct: phase.items.length > 0 ? (done / phase.items.length) * 100 : 0,
  };
}

export default function ChecklistsPage() {
  const [activePhase, setActivePhase] = useState(checklists[0]?.id ?? "");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const currentPhase = checklists.find((p) => p.id === activePhase);

  const filteredItems = useMemo(() => {
    if (!currentPhase) return [];
    if (statusFilter === "all") return currentPhase.items;
    return currentPhase.items.filter((item) => item.status === statusFilter);
  }, [currentPhase, statusFilter]);

  const allStatuses: ProjectStatus[] = [
    "Closed/Done",
    "Approved",
    "In Progress",
    "Submitted",
    "Not Started",
    "N/A",
  ];

  const totalItems = checklists.reduce((s, p) => s + p.items.length, 0);
  const totalDone = checklists.reduce((s, p) => {
    const prog = getPhaseProgress(p);
    return s + prog.done;
  }, 0);
  const overallPct = totalItems > 0 ? (totalDone / totalItems) * 100 : 0;
  const inProgressCount = checklists.reduce(
    (s, p) => s + p.items.filter((i) => i.status === "In Progress").length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Project Checklists</h1>
        <p className="text-sm text-muted-foreground">
          Track progress across all project phases
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 shadow-lg rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold mt-1">{totalItems}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Across all phases
                </p>
              </div>
              <div className="rounded-lg bg-primary/10 p-2.5">
                <ClipboardCheck className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 shadow-lg rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold mt-1">{totalDone}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Done or approved
                </p>
              </div>
              <div className="rounded-lg bg-primary/10 p-2.5">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 shadow-lg rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold mt-1">{inProgressCount}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Active tasks
                </p>
              </div>
              <div className="rounded-lg bg-primary/10 p-2.5">
                <Clock className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 shadow-lg rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
                <p className="text-2xl font-bold mt-1">
                  {overallPct.toFixed(0)}%
                </p>
                <Progress value={overallPct} className="h-2 mt-2 w-24" />
              </div>
              <div className="rounded-lg bg-primary/10 p-2.5">
                <AlertCircle className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Phase Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {checklists.map((phase, index) => {
          const prog = getPhaseProgress(phase);
          const isActive = phase.id === activePhase;
          return (
            <Card
              key={phase.id}
              className={`shadow-sm rounded-xl cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 ${
                isActive ? "border-primary/40 ring-1 ring-primary/20" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setActivePhase(phase.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">
                    {phase.name}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {prog.done}/{prog.total}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-3">
                  <Progress value={prog.pct} className="h-2 flex-1" />
                  <span className="text-xs text-muted-foreground w-10 text-right">
                    {prog.pct.toFixed(0)}%
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Phase Detail Tabs */}
      <Tabs
        value={activePhase}
        onValueChange={setActivePhase}
        className="space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <TabsList className="overflow-x-auto">
            {checklists.map((phase) => (
              <TabsTrigger key={phase.id} value={phase.id} className="text-xs">
                {phase.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Status Filter */}
          <div className="flex items-center gap-2 sm:ml-auto">
            <span className="text-sm text-muted-foreground">Status:</span>
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {allStatuses.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {checklists.map((phase) => (
          <TabsContent key={phase.id} value={phase.id}>
            <Card className="shadow-sm rounded-xl overflow-hidden">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Task</TableHead>
                        <TableHead className="w-[120px]">Status</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Assigned To
                        </TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Due Date
                        </TableHead>
                        <TableHead className="hidden lg:table-cell">
                          Completed
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Notes
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredItems.map((item) => (
                        <TableRow
                          key={item.id}
                          className="hover:bg-muted/50 transition-colors"
                        >
                          <TableCell className="font-medium">
                            {item.task}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={item.status} />
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm">
                            {item.assignedTo}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                            {formatDate(item.dueDate)}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                            {item.completedDate
                              ? formatDate(item.completedDate)
                              : "—"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                            {item.notes || "—"}
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredItems.length === 0 && (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            className="text-center py-8 text-muted-foreground"
                          >
                            No items match the selected filter
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
