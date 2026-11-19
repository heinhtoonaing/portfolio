// ============================================================
// PORTFOLIO DATA — edit this file to update the whole site
// ISSA Assess details verified against the SP2 final report and
// the delivered codebase (Sep 2026). The public GitHub repo for
// ISSA holds an earlier phase — see the note on that project.
// LSTM details verified against the repository notebook.
// Food Recommendation System has no public repo yet — entry is
// intentionally minimal until the code is pushed.
// Education verified against the final graduation checklist
// (BSCS–IDS sheet, all grades released): 132/132 credits, final
// GPA 2.8 (recomputed 2.775 from the transcript — matches).
// Nothing here is invented.
// ============================================================

export const profile = {
  name: "Hein Htoo Naing",
  roleLine: "Computer Science Graduate · Full-Stack Development · Data & Machine Learning",
  university: "Assumption University of Thailand",
  location: "Bangkok, Thailand",
  github: "https://github.com/heinhtoonaing",
  githubHandle: "heinhtoonaing",
  // Professional email — shown in the Contact section as a mailto button.
  email: "heinhtoonaing105@gmail.com",
  // TODO(pin): add your LinkedIn URL if it is current — omitted until provided.
  linkedin: "",
  heroP1:
    "I recently completed my B.Sc. in Computer Science at Assumption University in Bangkok. I build web applications and data-driven projects — most recently a two-person senior project that delivers and scores workplace language assessments in English and Thai.",
  heroP2:
    "I'm looking for a software engineering internship where I can work on real projects and learn from experienced developers.",
  about: [
    "I recently completed my Computer Science degree at Assumption University (Informatics and Data Science concentration). I focus on software engineering, data, and practical application development.",
    "Most of my learning comes from building projects: designing database schemas, implementing application logic, wiring up machine-learning pipelines, and working through the problems that appear when different parts of a system need to work together.",
    "My senior project — ISSA Assess, built with one teammate for a real staffing company — taught me the full loop: requirements from a real organization, architecture across two codebases, automated scoring, testing, and fixing what breaks when real users hit the system.",
    "I'm still developing my skills, and I treat each project as an opportunity to get better at writing code, solving problems, and building software people can actually use.",
  ],
  facts: [
    { label: "Degree", value: "B.Sc. Computer Science, Assumption University of Thailand (completed)" },
    { label: "Concentration", value: "Informatics and Data Science" },
    { label: "Based in", value: "Bangkok, Thailand" },
    { label: "GitHub", value: "github.com/heinhtoonaing", href: "https://github.com/heinhtoonaing" },
    { label: "Open to", value: "Software engineering internships" },
  ],
};

// ---------- status types ----------
export type ProjectStatus =
  | "Senior project — prototype delivered"
  | "Deployed"
  | "In development"
  | "Prototype"
  | "Completed"
  | "Course project"
  | "Tool";

export const statusDotColor: Record<ProjectStatus, string> = {
  "Senior project — prototype delivered": "bg-emerald-600",
  Deployed: "bg-emerald-600",
  "In development": "bg-amber-500",
  Prototype: "bg-stone-400",
  Completed: "bg-emerald-600",
  "Course project": "bg-stone-400",
  Tool: "bg-stone-400",
};

export type CaseImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type FeaturedProject = {
  title: string;
  tagline: string;
  /** One sentence: the problem this project addresses. */
  problem: string;
  status: ProjectStatus;
  /** Verified facts about the build: who, scale, and what was implemented. */
  contributions: string[];
  /** Verified results — only claims that trace back to the report, code, or charts. */
  results?: string[];
  /** Honest limitations, only where they are documented. */
  limitations?: string[];
  tech: string[];
  github?: string;
  live?: string;
  images?: CaseImage[];
  note?: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    title: "ISSA Assess",
    tagline:
      "Workplace language assessment platform for English and Thai — two-person senior project for ISSA Solutions, a hospitality staffing company (advisor: Dr. Phyo Min Tun)",
    problem:
      "ISSA screens hospitality candidates in unstructured interviews, so two recruiters can judge the same person differently and no record exists to justify either decision — and commercial tests like TOEIC don't report on ISSA's own proficiency levels.",
    status: "Senior project — prototype delivered",
    contributions: [
      "Built the platform as a Next.js 16 application with three role-based workspaces — candidate test runner, recruiter workspace, admin console — 44 API route files and 20 Prisma models over SQLite, with NextAuth credentials auth and bcrypt.",
      "Implemented the assessment-generation engine: a recruiter creates a job requisition, and the system assembles a timed six-section test (Grammar, Vocabulary, Reading, Listening, Writing, Speaking) from a curated 228-question bank — filtering by language and job category, targeting the required ISSA level, and filling a time-based blueprint (8 min reserved for Writing, 5 for Speaking, ~2 min per objective item, max five items per section). The generated test is frozen as its own record, so later edits to the bank never change a test a candidate already took.",
      "Built the separate Python FastAPI scoring service for Writing and Speaking: ffmpeg re-encoding, Speechmatics transcription, then rule-based grammar counting (LanguageTool for English; spelling anomalies and repeated words via PyThaiNLP for Thai) and vocabulary leveling (CEFR-J word lists for English; Thai National Corpus frequency for Thai), combined 50/50 with a short-answer substance factor. Deliberately non-generative — every output is a count, level, or percentage, and no language model writes scores.",
      "Implemented reporting and review: overall ISSA level L1–L5 against admin-editable thresholds, per-skill levels on ISSA's rubric (Speaking 1–5; Listening/Reading/Writing 1–3), recruiter approve-or-flag with transcripts visible, and an append-only audit log for every consequential action.",
      "Implemented the ATS integration layer: Bearer-key REST endpoints (JSON/CSV) and HMAC-SHA256-signed webhooks, with hashed keys and role-based access.",
      "Wrote the test suite: 74 pytest unit tests for the scoring service and 35 Bun tests for the web app (language-validity guard, voice-mode answer matching), plus 14 end-to-end functional scenarios run against a real database.",
    ],
    results: [
      "Chose the speech-to-text provider by measurement, not marketing: a WER/CER harness on ten Thai clips — Speechmatics transcribed all five single-word clips exactly and reached a mean WER of 0.27 (CER 0.12) on five news-style sentences.",
      "The full platform was used by visitors at the senior project exhibition on 25 Sep 2026 — the demo covered the whole loop: requisition → invite → timed test with recorded answers → recruiter review → pulling the result from another machine via the integration API.",
      "Exhibition load testing surfaced three real bugs, all fixed: scoring stalled under concurrent submissions (retry limit raised to 40 plus a background sweep that rescues unfinished attempts), off-topic short answers scored too high (substance factor added), and Safari/iPhone recordings were rejected by the ASR (ffmpeg re-encode).",
      "At time of writing the database held the 228-question bank, 39 user accounts, 47 invitations, and 44 attempts (41 fully scored) from testing and the exhibition.",
    ],
    limitations: [
      "Level thresholds and scoring weights are explicitly labelled placeholders pending calibration with ISSA examiners — the platform is a calibratable base, not a production hiring judge.",
      "The ASR test set is ten clips from one native speaker, so it justified a provider choice but says nothing about accuracy on accented, non-native speech — ISSA's real case.",
      "Answer relevance is not checked, and wrong-language speech is only caught when the transcript comes back in the wrong script.",
    ],
    tech: [
      "TypeScript",
      "Next.js 16",
      "React",
      "Prisma (SQLite)",
      "NextAuth",
      "Python 3.11",
      "FastAPI",
      "Speechmatics",
      "PyThaiNLP",
      "LanguageTool",
      "Tailwind CSS",
      "shadcn/ui",
      "pytest",
      "Bun test",
    ],
    github: "https://github.com/heinhtoonaing/issa-assess",
    // TODO(pin): the public repo currently holds an earlier phase of this project.
    // Push the delivered SP2 codebase (or a sanitized version) and this link is accurate.
    images: [
      {
        src: "/projects/issa-system-architecture.png",
        alt: "System architecture of ISSA Assess: Next.js presentation and application tiers, a Python FastAPI language scoring service, SQLite data tier, and external services",
        caption: "System architecture — from the SP2 final report (Figure 4-1).",
        width: 1259,
        height: 639,
      },
      {
        src: "/projects/issa-scoring-pipeline.png",
        alt: "Scoring pipeline: objective items marked against answer keys, Writing and Speaking scored by the Python service, and the report completed after recruiter review",
        caption: "Scoring pipeline after a candidate submits (Figure 4-11).",
        width: 1259,
        height: 656,
      },
    ],
    note: "The public GitHub repository currently contains an earlier phase of this project; the full delivered codebase is not pushed yet. Data above is from the SP2 final report and the delivered source.",
  },
  {
    title: "Food Recommendation System",
    tagline: "A data-driven food recommendation application",
    problem:
      "Choosing what to eat from a large set of options is time-consuming — the project explores whether preference-based recommendation can narrow the choice automatically.",
    status: "Prototype",
    contributions: [
      "Prepared and explored the dataset with pandas before modeling.",
      "Implemented the recommendation logic with scikit-learn.",
      "Built the Streamlit interface that feeds user input to the model and displays the recommendations.",
      "Tested the outputs and iterated on the presentation of results.",
    ],
    tech: ["Python", "pandas", "scikit-learn", "Streamlit"],
    // TODO(pin): repository is not public yet — add the GitHub URL and a real
    // interface screenshot when available. No visual is shown until then.
    note: "Repository is not public yet, so this entry intentionally has no source link or screenshot. I'll add both once the repo is pushed.",
  },
  {
    title: "LSTM Time-Series Prediction",
    tagline: "Air-quality forecasting for Samut Prakan, Thailand",
    problem:
      "PM2.5 pollution in Thailand spikes every smog season (December–April); the project tests whether an LSTM network can learn those temporal patterns and forecast daily levels.",
    status: "Completed",
    contributions: [
      "Prepared the dataset: 30,313 hourly PM2.5 readings for Samut Prakan (Berkeley Earth / PCD Thailand, March 2016 – January 2020), cleaned and resampled to daily averages, then scaled to the 0–1 range with MinMaxScaler.",
      "Built the supervised framing: sliding windows of 60 previous days used to predict the next day, split chronologically 80/20 into train and test sets.",
      "Designed and trained the model in TensorFlow/Keras: two stacked LSTM layers (50 units) with dropout (0.2) and a dense output, compiled with the Adam optimizer and mean-squared-error loss, trained for 25 epochs (final training loss ≈ 0.0114 in the scaled 0–1 space).",
      "Evaluated visually by plotting predicted vs actual PM2.5 across the test split, then generated a 30-day forward forecast by feeding each prediction back into the model.",
    ],
    results: [
      "The model tracks the broad seasonal shape of the test period in the actual-vs-predicted chart, and the 30-day forecast continues the seasonal pattern from the last 60 days of training data.",
      "No separate numeric test metrics (RMSE/MAE) were computed — evaluation is the visual comparison shown here, and I won't quote accuracy numbers that don't exist.",
    ],
    limitations: [
      "Single-feature model: it sees only past PM2.5, no weather or traffic data, so it cannot anticipate atypical events.",
      "The 30-day forecast is recursive — each step feeds its own prediction back in, so errors compound the further it goes.",
      "Training loss is MSE on 0–1-scaled values, which is not interpretable as an error in µg/m³.",
    ],
    tech: ["Python", "TensorFlow / Keras", "pandas", "NumPy", "Matplotlib", "Jupyter"],
    github: "https://github.com/heinhtoonaing/Air-Quality-Forecasting-LSTM",
    images: [
      {
        src: "/projects/lstm-actual-vs-predicted.png",
        alt: "Line chart comparing actual PM2.5 values against LSTM model predictions across roughly 250 test days",
        caption: "Actual vs predicted PM2.5 on the test split (daily averages).",
        width: 1135,
        height: 617,
      },
      {
        src: "/projects/lstm-30day-forecast.png",
        alt: "Line chart showing historical PM2.5 data with a 30-day LSTM forecast extending past the training data",
        caption: "30-day forecast generated from the trained model.",
        width: 1135,
        height: 603,
      },
    ],
  },
];

export const additionalProjects = [
  {
    title: "Pet Vet Clinic",
    what: "Veterinary clinic management system — appointments, pet and owner records, and an admin dashboard.",
    tech: "TypeScript · Next.js · Tailwind CSS",
    status: "Completed" as ProjectStatus,
    github: "https://github.com/heinhtoonaing/pet-vet-clinic",
    // TODO(pin): previous Vercel deployment (pet-vet-clinic-sand.vercel.app) is
    // gone (DEPLOYMENT_NOT_FOUND). Restore the live link if it is redeployed.
  },
  {
    title: "GeoSpace Database Project",
    what: "Geospatial database application for storing, querying, and visualizing location-based data.",
    tech: "TypeScript · SQL · Database design",
    status: "Completed" as ProjectStatus,
    github: "https://github.com/heinhtoonaing/GeoSpace_Database_Project",
    // TODO(pin): previous Vercel deployment (demo1-teal-one.vercel.app) is
    // gone (DEPLOYMENT_NOT_FOUND). Restore the live link if it is redeployed.
  },
  {
    title: "Fake News Detector",
    what: "Streamlit app that classifies news articles as real or fake and shows a confidence score for each prediction.",
    tech: "Python · Streamlit · scikit-learn",
    status: "Prototype" as ProjectStatus,
    github: "https://github.com/heinhtoonaing/fake-news-detector",
  },
  {
    title: "Fizzylang Compiler",
    what: "Compiler implementation for the Fizzylang programming language — parsing, semantics, and execution written in Python.",
    tech: "Python",
    status: "Course project" as ProjectStatus,
    github: "https://github.com/heinhtoonaing/Fizzylang_Compiler",
  },
  {
    title: "Lazada Scraper",
    what: "Web scraper that extracts and collects product data from Lazada listings.",
    tech: "JavaScript · Node.js",
    status: "Tool" as ProjectStatus,
    github: "https://github.com/heinhtoonaing/Lazada_Scraper",
  },
];

export const skillGroups = [
  {
    title: "Programming Languages",
    skills: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    title: "Web Development",
    skills: ["Next.js", "React", "Node.js", "Express", "Tailwind CSS", "HTML/CSS"],
  },
  {
    title: "Data & Machine Learning",
    skills: ["pandas", "NumPy", "scikit-learn", "TensorFlow / Keras", "Streamlit", "Matplotlib", "Jupyter"],
  },
  {
    title: "Databases & Tools",
    skills: ["PostgreSQL", "SQLite", "Prisma", "Git & GitHub", "Vercel", "pytest / Vitest"],
  },
];

export const education = {
  university: "Assumption University of Thailand",
  location: "Bangkok, Thailand",
  degree: "Bachelor's degree in Computer Science",
  concentration: "Concentration: Informatics and Data Science",
  // Final per graduation checklist (BSCS–IDS sheet, all grades released):
  // 132 required credits, 132 earned. GPA recomputed from the transcript
  // grades = 2.775, matching the officially stated 2.8.
  // GPA intentionally NOT displayed on the site (user preference).
  // Official conferral date not yet provided; coursework is complete.
  coursework: [
    "Machine Learning",
    "Decision Support and Recommender Systems",
    "Artificial Intelligence Concepts",
    "Data Mining",
    "Natural Language Processing and Social Interactions",
    "Database Systems",
    "Operating Systems",
    "Computer Architecture",
    "Data Structure and Algorithms",
    "Algorithm Design",
    "Web Application Development",
    "Data Visualization (Selected Topic)",
    "UI/UX Design and Prototyping",
    "Software Engineering",
  ],
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
