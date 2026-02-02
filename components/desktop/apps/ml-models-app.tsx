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
  Wifi,
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
    algorithms: ["Random Forest", "XGBoost"],
    dataScale: "250K+ customer accounts, 3M+ monthly transactions",
    purpose: "Predict probability of default to support credit decisioning",
    keyFeatures: ["transaction velocity", "utilization trends", "delinquency patterns"],
    metrics: "AUC 0.80–0.82",
    validation: ["out-of-time validation", "cross-validation", "PSI monitoring"],
    explainability: "SHAP feature importance for regulatory compliance",
    deployment: "Azure ML endpoints with containerized scoring and Airflow-based retraining",
    businessImpact: "Improved risk discrimination by 10–12%",
    icon: TrendingUp,
    color: "#06b6d4",
  },
  {
    id: 2,
    title: "Fraud Detection",
    industry: "Banking",
    algorithms: ["Random Forest", "XGBoost"],
    dataScale: "3M+ monthly financial transactions",
    purpose: "Identify fraudulent transaction patterns while minimizing false positives",
    metrics: "AUC ~0.80",
    validation: ["class imbalance handling", "threshold optimization"],
    deployment: "Production scoring pipelines with monitoring",
    businessImpact: "Reduced manual investigation workload",
    icon: AlertTriangle,
    color: "#ef4444",
  },
  {
    id: 3,
    title: "Fraud, Waste & Abuse Detection",
    industry: "Healthcare",
    algorithms: ["Random Forest", "XGBoost"],
    dataScale: "1.8M+ monthly Medicaid and Medicare claims across 19 states",
    purpose: "Detect suspicious provider billing patterns",
    metrics: "AUC 0.76",
    explainability: "Feature importance analysis for compliance",
    deployment: "Production scoring pipelines",
    businessImpact: "Flagged $2.2M in potential overpayments for investigation",
    icon: Database,
    color: "#8b5cf6",
  },
  {
    id: 4,
    title: "Prior Authorization Denial Prediction",
    industry: "Healthcare",
    algorithms: ["Logistic Regression with L1/L2 regularization"],
    dataScale: "400K+ monthly authorization requests",
    purpose: "Predict likelihood of denial to reduce unnecessary rejections",
    metrics: "Classification accuracy and recall",
    deployment: "Production scoring system",
    businessImpact: "Reduced denial rate from 27% to 23%",
    icon: CheckCircle2,
    color: "#10b981",
  },
  {
    id: 5,
    title: "Member Risk Stratification",
    industry: "Healthcare",
    algorithms: ["K-means clustering", "Hierarchical clustering"],
    dataScale: "5.5M Medicaid members",
    purpose: "Segment members into high, medium, and low risk for care management",
    metrics: "Interpretable risk segments",
    deployment: "Batch processing system",
    businessImpact: "Improved care management prioritization",
    icon: Users,
    color: "#f59e0b",
  },
  {
    id: 6,
    title: "Time Series Forecasting",
    industry: "Healthcare & Telecom",
    algorithms: ["ARIMA", "Prophet", "Exponential Smoothing"],
    dataScale: "Historical claims volumes and telecom network KPIs",
    purpose: "Forecast monthly demand and costs 3 months ahead",
    metrics: "MAPE 5–9%",
    deployment: "Automated forecasting pipeline",
    businessImpact: "Supported budgeting, rate negotiations, and capacity planning",
    icon: BarChart3,
    color: "#3b82f6",
  },
  {
    id: 7,
    title: "NLP Sentiment & Complaint Classification",
    industry: "Healthcare",
    algorithms: ["TensorFlow models", "scikit-learn classifiers"],
    dataScale: "72K+ member grievance text records",
    purpose: "Classify complaints by category and urgency",
    metrics: "Multi-class classification accuracy",
    deployment: "Production classification pipeline",
    businessImpact: "Improved response prioritization and issue detection",
    icon: MessageSquare,
    color: "#ec4899",
  },
  {
    id: 8,
    title: "Network Performance Forecasting",
    industry: "Telecom",
    algorithms: ["ARIMA", "regression analysis"],
    dataScale: "2M+ daily network performance records",
    purpose: "Forecast capacity needs and detect anomalies",
    metrics: "Forecasting accuracy metrics",
    deployment: "Real-time monitoring system",
    businessImpact: "Faster root cause analysis and infrastructure planning",
    icon: Wifi,
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
              Production ML models built for banking, healthcare, and telecom
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
          <span>Model Registry | Data Scientist Portfolio</span>
          <span>{mlModels.length} production models across 3 industries</span>
        </div>
      </div>
    </div>
  );
}
