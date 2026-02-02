"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MousePointerClick, Monitor, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WelcomeScreenProps {
  onComplete: (visitorName: string) => void;
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [step, setStep] = useState(0);
  const [visitorName, setVisitorName] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const profileName = "Chanakya Yadav";
  const profileTitle = "Data Scientist | 4+ Years | Credit Risk & Fraud Detection | ML | AI";

  // Load profile image from localStorage
  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

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

  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (visitorName.trim()) {
      setStep(3);
    }
  };

  const handleEnterDesktop = () => {
    onComplete(visitorName);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1080),
            }}
            animate={{
              y: [null, -20, 20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Floating 3D shapes */}
      <motion.div
        className="absolute top-20 right-40 w-32 h-32 border-2 border-cyan-400/20 rounded-2xl"
        animate={{
          rotateX: [0, 15, -15, 0],
          rotateY: [0, 20, -20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-24 h-24 border-2 border-purple-400/20 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 w-16 h-16 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg"
        animate={{
          rotateZ: [0, 45, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <AnimatePresence mode="wait">
          {step >= 1 && step < 3 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Profile photo with upload */}
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
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
                className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 p-1 relative group cursor-pointer"
              >
                {profileImage ? (
                  <img src={profileImage || "/placeholder.svg"} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-4xl font-bold text-cyan-400">
                    CY
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </motion.button>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-4xl md:text-5xl font-bold text-foreground mb-4"
              >
                {profileName}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xl text-cyan-400 mb-8"
              >
                {profileTitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-muted-foreground max-w-lg mx-auto mb-12 leading-relaxed"
              >
                Welcome to my interactive desktop portfolio. Explore my projects,
                skills, and experience through a unique desktop interface. Feel free
                to open folders, run code, and discover my work.
              </motion.p>

              {step === 1 && (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  onSubmit={handleSubmit}
                  className="max-w-sm mx-auto"
                >
                  <p className="text-sm text-muted-foreground mb-4">
                    May I know who is visiting today?
                  </p>
                  <div className="flex gap-3">
                    <Input
                      type="text"
                      placeholder="Enter your name..."
                      value={visitorName}
                      onChange={(e) => {
                        setVisitorName(e.target.value);
                        setIsTyping(true);
                      }}
                      className="bg-slate-800/50 border-slate-700 text-foreground placeholder:text-muted-foreground focus:border-cyan-400"
                    />
                    <Button
                      type="submit"
                      disabled={!visitorName.trim()}
                      className="bg-cyan-500 hover:bg-cyan-600 text-slate-900"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setVisitorName("Guest");
                      setStep(3);
                    }}
                    className="mt-4 text-sm text-muted-foreground hover:text-cyan-400 transition-colors"
                  >
                    Skip and continue as Guest
                  </button>
                </motion.form>
              )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="instructions"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-2xl mx-auto"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-foreground mb-6"
              >
                Hello, {visitorName}!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground mb-8"
              >
                Here is how to navigate my portfolio desktop:
              </motion.p>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
                >
                  <MousePointerClick className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Double Click</h3>
                  <p className="text-sm text-muted-foreground">
                    Double-click on any folder icon to open it and explore the contents
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
                >
                  <Monitor className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Open Apps</h3>
                  <p className="text-sm text-muted-foreground">
                    Open VS Code, Jupyter Notebook, Excel, and more to see my work
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
                >
                  <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-1">
                      <div className="w-4 h-4 bg-amber-400 rounded-sm" />
                      <div className="w-4 h-4 bg-cyan-400 rounded-sm" />
                      <div className="w-4 h-4 bg-green-400 rounded-sm" />
                      <div className="w-4 h-4 bg-purple-400 rounded-sm" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Taskbar</h3>
                  <p className="text-sm text-muted-foreground">
                    Use the taskbar at the bottom to switch between open windows
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  onClick={handleEnterDesktop}
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-6 text-lg"
                >
                  Enter Desktop
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
    </div>
  );
}
