"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bold,
  Italic,
  ChevronDown,
  Save,
  Undo,
  Redo,
  BarChart3,
  PieChart,
  TrendingUp,
  Building2,
} from "lucide-react";

interface SkillData {
  category: string;
  skill: string;
  proficiency: number;
  yearsExp: number;
  projects: number;
  usedAt: string[];
}

const skillsData: SkillData[] = [
  // Languages & Querying
  { category: "Python", skill: "Python (pandas, NumPy, scikit-learn)", proficiency: 95, yearsExp: 4, projects: 25, usedAt: ["Synovus Bank", "Molina Healthcare", "Swiggy"] },
  { category: "SQL", skill: "SQL (PostgreSQL, MySQL, T-SQL)", proficiency: 95, yearsExp: 4, projects: 22, usedAt: ["Synovus Bank", "Molina Healthcare", "Swiggy"] },
  { category: "R", skill: "R", proficiency: 85, yearsExp: 3, projects: 8, usedAt: ["Synovus Bank", "Swiggy"] },
  { category: "SAS", skill: "SAS", proficiency: 85, yearsExp: 3, projects: 6, usedAt: ["Synovus Bank"] },
  { category: "NoSQL", skill: "MongoDB (NoSQL)", proficiency: 82, yearsExp: 2, projects: 5, usedAt: ["Synovus Bank", "Molina Healthcare"] },
  // BI & Visualization
  { category: "Power BI", skill: "Power BI (DAX, Power Query)", proficiency: 92, yearsExp: 4, projects: 18, usedAt: ["Synovus Bank", "Molina Healthcare", "Swiggy"] },
  { category: "Tableau", skill: "Tableau", proficiency: 92, yearsExp: 4, projects: 16, usedAt: ["Synovus Bank", "Molina Healthcare", "Swiggy"] },
  { category: "Looker", skill: "Looker (LookML)", proficiency: 80, yearsExp: 2, projects: 5, usedAt: ["Molina Healthcare"] },
  { category: "Excel", skill: "Advanced Excel (Pivot, VBA, Macros)", proficiency: 92, yearsExp: 4, projects: 20, usedAt: ["Synovus Bank", "Molina Healthcare", "Swiggy"] },
  // Statistics & ML
  { category: "scikit-learn", skill: "scikit-learn", proficiency: 92, yearsExp: 4, projects: 18, usedAt: ["Synovus Bank", "Molina Healthcare", "Swiggy"] },
  { category: "A/B Testing", skill: "A/B Testing", proficiency: 92, yearsExp: 3, projects: 10, usedAt: ["Synovus Bank", "Molina Healthcare"] },
  { category: "Statistics", skill: "Hypothesis Testing & Regression", proficiency: 92, yearsExp: 4, projects: 15, usedAt: ["Synovus Bank", "Molina Healthcare", "Swiggy"] },
  { category: "ARIMA", skill: "Time Series (ARIMA)", proficiency: 88, yearsExp: 3, projects: 8, usedAt: ["Synovus Bank", "Swiggy"] },
  { category: "Clustering", skill: "Clustering & Segmentation", proficiency: 88, yearsExp: 3, projects: 10, usedAt: ["Synovus Bank", "Molina Healthcare", "Swiggy"] },
  { category: "Feature Eng", skill: "Feature Engineering", proficiency: 92, yearsExp: 4, projects: 18, usedAt: ["Synovus Bank", "Molina Healthcare", "Swiggy"] },
  { category: "Bayesian", skill: "Bayesian Analysis", proficiency: 80, yearsExp: 2, projects: 4, usedAt: ["Synovus Bank"] },
  // Data Engineering & Modern Data Stack
  { category: "Airflow", skill: "Apache Airflow", proficiency: 85, yearsExp: 3, projects: 10, usedAt: ["Synovus Bank", "Molina Healthcare"] },
  { category: "dbt", skill: "dbt", proficiency: 80, yearsExp: 2, projects: 6, usedAt: ["Synovus Bank"] },
  { category: "SSIS", skill: "SSIS", proficiency: 82, yearsExp: 2, projects: 5, usedAt: ["Molina Healthcare"] },
  { category: "ETL", skill: "ETL/ELT Pipelines", proficiency: 90, yearsExp: 4, projects: 15, usedAt: ["Synovus Bank", "Molina Healthcare"] },
  // Cloud Platforms
  { category: "Snowflake", skill: "Snowflake", proficiency: 88, yearsExp: 3, projects: 12, usedAt: ["Synovus Bank", "Molina Healthcare"] },
  { category: "AWS", skill: "AWS (S3, Redshift, Glue)", proficiency: 85, yearsExp: 3, projects: 10, usedAt: ["Synovus Bank", "Molina Healthcare"] },
  { category: "GCP", skill: "GCP (BigQuery)", proficiency: 85, yearsExp: 2, projects: 6, usedAt: ["Synovus Bank"] },
  { category: "Azure", skill: "Azure (Synapse, Data Factory)", proficiency: 85, yearsExp: 3, projects: 8, usedAt: ["Synovus Bank", "Swiggy"] },
  { category: "Databricks", skill: "Databricks", proficiency: 82, yearsExp: 2, projects: 5, usedAt: ["Synovus Bank"] },
  // AI & GenAI
  { category: "NLP", skill: "NLP", proficiency: 85, yearsExp: 2, projects: 4, usedAt: ["Molina Healthcare"] },
  { category: "TensorFlow", skill: "TensorFlow", proficiency: 82, yearsExp: 2, projects: 4, usedAt: ["Molina Healthcare"] },
  { category: "GenAI", skill: "GenAI / LLM-Assisted Analytics", proficiency: 80, yearsExp: 1, projects: 3, usedAt: ["Synovus Bank"] },
  // Tools & Collaboration
  { category: "Git", skill: "Git/GitHub", proficiency: 90, yearsExp: 4, projects: 28, usedAt: ["Synovus Bank", "Molina Healthcare", "Swiggy"] },
  { category: "Jupyter", skill: "Jupyter Notebooks", proficiency: 92, yearsExp: 4, projects: 22, usedAt: ["Synovus Bank", "Molina Healthcare", "Swiggy"] },
  { category: "JIRA", skill: "JIRA", proficiency: 88, yearsExp: 3, projects: 15, usedAt: ["Synovus Bank", "Molina Healthcare"] },
  { category: "Confluence", skill: "Confluence", proficiency: 85, yearsExp: 3, projects: 12, usedAt: ["Synovus Bank", "Molina Healthcare"] },
];

const columns = ["A", "B", "C", "D", "E", "F", "G"];
const headers = ["Category", "Skill", "Proficiency", "Years Exp", "Projects", "Level", "Used At"];

type ActiveTab = "Skills" | "Summary";

export function ExcelApp() {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("Skills");
  const [animatedValues, setAnimatedValues] = useState<number[]>(skillsData.map(() => 0));

  // Animate proficiency bars
  useEffect(() => {
    skillsData.forEach((skill, index) => {
      setTimeout(() => {
        setAnimatedValues((prev) => {
          const newValues = [...prev];
          newValues[index] = skill.proficiency;
          return newValues;
        });
      }, index * 100);
    });
  }, []);

  const getLevel = (proficiency: number) => {
    if (proficiency >= 90) return { text: "Expert", color: "text-green-600 bg-green-100" };
    if (proficiency >= 80) return { text: "Advanced", color: "text-blue-600 bg-blue-100" };
    return { text: "Proficient", color: "text-amber-600 bg-amber-100" };
  };

  const renderSkillsTab = () => (
    <div className="flex-1 overflow-auto">
      <table className="w-full border-collapse">
        <thead className="sticky top-0 z-10">
          <tr>
            <th className="w-10 bg-gray-100 border border-gray-300 text-xs font-normal text-gray-600" />
            {columns.map((col) => (
              <th
                key={col}
                className="min-w-24 px-2 py-1 bg-gray-100 border border-gray-300 text-xs font-normal text-gray-600"
              >
                {col}
              </th>
            ))}
          </tr>
          <tr>
            <td className="w-10 px-2 py-1 bg-green-700 border border-gray-300 text-xs text-white text-center font-bold">
              1
            </td>
            {headers.map((header) => (
              <td
                key={header}
                className="min-w-24 px-2 py-1.5 bg-green-700 border border-gray-300 text-xs text-white font-bold"
              >
                {header}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {skillsData.map((skill, rowIndex) => {
            const level = getLevel(skill.proficiency);
            return (
              <motion.tr
                key={`${skill.skill}-${rowIndex}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: rowIndex * 0.03 }}
              >
                <td className="w-10 px-2 py-1 bg-gray-100 border border-gray-300 text-xs text-gray-600 text-center">
                  {rowIndex + 2}
                </td>
                <td
                  className={`min-w-24 px-2 py-1 border border-gray-300 text-sm cursor-pointer hover:bg-gray-50 ${
                    selectedCell?.row === rowIndex && selectedCell?.col === 0
                      ? "bg-blue-100 ring-2 ring-blue-500 ring-inset"
                      : ""
                  }`}
                  onClick={() => setSelectedCell({ row: rowIndex, col: 0 })}
                >
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded">
                    {skill.category}
                  </span>
                </td>
                <td
                  className={`min-w-24 px-2 py-1 border border-gray-300 text-sm font-medium cursor-pointer hover:bg-gray-50 ${
                    selectedCell?.row === rowIndex && selectedCell?.col === 1
                      ? "bg-blue-100 ring-2 ring-blue-500 ring-inset"
                      : ""
                  }`}
                  onClick={() => setSelectedCell({ row: rowIndex, col: 1 })}
                >
                  {skill.skill}
                </td>
                <td
                  className={`min-w-28 px-2 py-1 border border-gray-300 text-sm cursor-pointer hover:bg-gray-50 ${
                    selectedCell?.row === rowIndex && selectedCell?.col === 2
                      ? "bg-blue-100 ring-2 ring-blue-500 ring-inset"
                      : ""
                  }`}
                  onClick={() => setSelectedCell({ row: rowIndex, col: 2 })}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${animatedValues[rowIndex]}%` }}
                        transition={{ duration: 0.8, delay: rowIndex * 0.03 }}
                        className={`h-full rounded-full ${
                          skill.proficiency >= 90
                            ? "bg-gradient-to-r from-green-400 to-green-600"
                            : skill.proficiency >= 80
                              ? "bg-gradient-to-r from-blue-400 to-blue-600"
                              : "bg-gradient-to-r from-amber-400 to-amber-600"
                        }`}
                      />
                    </div>
                    <span className="text-xs font-mono w-8">{skill.proficiency}%</span>
                  </div>
                </td>
                <td
                  className={`min-w-16 px-2 py-1 border border-gray-300 text-sm text-center cursor-pointer hover:bg-gray-50 ${
                    selectedCell?.row === rowIndex && selectedCell?.col === 3
                      ? "bg-blue-100 ring-2 ring-blue-500 ring-inset"
                      : ""
                  }`}
                  onClick={() => setSelectedCell({ row: rowIndex, col: 3 })}
                >
                  {skill.yearsExp}
                </td>
                <td
                  className={`min-w-16 px-2 py-1 border border-gray-300 text-sm text-center cursor-pointer hover:bg-gray-50 ${
                    selectedCell?.row === rowIndex && selectedCell?.col === 4
                      ? "bg-blue-100 ring-2 ring-blue-500 ring-inset"
                      : ""
                  }`}
                  onClick={() => setSelectedCell({ row: rowIndex, col: 4 })}
                >
                  {skill.projects}
                </td>
                <td
                  className={`min-w-20 px-2 py-1 border border-gray-300 text-sm cursor-pointer hover:bg-gray-50 ${
                    selectedCell?.row === rowIndex && selectedCell?.col === 5
                      ? "bg-blue-100 ring-2 ring-blue-500 ring-inset"
                      : ""
                  }`}
                  onClick={() => setSelectedCell({ row: rowIndex, col: 5 })}
                >
                  <span className={`px-2 py-0.5 text-xs rounded-full ${level.color}`}>
                    {level.text}
                  </span>
                </td>
                <td
                  className={`min-w-36 px-2 py-1 border border-gray-300 text-xs cursor-pointer hover:bg-gray-50 ${
                    selectedCell?.row === rowIndex && selectedCell?.col === 6
                      ? "bg-blue-100 ring-2 ring-blue-500 ring-inset"
                      : ""
                  }`}
                  onClick={() => setSelectedCell({ row: rowIndex, col: 6 })}
                >
                  <div className="flex flex-wrap gap-1">
                    {skill.usedAt.map((company) => (
                      <span
                        key={company}
                        className="px-1.5 py-0.5 bg-cyan-50 text-cyan-700 rounded text-xs border border-cyan-200"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSummaryTab = () => {
    const totalProjects = skillsData.reduce((sum, s) => sum + s.projects, 0);
    const avgProficiency = Math.round(skillsData.reduce((sum, s) => sum + s.proficiency, 0) / skillsData.length);
    const expertSkills = skillsData.filter((s) => s.proficiency >= 90).length;
    const categories = [...new Set(skillsData.map((s) => s.category))];
    const companies = ["Synovus Bank", "Molina Healthcare", "Swiggy"];

    return (
      <div className="flex-1 overflow-auto p-4 bg-gradient-to-br from-gray-50 to-white">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Skills Summary Dashboard</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[
            { label: "Total Skills", value: skillsData.length, icon: BarChart3, color: "from-blue-500 to-blue-600" },
            { label: "Total Projects", value: totalProjects, icon: PieChart, color: "from-green-500 to-green-600" },
            { label: "Avg Proficiency", value: `${avgProficiency}%`, icon: TrendingUp, color: "from-cyan-500 to-cyan-600" },
            { label: "Expert Level", value: expertSkills, icon: TrendingUp, color: "from-amber-500 to-amber-600" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl shadow-md p-3 border border-gray-100"
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
              <div className="text-xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Category Breakdown */}
          <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-3 text-sm">Skills by Category</h3>
            <div className="space-y-2">
              {categories.map((category, i) => {
                const categorySkills = skillsData.filter((s) => s.category === category);
                const avgProf = Math.round(categorySkills.reduce((sum, s) => sum + s.proficiency, 0) / categorySkills.length);
                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-16 text-xs font-medium text-gray-700 truncate">{category}</span>
                    <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${avgProf}%` }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-end pr-2"
                      >
                        <span className="text-xs text-white font-medium">{avgProf}%</span>
                      </motion.div>
                    </div>
                    <span className="text-xs text-gray-500 w-12">{categorySkills.length} skills</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Skills by Company */}
          <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-4 h-4 text-cyan-600" />
              <h3 className="font-semibold text-gray-800 text-sm">Skills by Company</h3>
            </div>
            <div className="space-y-3">
              {companies.map((company, i) => {
                const companySkills = skillsData.filter((s) => s.usedAt.includes(company));
                const avgProf = Math.round(companySkills.reduce((sum, s) => sum + s.proficiency, 0) / companySkills.length);
                const colors = [
                  "from-cyan-400 to-blue-500",
                  "from-purple-400 to-pink-500",
                  "from-amber-400 to-orange-500",
                ];
                return (
                  <motion.div
                    key={company}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-700">{company}</span>
                      <span className="text-xs text-gray-500">{companySkills.length} skills</span>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${avgProf}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                        className={`h-full bg-gradient-to-r ${colors[i]} rounded-full flex items-center justify-end pr-2`}
                      >
                        <span className="text-xs text-white font-medium">{avgProf}%</span>
                      </motion.div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {companySkills.slice(0, 4).map((s) => (
                        <span key={s.skill} className="px-1.5 py-0.5 bg-white text-xs text-gray-600 rounded border border-gray-200">
                          {s.skill}
                        </span>
                      ))}
                      {companySkills.length > 4 && (
                        <span className="px-1.5 py-0.5 text-xs text-gray-400">+{companySkills.length - 4} more</span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Ribbon */}
      <div className="bg-green-700">
        <div className="flex items-center gap-2 px-4 py-1">
          <span className="text-white text-sm font-semibold">Skills and Technologies</span>
          <div className="flex gap-1 ml-4">
            {["File", "Home", "Insert", "Data", "View"].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`px-3 py-1 text-white text-sm rounded ${
                  tab === "Home" ? "bg-white/20" : "hover:bg-green-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 bg-gray-50">
        <button type="button" className="p-1 hover:bg-gray-200 rounded">
          <Save className="w-4 h-4 text-gray-600" />
        </button>
        <button type="button" className="p-1 hover:bg-gray-200 rounded">
          <Undo className="w-4 h-4 text-gray-600" />
        </button>
        <button type="button" className="p-1 hover:bg-gray-200 rounded">
          <Redo className="w-4 h-4 text-gray-600" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-2" />
        <button type="button" className="p-1 hover:bg-gray-200 rounded">
          <Bold className="w-4 h-4 text-gray-600" />
        </button>
        <button type="button" className="p-1 hover:bg-gray-200 rounded">
          <Italic className="w-4 h-4 text-gray-600" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-2" />
        <div className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded bg-white">
          <span className="text-sm text-gray-700">Calibri</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Formula bar */}
      <div className="flex items-center gap-2 px-4 py-1 border-b border-gray-200 bg-white">
        <div className="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-center bg-gray-50">
          {selectedCell ? `${columns[selectedCell.col]}${selectedCell.row + 2}` : "A1"}
        </div>
        <div className="text-gray-400">fx</div>
        <input
          type="text"
          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
          placeholder="Select a cell to see its value"
          readOnly
        />
      </div>

      {/* Content */}
      {activeTab === "Skills" ? renderSkillsTab() : renderSummaryTab()}

      {/* Sheet tabs */}
      <div className="flex items-center border-t border-gray-200 bg-gray-100">
        {(["Skills", "Summary"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            className={`px-4 py-2 text-sm border-r border-gray-300 transition-colors ${
              activeTab === tab
                ? "bg-white font-medium border-t-2 border-t-green-600"
                : "hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <div className="flex-1" />
        <div className="px-4 py-1 text-xs text-gray-500">
          {skillsData.length} skills tracked | Last updated: Today
        </div>
      </div>
    </div>
  );
}
