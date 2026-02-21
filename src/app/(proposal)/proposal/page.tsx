import { profile, portfolioProjects } from "@/data/proposal";
import { CheckCircle2, Rocket, Users, Clock } from "lucide-react";

const stats = [
  { label: "Projects shipped", value: "40+" },
  { label: "Industries served", value: "11" },
  { label: "Demo turnaround", value: "< 48hr" },
];

export default function ProposalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-4xl mx-auto p-6 space-y-12">
        {/* ── Section 1: Hero ── */}
        <div className="text-center py-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            Built this demo for your project
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
          <p className="text-base text-muted-foreground mt-2 max-w-xl mx-auto">
            {profile.tagline}
          </p>
          <p className="text-sm mt-4 leading-relaxed max-w-2xl mx-auto text-muted-foreground">
            {profile.bio}
          </p>

          {/* Social proof stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 2: Proof of Work ── */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Relevant Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolioProjects.map((project, index) => (
              <div
                key={project.id}
                className="rounded-xl bg-gradient-to-br from-accent/5 to-background shadow-lg border border-primary/10 p-5 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration: "400ms",
                }}
              >
                <h3 className="font-semibold text-sm">{project.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  {project.description}
                </p>

                {/* Outcome in success color */}
                <div className="flex items-start gap-2 mt-3 p-2.5 rounded-lg bg-[color:var(--success)]/10">
                  <CheckCircle2 className="w-4 h-4 text-[color:var(--success)] shrink-0 mt-0.5" />
                  <p className="text-xs font-medium text-[color:var(--success)]">
                    {project.outcome}
                  </p>
                </div>

                {/* Relevance note */}
                {project.relevance && (
                  <p className="text-xs text-primary font-medium mt-3 italic">
                    {project.relevance}
                  </p>
                )}

                {/* Tech badges */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-xs rounded-md bg-primary/10 text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 3: How I Work ── */}
        <div>
          <h2 className="text-xl font-semibold mb-6">How I Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.approach.map((step, i) => {
              const icons = [Users, Rocket, CheckCircle2, Clock];
              const StepIcon = icons[i] || CheckCircle2;

              return (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-xl border shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
                  style={{
                    animationDelay: `${i * 80}ms`,
                    animationDuration: "400ms",
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <StepIcon className="w-4 h-4 text-primary" />
                      <p className="text-sm font-semibold">{step.title}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Section 4: Tech Stack ── */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Tech Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {profile.skillCategories.map((category, index) => (
              <div
                key={category.name}
                className="rounded-xl border bg-card p-4 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration: "400ms",
                }}
              >
                <h3 className="text-sm font-semibold mb-3">{category.name}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-xs rounded-md bg-primary/10 text-primary font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 5: CTA ── */}
        <div className="text-center py-10 px-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 shadow-lg">
          <h2 className="text-xl font-bold">Let&apos;s build this together</h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto leading-relaxed">
            This demo covers your workbook structure across all 12 tabs. Want to
            discuss how the production version would handle multi-user access and
            data sync?
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Available to start this week
          </div>
          <p className="text-sm font-semibold text-primary mt-6">— Humam</p>
        </div>
      </div>
    </div>
  );
}
