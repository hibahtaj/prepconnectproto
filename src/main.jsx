import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, Bell, BookOpen, CalendarDays, Check, ChevronRight, Clock3,
  Code2, GraduationCap, Home, LayoutDashboard, LogOut, Menu, MessageSquare,
  Play, Plus, Search, Send, Sparkles, Target, Users, X, FileText, ExternalLink, Upload
} from "lucide-react";
import "./styles.css";

const colleges = [
  "CBIT",
  "Vasavi College of Engineering",
  "VNR VJIET",
  "Gokaraju Rangaraju Institute of Engineering & Technology",
  "Malla Reddy Engineering College",
  "CMR College of Engineering & Technology",
  "MGIT",
  "BVRIT Hyderabad",
  "Anurag University",
  "Mahindra University",
  "Woxsen University",
  "KLH Hyderabad",
  "University College of Engineering, Osmania University",
  "JNTUH",
  "SNIST",
  "Vardhaman College of Engineering",
  "CVR College of Engineering",
  "Sreenidhi Institute of Science and Technology",
  "KMIT",
  "G. Narayanamma Institute of Technology and Science (GNITS)",
  "Other"
];

const gfgResources = [
  {title:"Data Structures & Algorithms", description:"Practice arrays, strings, linked lists, trees and algorithms.", url:"https://www.geeksforgeeks.org/dsa/dsa-tutorial-learn-data-structures-and-algorithms/"},
  {title:"Java", description:"Review Java, OOP and core programming concepts.", url:"https://www.geeksforgeeks.org/java/java/"},
  {title:"Python", description:"Explore Python concepts and practice exercises.", url:"https://www.geeksforgeeks.org/python/python-programming-language-tutorial/"},
  {title:"DBMS & SQL", description:"Study databases, SQL queries, keys and joins.", url:"https://www.geeksforgeeks.org/dbms/dbms/"},
  {title:"Aptitude", description:"Prepare quantitative and reasoning aptitude topics.", url:"https://www.geeksforgeeks.org/aptitude/aptitude-questions-and-answers/"},
  {title:"Interview Preparation", description:"Browse interview preparation topics and questions.", url:"https://www.geeksforgeeks.org/interview-prep/interview-preparation-for-software-developer/"}
];

const questionBank = {
  javascript: [
    ["Which keyword is used to declare a block-scoped variable in JavaScript?", ["var", "let", "define", "constvar"], 1, "JavaScript"],
    ["What does the === operator check?", ["Only value", "Only type", "Value and type", "Reference only"], 2, "JavaScript"],
    ["Which method converts a JSON string into a JavaScript object?", ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.convert()"], 0, "JavaScript"],
    ["What is a closure in JavaScript?", ["A CSS rule", "A function retaining access to its lexical scope", "A loop", "A browser tab"], 1, "JavaScript"]
  ],

  python: [
    ["Which data type stores key-value pairs in Python?", ["List", "Tuple", "Dictionary", "Set"], 2, "Python"],
    ["What is the output type of range(5)?", ["List", "Range object", "Tuple", "Set"], 1, "Python"],
    ["Which keyword defines a function in Python?", ["func", "define", "def", "function"], 2, "Python"],
    ["Which symbol is used for comments in Python?", ["//", "#", "/*", "<!--"], 1, "Python"]
  ],

  java: [
    ["Which keyword is used to inherit a class in Java?", ["implements", "inherits", "extends", "super"], 2, "Java"],
    ["Which concept allows the same method name with different parameters?", ["Inheritance", "Overloading", "Encapsulation", "Abstraction"], 1, "Java"],
    ["Which collection does not allow duplicate elements?", ["List", "Set", "Map", "ArrayList"], 1, "Java"],
    ["What is JVM?", ["Java Variable Method", "Java Virtual Machine", "Java Visual Model", "Java Version Manager"], 1, "Java"]
  ],

  dsa: [
    ["What is the time complexity of binary search on a sorted array?", ["O(n)", "O(log n)", "O(n²)", "O(1)"], 1, "DSA"],
    ["Which data structure follows LIFO?", ["Queue", "Stack", "Heap", "Graph"], 1, "DSA"],
    ["Which traversal visits root, left subtree, then right subtree?", ["Inorder", "Postorder", "Preorder", "Level order"], 2, "DSA"],
    ["Which algorithm is commonly used to find the shortest path in a weighted graph with non-negative edges?", ["DFS", "Dijkstra", "BFS", "Kruskal"], 1, "DSA"],
    ["What is the average-case lookup complexity of a hash table?", ["O(n²)", "O(log n)", "O(1)", "O(n log n)"], 2, "DSA"]
  ],

  sql: [
    ["Which SQL command is used to retrieve data?", ["GET", "SELECT", "FETCH ROW", "OPEN"], 1, "SQL"],
    ["Which clause filters rows before grouping?", ["ORDER BY", "HAVING", "WHERE", "GROUP"], 2, "SQL"],
    ["Which key uniquely identifies a row in a table?", ["Foreign key", "Primary key", "Candidate value", "Join key"], 1, "SQL"],
    ["Which JOIN returns matching rows from both tables?", ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "FULL JOIN"], 0, "SQL"]
  ],

  react: [
    ["What is JSX?", ["A database", "A syntax extension for JavaScript", "A CSS framework", "A testing tool"], 1, "React"],
    ["Which hook is commonly used for local component state?", ["useFetch", "useState", "useClass", "useData"], 1, "React"],
    ["Why is a key prop used when rendering lists?", ["For styling", "To help React identify list items", "For routing", "To store passwords"], 1, "React"],
    ["What is a React component?", ["A reusable UI building block", "A SQL table", "A browser plugin", "A server"], 0, "React"]
  ],

  aptitude: [
    ["If 20% of a number is 40, what is the number?", ["100", "150", "200", "250"], 2, "Aptitude"],
    ["A train travels 120 km in 2 hours. What is its average speed?", ["40 km/h", "50 km/h", "60 km/h", "80 km/h"], 2, "Aptitude"],
    ["What is the next number: 2, 6, 12, 20, 30, ?", ["36", "40", "42", "44"], 2, "Aptitude"],
    ["If a:b = 2:3 and b:c = 4:5, then a:c is?", ["2:5", "8:15", "4:15", "3:5"], 1, "Aptitude"]
  ]
};


/*
 * Senior data will be added here later when real seniors/alumni
 * register with PrepConnect.
 *
 * We intentionally do NOT show fake senior profiles.
 */
const seniors = [];


// Shared validation rules used by onboarding, tests and scheduling.
const validPersonName = (value) => /^[\p{L}][\p{L} .'-]{1,79}$/u.test(value.trim()) && /\p{L}/u.test(value);
const validBranch = (value) => /^[\p{L}][\p{L}0-9 &./+-]{1,59}$/u.test(value.trim());
const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
const supportedResume = (file) => !!file && /\.(pdf|docx|txt)$/i.test(file.name) && file.size <= 5 * 1024 * 1024;
const todayISO = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
function App() {
  const [profile, setProfile] = useState(null);
  const [page, setPage] = useState("home");
  const [mobile, setMobile] = useState(false);
  const [test, setTest] = useState(null);
  const [schedule, setSchedule] = useState(null);

  if (!profile) {
    return (
      <Onboarding
        onComplete={(p) => {
          setProfile(p);
          setPage("dashboard");
        }}
      />
    );
  }

  const navigate = (p) => {
    setPage(p);
    setMobile(false);
  };

  return (
    <div className="app-shell">
      <aside className={mobile ? "sidebar open" : "sidebar"}>
        <div className="brand">
          <div className="brand-mark">
            <Sparkles size={19} />
          </div>
          <div>
            <b>PrepConnect</b>
            <span>Lite</span>
          </div>
        </div>

        <div className="student-mini">
          <div className="avatar">
            {profile.name?.slice(0, 1).toUpperCase()}
          </div>
          <div>
            <strong>{profile.name}</strong>
            <small>{profile.role}</small>
          </div>
        </div>

        <nav>
          <NavItem
            icon={<LayoutDashboard />}
            label="Dashboard"
            active={page === "dashboard"}
            onClick={() => navigate("dashboard")}
          />

          <NavItem
            icon={<Target />}
            label="Mock Tests"
            active={page === "tests"}
            onClick={() => navigate("tests")}
          />

          <NavItem
            icon={<FileText />}
            label="Resume Analyser"
            active={page === "resume"}
            onClick={() => navigate("resume")}
          />

          <NavItem
            icon={<Users />}
            label="Connect with Seniors"
            active={page === "seniors"}
            onClick={() => navigate("seniors")}
          />

          <NavItem
            icon={<CalendarDays />}
            label="My Schedule"
            active={page === "schedule"}
            onClick={() => navigate("schedule")}
          />
        </nav>

        <div className="sidebar-bottom">
          <div className="source-note">
            <BookOpen size={15} />
            <span>Question bank inspired by common interview topics.</span>
          </div>

          <button
            className="nav-item"
            onClick={() => setProfile(null)}
          >
            <LogOut /> Sign out
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button
            className="icon-btn menu-btn"
            onClick={() => setMobile(!mobile)}
          >
            <Menu />
          </button>

          <div className="crumb">
            <span>PrepConnect</span>
            <ChevronRight size={15} />
            <b>
              {page === "dashboard"
                ? "Dashboard"
                : page === "tests"
                ? "Mock Tests"
                : page === "resume"
                ? "Resume Analyser"
                : page === "seniors"
                ? "Senior Connect"
                : "My Schedule"}
            </b>
          </div>

          <div className="top-actions">
            <button className="icon-btn">
              <Bell size={18} />
            </button>

            <div className="avatar small">
              {profile.name?.slice(0, 1).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="content">
          {page === "dashboard" && (
            <Dashboard profile={profile} navigate={navigate} />
          )}

          {page === "tests" && (
            <Tests profile={profile} startTest={setTest} />
          )}

          {page === "resume" && <ResumeAnalyser />}

          {page === "seniors" && (
            <Seniors
              profile={profile}
              schedule={schedule}
              setSchedule={setSchedule}
              navigate={navigate}
            />
          )}

          {page === "schedule" && (
            <Schedule schedule={schedule} />
          )}
        </div>
      </main>

      {test && (
        <MockTest
          test={test}
          close={() => setTest(null)}
        />
      )}
    </div>
  );
}


function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    college: "",
    name: "",
    email: "",
    branch: "",
    year: "3rd Year",
    skills: [],
    role: "Software Developer"
  });

  const skillOptions = [
    "Java",
    "Python",
    "JavaScript",
    "React",
    "DSA",
    "SQL",
    "DBMS",
    "HTML/CSS",
    "Machine Learning",
    "AWS"
  ];

  const toggle = (s) =>
    setForm((f) => ({
      ...f,
      skills: f.skills.includes(s)
        ? f.skills.filter((x) => x !== s)
        : [...f.skills, s]
    }));

  const valid1 = Boolean(form.college && validPersonName(form.name) && validEmail(form.email) && validBranch(form.branch) && form.year);

  const valid2 =
    form.skills.length > 0 &&
    form.role;

  return (
    <div className="onboarding">
      <div className="onboard-left">
        <div className="brand light">
          <div className="brand-mark">
            <Sparkles size={19} />
          </div>
          <b>PrepConnect</b>
        </div>

        <div className="hero-copy">
          <div className="eyebrow">
            <span></span> BUILT FOR STUDENT PLACEMENTS
          </div>

          <h1>
            Prepare smarter.
            <br />
            <em>Connect better.</em>
          </h1>

          <p>
            One place to practice interviews, discover questions based on
            your skills, and connect with seniors who have already been there.
          </p>

          <div className="hero-pills">
            <span>
              <Target size={15} /> Skill-based practice
            </span>

            <span>
              <Users size={15} /> Senior guidance
            </span>
          </div>
        </div>

        <div className="quote">
          “The best preparation is the kind that feels personal.”
        </div>
      </div>

      <div className="onboard-right">
        <div className="form-card">
          <div className="progress">
            <span className={step >= 1 ? "active" : ""}></span>
            <span className={step >= 2 ? "active" : ""}></span>
          </div>

          {step === 1 ? (
            <>
              <div className="form-heading">
                <p className="kicker">LET'S GET STARTED</p>
                <h2>Tell us about yourself</h2>
                <p>
                  We'll personalize your interview prep around your college
                  and academic profile.
                </p>
              </div>

              <label>
                College / University

                <select
                  value={form.college}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      college: e.target.value
                    })
                  }
                >
                  <option value="">Select your college</option>

                  {colleges.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>

              <label>
                Full name

                <input
                  placeholder="e.g. Hiba Taj"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value
                    })
                  }
                />
              </label>

              <label>
                College email address
                <input type="email" placeholder="you@college.edu" value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})} />
                {form.email && !validEmail(form.email) && <small className="validation-error" role="alert">Enter a valid email address.</small>}
              </label>
              {form.name && !validPersonName(form.name) && <p className="validation-error" role="alert">Name must contain letters only (spaces, apostrophes and hyphens allowed), at least 2 characters.</p>}
              <div className="two">
                <label>
                  Branch

                  <input
                    placeholder="e.g. CSE"
                    value={form.branch}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        branch: e.target.value
                      })
                    }
                  />
                </label>

                <label>
                  Year

                  <select
                    value={form.year}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        year: e.target.value
                      })
                    }
                  >
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </label>
              </div>

              {!valid1 && <p className="validation-hint">Complete all required fields with a valid name, email and branch to continue.</p>}
              <button
                className="primary full"
                disabled={!valid1}
                onClick={() => setStep(2)}
              >
                Continue <ArrowRight size={17} />
              </button>
            </>
          ) : (
            <>
              <div className="form-heading">
                <p className="kicker">PERSONALIZE YOUR PREP</p>
                <h2>What are you preparing for?</h2>
                <p>
                  Select your current skills and the role you want to target.
                </p>
              </div>

              <label>
                Target role

                <select
                  value={form.role}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      role: e.target.value
                    })
                  }
                >
                  <option>Software Developer</option>
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>Data Analyst</option>
                  <option>Data Scientist</option>
                  <option>AI/ML Engineer</option>
                </select>
              </label>

              <label>
                Skills <small>Select all that apply</small>
              </label>

              <div className="skill-grid">
                {skillOptions.map((s) => (
                  <button
                    type="button"
                    className={
                      form.skills.includes(s)
                        ? "skill selected"
                        : "skill"
                    }
                    key={s}
                    onClick={() => toggle(s)}
                  >
                    {form.skills.includes(s) && <Check size={14} />}
                    {s}
                  </button>
                ))}
              </div>

              <div className="form-actions">
                <button
                  className="back"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>

                <button
                  className="primary"
                  disabled={!valid2}
                  onClick={() => onComplete(form)}
                >
                  Enter PrepConnect <ArrowRight size={17} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      className={active ? "nav-item active" : "nav-item"}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}


function Dashboard({ profile, navigate }) {
  return (
    <div>
      <div className="welcome">
        <div>
          <p className="kicker">YOUR PREP SPACE</p>
          <h1>Hey, {profile.name.split(" ")[0]} 👋</h1>
          <p>
            Ready to turn your skills into interview confidence?
          </p>
        </div>

        <button
          className="primary"
          onClick={() => navigate("tests")}
        >
          <Play size={16} fill="currentColor" />
          Start a mock test
        </button>
      </div>

      <div className="stats">
        <Stat
          icon={<Target />}
          label="Tests available"
          value="24+"
          note="Across your skills"
        />

        <Stat
          icon={<Code2 />}
          label="Skills selected"
          value={profile.skills.length}
          note={profile.skills.join(" • ")}
        />

        <Stat
          icon={<Users />}
          label="Seniors available"
          value="0"
          note="Currently available"
        />
      </div>

      <div className="section-title">
        <div>
          <h2>Built around your goals</h2>
          <p>Jump into what you need most today.</p>
        </div>
      </div>

      <div className="feature-grid">
        <Feature
          icon={<Target />}
          title="Skill-based Mock Tests"
          text="Get interview-style questions based on the skills you selected."
          action="Practice now"
          onClick={() => navigate("tests")}
        />

        <Feature
          icon={<FileText />}
          title="Resume Analyser"
          text="Upload a PDF or DOCX resume to receive a keyword-based score and practical feedback, no AI required."
          action="Analyse resume"
          onClick={() => navigate("resume")}
        />

        <Feature
          icon={<Users />}
          title="Connect with Seniors"
          text="Request guidance from seniors or alumni from your college."
          action="Send a request"
          onClick={() => navigate("seniors")}
        />
      </div>

      <div className="profile-strip">
        <div className="strip-icon">
          <GraduationCap />
        </div>

        <div>
          <strong>{profile.college}</strong>
          <span>
            {profile.branch} • {profile.year} • {profile.role}
          </span>
        </div>

        <div className="skill-tags">
          {profile.skills.slice(0, 5).map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}


function Stat({ icon, label, value, note }) {
  return (
    <div className="stat">
      <div className="stat-icon">{icon}</div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{note}</small>
      </div>
    </div>
  );
}


function Feature({ icon, title, text, action, onClick }) {
  return (
    <div className="feature">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>

      <button onClick={onClick}>
        {action}
        <ArrowRight size={15} />
      </button>
    </div>
  );
}


function Tests({ profile, startTest }) {
  const [skills, setSkills] = useState(
    profile.skills.join(", ")
  );

  const [difficulty, setDifficulty] = useState("Medium");

  const normalized = skills
    .toLowerCase()
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

  const matched = useMemo(() => {
    const aliases = {
      javascript: "javascript",
      js: "javascript",
      python: "python",
      java: "java",
      dsa: "dsa",
      "data structures": "dsa",
      sql: "sql",
      react: "react",
      aptitude: "aptitude"
    };

    return [
      ...new Set(
        normalized
          .map((s) => aliases[s] || null)
          .filter(Boolean)
      )
    ];
  }, [skills]);

  const available = matched.filter((key) => questionBank[key]?.length);
  const [testError, setTestError] = useState("");

  return (
    <div>
      <PageHead
        kicker="PRACTICE LAB"
        title="Mock Tests"
        text="Practice original MCQs inside PrepConnect, or open curated GeeksforGeeks topic links for extra practice."
      />

      <div className="test-builder">
        <div className="builder-main">
          <div className="sparkle-box">
            <Sparkles />
          </div>

          <div>
            <h3>Generate your question set</h3>
            <p>
              Try: Java, DSA, SQL or Python. You can combine multiple skills.
            </p>
          </div>
        </div>

        <div className="builder-controls">
          <div className="control">
            <label>Your skills</label>

            <div className="input-icon">
              <Search size={16} />

              <input
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. Java, DSA, SQL"
              />
            </div>
          </div>

          <div className="control small-control">
            <label>Difficulty</label>

            <select
              value={difficulty}
              onChange={(e) =>
                setDifficulty(e.target.value)
              }
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <button
            className="primary generate"
            onClick={() =>
              available.length ? (setTestError(""), startTest({skills: available, difficulty})) : setTestError("Enter at least one supported skill (Java, Python, JavaScript, DSA, SQL, React or Aptitude).")
            }
          >
            <Sparkles size={16} />
            Generate test
          </button>
        </div>

        {testError && <p className="validation-error" role="alert">{testError}</p>}
        <div className="matched">
          Matching topics:

          {available.map((x) => (
            <span key={x}>{x.toUpperCase()}</span>
          ))}
        </div>
      </div>

      <div className="section-title">
        <div>
          <h2>Recommended for you</h2>
          <p>
            Question areas commonly used in technical interviews.
          </p>
        </div>
      </div>

      <div className="test-cards">
        {[
          [
            "DSA Fundamentals",
            "Arrays, stacks, trees, graphs & complexity",
            "dsa",
            12
          ],
          [
            "Programming Essentials",
            "Core language concepts & OOP",
            "java",
            10
          ],
          [
            "Web Development",
            "React, JavaScript & frontend fundamentals",
            "react",
            10
          ],
          [
            "SQL & Databases",
            "Queries, joins, keys & DB concepts",
            "sql",
            10
          ]
        ].map(([title, desc, key, count]) => (
          <div className="test-card" key={key}>
            <div className="test-card-top">
              <span className="topic-icon">
                <Code2 />
              </span>

              <span className="level">Mixed</span>
            </div>

            <h3>{title}</h3>
            <p>{desc}</p>

            <div className="test-meta">
              <span>
                <BookOpen size={14} /> {count} questions
              </span>

              <button
                onClick={() =>
                  startTest({
                    skills: [key],
                    difficulty: "Mixed"
                  })
                }
              >
                Start <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="section-title"><div><h2>Practice on GeeksforGeeks</h2><p>Choose a topic to open the official GeeksforGeeks practice resource in a new tab. Scores from external practice are not imported.</p></div></div>
      <div className="gfg-grid">
        {gfgResources.map(({ title, description, url }) => (
          <a key={title} className="gfg-card" href={url} target="_blank" rel="noopener noreferrer">
            <span className="gfg-badge">GeeksforGeeks <ExternalLink size={13} /></span>
            <h3>{title}</h3><p>{description}</p>
            <span className="gfg-action">Open practice <ArrowRight size={14} /></span>
          </a>
        ))}
      </div>

      <div className="reference-note">
        <BookOpen size={16} />

        <div>
          <strong>Question design</strong>

          <p>
            The prototype uses original questions modeled around common
            interview topics such as arrays, strings, linked lists, trees,
            SQL, programming languages and aptitude. GeeksforGeeks is used
            as a reference for topic coverage, not copied question text.

            <a
              href="https://www.geeksforgeeks.org/interview-experiences/software-developer-interview-questions/"
              target="_blank"
              rel="noreferrer"
            >
              View GFG interview prep
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}



// Transparent, rule-based resume review. Scores are heuristic, not recruiter/ATS predictions.
const resumeGroups = {
  "Java / Backend": ["java", "spring", "api", "rest", "sql", "database", "git", "testing", "backend"],
  "Python / Backend": ["python", "flask", "django", "api", "sql", "database", "git", "testing", "backend"],
  "Frontend": ["javascript", "react", "html", "css", "typescript", "responsive", "git", "testing", "frontend"],
  "Data / Analytics": ["python", "sql", "pandas", "excel", "statistics", "visualization", "analysis", "power bi", "tableau"]
};
function evaluateResume(text, target) {
  const lower = text.toLowerCase();
  const has = (term) => new RegExp("\\b" + term.replace(/[^a-z0-9 ]/gi, "").replace(/ /g, "\\s+") + "\\b", "i").test(lower);
  const headings = ["education", "skills", "projects", "experience"];
  const present = headings.filter(has);
  const missing = headings.filter(x => !present.includes(x));
  const keywords = resumeGroups[target];
  const found = keywords.filter(has);
  const absent = keywords.filter(x => !found.includes(x));
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const contact = {
    email: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(text),
    phone: /(?:\+?\d[\d\s().-]{8,}\d)/.test(text),
    links: /linkedin|github|portfolio|https?:\/\//i.test(text)
  };
  const metrics = /\b\d+(?:\.\d+)?\s*(?:%|percent|users|projects|hours|days|months|ms|x)\b/i.test(text);
  const actions = ["developed", "built", "implemented", "designed", "optimized", "automated", "created", "led", "improved"].filter(has);
  const lengthScore = words >= 150 && words <= 850 ? 15 : words >= 90 && words <= 1100 ? 8 : 0;
  const score = Math.min(100, Math.round(present.length * 7.5 + Object.values(contact).filter(Boolean).length * 5 + (found.length / keywords.length) * 25 + (metrics ? 10 : 0) + (actions.length >= 2 ? 5 : actions.length ? 3 : 0) + lengthScore));
  const feedback = [];
  if (missing.length) feedback.push(`Consider adding clearly labelled sections: ${missing.join(", ")}.`);
  if (!contact.email) feedback.push("Add a professional email address.");
  if (!contact.links) feedback.push("Include a relevant LinkedIn, GitHub or portfolio link when available.");
  if (!contact.phone) feedback.push("Consider including a contact phone number.");
  if (absent.length) feedback.push(`For ${target}, consider highlighting applicable skills or experience such as ${absent.slice(0, 5).join(", ")}. Only add skills you genuinely have.`);
  if (!metrics) feedback.push("Quantify project or work achievements where possible (e.g., latency reduction or number of users).");
  if (actions.length < 2) feedback.push("Use clear action verbs such as developed, implemented or designed to describe your contributions.");
  if (lengthScore < 15) feedback.push(`Review resume length (${words} words). Aim for concise, relevant content rather than a fixed score.`);
  if (!feedback.length) feedback.push("Good baseline structure. Tailor project descriptions and achievements to each job description.");
  return {score, present, found, absent, words, feedback};
}

function ResumeAnalyser() {
  const [target, setTarget] = useState("Java / Backend");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function analyse() {
    if (!file) { setError("Please choose a PDF, DOCX or TXT resume."); return; }
    if (!supportedResume(file)) { setError("Only PDF, DOCX and TXT files up to 5 MB are supported."); return; }
    setBusy(true); setError(""); setResult(null);
    try {
      if (file.size > 5 * 1024 * 1024) throw new Error("Please upload a file smaller than 5 MB.");
      const ext = file.name.split(".").pop().toLowerCase();
      let text = "";
      if (ext === "txt") text = await file.text();
      else if (ext === "docx") {
        const mammoth = await import("mammoth/mammoth.browser");
        const data = await mammoth.extractRawText({arrayBuffer: await file.arrayBuffer()});
        text = data.value;
      } else if (ext === "pdf") {
        const pdfjs = await import("pdfjs-dist");
        const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
        pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
        const pdf = await pdfjs.getDocument({data: await file.arrayBuffer()}).promise;
        if (pdf.numPages > 10) throw new Error("Please use a resume of 10 pages or fewer.");
        for (let pageNo = 1; pageNo <= pdf.numPages; pageNo++) {
          const page = await pdf.getPage(pageNo);
          const content = await page.getTextContent();
          text += content.items.map(item => item.str || "").join(" ") + "\n";
        }
      } else throw new Error("Only PDF, DOCX and TXT files are supported.");
      if (text.trim().length < 80) throw new Error("Not enough readable text was found. For scanned PDFs, upload a text-based PDF or DOCX instead.");
      setResult(evaluateResume(text, target));
    } catch (e) { setError(e.message || "Could not read this resume."); }
    finally { setBusy(false); }
  }
  return <div>
    <PageHead kicker="RESUME LAB" title="Resume Analyser" text="Get instant, rule-based feedback using resume sections, relevant keywords and measurable achievements. No AI API or database required." />
    <div className="resume-panel">
      <div className="resume-icon"><FileText size={28}/></div>
      <h2>Check your resume</h2>
      <p>Select a target role and upload a text-based PDF, DOCX or TXT file (up to 5 MB). Analysis runs in your browser; your resume is not uploaded to a server.</p>
      <div className="resume-fields"><label>Target role<select value={target} onChange={e => {setTarget(e.target.value);setResult(null);}}>{Object.keys(resumeGroups).map(x=><option key={x}>{x}</option>)}</select></label>
      <label className="resume-upload"><Upload size={17}/>{file ? file.name : "Choose resume"}<input type="file" accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain" onChange={e=>{const selected=e.target.files?.[0] || null;setFile(selected);setResult(null);setError(selected && !supportedResume(selected) ? "Only PDF, DOCX and TXT files up to 5 MB are supported." : "");}} /></label></div>
      <button className="primary" onClick={analyse} disabled={busy}>{busy ? "Analysing..." : "Analyse my resume"} <ArrowRight size={16}/></button>
      {error && <p className="resume-error" role="alert">{error}</p>}
    </div>
    {result && <div className="resume-results" aria-live="polite">
      <div className="resume-score"><div><span>Resume readiness score</span><strong>{result.score}<small>/100</small></strong></div><p>Heuristic checklist score — not an ATS score, recruiter decision or guarantee of job readiness.</p></div>
      <div className="resume-result-card"><h3>What we found</h3><p><b>Word count:</b> {result.words}</p><p><b>Detected sections:</b> {result.present.join(", ") || "None"}</p><p><b>Relevant keywords:</b> {result.found.join(", ") || "None detected"}</p></div>
      <div className="resume-result-card"><h3>Suggested improvements</h3><ul>{result.feedback.map((x,i)=><li key={i}>{x}</li>)}</ul></div>
      <p className="resume-disclaimer">This analysis checks visible text and keywords, not visual formatting, truthfulness, hiring suitability or ATS compatibility. Keyword matching is approximate. AI-powered contextual analysis is planned for a future release.</p>
    </div>}
  </div>;
}

function PageHead({ kicker, title, text }) {
  return (
    <div className="page-head">
      <p className="kicker">{kicker}</p>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}


function MockTest({ test, close }) {
  const pool = test.skills.flatMap(
    (s) => questionBank[s] || []
  );

  const qs = pool.length ? pool : questionBank.dsa;

  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const q = qs[i % qs.length];
  const answer = answers[i];

  const [testWarning, setTestWarning] = useState("");
  const finish = () => { setTestWarning(""); setDone(true); };

  if (done) {
    const score = qs.reduce(
      (n, x, idx) =>
        n + (answers[idx] === x[2] ? 1 : 0),
      0
    );

    return (
      <div className="modal">
        <div className="test-modal result">
          <button className="close" onClick={close}>
            <X />
          </button>

          <div className="result-circle">
            {Math.round((score / qs.length) * 100)}%
          </div>

          <p className="kicker">TEST COMPLETE</p>

          <h2>Nice work!</h2>

          <p>
            You scored{" "}
            <strong>
              {score} / {qs.length}
            </strong>
            . Keep practicing to build consistency.
          </p>

          <div className="result-row">
            <span>Difficulty</span>
            <b>{test.difficulty}</b>
          </div>

          <div className="result-row">
            <span>Topics</span>
            <b>
              {test.skills
                .map((x) => x.toUpperCase())
                .join(", ")}
            </b>
          </div>

          <button
            className="primary full"
            onClick={close}
          >
            Back to Mock Tests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal">
      <div className="test-modal">
        <button className="close" onClick={close}>
          <X />
        </button>

        <div className="test-modal-head">
          <div>
            <p className="kicker">
              MOCK TEST • {test.difficulty.toUpperCase()}
            </p>

            <h2>
              Question {i + 1} of {qs.length}
            </h2>
          </div>

          <span>{q[3]}</span>
        </div>

        <div className="q-progress">
          <span
            style={{
              width: `${((i + 1) / qs.length) * 100}%`
            }}
          ></span>
        </div>

        <h3 className="question">{q[0]}</h3>

        <div className="options">
          {q[1].map((o, idx) => (
            <button
              key={o}
              className={
                answer === idx
                  ? "option chosen"
                  : "option"
              }
              onClick={() =>
                setAnswers({
                  ...answers,
                  [i]: idx
                })
              }
            >
              <span>
                {String.fromCharCode(65 + idx)}
              </span>

              {o}

              {answer === idx && (
                <Check size={17} />
              )}
            </button>
          ))}
        </div>

        <div className="test-footer">
          <span>
            {answer !== undefined
              ? "Answer selected"
              : "Select an answer to continue"}
          </span>

          {i < qs.length - 1 ? (
            <button
              className="primary"
              disabled={answer === undefined}
              onClick={() => setI(i + 1)}
            >
              Next <ArrowRight size={16} />
            </button>
          ) : (
            <button
              className="primary"
              disabled={answer === undefined}
              onClick={finish}
            >
              Finish <Check size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


/*
 * Senior Connect
 *
 * Real seniors/alumni can be added later.
 * Until then, the user can send a request to their college's
 * senior/alumni network without seeing fake profiles.
 */
function Seniors({ profile, schedule, setSchedule, navigate }) {
  const [selected, setSelected] = useState(false);

  return (
    <div>
      <PageHead
        kicker="SENIOR CONNECT"
        title={`${profile.college} — Senior & Alumni Connect`}
        text="Connect with seniors and alumni from your college for placement guidance and interview preparation."
      />

      <div className="senior-empty-state">
        <div className="empty-icon">
          <Users size={30} />
        </div>

        <p className="kicker">CURRENTLY UNAVAILABLE</p>

        <h2>No seniors or alumni are currently available</h2>

        <p>
          We don't have any {profile.college} seniors or alumni
          available for a session right now.
        </p>

        <p>
          You can still send a request. We'll notify eligible
          seniors or alumni from your college by email when your
          request is received.
        </p>

        <button
          className="primary"
          onClick={() => setSelected(true)}
        >
          <Send size={16} />
          Send a Request
        </button>
      </div>

      {selected && (
        <ScheduleModal
          profile={profile}
          onClose={() => setSelected(false)}
          onSend={(data) => {
            if (schedule && schedule.status === "Pending" && schedule.date === data.date && schedule.time === data.time && schedule.skills.toLowerCase() === data.skills.toLowerCase()) {
              window.alert("An identical pending request already exists. Check My Schedule.");
              return;
            }
            setSchedule(data);
            setSelected(false);
            navigate("schedule");
          }}
        />
      )}
    </div>
  );
}


function ScheduleModal({ profile, onClose, onSend }) {
  const [skills, setSkills] = useState(
    profile.skills[0] || ""
  );

  const [date, setDate] = useState(todayISO());
  const [requestError, setRequestError] = useState("");
  const [time, setTime] = useState("18:00");
  const [note, setNote] = useState("");

  return (
    <div className="modal">
      <div className="schedule-modal">
        <button className="close" onClick={onClose}>
          <X />
        </button>

        <div className="senior-head">
          <div className="senior-avatar">
            <GraduationCap size={24} />
          </div>

          <div>
            <p className="kicker">REQUEST A SENIOR</p>

            <h2>{profile.college}</h2>

            <p>
              Your request will be shared with eligible
              seniors and alumni from your college.
            </p>
          </div>
        </div>

        <div className="modal-grid">
          <label>
            Skill / topic

            <input
              value={skills}
              onChange={(e) =>
                setSkills(e.target.value)
              }
              placeholder="e.g. DSA"
            />
          </label>

          <label>
            Date

            <input
              type="date"
              min={todayISO()}
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />
          </label>

          <label>
            Preferred time

            <select
              value={time}
              onChange={(e) =>
                setTime(e.target.value)
              }
            >
              <option>17:00</option>
              <option>18:00</option>
              <option>18:30</option>
              <option>19:00</option>
              <option>19:30</option>
              <option>20:00</option>
            </select>
          </label>
        </div>

        <label>
          Note to senior / alumni

          <textarea
            rows="4"
            value={note}
            onChange={(e) =>
              setNote(e.target.value)
            }
            placeholder="Hi! I'd like to discuss DSA interview preparation and ask about your placement experience..."
          ></textarea>
        </label>

        <div className="request-info">
          <MailIcon />

          <span>
            Your request will be sent to the PrepConnect
            senior/alumni network for <strong>{profile.college}</strong>.
          </span>
        </div>

        {requestError && <p className="validation-error" role="alert">{requestError}</p>}
        <button
          className="primary full"
          onClick={() => {
            if (!skills.trim()) { setRequestError("Enter a skill or interview topic."); return; }
            if (!date || date < todayISO()) { setRequestError("Select today or a future date."); return; }
            setRequestError("");
            onSend({college: profile.college, skills: skills.trim(), date, time, note, status: "Pending"});
          }}
        >
          <Send size={16} />
          Send Request
        </button>
      </div>
    </div>
  );
}


function MailIcon() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Send size={17} />
    </div>
  );
}


function Schedule({ schedule }) {
  return (
    <div>
      <PageHead
        kicker="YOUR SCHEDULE"
        title="Upcoming sessions"
        text="Keep track of the guidance requests you've sent."
      />

      {schedule ? (
        <div className="scheduled-card">
          <div className="calendar-big">
            <CalendarDays />
          </div>

          <div className="scheduled-info">
            <span className="status">
              <span></span>
              Request sent • Pending confirmation
            </span>

            <h2>{schedule.college}</h2>

            <p>
              Waiting for a senior or alumni from your
              college to respond.
            </p>

            <div className="schedule-details">
              <span>
                <CalendarDays size={16} />

                {new Date(
                  schedule.date + "T00:00"
                ).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                })}
              </span>

              <span>
                <Clock3 size={16} />
                {schedule.time}
              </span>

              <span>
                <Target size={16} />
                {schedule.skills}
              </span>
            </div>

            <div className="note-box">
              <MessageSquare size={15} />

              <span>
                {schedule.note
                  ? `“${schedule.note}”`
                  : "No additional note added."}
              </span>
            </div>

            <div className="request-pending">
              <Users size={16} />

              <span>
                We'll notify you when a senior or alumni
                from your college responds to your request.
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty">
          <CalendarDays size={34} />

          <h3>No requests sent yet</h3>

          <p>
            Send a request to connect with a senior or
            alumni from your college.
          </p>
        </div>
      )}
    </div>
  );
}


createRoot(
  document.getElementById("root")
).render(<App />);