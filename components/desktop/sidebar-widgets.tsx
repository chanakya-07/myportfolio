"use client";

import React from "react"

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  TrendingUp,
  Code2,
  Database,
  Brain,
  Award,
  X,
  Send,
  Loader2,
  Phone,
  Camera,
} from "lucide-react";

// Default certification count matches the defaultCertifications in certifications-content.tsx
const DEFAULT_CERT_COUNT = 2;

const stats = [
  { label: "Skills", value: null, displayValue: "10+", icon: Database, windowId: "excel", windowName: "Skills and Technologies" },
  { label: "Years Exp", value: null, displayValue: "4+", icon: TrendingUp, windowId: "experience", windowName: "Experience" },
  { label: "ML Models", value: 7, displayValue: null, icon: Code2, windowId: "mlmodels", windowName: "ML Models" },
  { label: "Certifications", value: 0, displayValue: null, icon: Award, windowId: "certifications", windowName: "Certifications" },
];

const skills = [
  "Python",
  "XGBoost",
  "SQL",
  "Power BI",
  "Azure",
  "SHAP",
];

const quotes = [
  "Why did the data scientist break up with the statistician? Too many outliers in the relationship.",
  "Machine learning is just spicy if-else statements.",
  "I told my model to predict my love life. It returned NaN.",
  "My neural network has commitment issues - it keeps overfitting.",
  "Data scientists: turning coffee into insights since 2010.",
  "The best thing about being a data scientist? You can blame everything on the data.",
  "My regression model and I have something in common - we both have too many variables.",
  "In data we trust. Unless it is manually entered.",
];

interface SidebarWidgetsProps {
  onOpenWindow?: (id: string, name: string) => void;
}

export function SidebarWidgets({ onOpenWindow }: SidebarWidgetsProps) {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));
  const [certCount, setCertCount] = useState(DEFAULT_CERT_COUNT);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/profile.png.png-pMxnI7tQUEDMBXRZ2Ose8k3CXxh7Cn.jpeg");
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

  // Profile image is now static - no need to load from localStorage

  // Load certification count from localStorage and keep in sync
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

  // Animate stats on mount
  useEffect(() => {
    stats.forEach((stat, index) => {
      if (stat.value === null) {
        // For non-numeric stats, just set to 0 (we'll use displayValue instead)
        setAnimatedStats((prev) => {
          const newStats = [...prev];
          newStats[index] = 0;
          return newStats;
        });
        return;
      }
      let current = 0;
      const increment = stat.value / 30;
      const interval = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(interval);
        }
        setAnimatedStats((prev) => {
          const newStats = [...prev];
          newStats[index] = Math.floor(current);
          return newStats;
        });
      }, 50);
    });
  }, []);

  // Rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Typing effect for terminal
  useEffect(() => {
    const commands = [
      "$ whoami",
      "> Chanakya Yadav",
      "> Data Scientist/ Risk Analyst",
      "$ cat about.txt",
      "> 4+ yrs ML & Credit Risk",
      "> Predictive models expert",
      "$ cat skills.txt",
      "> Python, XGBoost, SQL",
      "> Power BI, Azure, SHAP",
      "$ ./status",
      "> All systems operational!",
    ];
    let cmdIndex = 0;
    let charIndex = 0;
    let isMounted = true;
    let currentText = "";

    const type = () => {
      if (!isMounted) return;
      
      if (cmdIndex >= commands.length) {
        cmdIndex = 0;
        charIndex = 0;
        currentText = "";
        setTypedText("");
        setTimeout(type, 1000);
        return;
      }

      if (charIndex < commands[cmdIndex].length) {
        currentText += commands[cmdIndex][charIndex];
        setTypedText(currentText);
        charIndex++;
        setTimeout(type, 50);
      } else {
        currentText += "\n";
        setTypedText(currentText);
        cmdIndex++;
        charIndex = 0;
        setTimeout(type, 500);
      }
    };

    type();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 w-72">
      {/* Scroll indicator at top */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center gap-2 py-1 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl border border-white/10"
      >
        <motion.div
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="flex items-center gap-2 text-slate-400"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="text-xs font-medium">Scroll to explore more</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-xl"
      >
        <div className="flex items-center gap-4 mb-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <motion.button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            whileHover={{ scale: 1.05 }}
            className="relative w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-cyan-500/30 overflow-hidden group"
          >
            {profileImage ? (
              <img src={profileImage || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              "CY"
            )}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-5 h-5 text-white" />
            </div>
          </motion.button>
          <div>
            <h3 className="text-white font-bold text-lg">Chanakya Yadav</h3>
            <p className="text-cyan-400 text-xs leading-relaxed"><p>Senior Risk & Portfolio Analytics | Equity Risk Monitoring | P&L Driver Analysis | Python, SQL | United States
</p>
</p>
            <div className="flex items-center gap-1 text-slate-400 text-xs mt-1">
              <MapPin className="w-3 h-3" />
              <span>United States</span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-2 mb-4">
          <motion.a
            href="https://github.com/chanakya-07"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            className="p-2 rounded-lg bg-slate-700/50 text-slate-300 transition-colors hover:bg-slate-700"
          >
            <Github className="w-4 h-4" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/chanakya-csv"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            className="p-2 rounded-lg bg-slate-700/50 text-slate-300 transition-colors hover:bg-blue-600"
          >
            <Linkedin className="w-4 h-4" />
          </motion.a>
          <motion.a
            href="tel:+12149298802"
            whileHover={{ scale: 1.1, y: -2 }}
            className="p-2 rounded-lg bg-slate-700/50 text-slate-300 transition-colors hover:bg-green-600"
          >
            <Phone className="w-4 h-4" />
          </motion.a>
          <motion.button
            type="button"
            onClick={() => setShowContactForm(true)}
            whileHover={{ scale: 1.1, y: -2 }}
            className="p-2 rounded-lg bg-slate-700/50 text-slate-300 transition-colors hover:bg-red-500"
          >
            <Mail className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.button
                type="button"
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onOpenWindow?.(stat.windowId, stat.windowName)}
                className="bg-slate-700/40 hover:bg-slate-600/50 rounded-lg p-3 text-center cursor-pointer transition-colors"
              >
<Icon className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
  <div className="text-xl font-bold text-white">
  {stat.label === "Certifications" ? certCount : (stat.displayValue !== null ? stat.displayValue : animatedStats[i])}
  </div>
  <div className="text-xs text-slate-400">{stat.label}</div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Mini Terminal */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 border-b border-white/5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-xs text-slate-400 ml-2">chanakya@portfolio</span>
        </div>
        <div className="p-4 font-mono text-xs text-green-400 h-32 overflow-hidden">
          <pre className="whitespace-pre-wrap">{typedText}<span className="animate-pulse">_</span></pre>
        </div>
      </motion.div>

      {/* Skills Cloud */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-purple-900/40 to-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-xl"
      >
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-4 h-4 text-purple-400" />
          <span className="text-white font-semibold text-sm">Top Skills</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.05 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 text-xs rounded-full border border-cyan-500/30 cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Data Science Fun Facts */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-amber-900/30 to-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-xl"
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-white font-semibold text-sm">Data Science Humor</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={currentQuote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-slate-300 text-sm italic leading-relaxed"
          >
            &ldquo;{quotes[currentQuote]}&rdquo;
          </motion.p>
        </AnimatePresence>
      </motion.div>

      

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowContactForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 w-96 border border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  Contact Me
                </h3>
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Message Sent!</h4>
                  <p className="text-slate-400 text-sm">Thank you for reaching out. I will get back to you soon.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setShowContactForm(false);
                      setSent(false);
                      setContactForm({ name: "", email: "", message: "" });
                    }}
                    className="mt-4 px-4 py-2 bg-cyan-500 text-slate-900 rounded-lg font-medium text-sm hover:bg-cyan-400 transition-colors"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsSending(true);
                    // Simulate sending
                    setTimeout(() => {
                      setIsSending(false);
                      setSent(true);
                    }, 1500);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-2 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                  <p className="text-xs text-slate-500 text-center">
                    Or email me directly at chanakya.csv@gmail.com
                  </p>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
