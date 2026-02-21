import { challenges, executiveSummary } from "@/data/challenges";
import { ChallengeCard } from "@/components/challenges/challenge-card";
import { BeforeAfter } from "@/components/challenges/before-after";
import { FlowDiagram } from "@/components/challenges/flow-diagram";
import { MetricBar } from "@/components/challenges/metric-bar";
import {
  DollarSign,
  Calculator,
  ClipboardList,
  FileText,
  Receipt,
  TrendingUp,
  Smartphone,
  Tablet,
  Monitor,
  Database,
  CheckCircle2,
  Search,
  Shield,
} from "lucide-react";

/* ─── Challenge 1: Before / After ─── */
function SpreadsheetBeforeAfter() {
  return (
    <BeforeAfter
      before={{
        label: "Excel Workbook",
        items: [
          "Manual cross-tab references",
          "Version conflicts between users",
          "No mobile access on job sites",
          "Formula breakage risk on edits",
        ],
      }}
      after={{
        label: "Web Application",
        items: [
          "Unified relational database",
          "Real-time collaboration",
          "Cross-platform access anywhere",
          "Automated calculations",
        ],
      }}
    />
  );
}

/* ─── Challenge 2: Device Architecture ─── */
function DeviceArchitecture() {
  const devices = [
    {
      icon: Smartphone,
      label: "Phone",
      description: "Quick status checks, photo uploads, checklist completion on site",
    },
    {
      icon: Tablet,
      label: "Tablet",
      description: "Pay app review, submittals, field meetings with full data",
    },
    {
      icon: Monitor,
      label: "Desktop",
      description: "Cost analysis, reporting, full job cost management",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {devices.map((device) => (
          <div
            key={device.label}
            className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center space-y-2"
          >
            <device.icon className="w-8 h-8 mx-auto text-primary" />
            <p className="text-sm font-semibold">{device.label}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {device.description}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-3">
        <div className="h-px flex-1 bg-primary/20" />
        <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-full px-4 py-1.5">
          <Database className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium text-primary">Shared Data Layer</span>
        </div>
        <div className="h-px flex-1 bg-primary/20" />
      </div>
    </div>
  );
}

/* ─── Challenge 3: Cost Flow Diagram ─── */
function CostFlowDiagram() {
  return (
    <FlowDiagram
      steps={[
        { label: "Budget Entry", icon: DollarSign },
        { label: "OH&P Calc", icon: Calculator, highlight: true },
        { label: "Job Cost", icon: ClipboardList },
        { label: "Pay App", icon: FileText },
        { label: "Invoice", icon: Receipt },
        { label: "Profit Report", icon: TrendingUp },
      ]}
    />
  );
}

/* ─── Challenge 4: Checklist Metrics ─── */
function ChecklistMetrics() {
  const phases = [
    { label: "Preconstruction", value: 100, color: "success" as const },
    { label: "Design & Planning", value: 90, color: "success" as const },
    { label: "Buyout & Procurement", value: 75, color: "warning" as const },
    { label: "Submittals", value: 73, color: "warning" as const },
    { label: "Regulatory", value: 50, color: "warning" as const },
    { label: "PX & Close Out", value: 37.5, color: "destructive" as const },
  ];

  return (
    <div className="space-y-3">
      {phases.map((phase) => (
        <MetricBar
          key={phase.label}
          label={phase.label}
          value={phase.value}
          max={100}
          unit="%"
          color={phase.color}
        />
      ))}
    </div>
  );
}

/* ─── Challenge 5: Migration Timeline ─── */
function MigrationTimeline() {
  const phases = [
    {
      week: "Week 1",
      title: "Data Assessment",
      description: "Audit workbook structure, map cross-sheet relationships",
      icon: Search,
      status: "completed" as const,
    },
    {
      week: "Week 2",
      title: "Schema Design",
      description: "Design relational database, plan migration scripts",
      icon: Database,
      status: "completed" as const,
    },
    {
      week: "Week 3",
      title: "Migration",
      description: "Import data, validate calculations match originals",
      icon: Shield,
      status: "active" as const,
    },
    {
      week: "Week 4",
      title: "Verification",
      description: "Cross-check all records, full QA pass",
      icon: CheckCircle2,
      status: "upcoming" as const,
    },
  ];

  const dotColor = {
    completed: "bg-[color:var(--success)]",
    active: "bg-primary",
    upcoming: "bg-muted",
  };

  const lineColor = {
    completed: "bg-[color:var(--success)]",
    active: "bg-primary/40",
    upcoming: "bg-muted",
  };

  return (
    <div className="relative space-y-0">
      {phases.map((phase, index) => (
        <div key={phase.title} className="flex gap-4">
          {/* Timeline track */}
          <div className="flex flex-col items-center">
            <div
              className={`w-3 h-3 rounded-full shrink-0 mt-1.5 ${dotColor[phase.status]}`}
            />
            {index < phases.length - 1 && (
              <div
                className={`w-0.5 flex-1 min-h-[3rem] ${lineColor[phase.status]}`}
              />
            )}
          </div>

          {/* Content */}
          <div className="pb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-primary bg-primary/10 rounded-full px-2.5 py-0.5">
                {phase.week}
              </span>
              <phase.icon className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium mt-1.5">{phase.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {phase.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Visualization router ─── */
function ChallengeVisualization({ id }: { id: string }) {
  switch (id) {
    case "challenge-1":
      return <SpreadsheetBeforeAfter />;
    case "challenge-2":
      return <DeviceArchitecture />;
    case "challenge-3":
      return <CostFlowDiagram />;
    case "challenge-4":
      return <ChecklistMetrics />;
    case "challenge-5":
      return <MigrationTimeline />;
    default:
      return null;
  }
}

/* ─── Main Page ─── */
export default function ChallengesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">My Approach</h1>
          <p className="text-sm text-muted-foreground mt-1">
            How I would tackle the key technical challenges in this project
          </p>
        </div>

        {/* Executive Summary */}
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {executiveSummary}
          </p>
        </div>

        {/* Challenge Cards */}
        <div className="space-y-6">
          {challenges.map((challenge, index) => (
            <ChallengeCard
              key={challenge.id}
              title={challenge.title}
              description={challenge.description}
              outcome={challenge.outcome}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ChallengeVisualization id={challenge.id} />
            </ChallengeCard>
          ))}
        </div>

        {/* CTA Closer */}
        <div className="text-center py-8 border-t border-border">
          <p className="text-lg font-semibold">Ready to discuss the approach?</p>
          <p className="text-sm text-muted-foreground mt-1">
            Let&apos;s walk through how these solutions apply to your specific setup.
          </p>
        </div>
      </div>
    </div>
  );
}
