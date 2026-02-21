import { cn } from "@/lib/utils";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface FlowStep {
  label: string;
  description?: string;
  icon: LucideIcon;
  highlight?: boolean;
}

interface FlowDiagramProps {
  steps: FlowStep[];
}

export function FlowDiagram({ steps }: FlowDiagramProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-wrap">
      {steps.map((step, i) => (
        <div key={step.label} className="flex flex-col sm:flex-row items-center gap-2">
          <div
            className={cn(
              "flex items-center gap-2.5 rounded-lg border px-4 py-3 w-full sm:w-auto",
              step.highlight
                ? "border-primary bg-primary/10 shadow-sm"
                : "border-primary/20 bg-primary/5"
            )}
          >
            <step.icon
              className={cn(
                "w-4 h-4 shrink-0",
                step.highlight ? "text-primary" : "text-muted-foreground"
              )}
            />
            <div>
              <p
                className={cn(
                  "text-xs font-medium",
                  step.highlight && "text-primary"
                )}
              >
                {step.label}
              </p>
              {step.description && (
                <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                  {step.description}
                </p>
              )}
            </div>
          </div>
          {i < steps.length - 1 && (
            <>
              <ArrowRight className="w-4 h-4 text-primary/40 shrink-0 hidden sm:block" />
              <ChevronDown className="w-4 h-4 text-primary/40 shrink-0 sm:hidden" />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
