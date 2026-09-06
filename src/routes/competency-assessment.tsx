import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  GraduationCap,
  Save,
  UserRound,
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";

export const Route = createFileRoute("/competency-assessment")({
  head: () => ({
    meta: [
      {
        title: "Competency Assessment — StatSkill",
      },
      {
        name: "description",
        content:
          "Build your competency profile and receive an AI-powered competency assessment.",
      },
    ],
  }),
  component: CompetencyAssessmentPage,
});

function CompetencyAssessmentPage() {
  const [workExperience, setWorkExperience] = useState(
    "I have worked on state household consumption surveys for 3.5 years, including survey execution, sampling, data validation, and statistical analysis.",
  );

  const [activeView, setActiveView] = useState<"profile" | "assessment">(
    "profile",
  );

  if (activeView === "assessment") {
    return (
      <AssessmentResults
        activeView={activeView}
        onViewChange={setActiveView}
        onReviewProfile={() => setActiveView("profile")}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      <DashboardSidebar className="sticky top-0 hidden h-screen lg:flex" />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopBar onMenuClick={() => undefined} />

        <main className="flex-1 px-4 py-8 lg:px-8 lg:py-10">
          <div className="mx-auto max-w-6xl space-y-8">
            {/* Page Header */}
            <section>
              {/* View Switcher */}
              <div className="grid w-full max-w-2xl grid-cols-2 rounded-xl border border-border bg-card p-1.5 shadow-sm">
                <button
                  type="button"
                  onClick={() => setActiveView("profile")}
                  className={
                    activeView === "profile"
                      ? "w-full rounded-lg bg-muted px-8 py-3.5 text-sm font-bold text-foreground shadow-sm"
                      : "w-full rounded-lg px-8 py-3.5 text-sm font-semibold text-muted-foreground transition hover:bg-muted/60 hover:text-foreground"
                  }
                >
                  Build Your Profile
                </button>

                <button
                  type="button"
                  onClick={() => setActiveView("assessment")}
                  className={
                    activeView === "assessment"
                      ? "w-full rounded-lg bg-accent px-8 py-3.5 text-sm font-bold text-accent-foreground shadow-sm"
                      : "w-full rounded-lg px-8 py-3.5 text-sm font-semibold text-muted-foreground transition hover:bg-muted/60 hover:text-foreground"
                  }
                >
                  AI Competency Assessment
                </button>
              </div>

              {/* Page Heading */}
              <div className="mt-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  Competency Assessment
                </div>

                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
                  Build Your Competency Profile
                </h1>

                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  Tell us about your role, experience and existing skills so StatSkill
                  can assess your competencies and identify skill gaps.
                </p>
              </div>
            </section>

            {/* Main content */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
              {/* Profile Form */}
              <section className="xl:col-span-8">
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-start gap-3 border-b border-border pb-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                      <UserRound className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold tracking-tight text-foreground">
                        Professional Profile
                      </h2>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Your profile information helps map competencies to
                        your role and cadre requirements.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <ProfileField
                      label="Designation"
                      value="Deputy Statistical Officer"
                    />

                    <ProfileField
                      label="Department"
                      value="Directorate of Economics & Statistics"
                    />

                    <ProfileField
                      label="Current Assignment"
                      value="Survey Operations & Data Analysis"
                    />

                    <ProfileField
                      label="Highest Qualification"
                      value="M.Sc. Statistics"
                    />

                    <ProfileField
                      label="Years of Experience"
                      value="3.5 years"
                    />

                    <ProfileField
                      label="Previous Training"
                      value="Survey Methods, Data Quality"
                    />
                  </div>

                  {/* Existing Skills */}
                  <div className="mt-6 border-t border-border pt-6">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-bold text-foreground">
                          Existing Skills
                        </h3>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Skills currently associated with your profile.
                        </p>
                      </div>

                      <GraduationCap className="h-5 w-5 text-muted-foreground" />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {[
                        "Survey Sampling",
                        "Statistical Analysis",
                        "Python",
                        "Data Visualization",
                        "GIS",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-semibold text-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Work Experience */}
                  <div className="mt-6 border-t border-border pt-6">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-bold text-foreground">
                          Work Experience & Responsibilities
                        </h3>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Describe your work so the AI can identify relevant
                          competency signals.
                        </p>
                      </div>

                      <BriefcaseBusiness className="h-5 w-5 text-muted-foreground" />
                    </div>

                    <textarea
                      value={workExperience}
                      onChange={(event) =>
                        setWorkExperience(event.target.value)
                      }
                      rows={7}
                      maxLength={1000}
                      className="mt-4 w-full resize-none rounded-xl border border-border bg-background p-4 text-sm leading-relaxed text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/10"
                      placeholder="Describe your responsibilities, projects, tools used and statistical work..."
                    />

                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 text-success">
                        <Check className="h-3.5 w-3.5" />
                        Profile information detected
                      </span>

                      <span>{workExperience.length}/1000</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Profile Summary */}
              <aside className="xl:col-span-4">
                <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Progress
                      </p>

                      <h2 className="mt-1 text-lg font-bold text-foreground">
                        Profile Completion
                      </h2>
                    </div>

                    <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-bold text-accent">
                      85%
                    </span>
                  </div>

                  <div className="mt-5">
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: "85%" }}
                      />
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {[
                      "Basic Information",
                      "Education & Experience",
                      "Existing Skills",
                      "Previous Training",
                      "Work Experience",
                    ].map((item, index) => {
                      const done = index < 4;

                      return (
                        <div
                          key={item}
                          className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-3"
                        >
                          <span
                            className={
                              done
                                ? "text-sm text-foreground"
                                : "text-sm font-semibold text-foreground"
                            }
                          >
                            {item}
                          </span>

                          {done ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-success">
                              <Check className="h-3.5 w-3.5" />
                              Done
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-accent">
                              Current
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 border-t border-border pt-5">
                    <button
                      type="button"
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
                    >
                      <Save className="h-4 w-4" />
                      Save Draft
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function ProfileField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-foreground">
        {label}
      </label>

      <div className="mt-2 rounded-lg border border-border bg-muted/30 px-3.5 py-3 text-sm text-foreground">
        {value}
      </div>
    </div>
  );
}

function AssessmentResults({
  onReviewProfile,
  activeView,
  onViewChange,
}: {
  onReviewProfile: () => void;
  activeView: "profile" | "assessment";
  onViewChange: (view: "profile" | "assessment") => void;
}) {
  const pipelineSteps = [
    {
      title: "Understanding Role",
      description: "Role and cadre requirements identified.",
    },
    {
      title: "Extracting Skills",
      description: "Relevant skills identified from profile data.",
    },
    {
      title: "Mapping to Framework",
      description: "Competencies mapped to the statistical framework.",
    },
    {
      title: "Comparing Requirements",
      description: "Current levels compared against benchmarks.",
    },
    {
      title: "Identifying Priority Gaps",
      description: "Priority development areas generated.",
    },
  ];

  const competencyResults = [
    {
      label: "Overall Competency",
      value: "74%",
      detail: "Level 3 Proficient",
      note: "Across 14 mapped skills and 4 competency domains.",
      tone: "success",
    },
    {
      label: "Highest-Priority Skill Gap",
      value: "Python & Microdata",
      detail: "14% below benchmark",
      note: "Current 61% · Required 75%",
      tone: "danger",
    },
    {
      label: "Identified Skill Gaps",
      value: "2",
      detail: "Priority domains",
      note: "Technical & Analytical and related survey tools.",
      tone: "danger",
    },
    {
      label: "Strongest Domain",
      value: "Digital Governance",
      detail: "88% Mastery",
      note: "Exceeds the current role benchmark.",
      tone: "success",
    },
  ];

  const profileRows = [
    {
      name: "Statistical Sciences",
      score: 82,
      target: 75,
      status: "Exceeds Benchmark",
      tone: "success",
      skills:
        "Sampling Theory, Survey Weights, Statistical Estimation",
    },
    {
      name: "Technical & Analytical",
      score: 61,
      target: 75,
      status: "Below Benchmark",
      tone: "danger",
      skills: "Python, Data Processing, GIS and Automated ETL",
    },
    {
      name: "Digital Governance",
      score: 88,
      target: 70,
      status: "Exceeds Benchmark",
      tone: "success",
      skills:
        "Data Privacy, Government Data Standards, Digital Governance",
    },
    {
      name: "Managerial & Field Operations",
      score: 76,
      target: 75,
      status: "Meets Benchmark",
      tone: "neutral",
      skills:
        "Field Coordination, Quality Audits, Enumerator Management",
    },
  ];

  return (
    <div className="flex min-h-screen bg-muted/40">
      <DashboardSidebar className="sticky top-0 hidden h-screen lg:flex" />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopBar onMenuClick={() => undefined} />

        <main className="flex-1 px-4 py-8 lg:px-8 lg:py-10">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="grid w-full max-w-2xl grid-cols-2 rounded-xl border border-border bg-card p-1.5 shadow-sm">
              <button
                type="button"
                onClick={() => onViewChange("profile")}
                className={
                  activeView === "profile"
                    ? "w-full rounded-lg bg-muted px-8 py-3.5 text-sm font-bold text-foreground shadow-sm"
                    : "w-full rounded-lg px-8 py-3.5 text-sm font-semibold text-muted-foreground transition hover:bg-muted/60 hover:text-foreground"
                }
              >
                Build Your Profile
              </button>

              <button
                type="button"
                onClick={() => onViewChange("assessment")}
                className={
                  activeView === "assessment"
                    ? "w-full rounded-lg bg-accent px-8 py-3.5 text-sm font-bold text-accent-foreground shadow-sm"
                    : "w-full rounded-lg px-8 py-3.5 text-sm font-semibold text-muted-foreground transition hover:bg-muted/60 hover:text-foreground"
                }
              >
                AI Competency Assessment
              </button>
            </div>

            {/* Header */}
            <section>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                    <Check className="h-3.5 w-3.5" />
                    Assessment Complete
                  </div>

                  <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
                    Assessing Your Competencies
                  </h1>

                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    Your profile, experience and learning history have been
                    evaluated against the competency framework for your role.
                  </p>
                </div>

                <div className="text-right text-xs text-muted-foreground">
                  <p>MoSPI–NSSTA Framework</p>
                  <p className="mt-1 font-semibold text-foreground">
                    DSO Level 3
                  </p>
                </div>
              </div>
            </section>

            {/* AI Synthesis Pipeline */}
            <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    AI Assessment
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-foreground">
                    Assessment Synthesis
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Your competency profile has been mapped and compared
                    against role requirements.
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-success/10 px-3 py-1 text-xs font-bold text-success lg:self-auto">
                  <Check className="h-3.5 w-3.5" />
                  5/5 steps complete
                </span>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-5">
                {pipelineSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-lg border border-border bg-muted/40 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Step {index + 1}
                      </span>

                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-success-foreground">
                        <Check className="h-3 w-3" />
                      </span>
                    </div>

                    <h3 className="mt-3 text-sm font-bold leading-snug text-foreground">
                      {step.title}
                    </h3>

                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Results */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {competencyResults.map((result) => (
                <div
                  key={result.label}
                  className="rounded-xl border border-border bg-card p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-muted-foreground">
                      {result.label}
                    </p>

                    <span
                      className={
                        result.tone === "success"
                          ? "rounded-full bg-success/10 px-2 py-1 text-[11px] font-bold text-success"
                          : "rounded-full bg-destructive/10 px-2 py-1 text-[11px] font-bold text-destructive"
                      }
                    >
                      {result.tone === "success"
                        ? "Healthy"
                        : "Attention"}
                    </span>
                  </div>

                  <p className="mt-4 truncate text-2xl font-extrabold tracking-tight text-foreground">
                    {result.value}
                  </p>

                  <p
                    className={
                      result.tone === "success"
                        ? "mt-1 text-xs font-bold text-success"
                        : "mt-1 text-xs font-bold text-destructive"
                    }
                  >
                    {result.detail}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {result.note}
                  </p>
                </div>
              ))}
            </section>

            {/* Methodology */}
            <section className="rounded-xl border border-border bg-card p-5 shadow-sm lg:p-6">
              <div className="flex flex-col gap-3 border-b border-border pb-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    Assessment Basis & Methodology
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    How your competency profile is evaluated.
                  </p>
                </div>

                <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                  14 mapped skills · 4 domains
                </span>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    title: "Profile",
                    text: "Designation, department, education and experience establish your competency context.",
                  },
                  {
                    title: "Experience",
                    text: "Work responsibilities and existing skills identify relevant competency signals.",
                  },
                  {
                    title: "Framework",
                    text: "Signals are mapped to competency requirements associated with your role and cadre.",
                  },
                  {
                    title: "Comparison",
                    text: "Current competency levels are compared with predefined role benchmarks to identify gaps.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-lg bg-muted/40 p-4"
                  >
                    <h3 className="text-sm font-bold text-foreground">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Extracted Competency Profile */}
            <section className="rounded-xl border border-border bg-card p-5 shadow-sm lg:p-6">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-5">
                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    Extracted Competency Profile
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Current competency levels compared with role benchmarks.
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                    Your Score
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/50" />
                    Cadre Target
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                {profileRows.map((row) => (
                  <div key={row.name}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">
                          {row.name}
                        </span>

                        <span
                          className={
                            row.tone === "success"
                              ? "rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success"
                              : row.tone === "danger"
                                ? "rounded-full bg-destructive/10 px-2 py-0.5 text-[11px] font-semibold text-destructive"
                                : "rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground"
                          }
                        >
                          {row.status}
                        </span>
                      </div>

                      <span className="text-sm font-bold text-foreground">
                        {row.score}%
                        <span className="ml-1 text-xs font-medium text-muted-foreground">
                          / {row.target}% target
                        </span>
                      </span>
                    </div>

                    <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className={
                          row.tone === "danger"
                            ? "h-full rounded-full bg-accent"
                            : "h-full rounded-full bg-success"
                        }
                        style={{ width: `${row.score}%` }}
                      />
                    </div>

                    <div className="mt-1.5 flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
                      <span>{row.skills}</span>

                      <span>
                        {row.score >= row.target
                          ? `+${row.score - row.target}%`
                          : `${row.score - row.target}%`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Immediate Next Steps */}
            <section className="rounded-xl border border-border bg-card p-5 shadow-sm lg:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    Immediate Next Steps
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Recommended actions based on your assessment.
                  </p>
                </div>

                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent">
                  Personalized
                </span>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="rounded-lg border border-border bg-muted/40 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-accent">
                    Priority Learning
                  </p>

                  <h3 className="mt-2 text-base font-bold text-foreground">
                    Strengthen Python & Microdata Skills
                  </h3>

                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    Focus on data processing, validation and automated
                    workflows aligned with your identified technical gap.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-muted/40 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-success">
                    Practice
                  </p>

                  <h3 className="mt-2 text-base font-bold text-foreground">
                    Reinforce Statistical Data Validation
                  </h3>

                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    Continue with targeted assessments to reinforce competency
                    in survey and data-quality workflows.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
                <button
                  type="button"
                  onClick={onReviewProfile}
                  className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  Review My Profile
                </button>

                <Link
                  to="/skill-gap-analysis"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90"
                >
                  View My Skill Gaps
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}