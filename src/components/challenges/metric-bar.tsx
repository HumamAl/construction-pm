import { cn } from "@/lib/utils";

interface MetricBarProps {
  label: string;
  value: number;
  max: number;
  unit?: string;
  color?: "success" | "warning" | "destructive" | "primary";
}

export function MetricBar({
  label,
  value,
  max,
  unit = "",
  color = "primary",
}: MetricBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const colorClasses = {
    success: "bg-[color:var(--success)]",
    warning: "bg-[color:var(--warning)]",
    destructive: "bg-[color:var(--destructive)]",
    primary: "bg-primary",
  };

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">
          {value}
          {unit}
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-secondary">
        <div
          className={cn("h-full rounded-full transition-all", colorClasses[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
