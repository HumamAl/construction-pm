import { cn } from "@/lib/utils";

interface ChallengeCardProps {
  title: string;
  description: string;
  outcome?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function ChallengeCard({
  title,
  description,
  outcome,
  children,
  className,
  style,
}: ChallengeCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-gradient-to-br from-accent/5 to-background shadow-lg border border-primary/10 p-6 space-y-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 animate-in fade-in slide-in-from-bottom-2",
        className
      )}
      style={style}
    >
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      {children}
      {outcome && (
        <div className="pt-2 border-t border-border">
          <p className="text-sm font-medium text-[color:var(--success)]">
            {outcome}
          </p>
        </div>
      )}
    </div>
  );
}
