import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  Flag,
  RotateCcw,
  Sparkles,
  Target,
  Upload,
  XCircle,
} from "lucide-react";

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";

export const Route = createFileRoute("/ai-assessment-quiz")({
  component: AIAssessmentQuizPage,
});

type QuizView = "upload" | "quiz" | "results";

type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  competency: string;
};

type CompetencyInsight = {
  competency: string;
  result: "Strong" | "Needs Practice" | "Improving";
  detail: string;
};

const mockQuestions: QuizQuestion[] = [
  {
    id: 1,
    question:
      "What is the primary purpose of stratified sampling in a large-scale socio-economic survey?",
    options: [
      "To divide the population into meaningful subgroups so that important groups are represented in the sample.",
      "To eliminate the need for any field-level data collection.",
      "To increase the population size before calculating survey weights.",
      "To replace statistical estimation with administrative records.",
    ],
    correctAnswer: 0,
    explanation:
      "Stratified sampling divides a population into relevant subgroups, or strata, and then selects samples from those groups. This can improve representation and sampling efficiency.",
    competency: "Survey Sampling",
  },
  {
    id: 2,
    question:
      "Which activity is most directly associated with improving statistical data quality?",
    options: [
      "Removing all unusual observations without investigation.",
      "Applying validation, consistency, and quality checks during data processing.",
      "Avoiding documentation of processing decisions.",
      "Using only the largest available dataset.",
    ],
    correctAnswer: 1,
    explanation:
      "Systematic validation and quality checks help identify errors, inconsistencies, missing values, and other issues during the statistical production process.",
    competency: "Data Quality",
  },
  {
    id: 3,
    question:
      "Which Python capability is especially useful for preparing and analysing tabular statistical data?",
    options: [
      "Managing physical survey equipment.",
      "Using data-analysis libraries such as pandas to clean and transform datasets.",
      "Issuing government digital signatures.",
      "Configuring network security devices.",
    ],
    correctAnswer: 1,
    explanation:
      "Python libraries such as pandas are widely used for cleaning, transforming, filtering, and analysing structured datasets.",
    competency: "Python",
  },
  {
    id: 4,
    question:
      "Why are metadata standards important for official statistical datasets?",
    options: [
      "They eliminate the need for data validation.",
      "They provide consistent information describing the dataset, definitions, methods, and context.",
      "They prevent all users from accessing the data.",
      "They automatically increase the sample size.",
    ],
    correctAnswer: 1,
    explanation:
      "Metadata helps users understand what the data represents, how it was produced, and how concepts and classifications should be interpreted.",
    competency: "Metadata Standards",
  },
  {
    id: 5,
    question:
      "Which practice best supports reproducible statistical data processing?",
    options: [
      "Documenting processing steps and keeping a traceable record of transformations.",
      "Changing processing steps manually without recording them.",
      "Keeping only the final output and discarding intermediate information.",
      "Avoiding standardised processing procedures.",
    ],
    correctAnswer: 0,
    explanation:
      "Documented and traceable processing steps make statistical workflows easier to reproduce, review, validate, and maintain.",
    competency: "Statistical Data Processing",
  },
  {
    id: 6,
    question:
      "Which statement best describes the role of competency-based assessment?",
    options: [
      "It only measures how many courses an employee has completed.",
      "It compares demonstrated capability with defined competency requirements.",
      "It replaces professional experience with a single test score.",
      "It focuses only on attendance records.",
    ],
    correctAnswer: 1,
    explanation:
      "Competency-based assessment looks at demonstrated knowledge and capability in relation to defined competency expectations or role requirements.",
    competency: "Competency Assessment",
  },
  {
    id: 7,
    question:
      "What is the main purpose of a sampling frame?",
    options: [
      "To list or identify the population units from which a sample can be selected.",
      "To calculate the final national accounts estimate.",
      "To store only completed questionnaires.",
      "To replace survey weights.",
    ],
    correctAnswer: 0,
    explanation:
      "A sampling frame provides the operational list or structure from which sample units can be selected.",
    competency: "Survey Sampling",
  },
  {
    id: 8,
    question:
      "Which measure is commonly used to describe the centre of a numerical dataset?",
    options: [
      "Mean",
      "File size",
      "Encryption key",
      "Sampling frame",
    ],
    correctAnswer: 0,
    explanation:
      "The mean is a common measure of central tendency and is calculated by dividing the sum of observations by the number of observations.",
    competency: "Statistical Analysis",
  },
  {
    id: 9,
    question:
      "What is the primary purpose of data validation rules?",
    options: [
      "To identify values or records that violate expected conditions or constraints.",
      "To remove the need for subject-matter review.",
      "To guarantee that every observation is correct.",
      "To increase the number of records automatically.",
    ],
    correctAnswer: 0,
    explanation:
      "Validation rules identify entries that do not satisfy expected ranges, relationships, formats, or consistency conditions.",
    competency: "Data Quality",
  },
  {
    id: 10,
    question:
      "Which Python data structure is commonly used to store an ordered collection of values?",
    options: [
      "List",
      "Firewall",
      "Digital signature",
      "Metadata standard",
    ],
    correctAnswer: 0,
    explanation:
      "A Python list is an ordered and mutable collection that can store multiple values.",
    competency: "Python",
  },
  {
    id: 11,
    question:
      "What does SQL primarily allow an analyst to do with a relational database?",
    options: [
      "Query and manipulate structured data.",
      "Design a survey questionnaire without data.",
      "Create a sampling frame automatically for every survey.",
      "Replace all statistical methods with machine learning.",
    ],
    correctAnswer: 0,
    explanation:
      "SQL is used to retrieve, filter, aggregate, insert, update, and otherwise manipulate data stored in relational databases.",
    competency: "SQL",
  },
  {
    id: 12,
    question:
      "Why is documentation important in an official statistical production process?",
    options: [
      "It improves transparency, reproducibility, and understanding of methods.",
      "It eliminates the need for quality assurance.",
      "It guarantees that no future revision will ever be needed.",
      "It replaces the underlying statistical methodology.",
    ],
    correctAnswer: 0,
    explanation:
      "Good documentation helps users and reviewers understand methods, decisions, transformations, and sources used during statistical production.",
    competency: "Statistical Processes",
  },
  {
    id: 13,
    question:
      "What is a key benefit of visualizing statistical data?",
    options: [
      "It can make patterns, trends, comparisons, and unusual observations easier to identify.",
      "It eliminates the need to inspect the underlying data.",
      "It guarantees that an interpretation is correct.",
      "It replaces all numerical analysis.",
    ],
    correctAnswer: 0,
    explanation:
      "Well-designed visualizations help analysts and stakeholders recognize patterns, trends, distributions, and comparisons more quickly.",
    competency: "Data Visualization",
  },
  {
    id: 14,
    question:
      "Which concept refers to information that describes another dataset?",
    options: [
      "Metadata",
      "Sample weight",
      "Query result",
      "Encryption token",
    ],
    correctAnswer: 0,
    explanation:
      "Metadata is structured information that describes data, including concepts, definitions, sources, methods, and other contextual information.",
    competency: "Metadata Standards",
  },
  {
    id: 15,
    question:
      "What is the purpose of applying survey weights during statistical estimation?",
    options: [
      "To account for aspects of the sample design and improve population-level estimates.",
      "To convert every observation into the same value.",
      "To remove all sampling variability.",
      "To replace data validation.",
    ],
    correctAnswer: 0,
    explanation:
      "Survey weights can account for selection probabilities and other design features so that estimates better represent the target population.",
    competency: "Survey Sampling",
  },
  {
    id: 16,
    question:
      "Which approach is most appropriate when a dataset contains missing values?",
    options: [
      "Investigate the cause and apply an appropriate documented treatment.",
      "Always replace every missing value with zero.",
      "Delete the entire dataset.",
      "Ignore missingness in every analysis.",
    ],
    correctAnswer: 0,
    explanation:
      "Missing data should be investigated and handled using an appropriate, documented method based on the context and analytical requirements.",
    competency: "Data Quality",
  },
  {
    id: 17,
    question:
      "What is the main purpose of a data dictionary?",
    options: [
      "To describe variables, definitions, formats, and other characteristics of a dataset.",
      "To perform statistical modelling automatically.",
      "To replace the database itself.",
      "To eliminate the need for metadata.",
    ],
    correctAnswer: 0,
    explanation:
      "A data dictionary provides structured information about dataset fields, including names, meanings, formats, and allowed values.",
    competency: "Data Management",
  },
  {
    id: 18,
    question:
      "Which of the following is an example of a categorical variable?",
    options: [
      "Department",
      "Annual income",
      "Age in years",
      "Household expenditure",
    ],
    correctAnswer: 0,
    explanation:
      "Department represents categories or groups, whereas income, age, and expenditure are numerical variables.",
    competency: "Statistical Analysis",
  },
  {
    id: 19,
    question:
      "Why should statistical processing workflows be version controlled?",
    options: [
      "To track changes and improve reproducibility of analytical work.",
      "To automatically correct every statistical error.",
      "To prevent analysts from updating methods.",
      "To eliminate the need for documentation.",
    ],
    correctAnswer: 0,
    explanation:
      "Version control records changes to code and related files, making analytical workflows easier to review, reproduce, and maintain.",
    competency: "Technical & Analytical",
  },
  {
    id: 20,
    question:
      "Which principle is most important when presenting official statistical findings?",
    options: [
      "Present results clearly, accurately, and with appropriate context.",
      "Only present results that support a preferred conclusion.",
      "Remove methodological information from every publication.",
      "Use visual effects instead of statistical evidence.",
    ],
    correctAnswer: 0,
    explanation:
      "Official statistical findings should be communicated accurately and transparently, with enough context for users to interpret them appropriately.",
    competency: "Statistical Communication",
  },
];

const mockInsights: CompetencyInsight[] = [
  {
    competency: "Survey Sampling",
    result: "Strong",
    detail: "Strong understanding demonstrated in the assessment.",
  },
  {
    competency: "Data Quality",
    result: "Needs Practice",
    detail: "Additional targeted practice is recommended.",
  },
  {
    competency: "Python",
    result: "Improving",
    detail: "Performance indicates progress in the technical skill area.",
  },
];

function AIAssessmentQuizPage() {
  const [view, setView] = useState<QuizView>("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);

  const questions = useMemo(
    () => mockQuestions.slice(0, questionCount),
    [questionCount],
  );

  const currentQuestion = questions[currentQuestionIndex];

  const answeredCount = Object.keys(answers).length;

  const correctCount = questions.reduce((count, question) => {
    return (
      count +
      (answers[question.id] === question.correctAnswer ? 1 : 0)
    );
  }, 0);

  const incorrectCount = questions.reduce((count, question) => {
    const answer = answers[question.id];

    if (answer === undefined) {
      return count;
    }

    return count + (answer !== question.correctAnswer ? 1 : 0);
  }, 0);

  const notAttemptedCount = questions.length - answeredCount;

  const score = questions.length
    ? Math.round((correctCount / questions.length) * 100)
    : 0;

  const handleGenerateQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setMarkedForReview([]);
    setView("quiz");
  };

  const handleAnswer = (optionIndex: number) => {
    if (!currentQuestion) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((previous) => previous + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((previous) => previous - 1);
    }
  };

  const handleQuestionJump = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleToggleReview = () => {
    if (!currentQuestion) {
      return;
    }

    setMarkedForReview((previous) =>
      previous.includes(currentQuestion.id)
        ? previous.filter((id) => id !== currentQuestion.id)
        : [...previous, currentQuestion.id],
    );
  };

  const handleSubmit = () => {
    setView("results");
  };

  const handleRestart = () => {
    setView("upload");
    setCurrentQuestionIndex(0);
    setAnswers({});
    setMarkedForReview([]);
  };

  return (
    <div className="flex min-h-screen bg-muted/40">
      <DashboardSidebar className="sticky top-0 hidden h-screen lg:flex" />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopBar onMenuClick={() => undefined} />

        <main className="flex-1 px-4 py-6 lg:px-7 lg:py-7">
          <div className="mx-auto max-w-6xl space-y-5">
            {view === "upload" && (
              <UploadView
                selectedFile={selectedFile}
                questionCount={questionCount}
                difficulty={difficulty}
                onFileSelect={setSelectedFile}
                onQuestionCountChange={setQuestionCount}
                onDifficultyChange={setDifficulty}
                onGenerate={handleGenerateQuiz}
              />
            )}

            {view === "quiz" && currentQuestion && (
              <QuizViewComponent
                questions={questions}
                currentQuestion={currentQuestion}
                currentQuestionIndex={currentQuestionIndex}
                answers={answers}
                answeredCount={answeredCount}
                markedForReview={markedForReview}
                onAnswer={handleAnswer}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onJump={handleQuestionJump}
                onToggleReview={handleToggleReview}
                onSubmit={handleSubmit}
                onBack={() => setView("upload")}
              />
            )}

            {view === "results" && (
              <ResultsView
                questions={questions}
                answers={answers}
                correctCount={correctCount}
                incorrectCount={incorrectCount}
                notAttemptedCount={notAttemptedCount}
                score={score}
                onRestart={handleRestart}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function UploadView({
  selectedFile,
  questionCount,
  difficulty,
  onFileSelect,
  onQuestionCountChange,
  onDifficultyChange,
  onGenerate,
}: {
  selectedFile: File | null;
  questionCount: number;
  difficulty: string;
  onFileSelect: (file: File | null) => void;
  onQuestionCountChange: (count: number) => void;
  onDifficultyChange: (value: string) => void;
  onGenerate: () => void;
}) {
  return (
    <>
      <section>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
          <Sparkles className="h-3 w-3 text-accent" />
          AI-Powered Assessment
        </div>

        <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          AI Assessment Quiz
        </h1>

        <p className="mt-1.5 max-w-2xl text-sm leading-5 text-muted-foreground">
          Upload learning material and generate an objective quiz to test
          understanding and support personalized learning.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-start gap-3 border-b border-border pb-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                <Upload className="h-4 w-4" />
              </div>

              <div>
                <h2 className="text-base font-bold text-foreground">
                  Upload Learning Material
                </h2>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Add content for AI-generated assessment questions.
                </p>
              </div>
            </div>

            <label className="mt-4 block cursor-pointer rounded-lg border-2 border-dashed border-border bg-muted/20 p-7 text-center transition hover:border-accent/40 hover:bg-muted/30">
              <input
                type="file"
                accept=".pdf,.ppt,.pptx,.doc,.docx,.txt,.mp4,.mov,.avi"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  onFileSelect(file);
                }}
              />

              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-card text-accent shadow-sm">
                <Upload className="h-4 w-4" />
              </div>

              <p className="mt-3 text-sm font-semibold text-foreground">
                Drop your learning material here
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                PDF, PowerPoint, Word, text, or supported video
              </p>

              <span className="mt-3 inline-flex rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground">
                Choose File
              </span>
            </label>

            {selectedFile && (
              <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2.5">
                <div className="flex min-w-0 items-center gap-2.5">
                  <FileText className="h-4 w-4 shrink-0 text-accent" />

                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-foreground">
                      {selectedFile.name}
                    </p>

                    <p className="text-[11px] text-muted-foreground">
                      Ready for assessment generation
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onFileSelect(null)}
                  className="shrink-0 rounded-md px-1.5 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Remove file"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="xl:col-span-5">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-start gap-3 border-b border-border pb-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                <Target className="h-4 w-4" />
              </div>

              <div>
                <h2 className="text-base font-bold text-foreground">
                  Quiz Settings
                </h2>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Configure your assessment.
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="question-count"
                  className="text-xs font-semibold text-foreground"
                >
                  Number of questions
                </label>

                <select
                  id="question-count"
                  value={questionCount}
                  onChange={(event) =>
                    onQuestionCountChange(Number(event.target.value))
                  }
                  className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-accent"
                >
                  <option value={10}>10 questions</option>
                  <option value={20}>20 questions</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="difficulty"
                  className="text-xs font-semibold text-foreground"
                >
                  Difficulty
                </label>

                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(event) => onDifficultyChange(event.target.value)}
                  className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-accent"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              

              <button
                type="button"
                onClick={onGenerate}
                disabled={!selectedFile}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" />
                Generate AI Quiz
                <ArrowRight className="h-4 w-4" />
              </button>

              {!selectedFile && (
                <p className="text-center text-[11px] text-muted-foreground">
                  Upload learning material to continue.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function QuizViewComponent({
  questions,
  currentQuestion,
  currentQuestionIndex,
  answers,
  answeredCount,
  markedForReview,
  onAnswer,
  onNext,
  onPrevious,
  onJump,
  onToggleReview,
  onSubmit,
  onBack,
}: {
  questions: QuizQuestion[];
  currentQuestion: QuizQuestion;
  currentQuestionIndex: number;
  answers: Record<number, number>;
  answeredCount: number;
  markedForReview: number[];
  onAnswer: (optionIndex: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onJump: (index: number) => void;
  onToggleReview: () => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const isMarked = markedForReview.includes(currentQuestion.id);
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = Math.round(
    ((currentQuestionIndex + 1) / questions.length) * 100,
  );

  return (
    <>
      <section>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Quiz Setup
        </button>

        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium text-accent">
              AI Assessment Quiz
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
              Adaptive Statistical Assessment
            </h1>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Answer the questions and see how your performance maps to
              competency areas.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5" />
              Self-paced
            </span>

            <span>{answeredCount} answered</span>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-foreground">
              Learning Material Assessment
            </p>

            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Questions generated from your uploaded content
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <span className="text-xs font-semibold text-foreground">
              Q{currentQuestionIndex + 1}/{questions.length}
            </span>

            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-bold text-accent">
              {progress}%
            </span>
          </div>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </section>

      <section className="grid grid-cols-1 items-start gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm lg:p-6">
            <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-orange-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-700">
                  Question {String(currentQuestionIndex + 1).padStart(2, "0")}
                </span>

                <span className="text-[11px] text-muted-foreground">
                  Single Choice · 1 Mark
                </span>
              </div>

              <button
                type="button"
                onClick={onToggleReview}
                className={`inline-flex items-center gap-1 text-xs font-semibold ${
                  isMarked
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Flag className="h-3.5 w-3.5" />
                {isMarked ? "Marked" : "Mark for Review"}
              </button>
            </div>

            <div className="mt-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-accent">
                {currentQuestion.competency}
              </p>

              <h2 className="mt-2 text-xl font-bold leading-7 tracking-tight text-foreground">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="mt-5 space-y-2.5">
              {currentQuestion.options.map((option, index) => {
                const selected =
                  answers[currentQuestion.id] === index;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => onAnswer(index)}
                    className={`flex w-full items-start gap-3 rounded-lg border p-3.5 text-left transition ${
                      selected
                        ? "border-accent bg-accent-soft/40"
                        : "border-border bg-background hover:border-accent/40 hover:bg-muted/30"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                        selected
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span className="text-sm leading-5 text-foreground">
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              <button
                type="button"
                onClick={onPrevious}
                disabled={currentQuestionIndex === 0}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Previous
              </button>

              {isLastQuestion ? (
                <button
                  type="button"
                  onClick={onSubmit}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground hover:bg-accent/90"
                >
                  Submit Assessment
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onNext}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground hover:bg-accent/90"
                >
                  Next
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-20">
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-foreground">
                    Question Navigator
                  </p>

                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    Jump to a question
                  </p>
                </div>

                <span className="text-[11px] font-semibold text-muted-foreground">
                  {questions.length} total
                </span>
              </div>

              <div className="mt-4 grid grid-cols-5 gap-1.5">
                {questions.map((question, index) => {
                  const answered = answers[question.id] !== undefined;
                  const marked = markedForReview.includes(question.id);
                  const active = index === currentQuestionIndex;

                  return (
                    <button
                      key={question.id}
                      type="button"
                      onClick={() => onJump(index)}
                      className={`relative flex h-8 items-center justify-center rounded-md border text-[11px] font-bold transition ${
                        active
                          ? "border-accent bg-accent text-accent-foreground"
                          : answered
                            ? "border-success/30 bg-success/10 text-success"
                            : "border-border bg-background text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {index + 1}

                      {marked && (
                        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-orange-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 space-y-1.5 border-t border-border pt-3 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  Current
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  Answered
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-orange-500" />
                  Marked for review
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}

function ResultsView({
  questions,
  answers,
  correctCount,
  incorrectCount,
  notAttemptedCount,
  score,
  onRestart,
}: {
  questions: QuizQuestion[];
  answers: Record<number, number>;
  correctCount: number;
  incorrectCount: number;
  notAttemptedCount: number;
  score: number;
  onRestart: () => void;
}) {
  const feedback =
    score >= 80
      ? "Strong performance across the assessed material. Continue with targeted learning to reinforce weaker competency areas."
      : score >= 60
        ? "Good progress. Targeted practice in weaker competency areas can strengthen your overall performance."
        : "This assessment highlights competency areas that would benefit from additional learning and practice.";

  return (
    <>
      <section>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium text-accent">
              Assessment Results
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
              Quiz Results
            </h1>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Review your performance, competency insights, and answers.
            </p>
          </div>

          <button
            type="button"
            onClick={onRestart}
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Create Another Quiz
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="lg:col-span-4 lg:border-r lg:border-border lg:pr-5">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Assessment Complete</span>
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              <span className="text-success">Validated</span>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold tracking-tight text-foreground">
                {correctCount}
              </span>

              <span className="text-xl text-muted-foreground">
                / {questions.length}
              </span>

              <span className="rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-bold text-success">
                {score}% Performance
              </span>
            </div>

            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Your responses have been evaluated against the assessment
              answers.
            </p>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-success"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:col-span-8">
            <MetricCard
              label="Correct Answers"
              value={`${correctCount}`}
              detail={`${score}% accuracy`}
              tone="success"
            />

            <MetricCard
              label="Incorrect Answers"
              value={`${incorrectCount}`}
              detail="Review recommended"
              tone="danger"
            />

            <MetricCard
              label="Not Attempted"
              value={`${notAttemptedCount}`}
              detail="Questions left unanswered"
              tone="neutral"
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-accent-soft p-2 text-accent">
            <Sparkles className="h-4 w-4" />
          </div>

          <div>
            <h2 className="text-base font-bold text-foreground">
              Personalized Feedback
            </h2>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {feedback}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Competency Insights
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Performance signals across assessed competency areas.
          </p>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {mockInsights.map((insight) => {
            const tone =
              insight.result === "Strong"
                ? "success"
                : insight.result === "Needs Practice"
                  ? "danger"
                  : "accent";

            return (
              <div
                key={insight.competency}
                className="rounded-lg border border-border bg-muted/20 p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs font-bold text-foreground">
                    {insight.competency}
                  </h3>

                  <span
                    className={
                      tone === "success"
                        ? "rounded-full bg-success/10 px-2 py-1 text-[10px] font-bold text-success"
                        : tone === "danger"
                          ? "rounded-full bg-destructive/10 px-2 py-1 text-[10px] font-bold text-destructive"
                          : "rounded-full bg-accent-soft px-2 py-1 text-[10px] font-bold text-accent"
                    }
                  >
                    {insight.result}
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  {insight.detail}
                </p>
              </div>
            );
          })}
        </div>

        
      </section>

      <section>
        <div>
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Review Your Answers
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Review your response, the correct answer, and the explanation.
          </p>
        </div>

        <div className="mt-4 space-y-3">
          {questions.map((question, index) => {
            const selectedAnswer = answers[question.id];
            const isCorrect =
              selectedAnswer === question.correctAnswer;

            return (
              <div
                key={question.id}
                className="rounded-xl border border-border bg-card p-4 shadow-sm"
              >
                <div className="flex items-start gap-2.5">
                  {isCorrect ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  ) : (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  )}

                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-muted-foreground">
                      Question {index + 1} · {question.competency}
                    </p>

                    <h3 className="mt-1 text-sm font-bold leading-5 text-foreground">
                      {question.question}
                    </h3>
                  </div>
                </div>

                <div className="mt-3 grid gap-2.5 md:grid-cols-2">
                  <div className="rounded-lg bg-muted/30 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Your Answer
                    </p>

                    <p className="mt-1.5 text-xs leading-5 text-foreground">
                      {selectedAnswer !== undefined
                        ? question.options[selectedAnswer]
                        : "Not answered"}
                    </p>
                  </div>

                  <div className="rounded-lg bg-success/5 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-success">
                      Correct Answer
                    </p>

                    <p className="mt-1.5 text-xs leading-5 text-foreground">
                      {question.options[question.correctAnswer]}
                    </p>
                  </div>
                </div>

                <div className="mt-3 border-t border-border pt-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Explanation
                  </p>

                  <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                    {question.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl border border-orange-100 bg-orange-50/60 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-orange-700">
              Next Learning
            </p>

            <h2 className="mt-1 text-base font-bold text-foreground">
              Continue building weaker competency areas
            </h2>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Learning recommendations can be refreshed using assessment
              performance and identified skill gaps.
            </p>
          </div>

          <Link
            to="/learning-paths"
            className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground hover:bg-accent/90"
          >
            View Learning Paths
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </>
  );
}

function MetricCard({
  label,
  value,
  detail,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  tone: "success" | "danger" | "neutral";
}) {
  const wrapper =
    tone === "success"
      ? "bg-success/5 border-success/10"
      : tone === "danger"
        ? "bg-destructive/5 border-destructive/10"
        : "bg-muted/20 border-border";

  const valueClass =
    tone === "success"
      ? "text-success"
      : tone === "danger"
        ? "text-destructive"
        : "text-foreground";

  return (
    <div className={`rounded-lg border p-3.5 ${wrapper}`}>
      <p className="text-[11px] font-medium text-muted-foreground">
        {label}
      </p>

      <p className={`mt-1 text-xl font-extrabold ${valueClass}`}>
        {value}
      </p>

      <p className="mt-0.5 text-[10px] text-muted-foreground">
        {detail}
      </p>
    </div>
  );
}