"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Search,
  GitBranch,
  Bug,
  Blocks,
  Settings,
  User,
  Play,
  Terminal,
} from "lucide-react";

interface FileNode {
  name: string;
  type: "folder" | "file";
  expanded?: boolean;
  children?: FileNode[];
  language?: string;
  content?: string;
}

const fileTree: FileNode[] = [
  {
    name: "know-chanakya",
    type: "folder",
    expanded: true,
    children: [
      {
        name: "profile",
        type: "folder",
        expanded: true,
        children: [
          { name: "about_me.py", type: "file", language: "python" },
          { name: "skills.py", type: "file", language: "python" },
          { name: "experience.py", type: "file", language: "python" },
        ],
      },
      { name: "README.md", type: "file", language: "markdown" },
    ],
  },
];

const fileContents: Record<string, string> = {
  "about_me.py": `"""
╔═══════════════════════════════════════════════╗
║         CHANAKYA YADAV - DATA ANALYST         ║
╚═══════════════════════════════════════════════╝
"""

class AboutMe:
    """Personal information and background"""
    
    def __init__(self):
        self.name = "Chanakya Yadav"
        self.title = "Data Analyst"
        self.phone = "(214) 929-8802"
        self.email = "chanakya.csv@gmail.com"
        
        self.education = [
            {
                "degree": "M.S. Information Systems & Management",
                "school": "Dallas Baptist University",
                "year": "Aug 2023 - May 2025"
            }
        ]
        
        self.certifications = [
            "Databricks Academy Accreditation",
            "Google Analytics Certificate"
        ]
        
        self.interests = [
            "Predictive Modeling",
            "Executive Dashboards",
            "Data Governance",
            "ETL Automation",
            "A/B Testing"
        ]
    
    def get_summary(self) -> str:
        return """
        Data Analyst with 4+ years of experience driving
        data-informed decisions across banking, healthcare,
        and e-commerce sectors. Delivered $1.7M+ in
        measurable cost savings and revenue impact through
        predictive analytics, KPI frameworks, and BI dashboards.
        
        Proficient in SQL, Python, R, SAS, Tableau, Power BI,
        Looker, Snowflake, dbt, and Apache Airflow.
        """

    def contact(self):
        print("📧 Email: chanakya.csv@gmail.com")
        print("📞 Phone: (214) 929-8802")
        print("💼 LinkedIn: https://linkedin.com/in/chanakya-csv")
        print("🐙 GitHub: https://github.com/chanakya-07")


if __name__ == "__main__":
    me = AboutMe()
    print(f"Hello! I'm {me.name}")
    print(me.get_summary())
`,

  "skills.py": `"""
Technical Skills & Expertise
============================
Aligned to 2026 Data Analyst job market keywords
"""

class TechnicalSkills:
    
    data_analytics = {
        "SQL (PostgreSQL, MySQL, T-SQL)":  "████████████████████ 95%",
        "Advanced Excel (Pivot, VBA)":     "██████████████████░░ 90%",
        "Python (pandas, NumPy)":          "██████████████████░░ 90%",
        "EDA & Root Cause Analysis":       "████████████████████ 95%",
        "Data Storytelling":               "████████████████░░░░ 85%",
        "Cohort & Funnel Analysis":        "████████████████░░░░ 85%",
    }

    bi_visualization = {
        "Power BI (DAX, Power Query)":     "██████████████████░░ 90%",
        "Tableau":                         "██████████████████░░ 90%",
        "Looker (LookML)":                 "██████████████░░░░░░ 80%",
        "Executive Dashboards":            "████████████████████ 95%",
    }

    statistics_ml = {
        "A/B Testing":                     "████████████████████ 95%",
        "Hypothesis Testing":              "████████████████████ 95%",
        "Regression & Classification":     "██████████████████░░ 90%",
        "Time Series (ARIMA)":             "████████████████░░░░ 85%",
        "Clustering & Segmentation":       "████████████████░░░░ 85%",
        "Bayesian Analysis":               "██████████████░░░░░░ 80%",
        "Feature Engineering":             "██████████████████░░ 90%",
    }

    modern_data_stack = {
        "dbt":                             "██████████████░░░░░░ 80%",
        "Apache Airflow":                  "████████████████░░░░ 85%",
        "Snowflake":                       "████████████████░░░░ 85%",
        "ETL/ELT Pipelines":              "██████████████████░░ 90%",
        "SSIS":                            "██████████████░░░░░░ 80%",
    }

    cloud_platforms = {
        "AWS (S3, Redshift, Glue)":        "████████████████░░░░ 85%",
        "GCP (BigQuery)":                  "████████████████░░░░ 85%",
        "Azure (Synapse, Data Factory)":   "████████████████░░░░ 85%",
        "Databricks":                      "██████████████░░░░░░ 80%",
    }

    ai_genai = {
        "NLP":                             "████████████████░░░░ 85%",
        "LLM-Assisted Analytics":          "██████████████░░░░░░ 80%",
        "GenAI Tools":                     "██████████████░░░░░░ 80%",
    }

    tools_collaboration = [
        "Git/GitHub", "Jupyter Notebooks", "JIRA",
        "Confluence", "Agile/Scrum", "SAS", "R",
        "MongoDB (NoSQL)", "Power Query", "VBA"
    ]
    
    data_governance = [
        "Data Quality Management",
        "Data Lineage Tracking",
        "Metadata Management",
        "Compliance Monitoring",
        "Data Integrity Checks"
    ]
    
    @staticmethod
    def display_skills():
        print("=" * 50)
        print("          DATA ANALYTICS")
        print("=" * 50)
        for skill, level in TechnicalSkills.data_analytics.items():
            print(f"{skill}")
            print(f"  {level}")
        print()
        print("=" * 50)
        print("        BI & VISUALIZATION")
        print("=" * 50)
        for skill, level in TechnicalSkills.bi_visualization.items():
            print(f"{skill}")
            print(f"  {level}")


# Run to see skills visualization
TechnicalSkills.display_skills()
`,

  "experience.py": `"""
Professional Experience
=======================
"""

from dataclasses import dataclass
from typing import List

@dataclass
class Experience:
    role: str
    company: str
    location: str
    duration: str
    highlights: List[str]

work_history = [
    Experience(
        role="Data Analyst",
        company="Synovus Bank",
        location="United States",
        duration="Dec 2024 - Present",
        highlights=[
            "Reduced default risk by 12% with predictive credit risk models (Python, SQL)",
            "Increased fraud detection efficiency by 18% via anomaly detection automation",
            "Reduced monthly reporting effort by 40% with Power BI & Tableau dashboards",
            "Improved cross-sell success rate by 22% using customer segmentation models",
            "Reduced data processing times by 35% optimizing ETL via Airflow + Snowflake",
            "Identified $1.2M annual cost-saving opportunities through ad hoc analyses",
            "Established data governance standards (95% downstream reporting accuracy)",
            "Presented insights to C-suite executives influencing $2M+ in capital decisions",
            "Leveraged GenAI/LLM tools reducing manual analysis time by 20%"
        ]
    ),
    Experience(
        role="Data Analyst",
        company="Molina Healthcare",
        location="United States",
        duration="Jun 2021 - Aug 2023",
        highlights=[
            "Reduced patient readmission rates by 15% with predictive models on 500K+ records",
            "Recovered $500K+ in overpaid claims via fraud detection (Python, SQL)",
            "Reduced manual ETL effort by 30% automating pipelines with Airflow & MongoDB",
            "Improved reporting compliance by 20% with HEDIS/CMS KPI dashboards",
            "Designed cohort analysis frameworks improving care plan adherence by 18%",
            "Built NLP-based predictive risk scoring on patient notes (TensorFlow)",
            "Built advanced Excel models with VBA macros for quarterly budget reviews"
        ]
    ),
    Experience(
        role="Data Analyst",
        company="Swiggy",
        location="India",
        duration="Apr 2020 - May 2021",
        highlights=[
            "Increased order frequency by 10% analyzing purchase behavior with EDA & Tableau",
            "Reduced stockouts by 15% with ARIMA sales forecasting models",
            "Increased customer retention by 8% via segmentation (Scikit-learn clustering)",
            "Improved on-time delivery by 12% with predictive delivery time models",
            "Developed unit economics models (LTV/CAC) improving marketing ROI by 15%",
            "Maintained version-controlled codebases using Git/GitHub on Azure"
        ]
    )
]

def print_experience():
    print("\\n" + "="*60)
    print("            PROFESSIONAL EXPERIENCE")
    print("="*60 + "\\n")
    
    for exp in work_history:
        print(f"🏢 {exp.role} @ {exp.company}")
        print(f"📍 {exp.location}")
        print(f"📅 {exp.duration}")
        print("-" * 40)
        for highlight in exp.highlights:
            print(f"  • {highlight}")
        print()

print_experience()
`,
};

export function VSCodeApp() {
  const [activeFile, setActiveFile] = useState("about_me.py");
  const [expandedFolders, setExpandedFolders] = useState<string[]>(["know-chanakya", "profile"]);
  const [typedLines, setTypedLines] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  const currentContent = fileContents[activeFile] || "// Select a file to view";
  const lines = currentContent.split("\n");

  // Typing animation when file changes
  useEffect(() => {
    setTypedLines(0);
    setOutput([]);
    let line = 0;
    const interval = setInterval(() => {
      if (line < lines.length) {
        setTypedLines(line + 1);
        line++;
      } else {
        clearInterval(interval);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [activeFile, lines.length]);

  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prev) =>
      prev.includes(folderName)
        ? prev.filter((f) => f !== folderName)
        : [...prev, folderName]
    );
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput(["Running...", ""]);

    setTimeout(() => {
      if (activeFile === "about_me.py") {
        setOutput([
          "Hello! I'm Chanakya Yadav",
          "",
          "Data Analyst with 4+ years of experience driving",
          "data-informed decisions across banking, healthcare,",
          "and e-commerce sectors. Delivered $1.7M+ in",
          "measurable cost savings and revenue impact.",
          "",
          "📧 Email: chanakya.csv@gmail.com",
          "📞 Phone: (214) 929-8802",
          "💼 LinkedIn: linkedin.com/in/chanakya-csv",
          "🐙 GitHub: https://github.com/chanakya-07",
        ]);
      } else if (activeFile === "skills.py") {
        setOutput([
          "==================================================",
          "          DATA ANALYTICS",
          "==================================================",
          "SQL (PostgreSQL, MySQL, T-SQL)",
          "  ████████████████████ 95%",
          "Advanced Excel (Pivot, VBA)",
          "  ██████████████████░░ 90%",
          "Python (pandas, NumPy)",
          "  ██████████████████░░ 90%",
          "EDA & Root Cause Analysis",
          "  ████████████████████ 95%",
          "Data Storytelling",
          "  ████████████████░░░░ 85%",
          "Cohort & Funnel Analysis",
          "  ████████████████░░░░ 85%",
          "",
          "==================================================",
          "        BI & VISUALIZATION",
          "==================================================",
          "Power BI (DAX, Power Query)",
          "  ██████████████████░░ 90%",
          "Tableau",
          "  ██████████████████░░ 90%",
          "Looker (LookML)",
          "  ██████████████░░░░░░ 80%",
          "Executive Dashboards",
          "  ████████████████████ 95%",
        ]);
      } else if (activeFile === "experience.py") {
        setOutput([
          "============================================================",
          "            PROFESSIONAL EXPERIENCE",
          "============================================================",
          "",
          "🏢 Data Analyst @ Synovus Bank",
          "📍 United States | 📅 Dec 2024 - Present",
          "  • Reduced default risk by 12% with predictive credit risk models",
          "  • Increased fraud detection efficiency by 18%",
          "  • Identified $1.2M annual cost-saving opportunities",
          "  • Presented insights to C-suite influencing $2M+ decisions",
          "",
          "🏢 Data Analyst @ Molina Healthcare",
          "📍 United States | 📅 Jun 2021 - Aug 2023",
          "  • Reduced patient readmission rates by 15% on 500K+ records",
          "  • Recovered $500K+ in overpaid claims via fraud detection",
          "",
          "🏢 Data Analyst @ Swiggy",
          "📍 India | 📅 Apr 2020 - May 2021",
          "  • Increased order frequency by 10% with EDA & Tableau",
          "  • Improved marketing ROI by 15% with unit economics models",
        ]);
      }
      setIsRunning(false);
    }, 800);
  };

  const renderTree = (items: FileNode[], depth = 0) => {
    return items.map((item) => (
      <div key={item.name}>
        <motion.button
          type="button"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: depth * 0.05 }}
          className={`w-full flex items-center gap-1 px-2 py-1 text-sm hover:bg-slate-700/50 text-left ${
            item.type === "file" && activeFile === item.name
              ? "bg-slate-700"
              : ""
          }`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => {
            if (item.type === "folder") {
              toggleFolder(item.name);
            } else {
              setActiveFile(item.name);
            }
          }}
        >
          {item.type === "folder" ? (
            <>
              {expandedFolders.includes(item.name) ? (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-400" />
              )}
              {expandedFolders.includes(item.name) ? (
                <FolderOpen className="w-4 h-4 text-amber-400" />
              ) : (
                <Folder className="w-4 h-4 text-amber-400" />
              )}
            </>
          ) : (
            <>
              <span className="w-4" />
              <FileText className="w-4 h-4 text-blue-400" />
            </>
          )}
          <span className="text-slate-300">{item.name}</span>
        </motion.button>
        {item.type === "folder" &&
          item.children &&
          expandedFolders.includes(item.name) &&
          renderTree(item.children, depth + 1)}
      </div>
    ));
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-slate-300">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#323233]">
        <span className="text-sm">Get to Know Me - Code Edition - VS Code</span>
        <button
          type="button"
          onClick={runCode}
          disabled={isRunning}
          className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white text-xs rounded transition-colors"
        >
          <Play className="w-3 h-3" />
          Run
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Activity bar */}
        <div className="w-12 bg-[#333333] flex flex-col items-center py-2 gap-4">
          <button type="button" className="p-2 text-slate-400 hover:text-white bg-slate-700">
            <FileText className="w-5 h-5" />
          </button>
          <button type="button" className="p-2 text-slate-500 hover:text-white">
            <Search className="w-5 h-5" />
          </button>
          <button type="button" className="p-2 text-slate-500 hover:text-white">
            <GitBranch className="w-5 h-5" />
          </button>
          <button type="button" className="p-2 text-slate-500 hover:text-white">
            <Bug className="w-5 h-5" />
          </button>
          <button type="button" className="p-2 text-slate-500 hover:text-white">
            <Blocks className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <button type="button" className="p-2 text-slate-500 hover:text-white">
            <User className="w-5 h-5" />
          </button>
          <button type="button" className="p-2 text-slate-500 hover:text-white">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Side bar */}
        <div className="w-48 bg-[#252526] overflow-y-auto">
          <div className="p-2 text-xs uppercase tracking-wide text-slate-500">
            Explorer
          </div>
          {renderTree(fileTree)}
        </div>

        {/* Editor + Terminal */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Tabs */}
          <div className="flex bg-[#252526] border-b border-slate-700">
            {["about_me.py", "skills.py", "experience.py"].map((file) => (
              <button
                key={file}
                type="button"
                onClick={() => setActiveFile(file)}
                className={`flex items-center gap-2 px-4 py-2 text-sm ${
                  activeFile === file
                    ? "bg-[#1e1e1e] border-t-2 border-cyan-400"
                    : "hover:bg-slate-700"
                }`}
              >
                <FileText className="w-4 h-4 text-blue-400" />
                {file}
              </button>
            ))}
          </div>

          {/* Code area */}
          <div className="flex-1 overflow-auto p-4 font-mono text-sm min-h-0">
            <div className="flex">
              {/* Line numbers */}
              <div className="pr-4 text-right text-slate-600 select-none">
                {lines.slice(0, typedLines).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              {/* Code */}
              <pre className="flex-1 overflow-x-auto">
                <code>
                  {lines.slice(0, typedLines).map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="whitespace-pre"
                    >
                      {highlightPython(line)}
                    </motion.div>
                  ))}
                </code>
              </pre>
            </div>
          </div>

          {/* Terminal output */}
          {output.length > 0 && (
            <div className="h-44 bg-[#1e1e1e] border-t border-slate-700 flex flex-col flex-shrink-0">
              <div className="flex items-center gap-2 px-4 py-1.5 bg-[#252526] text-xs text-slate-400 flex-shrink-0 border-b border-slate-700">
                <Terminal className="w-3 h-3" />
                Output
              </div>
              <div className="p-3 font-mono text-sm text-green-400 overflow-y-auto flex-1">
                {output.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {line || "\u00A0"}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Status bar */}
          <div className="flex items-center justify-between px-4 py-1 bg-[#007acc] text-white text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <GitBranch className="w-3 h-3" />
                main
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span>Python</span>
              <span>UTF-8</span>
              <span>Ln {typedLines}, Col 1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function highlightPython(line: string) {
  // Comments
  if (line.trim().startsWith("#") || line.trim().startsWith('"""') || line.trim().startsWith("'''")) {
    return <span className="text-green-500">{line}</span>;
  }

  // Decorators
  if (line.trim().startsWith("@")) {
    return <span className="text-yellow-400">{line}</span>;
  }

  // Keywords
  const keywords = ["import", "from", "class", "def", "return", "if", "else", "for", "in", "self", "None", "True", "False", "print", "and", "or", "not"];
  
  let result = line;
  for (const keyword of keywords) {
    const regex = new RegExp(`\\b${keyword}\\b`, "g");
    if (regex.test(result)) {
      return (
        <span>
          {line.split(new RegExp(`(\\b${keyword}\\b)`)).map((part, i) =>
            part === keyword ? (
              <span key={i} className="text-purple-400">{part}</span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </span>
      );
    }
  }

  // Strings
  if (line.includes('"') || line.includes("'")) {
    return <span className="text-amber-300">{line}</span>;
  }

  return line;
}
