import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronDown,
  Target,
  TrendingDown,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";

export const Route = createFileRoute("/skill-gap-analysis")({
  head: () => ({
    meta: [
      {
        title: "Skill Gap Analysis — StatSkill",
      },
      {
        name: "description",
        content:
          "Review competency gaps, compare current and required levels, and identify priority areas for development.",
      },
    ],
  }),
  component: SkillGapAnalysisPage,
});

type Filter =
  | "all"
  | "priority"
  | "Technical"
  | "Statistical"
  | "Governance"
  | "Managerial";

type GapRow = {
  skill: string;
  category: Exclude<Filter, "all" | "priority">;
  description: string;
  currentLevel: number;
  currentLabel: string;
  requiredLevel: number;
  requiredLabel: string;
  gap: number;
  priority: "High" | "Moderate" | "Low" | "On Target";
};

const gapRows: GapRow[] = [
  {
    skill: "Python for Statistical Computing",
    category: "Technical",
    description: "Pandas, NumPy, data processing and automation",
    currentLevel: 2,
    currentLabel: "Foundational",
    requiredLevel: 4,
    requiredLabel: "Advanced",
    gap: -2,
    priority: "High",
  },
  {
    skill: "GIS & Spatial Data Analysis",
    category: "Technical",
    description: "QGIS, spatial mapping and geospatial analysis",
    currentLevel: 2,
    currentLabel: "Foundational",
    requiredLevel: 3,
    requiredLabel: "Intermediate",
    gap: -1,
    priority: "Moderate",
  },
  {
    skill: "National Accounts & GSDP Estimation",
    category: "Statistical",
    description: "National accounts concepts and state estimation methods",
    currentLevel: 2,
    currentLabel: "Foundational",
    requiredLevel: 4,
    requiredLabel: "Advanced",
    gap: -2,
    priority: "High",
  },
  {
    skill: "Survey Design & Sampling",
    category: "Statistical",
    description: "Survey design, stratification and sampling estimation",
    currentLevel: 4,
    currentLabel: "Advanced",
    requiredLevel: 3,
    requiredLabel: "Intermediate",
    gap: 1,
    priority: "Low",
  },
  {
    skill: "Digital Data Governance",
    category: "Governance",
    description: "Data privacy, protection and government data standards",
    currentLevel: 4,
    currentLabel: "Advanced",
    requiredLevel: 3,
    requiredLabel: "Intermediate",
    gap: 1,
    priority: "Low",
  },
  {
    skill: "Field Operations & Quality Control",
    category: "Managerial",
    description: "Field coordination, supervision and quality audits",
    currentLevel: 3,
    currentLabel: "Intermediate",
    requiredLevel: 4,
    requiredLabel: "Advanced",
    gap: -1,
    priority: "Moderate",
  },
];

const domainGaps = [
  {
    domain: "Technical & Analytical",
    gap: 14,
    note: "Python, GIS and automated data workflows",
  },
  {
    domain: "Statistical Sciences",
    gap: 8,
    note: "National accounts and advanced estimation",
  },
  {
    domain: "Managerial & Field Operations",
    gap: 4,
    note: "Field coordination and quality controls",
  },
  {
    domain: "Digital Governance",
    gap: 0,
    note: "Current competency meets the role benchmark",
  },
];

function SkillGapAnalysisPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filteredRows = useMemo(() => {
    if (activeFilter === "all") return gapRows;

    if (activeFilter === "priority") {
      return gapRows.filter(
        (row) => row.priority === "High" || row.priority === "Moderate",
      );
    }

    return gapRows.filter((row) => row.category === activeFilter);
  }, [activeFilter]);

  const priorityGapCount = gapRows.filter(
  (row) => row.gap < 0,
).length;

const highPriorityCount = gapRows.filter(
  (row) => row.priority === "High",
).length;

  const domainsWithGaps = domainGaps.filter((domain) => domain.gap > 0).length;

  return (
    <div className="flex min-h-screen bg-muted/40">
      <DashboardSidebar className="sticky top-0 hidden h-screen lg:flex" />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopBar onMenuClick={() => undefined} />

        <main className="flex-1 px-4 py-8 lg:px-8 lg:py-10">
          <div className="mx-auto max-w-6xl space-y-8">
            {/* Header */}
            <section>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Skill Gap Analysis
              </div>

              <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
                    Understand Your Skill Gaps
                  </h1>

                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    Review where your current competencies differ from the
                    requirements of your role and identify the areas that need
                    focused development.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-card px-4 py-3 text-right shadow-sm">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Benchmark
                  </p>
                  <p className="mt-1 text-sm font-bold text-foreground">
                    DSO Level 3
                  </p>
                </div>
              </div>
            </section>

            {/* Summary */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <SummaryCard
                label="Overall Competency"
                value="74%"
                detail="Current competency across mapped domains"
                icon={<Target className="h-5 w-5" />}
                tone="accent"
              />

              <SummaryCard
                label="Priority Skill Gaps"
                value={`${priorityGapCount}`}
                detail={`${highPriorityCount} high-priority areas require focused development`}
                icon={<AlertTriangle className="h-5 w-5" />}
                tone="danger"
            />

              <SummaryCard
                label="Domains Affected"
                value={`${domainsWithGaps}`}
                detail="Domains currently below the role benchmark"
                icon={<TrendingDown className="h-5 w-5" />}
                tone="neutral"
              />
            </section>

            {/* Domain Gap Chart */}
            <section className="rounded-xl border border-border bg-card p-5 shadow-sm lg:p-6">
              <div className="flex flex-col gap-3 border-b border-border pb-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-foreground">
                    Skill Gap by Domain
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Difference between your current competency and the
                    benchmark for your role.
                  </p>
                </div>

                <div className="text-xs font-medium text-muted-foreground">
                  Larger gap = greater development need
                </div>
              </div>

              <div className="mt-6 h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={domainGaps}
                    layout="vertical"
                    margin={{ top: 4, right: 20, left: 18, bottom: 4 }}
                  >
                    <CartesianGrid
                      horizontal={false}
                      stroke="var(--color-border)"
                    />

                    <XAxis
                      type="number"
                      domain={[0, 20]}
                      tick={{
                        fill: "var(--color-muted-foreground)",
                        fontSize: 11,
                      }}
                      tickFormatter={(value) => `${value}%`}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      type="category"
                      dataKey="domain"
                      width={170}
                      tick={{
                        fill: "var(--color-foreground)",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip
                      cursor={{ fill: "var(--color-muted)" }}
                      formatter={(value) => [`${value}%`, "Gap"]}
                      contentStyle={{
                        borderRadius: "10px",
                        border: "1px solid var(--color-border)",
                        background: "var(--color-card)",
                        boxShadow: "0 8px 24px rgba(15, 41, 66, 0.08)",
                      }}
                    />

                    <Bar
                      dataKey="gap"
                      radius={[0, 6, 6, 0]}
                      barSize={24}
                    >
                      {domainGaps.map((entry) => (
                        <Cell
                          key={entry.domain}
                          fill={
                            entry.gap > 0
                              ? entry.gap >= 10
                                ? "var(--color-destructive)"
                                : "var(--color-accent)"
                              : "var(--color-border)"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
                  High development need
                </span>

                <span className="inline-flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                  Moderate development need
                </span>

                <span className="inline-flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                  At / above benchmark
                </span>
              </div>
            </section>

            {/* Detailed Table */}
            <section className="rounded-xl border border-border bg-card shadow-sm">
              <div className="flex flex-col gap-4 border-b border-border p-5 lg:flex-row lg:items-end lg:justify-between lg:p-6">
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-foreground">
                    Detailed Skill Gaps
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Compare current and required competency levels for each
                    mapped skill.
                  </p>
                </div>

                <div className="text-xs font-semibold text-muted-foreground">
                  {filteredRows.length} skills shown
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2 border-b border-border px-5 py-4 lg:px-6">
                <FilterButton
                  label="All"
                  active={activeFilter === "all"}
                  onClick={() => setActiveFilter("all")}
                />

                <FilterButton
                  label="Priority"
                  active={activeFilter === "priority"}
                  onClick={() => setActiveFilter("priority")}
                />

                <FilterButton
                  label="Technical"
                  active={activeFilter === "Technical"}
                  onClick={() => setActiveFilter("Technical")}
                />

                <FilterButton
                  label="Statistical"
                  active={activeFilter === "Statistical"}
                  onClick={() => setActiveFilter("Statistical")}
                />

                <FilterButton
                  label="Governance"
                  active={activeFilter === "Governance"}
                  onClick={() => setActiveFilter("Governance")}
                />

                <FilterButton
                  label="Managerial"
                  active={activeFilter === "Managerial"}
                  onClick={() => setActiveFilter("Managerial")}
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] text-left">
                  <thead>
                    <tr className="border-b border-border bg-muted/40 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      <th className="px-5 py-4 lg:px-6">Skill</th>
                      <th className="px-5 py-4 lg:px-6">Current</th>
                      <th className="px-5 py-4 lg:px-6">Required</th>
                      <th className="px-5 py-4 lg:px-6">Gap</th>
                      <th className="px-5 py-4 lg:px-6">Priority</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-border">
                    {filteredRows.map((row) => (
                      <tr
                        key={row.skill}
                        className="transition hover:bg-muted/30"
                      >
                        <td className="px-5 py-5 lg:px-6">
                          <div>
                            <p className="text-sm font-bold text-foreground">
                              {row.skill}
                            </p>

                            <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted-foreground">
                              {row.description}
                            </p>

                            <span className="mt-2 inline-flex rounded-md bg-muted px-2 py-1 text-[11px] font-semibold text-muted-foreground">
                              {row.category}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-5 lg:px-6">
                          <p className="text-sm font-bold text-foreground">
                            Level {row.currentLevel}
                          </p>

                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {row.currentLabel}
                          </p>
                        </td>

                        <td className="px-5 py-5 lg:px-6">
                          <p className="text-sm font-bold text-foreground">
                            Level {row.requiredLevel}
                          </p>

                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {row.requiredLabel}
                          </p>
                        </td>

                        <td className="px-5 py-5 lg:px-6">
                          {row.gap < 0 ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-bold text-destructive">
                              <TrendingDown className="h-3.5 w-3.5" />
                              {Math.abs(row.gap)} level
                            </span>
                          ) : row.gap > 0 ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-bold text-success">
                              <Check className="h-3.5 w-3.5" />
                              +{row.gap} level
                            </span>
                          ) : (
                            <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">
                              On Target
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-5 lg:px-6">
                          <PriorityBadge priority={row.priority} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredRows.length === 0 && (
                  <div className="px-6 py-12 text-center">
                    <p className="text-sm font-semibold text-foreground">
                      No matching skill gaps
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Try another filter.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Personalized learning connection */}
            <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm md:flex-row md:items-center md:justify-between lg:p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-accent">
                  Next step
                </p>

                <h2 className="mt-1 text-lg font-bold text-foreground">
                  Turn your gaps into a learning plan
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Explore personalized learning recommendations matched to
                  your identified competency gaps.
                </p>
              </div>

              <button
                type="button"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90"
              >
                View Personalized Learning Paths
                <ArrowRight className="h-4 w-4" />
              </button>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  detail,
  icon,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  icon: React.ReactNode;
  tone: "accent" | "danger" | "neutral";
}) {
  const toneClasses = {
    accent: "bg-accent-soft text-accent",
    danger: "bg-destructive/10 text-destructive",
    neutral: "bg-muted text-muted-foreground",
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-muted-foreground">{label}</p>

        <span
          className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${toneClasses[tone]}`}
        >
          {icon}
        </span>
      </div>

      <p className="mt-5 text-3xl font-extrabold tracking-tight text-foreground">
        {value}
      </p>

      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {detail}
      </p>
    </div>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "inline-flex items-center gap-1.5 rounded-lg bg-muted px-3.5 py-2 text-xs font-bold text-foreground shadow-sm"
          : "inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground"
      }
    >
      {label}

      {label === "Priority" ? (
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${
            active ? "rotate-180" : ""
          }`}
        />
      ) : null}
    </button>
  );
}

function PriorityBadge({
  priority,
}: {
  priority: GapRow["priority"];
}) {
  if (priority === "High") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-destructive">
        <span className="h-2 w-2 rounded-full bg-destructive" />
        High
      </span>
    );
  }

  if (priority === "Moderate") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent">
        <span className="h-2 w-2 rounded-full bg-accent" />
        Moderate
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-success">
      <span className="h-2 w-2 rounded-full bg-success" />
      Low
    </span>
  );
}