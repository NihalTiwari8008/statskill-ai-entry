import { useState } from "react";
import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Filter,
  GraduationCap,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";

type LearningPathStatus = "Recommended" | "In Progress" | "Completed";

type LearningPath = {
  id: number;
  title: string;
  description: string;
  whyRecommended: string;
  provider: "iGOT" | "NSSTA";
  category: string;
  duration: string;
  skills: string[];
  status: LearningPathStatus;
  progress: number;
  priority: "High" | "Medium";
};

const learningPaths: LearningPath[] = [
  {
    id: 1,
    title: "Python for Official Statistics",
    description:
      "Build practical Python skills for statistical data processing, analysis, and automation.",
    whyRecommended:
      "Your current Python competency is below the expected level for your role and is one of your highest-priority technical gaps.",
    provider: "iGOT",
    category: "Technical",
    duration: "8 hours",
    skills: ["Python", "Data Analysis", "Automation"],
    status: "Recommended",
    progress: 0,
    priority: "High",
  },
  {
    id: 2,
    title: "Data Quality and Metadata Standards",
    description:
      "Strengthen your understanding of data quality frameworks, metadata, and statistical standards.",
    whyRecommended:
      "Your competency profile shows a gap in statistical data quality practices relevant to your current assignment.",
    provider: "NSSTA",
    category: "Statistical",
    duration: "6 hours",
    skills: ["Data Quality", "Metadata", "Standards"],
    status: "Recommended",
    progress: 0,
    priority: "High",
  },
  {
    id: 3,
    title: "SQL for Data Management",
    description:
      "Develop practical SQL capabilities for querying, transforming, and managing statistical datasets.",
    whyRecommended:
      "SQL is an identified technical development area that can improve your ability to work with administrative and statistical data.",
    provider: "iGOT",
    category: "Technical",
    duration: "5 hours",
    skills: ["SQL", "Data Management"],
    status: "In Progress",
    progress: 42,
    priority: "Medium",
  },
  {
    id: 4,
    title: "Effective Data Visualization",
    description:
      "Learn how to communicate statistical findings through clear and effective visualizations.",
    whyRecommended:
      "Improving data visualization will strengthen your ability to communicate analytical findings to stakeholders.",
    provider: "iGOT",
    category: "Technical",
    duration: "4 hours",
    skills: ["Visualization", "Communication"],
    status: "Completed",
    progress: 100,
    priority: "Medium",
  },
];

const filters: Array<"All" | LearningPathStatus> = [
  "All",
  "Recommended",
  "In Progress",
  "Completed",
];

function StatusBadge({ status }: { status: LearningPathStatus }) {
  const styles = {
    Recommended: "bg-orange-50 text-orange-700 border-orange-100",
    "In Progress": "bg-blue-50 text-blue-700 border-blue-100",
    Completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function LearningPathCard({
  path,
}: {
  path: LearningPath;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <BookOpen className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-[#0F2942]">
                {path.title}
              </h3>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                <span>{path.provider}</span>

                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5" />
                  {path.duration}
                </span>

                <span>{path.category}</span>
              </div>
            </div>
          </div>

          <StatusBadge status={path.status} />
        </div>

        <p className="text-sm leading-6 text-slate-600">
          {path.description}
        </p>

        <div className="rounded-xl bg-slate-50 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-orange-500">
              <Sparkles className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Why this is recommended
              </p>

              <p className="mt-1.5 text-sm leading-6 text-slate-700">
                {path.whyRecommended}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {path.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600"
            >
              {skill}
            </span>
          ))}
        </div>

        {path.status === "In Progress" && (
          <div>
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-600">
                Learning progress
              </span>
              <span className="font-semibold text-[#0F2942]">
                {path.progress}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-orange-500 transition-all"
                style={{ width: `${path.progress}%` }}
              />
            </div>
          </div>
        )}

        {path.status === "Completed" && (
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
            Learning path completed
          </div>
        )}

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Target className="h-4 w-4" />
            {path.priority} priority
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-700"
          >
            {path.status === "In Progress"
              ? "Continue Learning"
              : path.status === "Completed"
                ? "View Learning Path"
                : "View Learning Path"}

            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function LearningPathsPage() {
  const [activeFilter, setActiveFilter] =
    useState<"All" | LearningPathStatus>("All");

  const filteredPaths =
    activeFilter === "All"
      ? learningPaths
      : learningPaths.filter((path) => path.status === activeFilter);

  const recommendedCount = learningPaths.filter(
    (path) => path.status === "Recommended",
  ).length;

  const inProgressCount = learningPaths.filter(
    (path) => path.status === "In Progress",
  ).length;

  const completedCount = learningPaths.filter(
    (path) => path.status === "Completed",
  ).length;

  return (
  <div className="min-h-screen bg-[#F8FAFC]">
    <DashboardSidebar className="fixed inset-y-0 left-0 z-30 hidden w-72 lg:flex" />

<div className="min-h-screen lg:pl-72">
      <DashboardTopBar />

      <main className="px-6 py-8 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Page header */}
            <section className="mb-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="mb-2 text-sm font-medium text-orange-600">
                    Personalized Learning
                  </p>

                  <h1 className="text-3xl font-semibold tracking-tight text-[#0F2942]">
                    Learning Paths
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    Learning recommendations tailored to your competency gaps,
                    role, priorities, and professional development needs.
                  </p>
                </div>

                <Link
                  to="/skill-gap-analysis"
                  className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-[#0F2942] transition-colors hover:bg-slate-50"
                >
                  <Target className="h-4 w-4" />
                  Review Skill Gaps
                </Link>
              </div>
            </section>

            {/* Learning overview */}
            <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      Recommended for you
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-[#0F2942]">
                      {recommendedCount}
                    </p>
                  </div>

                  <div className="rounded-xl bg-orange-50 p-2.5 text-orange-600">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500">In progress</p>
                    <p className="mt-2 text-2xl font-semibold text-[#0F2942]">
                      {inProgressCount}
                    </p>
                  </div>

                  <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Completed</p>
                    <p className="mt-2 text-2xl font-semibold text-[#0F2942]">
                      {completedCount}
                    </p>
                  </div>

                  <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                </div>
              </div>

            <div className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm lg:ml-auto lg:max-w-[180px]">
                <div className="flex items-center justify-between gap-2">
                    <div>
                    <p className="text-[11px] font-medium text-slate-500">
                        Focus areas
                    </p>
                    <p className="mt-0.5 text-lg font-semibold text-[#0F2942]">
                        3
                    </p>
                    </div>

                    <div className="rounded-lg bg-slate-100 p-1.5 text-slate-600">
                    <GraduationCap className="h-3.5 w-3.5" />
                    </div>
                </div>
                </div>
            </section>

           

            {/* Filters */}
            <section className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#0F2942]">
                  Your Learning Paths
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Explore recommendations and continue your active learning.
                </p>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1">
                <div className="px-2 text-slate-400">
                  <Filter className="h-4 w-4" />
                </div>

                {filters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      activeFilter === filter
                        ? "bg-[#0F2942] text-white"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </section>

            {/* Learning path cards */}
            <section className="grid gap-5 xl:grid-cols-2">
              {filteredPaths.map((path) => (
                <LearningPathCard key={path.id} path={path} />
              ))}
            </section>

            {filteredPaths.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                <BookOpen className="mx-auto h-8 w-8 text-slate-400" />

                <h3 className="mt-4 text-base font-semibold text-[#0F2942]">
                  No learning paths in this category
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Try another filter to view your available learning paths.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/learning-paths")({
  component: LearningPathsPage,
});