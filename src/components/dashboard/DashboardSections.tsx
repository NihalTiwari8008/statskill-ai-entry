import {
  ArrowRight,
  ArrowUp,
  BarChart3,
  Clock,
  GraduationCap,
  Landmark,
  Map,
  Network,
  Play,
  ScrollText,
  Sparkles,
  Star,
  Terminal,
  TrendingUp,
  Upload,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar as RechartRadar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";
import {
  competencyDomains,
  learningPaths,
  officer,
  radarData,
  radarLegend,
  skillGaps,
  summaryStats,
} from "./data";

const iconMap: Record<string, LucideIcon> = {
  analytics: BarChart3,
  terminal: Terminal,
  policy: ScrollText,
  account_tree: Network,
  map: Map,
  account_balance: Landmark,
};

const card = "rounded-xl border border-border bg-card shadow-sm";

function ProgressBar({ value, tone = "accent" }: { value: number; tone?: "accent" | "success" | "destructive" }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div
        className={cn(
          "h-full rounded-full",
          tone === "success" && "bg-success",
          tone === "destructive" && "bg-destructive",
          tone === "accent" && "bg-accent",
        )}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export function WelcomeHeader() {
  return (
    <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-success" />
          {officer.cadre}
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
          Welcome back, Ananya
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{officer.role}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          <Upload className="h-4 w-4" />
          Upload Circular
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
        >
          <Sparkles className="h-4 w-4" />
          Generate AI Quiz
        </button>
      </div>
    </section>
  );
}

export function SummaryStats() {
  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {summaryStats.map((stat) => (
        <div key={stat.label} className={cn(card, "p-5")}>
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-semibold text-muted-foreground">{stat.label}</p>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold",
                stat.tagTone === "success" && "bg-success/10 text-success",
                stat.tagTone === "accent" && "bg-accent-soft text-accent",
                stat.tagTone === "neutral" && "bg-muted text-muted-foreground",
              )}
            >
              {stat.tagTone === "success" && stat.tag.startsWith("+") ? (
                <ArrowUp className="h-3 w-3" />
              ) : stat.tagTone === "neutral" ? (
                <Clock className="h-3 w-3" />
              ) : null}
              {stat.tag}
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-foreground">
              {stat.value}
            </span>
            <span className="text-xs font-medium text-muted-foreground">{stat.valueNote}</span>
          </div>
          <div className="mt-4">
            <ProgressBar value={stat.progress} />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{stat.footnote}</p>
        </div>
      ))}
    </section>
  );
}

export function CompetencyOverview() {
  return (
    <section>
      <h2 className="text-xl font-bold tracking-tight text-foreground">Competency Overview</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Multi-dimensional assessment across core statistical domains against MoSPI Cadre Standards.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {competencyDomains.map((domain) => {
          const Icon = iconMap[domain.icon] ?? BarChart3;
          return (
            <div key={domain.title} className={cn(card, "p-5")}>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-foreground">{domain.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {domain.description}
              </p>
              <p className="mt-5 text-2xl font-extrabold tracking-tight text-foreground">
                {domain.score}%
              </p>
              <div className="mt-3">
                <ProgressBar
                  value={domain.score}
                  tone={domain.tone === "destructive" ? "destructive" : domain.tone === "success" ? "success" : "accent"}
                />
              </div>
              <p
                className={cn(
                  "mt-3 text-xs font-semibold",
                  domain.tone === "success" && "text-success",
                  domain.tone === "destructive" && "text-destructive",
                  domain.tone === "neutral" && "text-muted-foreground",
                )}
              >
                {domain.status}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function CompetencyRadar() {
  return (
    <div className={cn(card, "p-6")}>
      <h2 className="text-lg font-bold tracking-tight text-foreground">
        8-Dimension Competency Radar
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Officer Profile vs Standard DES Cadre Requirement
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-5 text-xs font-semibold text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" /> Current
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/40" /> Cadre Target
        </span>
      </div>

      <div className="mt-2 h-[340px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} outerRadius="72%">
            <PolarGrid stroke="var(--color-border)" />
            <PolarAngleAxis
              dataKey="dimension"
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
            />
            <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
            <RechartRadar
              name="Cadre Target"
              dataKey="target"
              stroke="var(--color-muted-foreground)"
              fill="var(--color-muted-foreground)"
              fillOpacity={0.12}
            />
            <RechartRadar
              name="Current"
              dataKey="current"
              stroke="var(--color-accent)"
              fill="var(--color-accent)"
              fillOpacity={0.22}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {radarLegend.map((entry) => (
          <span
            key={entry.label}
            className={cn(
              "rounded-full border px-2.5 py-1 text-[11px] font-semibold",
              entry.gap
                ? "border-destructive/20 bg-destructive/10 text-destructive"
                : "border-border bg-muted text-muted-foreground",
            )}
          >
            {entry.label}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <p className="text-xs text-muted-foreground">Verified via NSSTA Q4 Cadre Evaluation</p>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
        >
          View Full Audit <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function PrioritySkillGaps() {
  return (
    <div className={cn(card, "p-6")}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-foreground">Priority Skill Gaps</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Mapped to Role Progression Requirements
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-destructive/10 px-2.5 py-1 text-[11px] font-bold text-destructive">
          3 Needs Attention
        </span>
      </div>

      <ul className="mt-5 space-y-4">
        {skillGaps.map((gap) => {
          const Icon = iconMap[gap.icon] ?? Terminal;
          return (
            <li key={gap.title} className="rounded-lg border border-border bg-muted/40 p-4">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-card text-foreground">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-foreground">{gap.title}</h3>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-bold",
                        gap.critical
                          ? "bg-destructive/10 text-destructive"
                          : "bg-accent-soft text-accent",
                      )}
                    >
                      {gap.severity}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Current: <span className="font-semibold text-foreground">{gap.current}</span> ·
                    Required: <span className="font-semibold text-foreground">{gap.required}</span>
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {gap.rationale}
                  </p>
                  <button
                    type="button"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:bg-muted"
                  >
                    Bridge Gap <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function LearningPaths() {
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            AI-Recommended Learning Paths
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Personalized curriculum curated specifically for your role requirements and competency
            deficits.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:underline"
        >
          View All Courses <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {learningPaths.map((path) => (
          <article key={path.title} className={cn(card, "flex flex-col p-5")}>
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-bold text-muted-foreground">
                {path.track}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-foreground">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                {path.rating}
              </span>
            </div>

            <h3 className="mt-4 text-base font-bold leading-snug text-foreground">{path.title}</h3>

            <div className="mt-4 rounded-lg border border-border bg-muted/40 p-3">
              <p className="text-[11px] font-bold uppercase tracking-wide text-accent">
                Why this course?
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{path.reason}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {path.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5" /> {path.level}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5" /> {path.provider}
              </span>
            </div>

            {path.progress > 0 ? (
              <div className="mt-4">
                <ProgressBar value={path.progress} />
              </div>
            ) : null}

            <div className="mt-auto flex items-center justify-between gap-3 pt-5">
              <span className="text-xs font-bold text-muted-foreground">{path.statusLabel}</span>
              <button
                type="button"
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition-colors",
                  path.progress > 0
                    ? "bg-accent text-accent-foreground hover:bg-accent/90"
                    : "border border-border bg-card text-foreground hover:bg-muted",
                )}
              >
                {path.cta}
                {path.progress > 0 ? <Play className="h-3.5 w-3.5" /> : null}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function DashboardFooter() {
  return (
    <footer className="border-t border-border pt-6 text-xs text-muted-foreground">
      <p>
        StatSkill AI · National Statistical Systems Training Academy (NSSTA) & iGOT Karmayogi
        Compliant
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-medium">
        <button type="button" className="hover:text-foreground">
          Privacy Policy
        </button>
        <span>·</span>
        <button type="button" className="hover:text-foreground">
          Cadre Guidelines
        </button>
        <span>·</span>
        <button type="button" className="hover:text-foreground">
          Help & Support
        </button>
      </div>
    </footer>
  );
}
