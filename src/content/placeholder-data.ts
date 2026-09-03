import { sectionLinks, blogSectionLinks, siteConfig } from "@/lib/site-config";

export const hero = {
  kicker: "AVAILABLE FOR WORK",
  name: siteConfig.name,
  role: siteConfig.role,
  subhead:
    "I turn messy, real-world data into clear systems and decisions — from BI dashboards and ETL pipelines to full-stack tools — while studying Math at UBC.",
  primaryCta: { label: "View Projects", href: sectionLinks.projects },
  secondaryCta: { label: "Get in Touch", href: `mailto:${siteConfig.email}` },
  stack: ["Python", "SQL", "Power BI", "AWS", "Node.js", "PostgreSQL", "Docker", "JavaScript"],
};

export const about = {
  tag: "About",
  title: "Turning data into decisions.",
  subtitle: "A little about how I got here and what I care about.",
  blurb:
    "I'm a Math student at UBC and a data & business analyst who enjoys turning messy, real-world data into clear systems — from BI dashboards and ETL pipelines to full-stack tools and local AI applications. Currently interning at Apera AI, I spend my free time building side projects that mix data engineering with practical software.",
  stats: [
    { label: "Education", value: "UBC '27" },
    { label: "Projects shipped", value: "4+" },
    { label: "Certifications", value: "6+" },
  ],
  cta: { label: "Read more", href: sectionLinks.about },
};

export const skills = {
  tag: "Capabilities",
  title: "What I bring to the table.",
  subtitle: "The tools and disciplines I reach for on every build.",
  items: [
    { title: "Data & BI Tools", blurb: "Power BI, PostgreSQL, OracleDB, Excel, HubSpot.", color: "accent" as const, icon: "chart" as const },
    { title: "Languages", blurb: "Python, SQL, R, JavaScript, C++, Java, C#.", color: "blue" as const, icon: "code" as const },
    { title: "Cloud & GenAI", blurb: "AWS fundamentals, LLM concepts, RAG pipelines.", color: "teal" as const, icon: "cloud" as const },
    { title: "Data Libraries", blurb: "Pandas, NumPy, Scikit-learn, Plotly, Matplotlib.", color: "amber" as const, icon: "layers" as const },
    { title: "Backend & Web", blurb: "Node.js, Express, REST APIs, HTML/CSS.", color: "violet" as const, icon: "server" as const },
    { title: "DevOps & Tools", blurb: "Git, GitHub, Docker, CI/CD, Jira.", color: "accent" as const, icon: "git" as const },
  ],
};

export const projects = {
  tag: "Selected Work",
  title: "Things I've built.",
  subtitle: "A few projects that show how I think and build.",
  cta: { label: "View all", href: sectionLinks.projects },
  items: [
    {
      title: "Local RAG Study Assistant",
      tags: ["Python", "FastAPI", "ChromaDB", "Ollama"],
      blurb:
        "A fully local retrieval-augmented generation chatbot that answers questions over lecture-slide PDFs — no data ever leaves the machine.",
      href: sectionLinks.projects,
    },
    {
      title: "ReVault — Game Preservation DB",
      tags: ["Oracle SQL", "Node.js", "Express"],
      blurb:
        "A 26-table relational database and full-stack web app for archiving retro games, from acquisition to restoration workflows.",
      href: sectionLinks.projects,
    },
    {
      title: "FC25 Hidden Gems Player Analysis",
      tags: ["Python", "Power BI", "DAX"],
      blurb:
        "Analyzed 17,000+ player records to surface 1,577 undervalued players performing up to 21% above their ratings.",
      href: sectionLinks.projects,
    },
  ],
};

export const certifications = {
  tag: "Credentials",
  title: "Certified, and still learning.",
  subtitle: "A running list of credentials I've earned, with a couple still in progress.",
  items: [
    {
      name: "AWS Certified Cloud Practitioner",
      issuer: "AWS · CLF-C02",
      status: "In Progress",
      color: "amber" as const,
    },
    { name: "Cloud Practitioner Essentials", issuer: "AWS Skill Builder", color: "amber" as const },
    { name: "Introduction to Generative AI", issuer: "Google Cloud", color: "teal" as const },
    { name: "Google Data Analytics", issuer: "Coursera", color: "blue" as const },
    { name: "Associate Data Analyst", issuer: "DataCamp", color: "violet" as const },
    { name: "Data Analyst in Power BI", issuer: "DataCamp", color: "violet" as const },
    { name: "Associate Data Analyst in SQL", issuer: "DataCamp", color: "violet" as const },
    { name: "SQL 50 Badge", issuer: "LeetCode", color: "accent" as const },
  ],
};

export const blogCategories = {
  tag: "Writing",
  title: "Notes & write-ups.",
  subtitle: "Everything I write gets filed into one of three categories.",
  centerLabel: "Blog",
  items: [
    {
      key: "work" as const,
      label: "Work Blogs",
      blurb: "Lessons from the job — notes from co-ops and data analyst work.",
      href: blogSectionLinks.work,
      color: "accent" as const,
    },
    {
      key: "projects" as const,
      label: "Project Blogs",
      blurb: "Deep dives and postmortems on personal builds.",
      href: blogSectionLinks.projects,
      color: "blue" as const,
    },
    {
      key: "class" as const,
      label: "Class Blogs",
      blurb: "Notes and write-ups from coursework at UBC.",
      href: blogSectionLinks.class,
      color: "teal" as const,
    },
  ],
};

export type BlogPostCategory = (typeof blogCategories.items)[number]["key"];

export const blogPosts: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: BlogPostCategory;
  content: string[];
}[] = [
  {
    slug: "linear-algebra-but-make-it-useful",
    title: "Linear algebra, but make it useful",
    excerpt: "Where eigenvectors actually showed up outside the textbook — in a dimensionality-reduction side project.",
    date: "2026-08-28",
    category: "class",
    content: [
      "I'd sat through two terms of linear algebra treating eigenvectors as something you compute for an exam and never again. That changed when I tried to cut a wide feature set down to something a model could actually train on without overfitting.",
      "PCA turned out to be the same math from the whiteboard, just pointed at a covariance matrix instead of a 3x3 practice problem. Seeing the top components actually separate the data visually is what made the concept stick in a way the proofs never did.",
    ],
  },
  {
    slug: "shipping-my-first-etl-pipeline-at-apera-ai",
    title: "Shipping my first ETL pipeline at Apera AI",
    excerpt: "What broke, what I'd do differently, and why 'messy data' is doing a lot of work in that sentence.",
    date: "2026-08-20",
    category: "work",
    content: [
      "The pipeline itself wasn't the hard part — extract, transform, load is a well-worn pattern. The hard part was the transform step, where every assumption I'd made about the source data turned out to be wrong in some small, quiet way.",
      "Duplicate keys that weren't supposed to exist, timestamps in three different formats, nulls that meant three different things depending on which team entered them. I started logging every row I dropped instead of silently filtering, and that one habit saved me from a bad debugging session two weeks later.",
    ],
  },
  {
    slug: "building-a-local-rag-assistant-with-ollama",
    title: "Building a local RAG assistant with Ollama",
    excerpt: "Notes on keeping a retrieval-augmented chatbot fully offline — chunking, embeddings, and the tradeoffs that came with it.",
    date: "2026-08-02",
    category: "projects",
    content: [
      "The constraint was simple going in: no data leaves the machine. That ruled out any hosted embeddings API, so everything — chunking, embedding, and generation — runs locally through Ollama.",
      "Chunk size ended up mattering more than I expected. Too small and the retrieved context lost the surrounding argument; too large and irrelevant text crowded out the answer. I landed on overlapping ~400-token chunks with a sliding window, which struck the best balance for lecture-slide PDFs specifically.",
    ],
  },
  {
    slug: "what-co-op-taught-me-about-messy-data",
    title: "What co-op taught me about messy data",
    excerpt: "The gap between a clean class dataset and whatever shows up in a production spreadsheet.",
    date: "2026-07-05",
    category: "work",
    content: [
      "Every dataset I touched in a course came pre-cleaned, well-documented, and ready for analysis. My first week on the job, I got a spreadsheet with three different date formats in the same column and no explanation for any of them.",
      "The actual skill co-op taught me wasn't a new tool — it was learning to ask 'where did this number come from' before trusting it, and treating every source system as a suspect until proven otherwise.",
    ],
  },
  {
    slug: "26-tables-later-designing-revaults-schema",
    title: "26 tables later: designing ReVault's schema",
    excerpt: "How a game-preservation database ended up with 26 tables, and which ones I'd collapse if I started over.",
    date: "2026-06-18",
    category: "projects",
    content: [
      "ReVault started as a simple catalog: games, platforms, condition notes. It grew to 26 tables once I tried to model acquisition history, restoration workflows, and multi-region releases without losing referential integrity.",
      "In hindsight, a few of those tables — particularly the ones splitting out minor lookup values — could have stayed as enums. Normalization is a tool, not a goal, and I over-applied it in a few places I'd simplify on a rebuild.",
    ],
  },
  {
    slug: "what-a-stats-course-taught-me-about-ab-testing",
    title: "What a stats course taught me about A/B testing",
    excerpt: "Turns out the hardest part of hypothesis testing isn't the math — it's picking the right null.",
    date: "2026-06-01",
    category: "class",
    content: [
      "The formulas for a t-test are the easy part; any calculator handles that. What the course actually drilled into me was how easy it is to set up the wrong null hypothesis and get a technically correct, practically useless answer.",
      "I started applying that lens outside the classroom too — before running any comparison at work, asking what exactly I'm assuming stays constant, and whether that assumption actually holds.",
    ],
  },
  {
    slug: "notes-from-my-first-sprint-retro",
    title: "Notes from my first sprint retro",
    excerpt: "What actually changed after the first retro I sat in on, versus what just got said out loud.",
    date: "2026-05-14",
    category: "work",
    content: [
      "I expected a retro to be a venting session that quietly changed nothing. What surprised me was watching one specific complaint — that ticket estimates never accounted for review time — turn into an actual process change the following sprint.",
      "The difference seemed to be specificity: vague frustration didn't move anything, but a concrete, measurable ask did.",
    ],
  },
  {
    slug: "finding-hidden-gems-in-fc25-player-data",
    title: "Finding hidden gems in FC25 player data",
    excerpt: "Surfacing undervalued players from 17,000+ records, and where the model's confidence broke down.",
    date: "2026-04-22",
    category: "projects",
    content: [
      "The goal was to find players whose in-game rating undersold their underlying stats — the kind of undervalued pickup you'd only spot by actually running the numbers instead of trusting the headline rating.",
      "The model surfaced 1,577 candidates performing up to 21% above their listed rating, but confidence dropped sharply for younger players with limited match data — a reminder that a clean output number can still be sitting on a shaky sample size.",
    ],
  },
  {
    slug: "notes-from-math-307",
    title: "Notes from MATH 307",
    excerpt: "Applied linear algebra, or: the course that finally made matrix decompositions click.",
    date: "2026-03-10",
    category: "class",
    content: [
      "MATH 307 was the first course where matrix decompositions stopped being abstract manipulation and started looking like tools — SVD in particular, once I saw it used for compression and noise reduction instead of just proofs.",
      "It's also the course that made me go back and rewatch the PCA material I'd half-understood in a previous term, which is how a stats side-project two months later ended up leaning on the same math.",
    ],
  },
];
