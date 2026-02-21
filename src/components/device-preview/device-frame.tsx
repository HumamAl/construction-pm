"use client";

import { cn } from "@/lib/utils";

interface DeviceFrameProps {
  type: "phone" | "tablet" | "desktop";
  children: React.ReactNode;
  label?: string;
  className?: string;
}

export function DeviceFrame({ type, children, label, className }: DeviceFrameProps) {
  const frameStyles = {
    phone: {
      outer: "w-[200px] h-[400px]",
      inner: "w-[375px] h-[750px] scale-[0.52]",
      bezel: "rounded-[2rem] border-[6px] border-foreground/80",
      notch: true,
    },
    tablet: {
      outer: "w-[320px] h-[420px]",
      inner: "w-[768px] h-[1024px] scale-[0.4]",
      bezel: "rounded-[1.5rem] border-[4px] border-foreground/80",
      notch: false,
    },
    desktop: {
      outer: "w-[480px] h-[300px]",
      inner: "w-[1280px] h-[800px] scale-[0.37]",
      bezel: "rounded-t-xl border-[3px] border-foreground/80 border-b-0",
      notch: false,
    },
  };

  const style = frameStyles[type];

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className={cn("relative bg-foreground/5 overflow-hidden", style.outer, style.bezel)}>
        {style.notch && (
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-4 bg-foreground/80 rounded-full z-10" />
        )}
        <div className="w-full h-full overflow-hidden">
          <div
            className={cn("origin-top-left", style.inner)}
            style={{
              transformOrigin: "top left",
            }}
          >
            <div className="w-full h-full bg-background overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      </div>
      {type === "desktop" && (
        <div className="w-[160px] h-3 bg-foreground/80 rounded-b-lg" />
      )}
      {label && (
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      )}
    </div>
  );
}
