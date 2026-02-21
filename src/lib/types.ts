import type { LucideIcon } from "lucide-react";

// Sidebar navigation
export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// Challenge visualization types
export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// Proposal types
export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  outcome: string;
  tech: string[];
  relevance?: string;
}

// ── Construction PM Types ──

export type ProjectStatus = "Not Started" | "In Progress" | "Submitted" | "Approved" | "Closed/Done" | "N/A";

export interface ProjectSummary {
  projectName: string;
  jobNumber: string;
  address: string;
  pm: string;
  superintendent: string;
  ahj: string;
  ohpPercent: number;
  contractAmount: number;
  currentJobCost: number;
  profitMargin: number;
  receivables: number;
  jtdBilled: number;
  cashFlow: number;
  fixedFee: number;
  contractDays: number;
  startDate: string;
  completionDate: string;
  projectedCompletion: string;
  squareFootage: number;
  costPerSqFt: number;
}

export interface ProfitReport {
  month: string;
  profit: number;
  cumulativeProfit: number;
}

export interface CostAnalysisItem {
  id: string;
  category: string;
  budgetAmount: number;
  buyoutAmount: number;
  variance: number;
  notes: string;
}

export interface BidTab {
  id: string;
  scope: string;
  lowBid: number;
  lowBidCompany: string;
  bid2?: number;
  bid2Company?: string;
  bid3?: number;
  bid3Company?: string;
  comments?: string;
}

export interface JobCostItem {
  phaseCode: number;
  name: string;
  materials: number;
  labor: number;
  equipment: number;
  subcontracts: number;
  other: number;
  total: number;
  budget: number;
  buyout: number;
  subcontractor: string;
  changeOrders: number[];
  notes: string;
}

export interface PayAppLineItem {
  item: number;
  description: string;
  scheduledValue: number;
  prevComplete: number;
  thisPeriod: number;
  materialsStored: number;
  totalComplete: number;
  percentComplete: number;
  balance: number;
  retainage: number;
}

export interface Invoice {
  id: string;
  subVendor: string;
  month: string;
  invoiceAmounts: number[];
  grossTotal: number;
  netTotal: number;
}

export interface ChecklistItem {
  id: string;
  task: string;
  status: ProjectStatus;
  assignedTo: string;
  dueDate: string;
  completedDate: string;
  notes: string;
}

export interface ChecklistPhase {
  id: string;
  name: string;
  phaseNumber: number;
  items: ChecklistItem[];
}

export type DeviceType = "phone" | "tablet" | "desktop";
