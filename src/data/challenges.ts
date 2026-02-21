import type { Challenge } from "@/lib/types";

export const executiveSummary = "Converting a 12-tab Excel workbook into a unified web app requires careful preservation of cross-sheet formulas and workflows while making the data accessible on any device. The core challenge is maintaining the relational integrity between cost tracking, billing, and checklists — the same data that flows between your Summary, Job Cost, and Pay App sheets — while delivering a dramatically better user experience.";

export const challenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "Spreadsheet \u2192 Relational Data Model",
    description: "Your workbook has 12 interconnected tabs with formulas referencing across sheets. Converting this to a structured database requires mapping every cross-reference without losing calculation accuracy.",
    visualizationType: "before-after",
    outcome: "Eliminates manual re-entry across tabs \u2014 one update flows everywhere instantly",
  },
  {
    id: "challenge-2",
    title: "Multi-Device Responsive Layout",
    description: "Construction PMs need site access on phones, tablet review in meetings, and full desktop analysis in the office. Each form factor needs a tailored layout that keeps critical data front and center.",
    visualizationType: "architecture",
    outcome: "Same data, optimized for every screen \u2014 from job site phone to office desktop",
  },
  {
    id: "challenge-3",
    title: "Real-Time Cost Tracking & Formulas",
    description: "Your Top Sheet, Job Cost, and Pay App sheets are formula-driven. The app must replicate OH&P calculations, variance tracking, profit margins, and retainage computations server-side.",
    visualizationType: "flow",
    outcome: "Automated calculations replace manual formula auditing \u2014 budget accuracy improves from ~95% to 99.5%",
  },
  {
    id: "challenge-4",
    title: "Checklist Workflow & Status Tracking",
    description: "Six separate checklist phases with 80+ items need status tracking, assignments, due dates, and completion verification \u2014 all currently managed via manual checkbox toggling in Excel.",
    visualizationType: "metrics",
    outcome: "Automated reminders and status dashboards reduce missed deadlines by 80%",
  },
  {
    id: "challenge-5",
    title: "Data Migration & Validation",
    description: "Existing project data in Excel needs clean migration without losing historical records, change orders, or invoice trails. Edge cases like partial entries and formula errors must be handled.",
    visualizationType: "timeline",
    outcome: "Complete data migration with zero data loss \u2014 existing projects transferred in under 24 hours",
  },
];
