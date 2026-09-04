/**
 * Mock prototype data for the Learner Dashboard.
 * All values are illustrative only — no real APIs, services or records.
 */

export const officer = {
  name: "Ananya Sharma",
  shortRole: "Dy. Statistical Officer",
  role: "Deputy Statistical Officer · Directorate of Economics and Statistics",
  cadre: "Cadre DES Maharashtra · Mantralaya",
  cadreId: "Federated Node v2.4 · Cadre ID DES-MH-2018",
  syncLabel: "MoSPI-DES Sync Active",
};

export const summaryStats = [
  {
    label: "Overall Competency",
    tag: "+6%",
    tagTone: "success" as const,
    value: "74%",
    valueNote: "Level 3 Proficient",
    footnote: "DES State Average: 68%",
    progress: 74,
  },
  {
    label: "Learning Progress",
    tag: "On Track",
    tagTone: "success" as const,
    value: "68%",
    valueNote: "across active tracks",
    footnote: "Blended NSSTA & iGOT modules",
    progress: 68,
  },
  {
    label: "Total Learning Hours",
    tag: "Logged",
    tagTone: "neutral" as const,
    value: "42.5",
    valueNote: "hrs",
    footnote: "Logged this fiscal year (Target: 50 hrs)",
    progress: 85,
  },
  {
    label: "Active Paths",
    tag: "In Progress",
    tagTone: "accent" as const,
    value: "2",
    valueNote: "tracks in remedial",
    footnote: "Python Automation & GIS Spatial",
    progress: 50,
  },
];

export const competencyDomains = [
  {
    icon: "analytics",
    title: "Statistical Sciences",
    description: "Survey Sampling, Price Statistics & SDG Metrics",
    score: 82,
    status: "Exceeds Benchmark (80%)",
    tone: "success" as const,
  },
  {
    icon: "terminal",
    title: "Technical & Analytical",
    description: "SPSS, Python scripting & GIS Spatial micro-data",
    score: 61,
    status: "Gap: -14% (Target: 75%)",
    tone: "destructive" as const,
  },
  {
    icon: "policy",
    title: "Digital Governance",
    description: "DPDP Act 2023, Metadata Standards & DPI",
    score: 88,
    status: "Exceeds Benchmark (70%)",
    tone: "success" as const,
  },
  {
    icon: "account_tree",
    title: "Managerial & Field Lead",
    description: "Field Enumeration, Coordination & Quality Audits",
    score: 76,
    status: "Meets Benchmark (75%)",
    tone: "neutral" as const,
  },
];

export const radarData = [
  { dimension: "Survey Sampling", current: 88, target: 80 },
  { dimension: "Visualization", current: 75, target: 75 },
  { dimension: "Python", current: 42, target: 75 },
  { dimension: "Nat. Accounts", current: 52, target: 75 },
  { dimension: "Price Stats", current: 80, target: 75 },
  { dimension: "SDG Metrics", current: 90, target: 80 },
  { dimension: "GIS Spatial", current: 48, target: 75 },
  { dimension: "Governance", current: 85, target: 70 },
];

export const radarLegend = [
  { label: "Survey Sampling (88%)", gap: false },
  { label: "Visualization (75%)", gap: false },
  { label: "Python (42% GAP)", gap: true },
  { label: "Nat. Accounts (52%)", gap: false },
  { label: "Price Stats (80%)", gap: false },
  { label: "SDG Metrics (90%)", gap: false },
  { label: "GIS Spatial (48% GAP)", gap: true },
  { label: "Governance (85%)", gap: false },
];

export const skillGaps = [
  {
    icon: "terminal",
    title: "Python for Survey Automation & Data Cleaning",
    severity: "-2 Levels",
    current: "Level 1 (Beginner)",
    required: "Level 3 (Operational)",
    rationale:
      "Required for automated validation of 79th Round NSSO unit-level data without manual script reliance.",
    critical: true,
  },
  {
    icon: "map",
    title: "GIS & Spatial Data Systems",
    severity: "-1 Level",
    current: "Level 2 (Developing)",
    required: "Level 3 (Operational)",
    rationale:
      "Needed for integrating PM Gati Shakti geospatial layers with village-level micro-data reports.",
    critical: false,
  },
  {
    icon: "account_balance",
    title: "National Accounts & GSDP Disaggregation",
    severity: "-1 Level",
    current: "Level 2 (Developing)",
    required: "Level 3 (Operational)",
    rationale:
      "Calculation of constant base price methodology for upcoming State Budget documentation.",
    critical: false,
  },
];

export const learningPaths = [
  {
    track: "NSSTA & iGOT Track",
    rating: "4.9",
    title: "Advanced Python for Official Statistics & NSSO Tabulation",
    reason:
      "Recommended because your Python competency is Level 1 while Level 3 is required for your current role.",
    duration: "6 Weeks",
    level: "Intermediate",
    provider: "NSSTA",
    progress: 35,
    statusLabel: "35% Completed",
    cta: "Resume Module",
  },
  {
    track: "Digital India Cadre",
    rating: "4.8",
    title: "Spatial Data Analytics using QGIS for District Planning",
    reason:
      "Recommended because your GIS Spatial competency is Level 2 while Level 3 is required for District Micro-Data Planning.",
    duration: "4 Weeks",
    level: "Intermediate",
    provider: "NIC & iGOT",
    progress: 0,
    statusLabel: "New Track",
    cta: "Enroll Now",
  },
  {
    track: "MoSPI Standard Series",
    rating: "4.7",
    title: "National Accounts Statistics & State Domestic Product (GSDP)",
    reason:
      "Resolves moderate deficit in GSDP constant price methodology calculation prior to the upcoming State Budget.",
    duration: "3 Weeks",
    level: "Intermediate",
    provider: "NSSTA",
    progress: 0,
    statusLabel: "Cadre Requirement",
    cta: "Enroll Now",
  },
];
