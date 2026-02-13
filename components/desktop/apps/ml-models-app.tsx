"use client";

import React from "react"

import { motion } from "framer-motion";
import {
  Building2,
  Database,
  TrendingUp,
  AlertTriangle,
  Users,
  BarChart3,
  MessageSquare,
  ShoppingCart,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface MLModel {
  id: number;
  title: string;
  industry: string;
  algorithms: string[];
  dataScale: string;
  purpose: string;
  keyFeatures?: string[];
  metrics: string;
  validation?: string[];
  explainability?: string;
  deployment: string;
  businessImpact: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const mlModels: MLModel[] = [
  {
    id: 1,
    title: "Credit Risk Prediction",
    industry: "Banking",
    algorithms: ["Python (scikit-learn)", "Regression Analysis"],
    dataScale: "Customer accounts with advanced feature engineering",
    purpose: "Predict probability of default to support credit decisioning and loan approval accuracy",
    keyFeatures: ["transaction velocity", "utilization trends", "delinquency patterns"],
    metrics: "Reduced default risk by 12%",
    validation: ["A/B testing", "cross-validation", "diagnostic deep-dives"],
    explainability: "Impact-first reporting for C-suite presentations",
    deployment: "Automated pipelines via Apache Airflow in Snowflake and AWS Redshift",
    businessImpact: "Improved loan approval accuracy and reduced default risk by 12%",
    icon: TrendingUp,
    color: "#06b6d4",
  },
  {
    id: 2,
    title: "Fraud Detection & Anomaly Detection",
    industry: "Banking",
    algorithms: ["Python", "SQL", "Time-series Analysis", "ML-based Detection Rules"],
    dataScale: "Customer transaction data with automated monitoring",
    purpose: "Automate detection of fraudulent transaction patterns while minimizing false positives",
    metrics: "Increased fraud detection efficiency by 18%",
    validation: ["time-series validation", "threshold optimization"],
    deployment: "Automated anomaly detection pipelines with real-time monitoring",
    businessImpact: "Increased fraud detection efficiency by 18%",
    icon: AlertTriangle,
    color: "#ef4444",
  },
  {
    id: 3,
    title: "Patient Readmission Prediction",
    industry: "Healthcare",
    algorithms: ["Python (scikit-learn)", "Logistic Regression", "Feature Engineering"],
    dataScale: "500K+ patient records with feature selection",
    purpose: "Predict likelihood of patient readmission to enable proactive intervention",
    keyFeatures: ["clinical indicators", "demographics", "prior utilization"],
    metrics: "Reduced readmission rates by 15%",
    explainability: "Feature importance analysis for clinical teams",
    deployment: "Production scoring pipelines with Tableau dashboards",
    businessImpact: "Reduced patient readmission rates by 15%",
    icon: Database,
    color: "#8b5cf6",
  },
  {
    id: 4,
    title: "Claims Fraud & Overpayment Detection",
    industry: "Healthcare",
    algorithms: ["Python", "SQL", "Statistical Testing"],
    dataScale: "Claims data across healthcare programs",
    purpose: "Detect suspicious billing patterns and identify overpaid claims for recovery",
    metrics: "Recovered $500K+ in overpayments",
    validation: ["compliance monitoring", "data governance checks"],
    deployment: "Production scoring with automated validation processes",
    businessImpact: "Recovered over $500K in overpaid claims",
    icon: CheckCircle2,
    color: "#10b981",
  },
  {
    id: 5,
    title: "Customer Segmentation & Clustering",
    industry: "Banking & E-commerce",
    algorithms: ["Python", "Scikit-learn", "R", "Clustering Algorithms"],
    dataScale: "Customer behavioral data across banking and e-commerce",
    purpose: "Segment customers for targeted marketing campaigns and cross-sell optimization",
    metrics: "Improved cross-sell by 22%, retention by 8%",
    deployment: "Batch processing with Power BI visualization",
    businessImpact: "Improved cross-sell success rate by 22% (banking) and customer retention by 8% (e-commerce)",
    icon: Users,
    color: "#f59e0b",
  },
  {
    id: 6,
    title: "Time Series Forecasting",
    industry: "Banking & E-commerce",
    algorithms: ["ARIMA", "Python (Pandas)", "Regression Analysis"],
    dataScale: "Historical deposit growth, loan demand, and sales data",
    purpose: "Forecast demand, costs, and inventory needs for strategic planning",
    metrics: "Enabled capital allocation decisions; reduced stockouts by 15%",
    deployment: "Automated forecasting pipeline on GCP BigQuery",
    businessImpact: "Supported capital allocation decisions and reduced stockouts by 15%",
    icon: BarChart3,
    color: "#3b82f6",
  },
  {
    id: 7,
    title: "NLP Predictive Risk Scoring",
    industry: "Healthcare",
    algorithms: ["TensorFlow", "NLP Libraries", "Python"],
    dataScale: "Patient notes and clinical text records",
    purpose: "Score patient risk from unstructured clinical notes for early intervention",
    metrics: "Improved early intervention in high-risk cases",
    deployment: "Production classification pipeline integrated with care management",
    businessImpact: "Improved early intervention in high-risk cases through automated text analysis",
    icon: MessageSquare,
    color: "#ec4899",
  },
  {
    id: 8,
    title: "Unit Economics & LTV/CAC Modeling",
    industry: "E-commerce",
    algorithms: ["Python", "Regression Analysis", "Cohort Analysis"],
    dataScale: "Order profitability and customer acquisition data by channel",
    purpose: "Track LTV/CAC ratios, order profitability, and acquisition cost to optimize marketing spend",
    keyFeatures: ["customer lifetime value", "acquisition cost by channel", "order-level profitability"],
    metrics: "Improved marketing ROI by 15%",
    deployment: "Dashboards in Tableau and Power BI with Git version control on Azure",
    businessImpact: "Provided actionable insights that improved marketing ROI by 15%",
    icon: ShoppingCart,
    color: "#14b8a6",
  },
];

export function MLModelsApp() {
  return (
    <div className="h-full flex flex-col bg-slate-950">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Machine Learning Models</h1>
            <p className="text-sm text-slate-400 mt-1">
              Production ML models built for banking, healthcare, and e-commerce
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/20 rounded-full border border-cyan-500/30">
              <Database className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-400">{mlModels.length} Models</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 rounded-full border border-green-500/30">
              <Clock className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">Production</span>
            </div>
          </div>
        </div>
      </div>

      {/* Model Cards */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid gap-4">
          {mlModels.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 hover:border-slate-700 transition-colors"
            >
              {/* Model Header */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${model.color}20` }}
                >
                  <model.icon className="w-6 h-6" style={{ color: model.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold text-white">{model.title}</h3>
                    <span
                      className="px-2.5 py-0.5 text-xs font-medium rounded-full"
                      style={{
                        backgroundColor: `${model.color}20`,
                        color: model.color,
                        border: `1px solid ${model.color}40`,
                      }}
                    >
                      {model.industry}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">{model.purpose}</p>
                </div>
              </div>

              {/* Model Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-3">
                  {/* Algorithms */}
                  <div>
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Algorithms
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {model.algorithms.map((algo) => (
                        <span
                          key={algo}
                          className="px-2 py-1 text-xs font-medium bg-slate-800 text-slate-300 rounded border border-slate-700"
                        >
                          {algo}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Data Scale */}
                  <div>
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Data Scale
                    </span>
                    <p className="text-sm text-slate-300 mt-1">{model.dataScale}</p>
                  </div>

                  {/* Key Features */}
                  {model.keyFeatures && (
                    <div>
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Key Features
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {model.keyFeatures.map((feature) => (
                          <span
                            key={feature}
                            className="px-2 py-1 text-xs bg-slate-800/50 text-slate-400 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  {/* Metrics */}
                  <div>
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Evaluation Metrics
                    </span>
                    <p className="text-sm text-cyan-400 font-medium mt-1">{model.metrics}</p>
                  </div>

                  {/* Validation */}
                  {model.validation && (
                    <div>
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Validation
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {model.validation.map((val) => (
                          <span
                            key={val}
                            className="px-2 py-1 text-xs bg-slate-800/50 text-slate-400 rounded"
                          >
                            {val}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Explainability */}
                  {model.explainability && (
                    <div>
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Explainability
                      </span>
                      <p className="text-sm text-slate-300 mt-1">{model.explainability}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer - Deployment & Impact */}
              <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Deployment
                  </span>
                  <p className="text-sm text-slate-300 mt-1">{model.deployment}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Business Impact
                  </span>
                  <p className="text-sm font-medium mt-1" style={{ color: model.color }}>
                    {model.businessImpact}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Model Registry | Data Analyst Portfolio</span>
          <span>{mlModels.length} production models across 3 industries</span>
        </div>
      </div>
    </div>
  );
}
