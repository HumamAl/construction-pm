import type { Profile, PortfolioProject } from "@/lib/types";

export const profile: Profile = {
  name: "Humam",
  tagline: "Full-stack developer who turns complex spreadsheets into clean, cross-platform apps",
  bio: "I specialize in converting business-critical spreadsheets and manual workflows into production web applications. From fleet management platforms tracking 500+ assets to CRM systems processing 200+ leads daily — I build tools that replace Excel chaos with structured, accessible software.",
  approach: [
    {
      title: "Understand the Workbook",
      description: "Map every tab, formula, and cross-reference. Identify the data relationships that drive your workflow.",
    },
    {
      title: "Build a Working Demo",
      description: "Create a live preview showing your actual data structure — not wireframes, real working pages.",
    },
    {
      title: "Ship the MVP",
      description: "Production-ready first version with web + mobile layouts, ready for your team to test.",
    },
    {
      title: "Iterate Based on Feedback",
      description: "Short feedback cycles — you see progress every few days, not at the end of a sprint.",
    },
  ],
  skillCategories: [
    {
      name: "Frontend",
      skills: ["TypeScript", "React 19", "Next.js 16", "Tailwind CSS 4", "shadcn/ui", "Recharts"],
    },
    {
      name: "Data & APIs",
      skills: ["Node.js", "REST APIs", "Excel Parsing", "Data Migration", "Real-time Sync"],
    },
    {
      name: "Mobile & Responsive",
      skills: ["Progressive Web App", "Responsive Design", "Touch-Optimized UI", "Offline Support"],
    },
  ],
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "fleet-saas",
    title: "Fleet Maintenance SaaS",
    description: "6-module SaaS platform managing 500+ assets with preventive maintenance scheduling, work orders, parts inventory, and analytics dashboard.",
    outcome: "Replaced 8 spreadsheets with a unified platform — reduced maintenance scheduling errors by 60%",
    tech: ["Next.js", "TypeScript", "Recharts", "shadcn/ui"],
    relevance: "Multi-module platform with complex data relationships — similar architecture to your project workbook",
  },
  {
    id: "lead-crm",
    title: "Lead Intake CRM",
    description: "Custom CRM with intake forms, pipeline management, lead scoring, and automation rules engine.",
    outcome: "Handles 200+ leads/day with automated scoring and routing — replaced a 5-tab Google Sheet",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
    relevance: "Spreadsheet-to-app conversion with complex status tracking — mirrors your checklist workflow",
  },
  {
    id: "wmf-agent",
    title: "WMF Agent Dashboard",
    description: "AI-powered dashboard for manufacturing operations — email classification, RFQ extraction, quote generation with human-in-the-loop approval.",
    outcome: "Reduced quote turnaround from 4 hours to 20 minutes per RFQ",
    tech: ["Next.js", "Claude API", "n8n", "Microsoft Graph"],
    relevance: "Operations dashboard with financial tracking — similar cost/invoice management needs",
  },
  {
    id: "event-planner",
    title: "Event Planner SaaS",
    description: "Full-stack event management with dashboard, CRUD operations, calendar integration, and multi-step workflows.",
    outcome: "Calendar-driven event management with attendee check-in — handles 50+ concurrent events",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
    relevance: "Timeline and milestone tracking — similar to your project phase checklists",
  },
];
