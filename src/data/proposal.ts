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
    id: "construction-intel",
    title: "ConstructionIQ — Project Intelligence",
    description: "Construction project intelligence platform with real-time project tracking, permit monitoring, supplier matching, and regional analytics across 8 markets.",
    outcome: "Tracks 15+ projects with $430M+ pipeline visibility and 73% supplier match rate",
    tech: ["Next.js", "TypeScript", "Recharts", "shadcn/ui"],
    relevance: "Same domain — construction project tracking with permits, suppliers, and financial pipeline",
  },
  {
    id: "fleet-saas",
    title: "Fleet Maintenance SaaS",
    description: "6-module SaaS platform managing 500+ assets with preventive maintenance scheduling, work orders, parts inventory, and analytics dashboard.",
    outcome: "Replaced 8 spreadsheets with a unified platform — reduced maintenance scheduling errors by 60%",
    tech: ["Next.js", "TypeScript", "Recharts", "shadcn/ui"],
    relevance: "Multi-module spreadsheet replacement — same architecture pattern as your 12-tab workbook",
  },
  {
    id: "dealer-platform",
    title: "DealerHub — Automotive SaaS",
    description: "Multi-tenant dealership platform with vehicle inventory, AI-powered lead scoring, appraisals, and reconditioning pipeline tracking.",
    outcome: "Multi-module SaaS managing 187+ vehicles, 64 active leads, and $892K monthly revenue",
    tech: ["Next.js", "TypeScript", "Recharts", "shadcn/ui"],
    relevance: "Multi-module SaaS with pipeline management and financial tracking — similar complexity",
  },
  {
    id: "payment-monitor",
    title: "PayGuard — Transaction Monitor",
    description: "Transaction monitoring dashboard with real-time flagging, linked account tracking, alert management, and compliance workflows.",
    outcome: "Monitors 847+ transactions with 94.2% alert delivery across 6 linked accounts",
    tech: ["Next.js", "TypeScript", "Recharts", "shadcn/ui"],
    relevance: "Financial monitoring with invoice-level tracking — mirrors your pay app and invoice workflows",
  },
];
