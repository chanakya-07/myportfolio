"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Plus, Save, RotateCcw, ExternalLink, Github, Eye } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Customer Churn Prediction",
    description: "ML model predicting customer churn with 94% accuracy using ensemble methods.",
    tech: ["Python", "Scikit-learn", "XGBoost", "Pandas"],
    github: "#",
    demo: "#",
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: 2,
    title: "Real-time Sentiment Analysis",
    description: "NLP pipeline analyzing social media sentiment in real-time using transformers.",
    tech: ["Python", "BERT", "FastAPI", "Redis"],
    github: "#",
    demo: "#",
    image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: 3,
    title: "Sales Forecasting Dashboard",
    description: "Time series forecasting with interactive visualizations and automated reporting.",
    tech: ["Python", "Prophet", "Plotly", "Streamlit"],
    github: "#",
    demo: "#",
    image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: 4,
    title: "Image Classification API",
    description: "Deep learning model for product categorization deployed as REST API.",
    tech: ["TensorFlow", "Docker", "FastAPI", "AWS"],
    github: "#",
    image: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
  {
    id: 5,
    title: "Recommendation Engine",
    description: "Collaborative filtering system for personalized content recommendations.",
    tech: ["Python", "Spark", "MLlib", "PostgreSQL"],
    github: "#",
    demo: "#",
    image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
  {
    id: 6,
    title: "Fraud Detection System",
    description: "Anomaly detection pipeline identifying fraudulent transactions in real-time.",
    tech: ["Python", "Isolation Forest", "Kafka", "MongoDB"],
    github: "#",
    image: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  },
];

const codeLines = [
  { type: "comment", text: "# Portfolio Projects Analysis" },
  { type: "comment", text: "# Loading project data..." },
  { type: "code", text: "import portfolio as pf" },
  { type: "code", text: "from skills import DataScience" },
  { type: "code", text: "" },
  { type: "code", text: "projects = pf.load_projects()" },
  { type: "code", text: 'print(f"Total Projects: {len(projects)}")' },
  { type: "output", text: "Total Projects: 6" },
  { type: "code", text: "" },
  { type: "code", text: "# Executing portfolio showcase..." },
  { type: "code", text: "pf.display_projects(projects)" },
];

export function JupyterApp() {
  const [executionStage, setExecutionStage] = useState(0);
  const [showProjects, setShowProjects] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [hasAutoExecuted, setHasAutoExecuted] = useState(false);

  // Auto-execute after a short delay
  useEffect(() => {
    const autoExecuteTimer = setTimeout(() => {
      if (!hasAutoExecuted) {
        startExecution();
        setHasAutoExecuted(true);
      }
    }, 1500);

    return () => clearTimeout(autoExecuteTimer);
  }, [hasAutoExecuted]);

  const startExecution = () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setVisibleLines(0);
    setShowProjects(false);
    setExecutionStage(0);

    // Animate code lines appearing
    let currentLine = 0;
    const lineInterval = setInterval(() => {
      if (currentLine < codeLines.length) {
        setVisibleLines(currentLine + 1);
        currentLine++;
      } else {
        clearInterval(lineInterval);
        // Show projects after code execution
        setTimeout(() => {
          setShowProjects(true);
          setIsExecuting(false);
        }, 500);
      }
    }, 200);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-gray-200 bg-gray-50">
        <button
          type="button"
          onClick={startExecution}
          disabled={isExecuting}
          className="flex items-center gap-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white rounded text-sm font-medium transition-colors"
        >
          <Play className="w-4 h-4" />
          {isExecuting ? "Running..." : "Run All"}
        </button>
        <button type="button" className="p-2 hover:bg-gray-200 rounded" title="Save">
          <Save className="w-4 h-4 text-gray-600" />
        </button>
        <button type="button" className="p-2 hover:bg-gray-200 rounded" title="Add Cell">
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
        <button
          type="button"
          onClick={() => {
            setVisibleLines(0);
            setShowProjects(false);
            setHasAutoExecuted(false);
          }}
          className="p-2 hover:bg-gray-200 rounded"
          title="Restart"
        >
          <RotateCcw className="w-4 h-4 text-gray-600" />
        </button>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Python 3 (ipykernel)</span>
          <div className={`w-3 h-3 rounded-full ${isExecuting ? "bg-amber-500 animate-pulse" : "bg-green-500"}`} />
        </div>
      </div>

      {/* Notebook name */}
      <div className="px-4 py-2 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-amber-50">
        <h1 className="text-lg font-semibold text-gray-800">
          My Projects Portfolio
        </h1>
        <p className="text-xs text-gray-500">Click Run or wait for auto-execution to see projects</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Code Cell */}
        <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border-b border-gray-200">
            <span className="text-xs text-gray-500 font-mono">[{showProjects ? "1" : "*"}]:</span>
            <span className="text-xs text-gray-600">Code Cell</span>
          </div>
          <div className="p-4 bg-gray-900 font-mono text-sm">
            {codeLines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${
                  line.type === "comment"
                    ? "text-green-400"
                    : line.type === "output"
                    ? "text-cyan-300"
                    : "text-gray-100"
                }`}
              >
                {line.text || "\u00A0"}
              </motion.div>
            ))}
            {isExecuting && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
                className="text-white"
              >
                _
              </motion.span>
            )}
          </div>
        </div>

        {/* Projects Output */}
        <AnimatePresence>
          {showProjects && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
                <span className="text-xs text-gray-500 font-mono">Out[1]:</span>
                <span className="text-xs text-gray-600">Project Portfolio</span>
              </div>
              <div className="p-4 bg-gradient-to-br from-slate-50 to-gray-50">
                <div className="grid grid-cols-2 gap-4">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100"
                    >
                      {/* Project header with gradient */}
                      <div
                        className="h-20 flex items-center justify-center"
                        style={{ background: project.image }}
                      >
                        <span className="text-white text-2xl font-bold opacity-30">
                          {project.id.toString().padStart(2, "0")}
                        </span>
                      </div>

                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 text-sm mb-1">
                          {project.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.tech.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="flex gap-2">
                          {project.github && (
                            <a
                              href={project.github}
                              className="flex items-center gap-1 px-2 py-1 bg-gray-900 text-white text-xs rounded hover:bg-gray-700 transition-colors"
                            >
                              <Github className="w-3 h-3" />
                              Code
                            </a>
                          )}
                          {project.demo && (
                            <a
                              href={project.demo}
                              className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                            >
                              <Eye className="w-3 h-3" />
                              Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Summary stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200"
                >
                  <p className="text-sm text-green-800 font-mono">
                    <span className="text-green-600">&gt;&gt;&gt;</span> Successfully loaded {projects.length} projects. 
                    Total technologies: {new Set(projects.flatMap((p) => p.tech)).size}. 
                    Portfolio ready for review!
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
