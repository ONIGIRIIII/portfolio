import { sectionLinks, blogSectionLinks, siteConfig } from "@/lib/site-config";
import type { ProjectArtVariant } from "@/components/ui/ProjectArt";

export const hero = {
  kickers: ["UBC MATHEMATICS", "PREV DATA ANALYST @ APERA AI"],
  name: siteConfig.name,
  nameVariants: [
    ["Harshpreet", "Singh"], // English
    ["हर्षप्रीत", "सिंह"], // Hindi (Devanagari)
    ["ਹਰਸ਼ਪ੍ਰੀਤ", "ਸਿੰਘ"], // Punjabi (Gurmukhi)
  ] as string[][],
  role: siteConfig.role,
  subhead:
    "I turn messy, real-world data into clear systems and decisions, from BI dashboards and ETL pipelines to full-stack tools, while studying Math at UBC.",
  resumeCta: { label: "Resume", href: "/resume" },
  contactCta: { label: "Get in Touch" },
  stack: ["Python", "SQL", "Power BI", "AWS", "Node.js", "PostgreSQL", "Docker", "JavaScript"],
};

export const about = {
  tag: "About",
  title: "Turning data into decisions.",
  subtitle: "Where rigorous Math meets applied AI and Data Science.",
  blurb:
    "I'm a fourth-year Mathematics student at UBC building toward a career at the intersection of generative AI and data science. My interests sit where rigorous analysis meets practical AI systems: turning messy data into clear decisions, and building tools that put language models to work on real problems.",
  stats: [
    { label: "Education", value: "UBC '27" },
    { label: "Projects shipped", value: "4+" },
    { label: "Certifications", value: "6+" },
    { label: "Co-op", value: "Apera AI" },
  ],
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

export type ProjectContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; caption: string; art: ProjectArtVariant }
  | { type: "code"; language: string; code: string }
  | { type: "links"; items: { label: string; href: string }[] };

export const projectsPage = {
  tag: "Selected Work",
  title: "Things I've built.",
  subtitle: "Case studies on the pipelines, tools, and analyses behind each project: problem, approach, and outcome.",
};

export const projects = {
  tag: "Selected Work",
  title: "Things I've built.",
  subtitle: "A few projects that show how I think and build.",
  cta: { label: "View all", href: sectionLinks.projects },
  items: [
    {
      slug: "local-rag-study-assistant",
      title: "Local RAG Study Assistant",
      year: "2026",
      color: "teal" as const,
      art: "rag" as const,
      tags: ["Python", "FastAPI", "ChromaDB", "Ollama", "sentence-transformers"],
      blurb:
        "A fully local retrieval-augmented generation chatbot that answers questions over lecture-slide PDFs, with no data ever leaving the machine.",
      href: `/projects#local-rag-study-assistant`,
      repoUrl: "https://github.com/ONIGIRIIII/local-rag-study-chatbot",
      content: [
        { type: "heading", text: "Problem" },
        {
          type: "paragraph",
          text: "Studying from lecture slides means scrolling through hundreds of pages to find one answer, usually at the worst possible time, like 1am before a quiz. Cloud-based AI assistants can help, but they require API keys, send your course material to third parties, and rack up usage costs.",
        },
        { type: "heading", text: "Approach" },
        {
          type: "paragraph",
          text: "I built a fully local RAG (retrieval-augmented generation) chatbot that answers questions grounded in your own lecture slides. PDFs are loaded page by page, split into slide-level chunks (with section headers detected and carried along as context), and embedded with sentence-transformers into a persistent Chroma vector store. Ingestion is incremental: each PDF is hashed, so only new or changed decks get re-embedded. At query time the top-k most relevant slides are retrieved and passed as grounding context to a local Llama 3.1 8B model running through Ollama, which streams the answer back. FastAPI serves both the chat page and the API from one process, and every answer lists the exact decks and slides it drew from. Nothing leaves the machine apart from the one-time model download.",
        },
        { type: "heading", text: "Outcome" },
        {
          type: "paragraph",
          text: "A private, zero-cost study assistant that retrieves answers directly from course material and cites the exact deck and slide behind each response. It's course-agnostic (drop in any PDF slides and query them), runs entirely offline, refuses to answer when the slides don't cover a topic rather than hallucinating, and avoids the recurring API bills and data-privacy tradeoffs of cloud LLM services.",
        },
        { type: "heading", text: "Key concepts and code" },
        {
          type: "paragraph",
          text: "Slide-aware chunking, where each chunk is prefixed with its deck, section, and slide number so retrieved context stays traceable and citations can point to an exact slide:",
        },
        {
          type: "code",
          language: "python",
          code: "prefix = f\"[Deck: {page.deck_title}\"\nif current_section_header:\n    prefix += f\" | Section: {current_section_header}\"\nprefix += f\" | Slide {page.page_number}]\\n\"\n\nsub_texts = _split_overflow(text, MAX_CHUNK_CHARS, CHUNK_OVERLAP_CHARS)\nfor i, sub_text in enumerate(sub_texts):\n    chunk_id = f\"{page.source_file}::p{page.page_number}::{i}\"\n    chunks.append(Chunk(chunk_id=chunk_id, text=prefix + sub_text, ...))",
        },
        {
          type: "paragraph",
          text: "Incremental ingestion, where each PDF is hashed so unchanged decks are skipped and only new or edited ones get re-embedded:",
        },
        {
          type: "code",
          language: "python",
          code: "file_hash = _file_hash(pdf_path)\nkey = str(pdf_path.relative_to(SLIDES_DIR))\n\nif manifest.get(key) == file_hash:\n    continue\n\npages = load_pdf_pages(pdf_path)\nchunks = build_chunks(pages)\nembeddings = model.encode([c.text for c in chunks]).tolist()\ncollection.upsert(ids=ids, embeddings=embeddings, documents=texts, metadatas=metadatas)\nmanifest[key] = file_hash",
        },
        {
          type: "paragraph",
          text: "Retrieval, where the question is embedded with the same model and matched against the stored slide vectors:",
        },
        {
          type: "code",
          language: "python",
          code: "def query(self, question: str, top_k: int = TOP_K) -> list[RetrievedChunk]:\n    query_embedding = self._model.encode([question]).tolist()\n    results = self._collection.query(query_embeddings=query_embedding, n_results=top_k)\n    ...",
        },
        {
          type: "paragraph",
          text: "Grounded generation, where a strict system prompt forces the model to answer only from the retrieved slides (and admit when they don't cover the topic), then streams the response token by token:",
        },
        {
          type: "code",
          language: "python",
          code: "SYSTEM_PROMPT = (\n    \"You are a study assistant for CPSC 304 (Databases). Answer the \"\n    \"student's question using ONLY the provided lecture slide excerpts below. \"\n    \"If the answer isn't contained in the excerpts, say plainly that the \"\n    \"slides don't cover it rather than guessing. ...\"\n)\n\nstream = ollama.chat(\n    model=OLLAMA_MODEL,\n    messages=[{\"role\": \"system\", \"content\": SYSTEM_PROMPT},\n              {\"role\": \"user\", \"content\": prompt}],\n    stream=True,\n)",
        },
        { type: "heading", text: "References I studied" },
        {
          type: "links",
          items: [
            { label: "RAG concept (original paper)", href: "https://arxiv.org/abs/2005.11401" },
            { label: "Chroma docs", href: "https://docs.trychroma.com/" },
            { label: "Sentence-Transformers", href: "https://www.sbert.net/" },
            { label: "Ollama", href: "https://github.com/ollama/ollama" },
            { label: "FastAPI", href: "https://fastapi.tiangolo.com/" },
          ],
        },
      ] as ProjectContentBlock[],
    },
    {
      slug: "revault-game-preservation-db",
      title: "ReVault: Retro Video Game Preservation Archive",
      year: "2026",
      color: "blue" as const,
      art: "revault" as const,
      tags: ["Oracle SQL", "Node.js", "Express", "OracleDB", "HTML/CSS/JS"],
      blurb:
        "A BCNF-normalized 26-table Oracle schema and full-stack web app for archiving retro games, from acquisition and hardware compatibility to restoration workflows.",
      href: `/projects#revault-game-preservation-db`,
      content: [
        { type: "heading", text: "Problem" },
        {
          type: "paragraph",
          text: "Retro game preservation has a data problem unique to the medium: a game can't be separated from the machine that runs it. A 1992 SNES cartridge survives only if both the cartridge and a working console that can read it still exist, and both are actively decaying (save batteries die after ~15 years, discs rot, console capacitors leak). An archive that collects, restores, and catalogues these artifacts has to track wildly different item types (game media, console units, accessories), their provenance and storage, hardware compatibility (which console board revisions can run which regional releases), condition history over time, and a full restoration workflow, including who did the work and what parts they used, since undisclosed restoration is the main fraud vector in the hobby. Spreadsheets can't hold those relationships, and getting them wrong makes basic questions (\"which items have degraded since intake?\", \"total insured value per room?\") unanswerable.",
        },
        { type: "heading", text: "Approach" },
        {
          type: "paragraph",
          text: "Our three-person team designed a normalized relational database and built a full-stack app on top of it. Starting from an ER model, we specialized a PhysicalItem supertype into GameMedia / ConsoleUnit / Accessory (total, disjoint ISA), modeled ConditionAssessment, Valuation, and HardwareRevision as weak entities, and used an aggregation over the revision-in-model pairing so compatibility relationships attach to the right unit. We mapped the ER diagram to a relational schema, checked every relation against its functional dependencies, and decomposed the two BCNF violations we found: region → regionBoard split ReleaseVersion into a RegionInfo table, and room → building plus room → isClimateControlled split StorageLocation into RoomBuilding and RoomClimate (both lossless and dependency-preserving). The final schema is 26 tables. On top of it we built a Node.js/Express API with the OracleDB driver serving a no-framework HTML/CSS/JS frontend, with every feature following one path: GUI → fetch → controller route → service (parameterized SQL) → Oracle → JSON back up. The interface is a single-page app with a fixed sidebar, shared render/toast/loading helpers reused across features, and a deliberately retro arcade aesthetic (pixel fonts, CRT grid background, scanline transitions) fitting the cartridge-era subject.",
        },
        {
          type: "paragraph",
          text: "The BCNF decomposition removed the transitive dependencies from StorageLocation, leaving three clean relations:",
        },
        {
          type: "code",
          language: "sql",
          code: "CREATE TABLE RoomBuilding (\n    room     VARCHAR(30) PRIMARY KEY,\n    building VARCHAR(50) NOT NULL\n);\nCREATE TABLE RoomClimate (\n    room                VARCHAR(30) PRIMARY KEY,\n    isClimateControlled NUMBER(1) NOT NULL CHECK (isClimateControlled IN (0, 1))\n);\nCREATE TABLE StorageLocation (\n    locationID INTEGER PRIMARY KEY,\n    room       VARCHAR(30) NOT NULL,\n    shelfCode  VARCHAR(20),\n    FOREIGN KEY (room) REFERENCES RoomBuilding(room),\n    FOREIGN KEY (room) REFERENCES RoomClimate(room)\n);",
        },
        {
          type: "paragraph",
          text: "A hard team rule was that all user input goes through bind variables, never string concatenation, so the runtime-assembled selection and projection queries stay injection-safe. Each entity is exposed through consistent REST routes, with SQL isolated in a service layer:",
        },
        {
          type: "code",
          language: "javascript",
          code: "// Runtime-assembled selection: conditions come from the UI, values are bound\nrouter.post('/select-items', async (req, res) => {\n    try {\n        const rows = await appService.selectPhysicalItems(req.body.clauses || []);\n        res.json({ data: rows });\n    } catch (e) {\n        res.status(500).json({ msg: e.message });\n    }\n});\n\n// Aggregation and division reports\nrouter.get('/report/jobs-by-status', async (req, res) =>\n    res.json({ data: await appService.aggJobsByStatus() }));\nrouter.get('/report/universal-titles', async (req, res) =>\n    res.json({ data: await appService.divisionGameTitles() }));",
        },
        { type: "heading", text: "Outcome" },
        {
          type: "paragraph",
          text: "A working full-stack preservation archive backed by a BCNF-normalized 26-table Oracle schema covering the full artifact lifecycle: acquisition and provenance, item classification, hardware compatibility, condition and valuation history, and the restoration pipeline (jobs, technicians, parts, certificates). The app implements the complete set of relational operations end-to-end from the browser: insert, update, delete, dynamic selection and projection, joins, GROUP BY / HAVING aggregation, nested aggregation, and division (\"titles playable on every console revision\"). It also ships a reporting script that dumps the entire database state to a styled, print-ready HTML report. Tech stack: Oracle SQL, Node.js, Express, OracleDB, HTML/CSS/JS.",
        },
      ] as ProjectContentBlock[],
    },
    {
      slug: "fc25-hidden-gems-player-analysis",
      title: "FC 25 Hidden Gems Analysis",
      year: "2025",
      color: "amber" as const,
      art: "fc25" as const,
      tags: ["Python", "Power BI", "DAX"],
      blurb:
        "Custom position-specific performance indices and a Hidden Gem Index built on EA FC 25's player database, surfacing 1,577 undervalued players across leagues.",
      href: `/projects#fc25-hidden-gems-player-analysis`,
      repoUrl: "https://github.com/ONIGIRIIII/FC_25-Hidden-Gem-Player-Analysis",
      content: [
        { type: "heading", text: "Problem" },
        {
          type: "paragraph",
          text: "EA FC 25's single overall rating (OVR) collapses every player into one generic number, which hides positional context and appears to systematically undervalue talent outside the top-5 European leagues. That makes it hard for scouts, analysts, and gamers to spot players who perform well above what their rating suggests. With over 17,000 players and 58 attributes in the database, the raw data alone doesn't answer the practical question: who is actually undervalued, and where?",
        },
        { type: "heading", text: "Approach" },
        {
          type: "paragraph",
          text: "I ran a full EDA in Python on 14,345 outfield players, then built custom position-specific performance indices (for strikers, wingers, midfielders, and defenders) that reweight attributes according to real positional demands rather than the game's generic formula. From those indices I derived a Value Score to flag players outperforming their rating, and a composite Hidden Gem Index that blends value, youth, league tier, and room for growth. Findings were then surfaced through an interactive Power BI dashboard with filtering by position, league, age, and performance, so the analysis is explorable rather than static.",
        },
        {
          type: "paragraph",
          text: "The Value Score measures how far a player's positional performance exceeds their OVR:",
        },
        {
          type: "code",
          language: "formula",
          code: "Value Score = ((Position Performance Index - Overall Rating) / Overall Rating) × 100",
        },
        {
          type: "paragraph",
          text: "The Hidden Gem Index then combines that with age, league tier, and growth headroom into a single rankable metric:",
        },
        {
          type: "code",
          language: "formula",
          code: "Hidden Gem Index = (Value Score × 0.40) +\n                   ((30 - Age) × 0.30) +\n                   (League Bonus × 0.15) +\n                   ((79 - OVR) × 0.15)",
        },
        { type: "heading", text: "Outcome" },
        {
          type: "paragraph",
          text: "The analysis identified 1,577 undervalued players and surfaced a clear, actionable pattern: emerging leagues produce hidden gems at roughly 2.5x the rate of elite European leagues (the Chinese Super League topped out at a 21.7% hidden-gem rate versus 8.8% in the top 5), with young wingers in Asian leagues the single most undervalued group. The striker index validated against career-mode outcomes at a 0.78 correlation with goals scored, giving the custom metrics some empirical grounding. The deliverable is a reusable dashboard framed around three concrete audiences (an EA ratings producer calibrating future OVRs, a scout hunting free-transfer targets, and a data journalist), each with a worked example.",
        },
        { type: "heading", text: "Links" },
        {
          type: "links",
          items: [
            { label: "GitHub Repo", href: "https://github.com/ONIGIRIIII/FC_25-Hidden-Gem-Player-Analysis" },
            {
              label: "Interactive Power BI Dashboard",
              href: "https://app.powerbi.com/view?r=eyJrIjoiYmU4MzBjYzgtNzFiYS00YzNkLTlkM2EtYjk3MjRjODZiNTJjIiwidCI6Ijk4OTk3ZjE3LWI5Y2MtNDVhNy05ZTkxLThhOWFhMTlkMTg5NiJ9",
            },
            {
              label: "Jupyter Notebook (EDA)",
              href: "https://nbviewer.org/github/ONIGIRIIII/FC_25-Hidden-Gem-Player-Analysis/blob/main/EDA%28FC_25%20dataset%29.ipynb",
            },
            { label: "Dataset (Kaggle)", href: "https://www.kaggle.com/datasets/nyagami/ea-sports-fc-25-database-ratings-and-stats" },
          ],
        },
      ] as ProjectContentBlock[],
    },
    {
      slug: "vancouver-city-fc-revenue-growth",
      title: "Vancouver City FC: Driving Revenue Growth Through Data",
      year: "2025",
      color: "violet" as const,
      art: "vancouver" as const,
      tags: ["Power BI", "DAX", "Excel"],
      blurb:
        "Data-backed revenue strategies for a fictional pro soccer club, projected to lift annual revenue by roughly $4M through stadium utilization, bundling, and a season-pass redesign.",
      href: `/projects#vancouver-city-fc-revenue-growth`,
      repoUrl: "https://github.com/ONIGIRIIII/Vancouver-City-FC-Case-Study",
      content: [
        { type: "heading", text: "Problem" },
        {
          type: "paragraph",
          text: "Vancouver City FC (a club in the fictional BOLT Soccer League used for the case) was facing a revenue collapse: income had dropped 30-40% from a $60M baseline while the league around it was growing. As external data consultants for the BOLT UBC First Byte 2025 competition, my teammate and I were tasked with finding the highest-impact ways to grow revenue without losing the club's community-focused identity. The decline traced back to four structural issues: a 54,500-seat stadium sitting empty 340+ days a year, a merchandise operation with dead stock and 8-day delivery times, a season pass penetration rate of just 6.73%, and a set of underlying operational gaps (no dynamic pricing, siloed retail channels, outdated systems).",
        },
        { type: "heading", text: "Approach" },
        {
          type: "paragraph",
          text: "Working from three provided datasets (fanbase engagement, merchandise sales, and stadium operations), we analyzed each revenue pillar to isolate where money was actually leaking versus where the perceived problems were. The analysis surfaced several counterintuitive findings: the stadium ran at only 15% annual capacity utilization with concert months generating 3.5x the revenue of non-concert months; accessory conversion jumped from 2% standalone to 18% when bundled with jerseys; sub-5-day delivery correlated with a 65% repeat purchase rate versus 25% for slower shipping; and high-engagement fans were avoiding season passes because of inflexibility, not price. We built an interactive Power BI dashboard to visualize these patterns, then translated each insight into a costed solution with projected revenue impact and a phased 12-month rollout.",
        },
        { type: "heading", text: "Outcome" },
        {
          type: "paragraph",
          text: "We delivered four data-backed strategies (merchandise and bundle optimization, stadium event expansion, delivery-time reduction, and a flexible season-pass overhaul) projected to lift annual revenue by roughly $4M while reinforcing the club's community ties. The recommendations reframed the club's core problem from a pricing issue into a product-design and utilization one, backed by an interactive dashboard and a phased implementation plan with concrete milestones. Completed as a two-person team for the BOLT UBC First Byte 2025 Data Analytics Case Competition.",
        },
        { type: "heading", text: "Links" },
        {
          type: "links",
          items: [
            { label: "GitHub Repo", href: "https://github.com/ONIGIRIIII/Vancouver-City-FC-Case-Study" },
            {
              label: "Interactive Power BI Dashboard",
              href: "https://app.powerbi.com/view?r=eyJrIjoiNjNhODE3MDItZWVkZC00Njg3LWE2ZTItZDY0MjNiOGUxZmU3IiwidCI6Ijk4OTk3ZjE3LWI5Y2MtNDVhNy05ZTkxLThhOWFhMTlkMTg5NiJ9",
            },
          ],
        },
      ] as ProjectContentBlock[],
    },
    {
      slug: "custom-leverless-arcade-controller",
      title: "Custom Leverless Arcade Controller (Razer Kitsune-inspired)",
      year: "2025",
      color: "accent" as const,
      art: "controller" as const,
      tags: ["Arduino", "C++", "KiCad", "USB HID"],
      blurb:
        "A custom USB fighting-game controller built from breadboard to a hand-designed PCB, powered by an Arduino Pro Micro and XInput firmware in C++.",
      href: `/projects#custom-leverless-arcade-controller`,
      content: [
        { type: "heading", text: "Problem" },
        {
          type: "paragraph",
          text: "Competitive fighting games (Tekken, Street Fighter) reward fast, precise directional inputs, which is why many players favor a leverless \"hitbox\" layout over a traditional joystick. Off-the-shelf leverless controllers are expensive and lock you into a fixed layout. As someone into both electronics and gaming, I wanted to build my own from the ground up (taking design inspiration from the Razer Kitsune) as a way to learn embedded systems, circuit design, and PCB layout hands-on.",
        },
        { type: "heading", text: "Approach" },
        {
          type: "paragraph",
          text: "I built a fully functional USB game controller around an Arduino Pro Micro, taking it from breadboard prototype to a custom PCB. I started by wiring eight push buttons to the Pro Micro's digital input pins, using an INPUT_PULLUP configuration so the internal pull-up resistors hold each input HIGH until a button press pulls it LOW (no external resistors needed). The firmware, written in C++ in the Arduino IDE using the ArduinoXInput library, makes the board present itself to Windows as an Xbox controller, so it works plug-and-play with any gamepad-compatible PC game. Once the prototype was solid, I designed a permanent PCB in KiCad, tracing signal paths from the buttons to the Pro Micro, assigning ground planes and decoupling capacitors, and labeling pins and silkscreen for clarity.",
        },
        {
          type: "paragraph",
          text: "The firmware initializes a virtual XInput controller, sets each pin to INPUT_PULLUP, then continuously polls button states and maps them to D-pad and face-button inputs:",
        },
        {
          type: "code",
          language: "cpp",
          code: "#include <XInput.h>\n\nvoid setup() {\n  XInput.setAutoSend(false);   // don't auto-transmit; send once per loop\n  XInput.begin();              // initialize the virtual controller\n\n  pinMode(0, INPUT_PULLUP);    // internal pull-ups, no external resistors\n  pinMode(1, INPUT_PULLUP);\n  // ... pins 2-5, 10, 16\n}\n\nvoid loop() {\n  // D-pad: active-low, so invert each read\n  XInput.setDpad(!digitalRead(1), !digitalRead(16), !digitalRead(0), !digitalRead(2));\n\n  // Face buttons\n  XInput.setButton(BUTTON_B, !digitalRead(5));\n  XInput.setButton(BUTTON_A, !digitalRead(10));\n  XInput.setButton(BUTTON_Y, !digitalRead(4));\n  XInput.setButton(BUTTON_X, !digitalRead(3));\n  XInput.send();               // send the full report to the PC\n}",
        },
        { type: "heading", text: "Outcome" },
        {
          type: "paragraph",
          text: "A working, plug-and-play USB controller with eight digital buttons, recognized as an Xbox controller on Windows through XInput, and demoed live in Tekken 7 (drilling Kazuya's EWGF as a real-time responsiveness test). The project took me across the full hardware-to-firmware stack: breadboard prototyping and debugging, embedded C++ development, USB device emulation, and a professional PCB design in KiCad. It was as much a learning exercise as a build, and it's set the foundation for further hobby electronics projects.",
        },
        { type: "heading", text: "Tech Stack" },
        {
          type: "paragraph",
          text: "KiCad (PCB design), Arduino IDE, ArduinoXInput library, C++, USB HID.",
        },
        { type: "heading", text: "Links" },
        {
          type: "links",
          items: [
            { label: "Case Study", href: "https://onigiriii.framer.website/work/razer-kistune" },
            { label: "Full Build Writeup", href: "https://onigiriii.substack.com/p/game-controller" },
          ],
        },
      ] as ProjectContentBlock[],
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
    { name: "Cloud Practitioner Essentials", issuer: "AWS Skill Builder", status: "Completed", color: "amber" as const },
    { name: "Introduction to Generative AI", issuer: "Google Cloud", status: "Completed", color: "teal" as const },
    { name: "Google Data Analytics", issuer: "Coursera", status: "Completed", color: "blue" as const },
    { name: "Associate Data Analyst", issuer: "DataCamp", status: "Completed", color: "violet" as const },
    { name: "Data Analyst in Power BI", issuer: "DataCamp", status: "Completed", color: "violet" as const },
    { name: "Associate Data Analyst in SQL", issuer: "DataCamp", status: "Completed", color: "violet" as const },
    { name: "SQL 50 Badge", issuer: "LeetCode", status: "Completed", color: "accent" as const },
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
      blurb: "Lessons from the job: notes from co-ops and data analyst work.",
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

export type BlogContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "image"; caption: string }
  | { type: "code"; language: string; code: string };

export const blogPosts: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: BlogPostCategory;
  content: BlogContentBlock[];
}[] = [
  // No real posts published yet. Placeholder content commented out below.
  // Uncomment and replace with real posts as they're written.
  /*
  {
    slug: "linear-algebra-but-make-it-useful",
    title: "Linear algebra, but make it useful",
    excerpt: "Where eigenvectors actually showed up outside the textbook, in a dimensionality-reduction side project.",
    date: "2026-08-28",
    category: "class",
    content: [
      {
        type: "paragraph",
        text: "I'd sat through two terms of linear algebra treating eigenvectors as something you compute for an exam and never again. That changed when I tried to cut a wide feature set down to something a model could actually train on without overfitting.",
      },
      {
        type: "code",
        language: "python",
        code: "from sklearn.decomposition import PCA\n\npca = PCA(n_components=2)\nreduced = pca.fit_transform(features)\n\nprint(pca.explained_variance_ratio_)\n# [0.41, 0.19]: top two components hold 60% of the variance",
      },
      { type: "image", caption: "Top 2 principal components separating the feature set" },
      {
        type: "paragraph",
        text: "PCA turned out to be the same math from the whiteboard, just pointed at a covariance matrix instead of a 3x3 practice problem. Seeing the top components actually separate the data visually is what made the concept stick in a way the proofs never did.",
      },
    ],
  },
  {
    slug: "shipping-my-first-etl-pipeline-at-apera-ai",
    title: "Shipping my first ETL pipeline at Apera AI",
    excerpt: "What broke, what I'd do differently, and why 'messy data' is doing a lot of work in that sentence.",
    date: "2026-08-20",
    category: "work",
    content: [
      {
        type: "paragraph",
        text: "The pipeline itself wasn't the hard part: extract, transform, load is a well-worn pattern. The hard part was the transform step, where every assumption I'd made about the source data turned out to be wrong in some small, quiet way.",
      },
      {
        type: "code",
        language: "python",
        code: "def transform_row(row):\n    try:\n        return normalize(row)\n    except ValueError as e:\n        log_dropped_row(row, reason=str(e))\n        return None",
      },
      { type: "image", caption: "Row-drop audit log sampled from a single pipeline run" },
      {
        type: "paragraph",
        text: "Duplicate keys that weren't supposed to exist, timestamps in three different formats, nulls that meant three different things depending on which team entered them. I started logging every row I dropped instead of silently filtering, and that one habit saved me from a bad debugging session two weeks later.",
      },
    ],
  },
  {
    slug: "building-a-local-rag-assistant-with-ollama",
    title: "Building a local RAG assistant with Ollama",
    excerpt: "Notes on keeping a retrieval-augmented chatbot fully offline: chunking, embeddings, and the tradeoffs that came with it.",
    date: "2026-08-02",
    category: "projects",
    content: [
      {
        type: "paragraph",
        text: "The constraint was simple going in: no data leaves the machine. That ruled out any hosted embeddings API, so everything (chunking, embedding, and generation) runs locally through Ollama.",
      },
      {
        type: "code",
        language: "python",
        code: "CHUNK_SIZE = 400\nOVERLAP = 80\n\ndef chunk(text):\n    step = CHUNK_SIZE - OVERLAP\n    return [text[i:i + CHUNK_SIZE] for i in range(0, len(text), step)]",
      },
      { type: "image", caption: "Retrieved chunk overlap visualized across a lecture PDF" },
      {
        type: "paragraph",
        text: "Chunk size ended up mattering more than I expected. Too small and the retrieved context lost the surrounding argument; too large and irrelevant text crowded out the answer. I landed on overlapping ~400-token chunks with a sliding window, which struck the best balance for lecture-slide PDFs specifically.",
      },
    ],
  },
  {
    slug: "what-co-op-taught-me-about-messy-data",
    title: "What co-op taught me about messy data",
    excerpt: "The gap between a clean class dataset and whatever shows up in a production spreadsheet.",
    date: "2026-07-05",
    category: "work",
    content: [
      {
        type: "paragraph",
        text: "Every dataset I touched in a course came pre-cleaned, well-documented, and ready for analysis. My first week on the job, I got a spreadsheet with three different date formats in the same column and no explanation for any of them.",
      },
      { type: "image", caption: "Three date formats found in a single spreadsheet column" },
      {
        type: "code",
        language: "sql",
        code: "SELECT raw_date,\n       COALESCE(\n         TRY_CAST(raw_date AS DATE),\n         TRY_CAST(raw_date AS DATE FORMAT 'MM/DD/YYYY'),\n         TRY_CAST(raw_date AS DATE FORMAT 'DD-MON-YYYY')\n       ) AS parsed_date\nFROM   source_sheet;",
      },
      {
        type: "paragraph",
        text: "The actual skill co-op taught me wasn't a new tool: it was learning to ask 'where did this number come from' before trusting it, and treating every source system as a suspect until proven otherwise.",
      },
    ],
  },
  {
    slug: "26-tables-later-designing-revaults-schema",
    title: "26 tables later: designing ReVault's schema",
    excerpt: "How a game-preservation database ended up with 26 tables, and which ones I'd collapse if I started over.",
    date: "2026-06-18",
    category: "projects",
    content: [
      {
        type: "paragraph",
        text: "ReVault started as a simple catalog: games, platforms, condition notes. It grew to 26 tables once I tried to model acquisition history, restoration workflows, and multi-region releases without losing referential integrity.",
      },
      { type: "image", caption: "Simplified ER diagram of ReVault's core tables" },
      {
        type: "code",
        language: "sql",
        code: "CREATE TABLE acquisition (\n  id            NUMBER GENERATED ALWAYS AS IDENTITY,\n  game_id       NUMBER NOT NULL REFERENCES game(id),\n  acquired_on   DATE NOT NULL,\n  condition_id  NUMBER REFERENCES condition_lookup(id),\n  PRIMARY KEY (id)\n);",
      },
      {
        type: "paragraph",
        text: "In hindsight, a few of those tables, particularly the ones splitting out minor lookup values, could have stayed as enums. Normalization is a tool, not a goal, and I over-applied it in a few places I'd simplify on a rebuild.",
      },
    ],
  },
  {
    slug: "what-a-stats-course-taught-me-about-ab-testing",
    title: "What a stats course taught me about A/B testing",
    excerpt: "Turns out the hardest part of hypothesis testing isn't the math: it's picking the right null.",
    date: "2026-06-01",
    category: "class",
    content: [
      {
        type: "paragraph",
        text: "The formulas for a t-test are the easy part; any calculator handles that. What the course actually drilled into me was how easy it is to set up the wrong null hypothesis and get a technically correct, practically useless answer.",
      },
      {
        type: "code",
        language: "python",
        code: "from scipy import stats\n\nt_stat, p_value = stats.ttest_ind(control, treatment, equal_var=False)\nprint(f'p = {p_value:.4f}')",
      },
      { type: "image", caption: "Null hypothesis setup vs. the one that actually mattered" },
      {
        type: "paragraph",
        text: "I started applying that lens outside the classroom too, before running any comparison at work, asking what exactly I'm assuming stays constant, and whether that assumption actually holds.",
      },
    ],
  },
  {
    slug: "notes-from-my-first-sprint-retro",
    title: "Notes from my first sprint retro",
    excerpt: "What actually changed after the first retro I sat in on, versus what just got said out loud.",
    date: "2026-05-14",
    category: "work",
    content: [
      {
        type: "paragraph",
        text: "I expected a retro to be a venting session that quietly changed nothing. What surprised me was watching one specific complaint, that ticket estimates never accounted for review time, turn into an actual process change the following sprint.",
      },
      { type: "image", caption: "Retro board: the one action item that actually shipped" },
      {
        type: "paragraph",
        text: "The difference seemed to be specificity: vague frustration didn't move anything, but a concrete, measurable ask did.",
      },
    ],
  },
  {
    slug: "finding-hidden-gems-in-fc25-player-data",
    title: "Finding hidden gems in FC25 player data",
    excerpt: "Surfacing undervalued players from 17,000+ records, and where the model's confidence broke down.",
    date: "2026-04-22",
    category: "projects",
    content: [
      {
        type: "paragraph",
        text: "The goal was to find players whose in-game rating undersold their underlying stats: the kind of undervalued pickup you'd only spot by actually running the numbers instead of trusting the headline rating.",
      },
      {
        type: "code",
        language: "python",
        code: "undervalued = df[df.stat_score - df.rating > df.stat_score.std()]\nundervalued = undervalued.sort_values('stat_score', ascending=False)\nprint(len(undervalued), 'candidates found')",
      },
      { type: "image", caption: "Distribution of rating vs. underlying stat differential" },
      {
        type: "paragraph",
        text: "The model surfaced 1,577 candidates performing up to 21% above their listed rating, but confidence dropped sharply for younger players with limited match data, a reminder that a clean output number can still be sitting on a shaky sample size.",
      },
    ],
  },
  {
    slug: "notes-from-math-307",
    title: "Notes from MATH 307",
    excerpt: "Applied linear algebra, or: the course that finally made matrix decompositions click.",
    date: "2026-03-10",
    category: "class",
    content: [
      {
        type: "paragraph",
        text: "MATH 307 was the first course where matrix decompositions stopped being abstract manipulation and started looking like tools: SVD in particular, once I saw it used for compression and noise reduction instead of just proofs.",
      },
      {
        type: "code",
        language: "python",
        code: "U, S, Vt = np.linalg.svd(image, full_matrices=False)\nrank = 10\ncompressed = U[:, :rank] @ np.diag(S[:rank]) @ Vt[:rank, :]",
      },
      { type: "image", caption: "SVD applied to image compression, rank-10 reconstruction" },
      {
        type: "paragraph",
        text: "It's also the course that made me go back and rewatch the PCA material I'd half-understood in a previous term, which is how a stats side-project two months later ended up leaning on the same math.",
      },
    ],
  },
  */
];
