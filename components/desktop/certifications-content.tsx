"use client";

import React from "react"
import { createPortal } from "react-dom";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Award,
  ExternalLink,
  Calendar,
  Building2,
  CheckCircle2,
  Star,
  Sparkles,
  Plus,
  Upload,
  Link,
  X,
  ImageIcon,
} from "lucide-react";

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  skills: string[];
  color: string;
  bgColor: string;
  description: string;
  icon: string;
  imageUrl?: string;
  verifyUrl?: string;
}

const defaultCertifications: Certification[] = [
  {
    id: "cert-databricks",
    name: "Databricks Accredited Databricks Fundamentals",
    issuer: "Databricks",
    date: "",
    credentialId: "",
    skills: ["Databricks", "Apache Spark", "Data Engineering", "Lakehouse"],
    color: "from-red-500 to-orange-600",
    bgColor: "bg-red-500",
    description: "Certification validating foundational knowledge of the Databricks Lakehouse Platform, including data engineering and analytics capabilities.",
    icon: "DAT",
  },
  {
    id: "cert-google-analytics",
    name: "Google Analytics Certification",
    issuer: "Google",
    date: "",
    credentialId: "",
    skills: ["Google Analytics", "Data Analysis", "Web Analytics", "Reporting"],
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-500",
    description: "Certification demonstrating proficiency in Google Analytics for measuring and analyzing website traffic and user behavior.",
    icon: "GA",
  },
];

function AddCertificationModal() {
  return null;
}

export function CertificationsContent() {
  const [certifications, setCertifications] = useState<Certification[]>(defaultCertifications);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const [hoveredCert, setHoveredCert] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCert, setNewCert] = useState({
    name: "",
    issuer: "",
    skills: "",
    description: "",
  });
  const [certImage, setCertImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);

  // For portal mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load certifications from localStorage or use defaults
  useEffect(() => {
    const saved = localStorage.getItem('certifications');
    if (saved) {
      const parsed = JSON.parse(saved);
      // If saved is empty but we have defaults, use defaults
      if (parsed.length === 0 && defaultCertifications.length > 0) {
        setCertifications(defaultCertifications);
        localStorage.setItem('certifications', JSON.stringify(defaultCertifications));
      } else {
        setCertifications(parsed);
      }
    } else if (defaultCertifications.length > 0) {
      // No saved data, use defaults and save them
      setCertifications(defaultCertifications);
      localStorage.setItem('certifications', JSON.stringify(defaultCertifications));
    }
  }, []);

  // Save certifications to localStorage
  const saveCertifications = (certs: Certification[]) => {
    localStorage.setItem('certifications', JSON.stringify(certs));
    setCertifications(certs);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCertImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCertification = () => {
    if (!newCert.name || !newCert.issuer) return;
    
    const colors = [
      { color: "from-orange-500 to-amber-600", bgColor: "bg-orange-500" },
      { color: "from-blue-500 to-cyan-600", bgColor: "bg-blue-500" },
      { color: "from-purple-500 to-pink-600", bgColor: "bg-purple-500" },
      { color: "from-green-500 to-emerald-600", bgColor: "bg-green-500" },
      { color: "from-red-500 to-rose-600", bgColor: "bg-red-500" },
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const certification: Certification = {
      id: `cert-${Date.now()}`,
      name: newCert.name,
      issuer: newCert.issuer,
      date: "",
      credentialId: "",
      skills: newCert.skills.split(",").map(s => s.trim()).filter(Boolean),
      description: newCert.description || `Certification from ${newCert.issuer}`,
      icon: newCert.issuer.substring(0, 3).toUpperCase(),
      imageUrl: certImage || undefined,
      ...randomColor,
    };
    
    saveCertifications([...certifications, certification]);
    setNewCert({ name: "", issuer: "", skills: "", description: "" });
    setCertImage(null);
    setShowAddModal(false);
  };

  const handleDeleteCertification = (id: string) => {
    saveCertifications(certifications.filter(c => c.id !== id));
    if (selectedCert === id) setSelectedCert(null);
  };

  const selectedCertData = certifications.find((c) => c.id === selectedCert);

  const closeModal = () => {
    setShowAddModal(false);
  };

  const handleUploadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCertImage(null);
  };

  // Modal JSX to be rendered in portal (inline, not as a function component to prevent re-creation)
  const modalContent = (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999]"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowAddModal(false);
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onMouseDown={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 w-[500px] max-h-[80vh] overflow-y-auto border border-white/10 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" />
            Add Certification
          </h3>
          <button
            type="button"
            onClick={closeModal}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleAddCertification(); }} className="space-y-4">
          {/* Certificate Image Upload */}
          <div>
            <label className="block text-sm text-slate-400 mb-2">Certificate Image (optional)</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <div
              onClick={handleUploadClick}
              className="w-full border-2 border-dashed border-slate-600 rounded-xl p-4 text-center cursor-pointer hover:border-amber-400/50 transition-colors"
            >
              {certImage ? (
                <div className="relative inline-block">
                  <img src={certImage || "/placeholder.svg"} alt="Certificate preview" className="max-h-32 mx-auto rounded-lg" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full cursor-pointer hover:bg-red-600"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-500">
                  <Upload className="w-8 h-8" />
                  <span className="text-sm">Click to upload certificate image</span>
                </div>
              )}
            </div>
          </div>

          {/* Certificate Name */}
          <div>
            <label className="block text-sm text-slate-400 mb-1">Certificate Name *</label>
            <input
              type="text"
              required
              value={newCert.name}
              onChange={(e) => setNewCert((prev) => ({ ...prev, name: e.target.value }))}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-full px-4 py-2 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g., AWS Certified Machine Learning"
            />
          </div>

          {/* Issuer */}
          <div>
            <label className="block text-sm text-slate-400 mb-1">Issuing Organization *</label>
            <input
              type="text"
              required
              value={newCert.issuer}
              onChange={(e) => setNewCert((prev) => ({ ...prev, issuer: e.target.value }))}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-full px-4 py-2 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g., Amazon Web Services"
            />
          </div>

{/* Skills */}
          <div>
            <label className="block text-sm text-slate-400 mb-1">Skills (comma separated)</label>
            <input
              type="text"
              value={newCert.skills}
              onChange={(e) => setNewCert((prev) => ({ ...prev, skills: e.target.value }))}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-full px-4 py-2 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g., Machine Learning, AWS, Python"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-slate-400 mb-1">Description</label>
            <textarea
              rows={3}
              value={newCert.description}
              onChange={(e) => setNewCert((prev) => ({ ...prev, description: e.target.value }))}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-full px-4 py-2 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              placeholder="Brief description of the certification..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!newCert.name || !newCert.issuer}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:from-amber-400 hover:to-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
            Add Certification
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Add Certification Modal - Rendered via Portal */}
        {mounted && showAddModal && createPortal(modalContent, document.body)}
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-slate-900/80 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                <Award className="w-5 h-5 text-amber-400" />
                Certifications & Credentials
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {certifications.length} professional certifications earned
              </p>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                type="button"
                onClick={() => setShowAddModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg text-sm font-medium flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
              >
                <Plus className="w-4 h-4" />
                Add New
              </motion.button>
              <div className="flex items-center gap-2 text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Verified</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Certifications Content */}
          <div className="flex-1 p-6 overflow-y-auto flex items-center justify-center">
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Empty State */}
            {certifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-md"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/30"
                >
                  <Award className="w-12 h-12 text-amber-400" />
                </motion.div>
                <h4 className="text-xl font-semibold text-white mb-3">No Certifications Yet</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Add your professional certifications to showcase your expertise. You can upload certificate images or add verification links.
                </p>
                <motion.button
                  type="button"
                  onClick={() => setShowAddModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-medium flex items-center gap-2 mx-auto shadow-lg shadow-amber-500/30"
                >
                  <Plus className="w-5 h-5" />
                  Add Your First Certification
                </motion.button>
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {["AWS ML", "Azure Data Scientist", "TensorFlow Developer", "Databricks"].map((cert, i) => (
                    <motion.span
                      key={cert}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="px-3 py-1.5 bg-slate-800/50 text-slate-400 text-xs rounded-full border border-slate-700"
                    >
                      {cert}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-2 gap-4 relative w-full">
                {certifications.map((cert, index) => {
                  const isSelected = selectedCert === cert.id;
                  const isHovered = hoveredCert === cert.id;

                  return (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                      onHoverStart={() => setHoveredCert(cert.id)}
                      onHoverEnd={() => setHoveredCert(null)}
                      onClick={() => setSelectedCert(isSelected ? null : cert.id)}
                      className="cursor-pointer"
                    >
                      <motion.div
                        whileHover={{ scale: 1.03, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative rounded-2xl p-4 transition-all duration-300 overflow-hidden ${
                          isSelected
                            ? `bg-gradient-to-br ${cert.color} shadow-2xl`
                            : "bg-slate-800/80 hover:bg-slate-700/80 border border-white/10"
                        }`}
                        style={
                          isSelected
                            ? { boxShadow: `0 20px 40px ${cert.bgColor.replace("bg-", "rgba(").replace("-500", ",0.3)")}` }
                            : {}
                        }
                      >
                        {/* Glow effect on hover */}
                        {(isHovered || isSelected) && (
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-10`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isSelected ? 0.2 : 0.1 }}
                          />
                        )}

                        <div className="relative z-10">
                          {/* Icon and badge */}
                          <div className="flex items-start justify-between mb-3">
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                                isSelected ? "bg-white/20 text-white" : `bg-gradient-to-br ${cert.color} text-white`
                              }`}
                            >
                              {cert.icon}
                            </div>
                            <motion.div
                              animate={{ rotate: isSelected ? 360 : 0 }}
                              transition={{ duration: 0.5 }}
                            >
                              <CheckCircle2
                                className={`w-5 h-5 ${isSelected ? "text-white" : "text-green-400"}`}
                              />
                            </motion.div>
                          </div>

                          {/* Title and issuer */}
                          <h4
                            className={`font-semibold text-sm mb-1 leading-tight ${
                              isSelected ? "text-white" : "text-white"
                            }`}
                          >
                            {cert.name}
                          </h4>
                          <p
                            className={`text-xs flex items-center gap-1 mb-2 ${
                              isSelected ? "text-white/80" : "text-slate-400"
                            }`}
                          >
                            <Building2 className="w-3 h-3" />
                            {cert.issuer}
                          </p>

                          {/* Skills preview */}
                          <div className="flex flex-wrap gap-1 mt-3">
                            {cert.skills.slice(0, 3).map((skill) => (
                              <span
                                key={skill}
                                className={`px-2 py-0.5 text-xs rounded-full ${
                                  isSelected
                                    ? "bg-white/20 text-white"
                                    : "bg-slate-700 text-slate-300"
                                }`}
                              >
                                {skill}
                              </span>
                            ))}
                            {cert.skills.length > 3 && (
                              <span
                                className={`text-xs ${isSelected ? "text-white/60" : "text-slate-500"}`}
                              >
                                +{cert.skills.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Details Panel */}
          {selectedCertData && (
            <motion.div
              initial={{ opacity: 0, x: 100, width: 0 }}
              animate={{ opacity: 1, x: 0, width: 320 }}
              exit={{ opacity: 0, x: 100, width: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="border-l border-white/10 bg-slate-900/98 backdrop-blur-md overflow-hidden flex-shrink-0"
            >
              <div className="w-80 h-full overflow-y-auto">
                {/* Close button */}
                <div className="sticky top-0 p-3 bg-slate-900/95 border-b border-white/10 flex justify-between items-center">
                  <span className="text-sm font-medium text-white flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-400" />
                    Certificate Details
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedCert(null)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-400 text-sm"
                  >
                    Close
                  </button>
                </div>

                <div className="p-4">
                  {/* Certificate header */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl bg-gradient-to-br ${selectedCertData.color} mb-4 shadow-xl`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center text-xl font-bold text-white backdrop-blur-sm">
                        {selectedCertData.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-sm leading-tight">
                          {selectedCertData.name}
                        </h4>
                        <p className="text-sm text-white/90 mt-1">{selectedCertData.issuer}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-5"
                  >
                    <h5 className="text-sm font-semibold text-amber-400 mb-2">Description</h5>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {selectedCertData.description}
                    </p>
                  </motion.div>

{/* Skills */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-5"
                  >
                    <h5 className="text-sm font-semibold text-amber-400 mb-3">Skills Validated</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedCertData.skills.map((skill, i) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.25 + i * 0.05 }}
                          className="px-3 py-1.5 bg-slate-800 text-sm rounded-lg text-white border border-white/10 hover:border-amber-400/50 transition-colors"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Verify button */}
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 bg-gradient-to-r ${selectedCertData.color} text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Verify Credential
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
  );
}
