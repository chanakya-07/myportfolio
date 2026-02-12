"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import {
  Folder,
  FileText,
  ImageIcon,
  Music,
  Code,
  User,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Globe,
  Award,
  Briefcase,
  GraduationCap,
  MapPin,
  Building2,
  ChevronDown,
} from "lucide-react";
import { VSCodeApp } from "./apps/vscode-app";
import { JupyterApp } from "./apps/jupyter-app";
import { ExcelApp } from "./apps/excel-app";
import { MLModelsApp } from "./apps/ml-models-app";
import { CertificationsContent } from "./certifications-content";

interface FolderContentProps {
  folderId: string;
  onOpenWindow?: (id: string, name: string) => void;
}

export function FolderContent({ folderId, onOpenWindow }: FolderContentProps) {
  switch (folderId) {
    case "about":
      return <AboutContent onOpenWindow={onOpenWindow} />;
    case "documents":
      return <DocumentsContent />;
    case "terminal":
      return <TerminalContent />;
    case "browser":
      return <BrowserContent onOpenWindow={onOpenWindow} />;
    case "settings":
      return <SettingsContent />;
    case "vscode":
      return <VSCodeApp />;
    case "jupyter":
      return <JupyterApp />;
    case "excel":
      return <ExcelApp />;
    case "mlmodels":
      return <MLModelsApp />;
    case "skills":
      return <SkillsContent />;
    case "experience":
      return <ExperienceContent />;
    case "certifications":
      return <CertificationsContent />;
    default:
      return <DefaultFolderContent />;
  }
}

interface AboutContentProps {
  onOpenWindow?: (id: string, name: string) => void;
}

// Default certification count matches the defaultCertifications in certifications-content.tsx
const DEFAULT_CERT_COUNT = 2;

function AboutContent({ onOpenWindow }: AboutContentProps) {
  const [profileImage, setProfileImage] = useState<string | null>("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/profile.png.png-pMxnI7tQUEDMBXRZ2Ose8k3CXxh7Cn.jpeg");
  const [certCount, setCertCount] = useState(DEFAULT_CERT_COUNT);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        localStorage.setItem('profileImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Update certification count from localStorage (profile image is now static)
  useEffect(() => {
    const updateCertCount = () => {
      const saved = localStorage.getItem("certifications");
      if (saved) {
        try {
          const certs = JSON.parse(saved);
          setCertCount(certs.length);
        } catch {
          setCertCount(DEFAULT_CERT_COUNT);
        }
      } else {
        // No saved data yet, use default count
        setCertCount(DEFAULT_CERT_COUNT);
      }
    };

    updateCertCount();
    const interval = setInterval(updateCertCount, 1000);
    return () => clearInterval(interval);
  }, []);

  const aboutStats = [
    { label: "Experience", value: "4+ yrs", windowId: "experience", windowName: "Experience" },
    { label: "ML Models", value: "7", windowId: "mlmodels", windowName: "ML Models" },
    { label: "Skills", value: "10+", windowId: "excel", windowName: "Skills and Technologies" },
    { label: "Certifications", value: certCount.toString(), windowId: "certifications", windowName: "Certifications" },
  ];

  return (
    <div className="p-6 text-card-foreground">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-6"
      >
        <motion.button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          whileHover={{ scale: 1.05 }}
          className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 p-1 flex-shrink-0 relative group overflow-hidden"
        >
          {profileImage ? (
            <img src={profileImage || "/placeholder.svg"} alt="Profile" className="w-full h-full rounded-full object-cover" />
          ) : (
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-4xl font-bold text-cyan-400">
              CY
            </div>
          )}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
            <span className="text-white text-xs">Upload Photo</span>
          </div>
        </motion.button>
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm text-cyan-400 mb-1">Welcome to my profile!</p>
            <h2 className="text-2xl font-bold mb-1">Chanakya Yadav</h2>
            <p className="text-muted-foreground mb-4">Data Analyst | 4+ Years | SQL, Python, Tableau, Power BI | Banking & Healthcare Analytics | Snowflake, AWS, Azure| United States</p>

           
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm leading-relaxed mb-4"
          >
             Data Analyst with 4+ years of experience driving data-informed decisions across banking, healthcare, and e-commerce sectors, translating complex datasets into actionable business strategies that drove $1.7M+ in cost savings.
             Proficient in SQL, Python, R, SAS, Tableau, Power BI, Looker, Snowflake, dbt, and Apache Airflow. Experienced in building executive dashboards, predictive models, and data governance practices on AWS, GCP, and Azure.
             Proven ability to deliver compelling data stories to C-suite stakeholders in Agile/Scrum environments.

          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a 
              href="mailto:chanakya.csv@gmail.com" 
              className="flex items-center gap-2 text-sm hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
              chanakya.csv@gmail.com
            </a>
            <a 
              href="tel:+12149298802" 
              className="flex items-center gap-2 text-sm hover:text-cyan-400 transition-colors"
            >
              <span className="text-xs">(214) 929-8802</span>
            </a>
            <a 
              href="https://github.com/chanakya-07" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-cyan-400 transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/chanakya-csv" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-cyan-400 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Stats - Clickable */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-4 gap-4 mt-8"
      >
        {aboutStats.map((stat, i) => (
          <motion.button
            type="button"
            key={stat.label}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOpenWindow?.(stat.windowId, stat.windowName)}
            className="text-center p-4 bg-[var(--muted)] rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          >
            <p className="text-2xl font-bold text-cyan-400">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}

function ProjectsContent() {
  const projects = [
    { name: "ML Pipeline", icon: Code, type: "Python Project", color: "text-green-400" },
    { name: "Data Dashboard", icon: FileText, type: "React App", color: "text-blue-400" },
    { name: "Kaggle Notebooks", icon: Folder, type: "Folder", color: "text-amber-400" },
    { name: "Analysis Reports", icon: FileText, type: "Documents", color: "text-purple-400" },
    { name: "Deep Learning", icon: Code, type: "TensorFlow", color: "text-orange-400" },
    { name: "Visualizations", icon: ImageIcon, type: "Charts", color: "text-cyan-400" },
  ];

  return (
    <div className="p-4 text-card-foreground">
      <div className="grid grid-cols-4 gap-4">
        {projects.map((project, i) => (
          <motion.button
            key={project.name}
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2 p-4 hover:bg-[var(--accent)]/50 rounded-lg transition-colors"
          >
            <project.icon className={`w-12 h-12 ${project.color}`} />
            <span className="text-xs text-center font-medium">{project.name}</span>
            <span className="text-xs text-muted-foreground">{project.type}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function DocumentsContent() {
  const documents = [
    { name: "Resume.pdf", icon: FileText, size: "245 KB" },
    { name: "Cover Letter.docx", icon: FileText, size: "32 KB" },
    { name: "Portfolio.pdf", icon: FileText, size: "1.2 MB" },
    { name: "Certificates", icon: Folder, size: "8 items" },
    { name: "Screenshots", icon: ImageIcon, size: "15 items" },
    { name: "Presentations", icon: Folder, size: "5 items" },
  ];

  return (
    <div className="p-4 text-card-foreground">
      <div className="space-y-1">
        {documents.map((doc, i) => (
          <motion.button
            key={doc.name}
            type="button"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ backgroundColor: "rgba(34, 211, 238, 0.1)" }}
            className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left"
          >
            <doc.icon className="w-8 h-8 text-blue-300" />
            <div className="flex-1">
              <p className="text-sm font-medium">{doc.name}</p>
              <p className="text-xs text-muted-foreground">{doc.size}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function TerminalContent() {
  const lines = [
    { prompt: true, text: "whoami" },
    { prompt: false, text: "Chanakya Yadav - Data Analyst" },
    { prompt: true, text: "cat about.txt" },
    { prompt: false, text: "4+ years driving data-informed decisions across banking, healthcare, and e-commerce." },
    { prompt: false, text: "$1.7M+ in cost savings. Dashboards, predictive models, data governance." },
    { prompt: true, text: "cat skills.txt" },
    { prompt: false, text: "Python, pandas, NumPy, scikit-learn, XGBoost, SHAP" },
    { prompt: false, text: "SQL Server, PostgreSQL, Power BI, Tableau" },
    { prompt: false, text: "Azure ML, Databricks, AWS S3, Snowflake, Git" },
    { prompt: true, text: "cat experience.txt" },
    { prompt: false, text: "Synovus Bank | Molina Healthcare | Swiggy" },
    { prompt: true, text: "" },
  ];

  return (
    <div className="h-full bg-slate-950 p-4 font-mono text-sm overflow-auto">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="mb-1"
        >
          {line.prompt ? (
            <span className="text-green-400">
              chanakya@portfolio:~$ <span className="text-foreground">{line.text}</span>
              {line.text === "" && <span className="animate-pulse">_</span>}
            </span>
          ) : (
            <span className="text-slate-200 pl-2">{line.text}</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

interface BrowserContentProps {
  onOpenWindow?: (id: string, name: string) => void;
}

function BrowserContent({ onOpenWindow }: BrowserContentProps) {
  const [showContact, setShowContact] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <div className="h-full flex flex-col text-card-foreground">
      <div className="flex items-center gap-2 p-2 bg-[var(--muted)]">
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-[var(--input)] rounded-full">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">https://chanakya-portfolio.vercel.app</span>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 overflow-auto">
        {showContact ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-96 bg-slate-800/80 rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Contact Me</h2>
              <button
                type="button"
                onClick={() => setShowContact(false)}
                className="text-slate-400 hover:text-white"
              >
                Back
              </button>
            </div>
            {sent ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Message Sent!</h3>
                <p className="text-slate-400 text-sm">Thank you for reaching out!</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsSending(true);
                  setTimeout(() => {
                    setIsSending(false);
                    setSent(true);
                  }, 1500);
                }}
                className="space-y-3"
              >
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-slate-500"
                  placeholder="Your name"
                />
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-slate-500"
                  placeholder="your.email@example.com"
                />
                <textarea
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-slate-500 resize-none"
                  placeholder="Your message..."
                />
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-2.5 bg-cyan-500 text-slate-900 rounded-lg font-medium"
                >
                  {isSending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Globe className="w-20 h-20 mx-auto mb-6 text-cyan-400" />
            <h1 className="text-2xl font-bold mb-2 text-white">Welcome to my Portfolio</h1>
            <p className="text-muted-foreground mb-6">Explore my work and experience</p>
            <div className="flex gap-4 justify-center">
              <motion.button
                type="button"
                onClick={() => {
                  if (onOpenWindow) {
                    onOpenWindow("experience", "Experience");
                  }
                }}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-cyan-500 text-slate-900 rounded-lg font-medium"
              >
                View Experience
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setShowContact(true)}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 border border-cyan-500 text-cyan-400 rounded-lg font-medium"
              >
                Contact Me
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function SettingsContent() {
  return (
    <div className="p-6 text-card-foreground">
      <h3 className="text-lg font-semibold mb-4">System Settings</h3>
      <div className="space-y-3">
        {[
          { label: "Theme", value: "Dark Blue" },
          { label: "Resolution", value: "1920 x 1080" },
          { label: "Sound", value: "Enabled" },
          { label: "Animations", value: "Smooth" },
          { label: "3D Effects", value: "Enabled" },
        ].map((setting, i) => (
          <motion.div
            key={setting.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between p-3 bg-[var(--muted)] rounded-lg"
          >
            <span>{setting.label}</span>
            <span className="text-cyan-400">{setting.value}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SkillsContent() {
  // Real individual tech skills from resume
  const allSkills = [
    "Python", "SQL", "R", "SAS", "Git", "pandas", "NumPy", "scikit-learn",
    "matplotlib", "TensorFlow", "XGBoost", "NLP", "GenAI", "LLM",
    "Snowflake", "Databricks", "dbt", "PostgreSQL", "MySQL", "MongoDB",
    "Power BI", "Tableau", "Looker", "LookML", "DAX", "Advanced Excel",
    "Azure", "AWS", "GCP", "BigQuery", "Airflow", "SSIS",
    "ARIMA", "Bayesian Analysis", "A/B Testing", "JIRA", "Confluence",
    "Jupyter Notebooks", "Power Query", "VBA"
  ];

  const skillColors: Record<string, string> = {
    "Python": "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "SQL": "bg-amber-500/20 text-amber-300 border-amber-500/30",
    "XGBoost": "bg-green-500/20 text-green-300 border-green-500/30",
    "SHAP": "bg-purple-500/20 text-purple-300 border-purple-500/30",
    "TensorFlow": "bg-orange-500/20 text-orange-300 border-orange-500/30",
    "Power BI": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    "Snowflake": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    "Databricks": "bg-red-500/20 text-red-300 border-red-500/30",
    "Azure ML": "bg-blue-400/20 text-blue-200 border-blue-400/30",
    "AWS S3": "bg-orange-400/20 text-orange-200 border-orange-400/30",
  };

  const defaultColor = "bg-slate-700/50 text-slate-200 border-slate-600/50";

  return (
    <div className="p-6 text-card-foreground overflow-auto bg-gradient-to-br from-slate-900 to-slate-800 h-full">
      <h3 className="text-lg font-semibold mb-6 text-white">Technical Skills</h3>
      <div className="flex flex-wrap gap-3">
        {allSkills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            whileHover={{ scale: 1.1, y: -2 }}
            className={`px-4 py-2 rounded-xl text-sm font-medium border cursor-default ${skillColors[skill] || defaultColor}`}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

// Game Level Node Component - Candy Crush style
interface GameLevelNodeProps {
  exp: {
    id: string;
    title: string;
    company: string;
    period: string;
    location: string;
    level: number;
    color: string;
    markerColor: string;
    glowColor: string;
    isEducation?: boolean;
  };
  isSelected: boolean;
  onClick: () => void;
  isCurrent?: boolean;
  isEducation?: boolean;
}

function GameLevelNodeComponent({ exp, isSelected, onClick, isCurrent, isEducation }: GameLevelNodeProps) {
  return (
    <div className="relative cursor-pointer group" onClick={onClick}>
      {/* Outer glow rings */}
      <motion.div
        className="absolute -inset-4 rounded-full"
        style={{
          background: `radial-gradient(circle, ${exp.markerColor}30 0%, transparent 70%)`,
        }}
        animate={{
          scale: isSelected ? [1, 1.5, 1] : [1, 1.2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />
      
      {/* Second pulse ring */}
      <motion.div
        className="absolute -inset-2 rounded-full"
        style={{
          background: `radial-gradient(circle, ${exp.markerColor}50 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
      />

      {/* Main node circle */}
      <motion.div
        className={`relative ${isEducation ? 'w-16 h-16' : 'w-20 h-20'} rounded-full bg-gradient-to-br ${exp.color} flex flex-col items-center justify-center shadow-2xl border-4 border-white/50`}
        style={{ 
          boxShadow: `0 0 40px ${exp.markerColor}, 0 0 80px ${exp.markerColor}40, inset 0 -4px 10px rgba(0,0,0,0.3)`,
        }}
        whileHover={{ scale: 1.15, y: -5 }}
        whileTap={{ scale: 0.95 }}
        animate={isSelected ? { 
          scale: [1, 1.08, 1],
          boxShadow: [
            `0 0 40px ${exp.markerColor}, 0 0 80px ${exp.markerColor}40`,
            `0 0 60px ${exp.markerColor}, 0 0 100px ${exp.markerColor}60`,
            `0 0 40px ${exp.markerColor}, 0 0 80px ${exp.markerColor}40`,
          ],
        } : {}}
        transition={{ duration: 1.5, repeat: isSelected ? Number.POSITIVE_INFINITY : 0 }}
      >
        {/* Level number or graduation cap for education */}
        {isEducation ? (
          <GraduationCap className="w-7 h-7 text-white drop-shadow-lg" />
        ) : (
          <span className="text-2xl font-black text-white drop-shadow-lg">{exp.level}</span>
        )}
        
        {/* Star decoration for current */}
        {isCurrent && (
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xs">&#9733;</span>
            </div>
          </motion.div>
        )}
        
        {/* Selection indicator */}
        {isSelected && (
          <motion.div
            className="absolute -inset-1 rounded-full border-2 border-white"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          />
        )}
      </motion.div>

      {/* Info card below */}
      <motion.div
        className={`absolute top-24 left-1/2 -translate-x-1/2 whitespace-nowrap z-10 transition-all duration-300`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className={`px-4 py-3 rounded-2xl backdrop-blur-md border-2 transition-all duration-300 ${
            isSelected
              ? `bg-gradient-to-br ${exp.color} border-white/40 shadow-2xl`
              : "bg-slate-800/90 border-white/20 group-hover:border-white/40"
          }`}
          style={isSelected ? { boxShadow: `0 15px 50px ${exp.markerColor}50` } : {}}
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-sm font-bold text-white text-center">{exp.company}</p>
          <p className="text-xs text-white/80 text-center">{exp.title}</p>
          <div className="flex items-center justify-center gap-4 mt-1 text-xs text-white/60">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {exp.location}
            </span>
            <span className="font-medium">{exp.period}</span>
          </div>
        </motion.div>
        
        {/* Connector line from node to card */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </div>
  );
}

function ExperienceContent() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  
  // Game map style - vertical layout like Candy Crush level map
  const experience = [
    {
      id: "swiggy",
      title: "Data Analyst",
      company: "Swiggy",
      period: "Apr 2020 - May 2021",
      location: "India",
      level: 1,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-500",
      glowColor: "rgba(245,158,11,0.5)",
      markerColor: "#f59e0b",
      skills: ["SQL", "Python", "Tableau", "Power BI", "ARIMA", "Scikit-learn", "Git", "Azure", "pandas"],
      work: [
        "Increased order frequency by 10% by analyzing customer purchase behavior and order trends using EDA and Tableau, generating insights that optimized promotional campaigns",
        "Improved inventory planning and reduced stockouts by 15% by building sales forecasting models using ARIMA, Python, and Pandas",
        "Created interactive dashboards in Tableau and Power BI using SQL and Python scripts to monitor delivery performance and operational KPIs",
        "Increased customer retention by 8% by conducting customer segmentation using Python, Scikit-learn, and clustering algorithms",
        "Improved on-time delivery by 12% by implementing predictive delivery time models using Python and regression analysis",
        "Developed unit economics models tracking LTV/CAC ratios, providing insights that improved marketing ROI by 15%",
        "Maintained version-controlled analytics codebases using Git/GitHub on Azure",
      ],
    },

    {
      id: "molina",
      title: "Data Analyst",
      company: "Molina Healthcare",
      period: "Jun 2021 - Aug 2023",
      location: "United States",
      level: 2,
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-500",
      glowColor: "rgba(168,85,247,0.5)",
      markerColor: "#a855f7",
      skills: ["Python", "SQL", "Tableau", "Power BI", "Airflow", "MongoDB", "AWS", "Snowflake", "TensorFlow", "scikit-learn", "Excel", "R", "PostgreSQL", "SSIS"],
      work: [
        "Reduced patient readmission rates by 15% by developing predictive models using Python (scikit-learn) and logistic regression on 500K+ patient records",
        "Recovered over $500K in overpaid claims by performing claims data analysis and fraud detection using Python, SQL, and statistical testing",
        "Reduced manual ETL effort by 30% by automating data pipelines using Python, Apache Airflow, and MongoDB",
        "Streamlined care management reporting by designing interactive Tableau dashboards and Power BI reports using SQL, DAX, and SSIS",
        "Improved reporting compliance by 20% by developing KPI dashboards tracking HEDIS and CMS quality measures",
        "Improved early intervention in high-risk cases by implementing NLP-based predictive risk scoring using Python and TensorFlow",
        "Designed cohort analysis frameworks to track patient engagement and retention, improving care plan adherence by 18%",
        "Built advanced Excel financial models with pivot tables, Power Query, and VBA macros for ad hoc claims analysis",
      ],
    },
    {
      id: "dbu",
      title: "Graduate Student & Student Ambassador",
      company: "Dallas Baptist University",
      period: "Aug 2023 - May 2025",
      location: "Dallas, TX",
      level: 0, // Not a numbered level - education
      isEducation: true,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-500",
      glowColor: "rgba(16,185,129,0.5)",
      markerColor: "#10b981",
      skills: ["MS Information Systems", "Data Analytics", "Leadership", "Research"],
      work: [
        "Pursued Master of Science in Information Systems",
        "Worked as Student Ambassador",
        "Completed coursework in database management, business intelligence, and Agile methodologies",
      ],
    },
    {
      id: "synovus",
      title: "Data Analyst",
      company: "Synovus Bank",
      period: "Dec 2024 - Present",
      location: "United States",
      level: 3,
      color: "from-cyan-500 to-blue-600",
      bgColor: "bg-cyan-500",
      glowColor: "rgba(6,182,212,0.5)",
      markerColor: "#06b6d4",
      skills: ["Python", "SQL", "Power BI", "Tableau", "SAS", "DAX", "Snowflake", "Airflow", "AWS Redshift", "GCP BigQuery", "R", "scikit-learn", "ARIMA", "NoSQL", "GenAI"],
      work: [
        "Reduced default risk by 12% by developing predictive credit risk models using Python (scikit-learn), SQL, and regression analysis",
        "Increased fraud detection efficiency by 18% by automating anomaly detection leveraging Python, SQL, and time-series analysis",
        "Reduced monthly reporting effort by 40% by building interactive dashboards in Power BI and Tableau using SQL, DAX, and SAS",
        "Improved cross-sell success rate by 22% by implementing customer segmentation using Python, R, and Scikit-learn",
        "Reduced data processing times by 35% by optimizing AI-driven ETL pipelines via Apache Airflow in Snowflake and AWS Redshift",
        "Identified cost-saving opportunities worth $1.2M annually by performing ad hoc analyses within Agile/Scrum frameworks",
        "Established data governance standards, implementing data quality checks and data lineage tracking (95% reporting accuracy)",
        "Presented quarterly insights to C-suite executives, influencing $2M+ in capital allocation decisions",
        "Leveraged GenAI tools and LLM-assisted analytics for automated report generation, reducing manual analysis time by 20%",
      ],

    },
  ];

  const selectedExp = experience.find(exp => exp.id === selectedCompany);

  return (
    <div className="h-full flex flex-col overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950/50 to-slate-900">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-slate-900/80 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
              <Briefcase className="w-5 h-5 text-cyan-400" />
              Career Journey
            </h3>
            <p className="text-xs text-slate-400 mt-1">Click on levels to explore my professional journey</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-800/60 rounded-xl px-4 py-2 border border-white/10">
            <GraduationCap className="w-5 h-5 text-purple-400" />
            <div>
              <p className="text-xs text-white font-medium">Dallas Baptist University</p>
              <p className="text-xs text-slate-400">MS in Information Systems and Management | Student Ambassador</p>

            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Game Map View */}
        <div className="flex-1 relative overflow-y-auto overflow-x-hidden">
          {/* Scroll Down Indicator */}
          <motion.div 
            className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 pointer-events-none"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-xs text-cyan-400/80 font-medium tracking-wide">Scroll down to explore</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5 text-cyan-400" />
            </motion.div>
          </motion.div>
          
          {/* Starry background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 3 + 1,
                  height: Math.random() * 3 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Game Map Path Container */}
          <div className="relative min-h-full py-12 px-8">
            {/* SVG Path connecting all nodes - Game map style zigzag */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minHeight: '500px' }}>
              <defs>
                <linearGradient id="gamePathGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <filter id="pathGlow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                {/* Dotted pattern for path */}
                <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="3" fill="white" opacity="0.3"/>
                </pattern>
              </defs>
              
              {/* Main curved path - candy crush style zigzag from bottom-left to top */}
              <motion.path
                d="M 40% 88% 
                   C 45% 78%, 55% 72%, 65% 62%
                   C 75% 52%, 55% 45%, 52% 38%
                   C 50% 32%, 45% 25%, 42% 15%"
                fill="none"
                stroke="url(#gamePathGradient)"
                strokeWidth="14"
                strokeLinecap="round"
                filter="url(#pathGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
              />
              
              {/* Dotted overlay on path */}
              <motion.path
                d="M 40% 88% 
                   C 45% 78%, 55% 72%, 65% 62%
                   C 75% 52%, 55% 45%, 52% 38%
                   C 50% 32%, 45% 25%, 42% 15%"
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="0 30"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
              />

              {/* Animated traveling orb */}
              <motion.circle
                r="10"
                fill="white"
                filter="url(#pathGlow)"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 2.5 }}
              >
                <animateMotion
                  dur="5s"
                  repeatCount="indefinite"
                  begin="2.5s"
                  path="M 40% 88% C 45% 78%, 55% 72%, 65% 62% C 75% 52%, 55% 45%, 52% 38% C 50% 32%, 45% 25%, 42% 15%"
                />
              </motion.circle>
            </svg>

            {/* Level Nodes - Game map style - reverse order so Level 3 is at top */}
            <div className="relative flex flex-col-reverse items-center gap-24 py-16" style={{ minHeight: '700px' }}>
              {/* Level 1 - Bottom - Swiggy */}
              <motion.div
                className="relative z-10"
                style={{ marginLeft: '-20%' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <GameLevelNodeComponent
                  exp={experience[0]}
                  isSelected={selectedCompany === experience[0].id}
                  onClick={() => setSelectedCompany(selectedCompany === experience[0].id ? null : experience[0].id)}
                />
              </motion.div>

              {/* Level 2 - Molina */}
              <motion.div
                className="relative z-10"
                style={{ marginLeft: '30%' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <GameLevelNodeComponent
                  exp={experience[1]}
                  isSelected={selectedCompany === experience[1].id}
                  onClick={() => setSelectedCompany(selectedCompany === experience[1].id ? null : experience[1].id)}
                />
              </motion.div>

              {/* Education - DBU (shown differently) */}
              <motion.div
                className="relative z-10"
                style={{ marginLeft: '5%' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              >
                <GameLevelNodeComponent
                  exp={experience[2]}
                  isSelected={selectedCompany === experience[2].id}
                  onClick={() => setSelectedCompany(selectedCompany === experience[2].id ? null : experience[2].id)}
                  isEducation
                />
              </motion.div>

              {/* Level 3 - Top (current) - Synovus */}
              <motion.div
                className="relative z-10"
                style={{ marginLeft: '-15%' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              >
                <GameLevelNodeComponent
                  exp={experience[3]}
                  isSelected={selectedCompany === experience[3].id}
                  onClick={() => setSelectedCompany(selectedCompany === experience[3].id ? null : experience[3].id)}
                  isCurrent
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Details panel */}
        <AnimatePresence mode="wait">
          {selectedExp && (
            <motion.div
              initial={{ opacity: 0, x: 100, width: 0 }}
              animate={{ opacity: 1, x: 0, width: 340 }}
              exit={{ opacity: 0, x: 100, width: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="border-l border-white/10 bg-slate-900/98 backdrop-blur-md overflow-hidden flex-shrink-0"
            >
              <div className="w-[340px] h-full overflow-y-auto">
                {/* Close button */}
                <div className="sticky top-0 p-3 bg-slate-900/95 border-b border-white/10 flex justify-between items-center">
                  <span className="text-sm font-medium text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    Location Details
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedCompany(null)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <span className="text-slate-400 text-sm">Close</span>
                  </button>
                </div>

                <div className="p-4">
                  {/* Company header */}
                  <motion.div 
                    className={`p-4 rounded-xl bg-gradient-to-br ${selectedExp.color} mb-4 shadow-xl relative overflow-hidden`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-20">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-20 h-20 border border-white/30 rounded-full"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: `${10 + i * 10}%`,
                          }}
                          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: i * 0.5 }}
                        />
                      ))}
                    </div>
                    
                    <div className="relative flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <Building2 className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg">{selectedExp.company}</h4>
                        <p className="text-sm text-white/90">{selectedExp.title}</p>
                      </div>
                    </div>
                    <div className="relative flex items-center gap-4 mt-3 text-white/90 text-xs">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {selectedExp.location}
                      </span>
                      <span className="font-medium">{selectedExp.period}</span>
                    </div>
                  </motion.div>

                  {/* All Skills */}
                  <motion.div 
                    className="mb-5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h5 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      Technologies Used
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedExp.skills.map((skill, i) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.15 + i * 0.05 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="px-3 py-1.5 bg-slate-800 text-sm rounded-lg text-white border border-white/10 hover:border-cyan-400/50 transition-colors cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Key Achievements */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h5 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Key Achievements
                    </h5>
                    <ul className="space-y-3">
                      {selectedExp.work.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.25 + i * 0.1 }}
                          className="flex items-start gap-3 text-sm text-white leading-relaxed bg-slate-800/50 p-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                        >
                          <motion.span 
                            className="mt-1.5 w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                          />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function DefaultFolderContent() {
  return (
    <div className="p-4 text-card-foreground flex items-center justify-center h-full">
      <p className="text-muted-foreground">This folder is empty</p>
    </div>
  );
}
