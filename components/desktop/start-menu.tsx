"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  FileText,
  Settings,
  Power,
  FolderOpen,
  Search,
  Terminal,
  Globe,
  Code,
  Table,
  Briefcase,
  Award,
} from "lucide-react";

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFolder: (folderId: string) => void;
}

const menuItems = [
  { icon: User, label: "About Me", id: "about" },
  { icon: Code, label: "About Me (Code)", id: "vscode" },
  { icon: Table, label: "Skills & Technologies", id: "excel" },
  { icon: Briefcase, label: "Experience", id: "experience" },
  { icon: Award, label: "Certifications", id: "certifications" },
  { icon: Terminal, label: "Terminal", id: "terminal" },
  { icon: Globe, label: "Browser", id: "browser" },
  { icon: Settings, label: "Settings", id: "settings" },
];

export function StartMenu({ isOpen, onClose, onOpenFolder }: StartMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bottom-12 left-2 w-72 bg-slate-800/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            {/* User info */}
            <div className="p-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 p-0.5">
                  <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-lg font-bold text-cyan-400">
                    CY
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Chanakya Yadav</p>
                  <p className="text-xs text-muted-foreground">Data Scientist</p>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="p-3 border-b border-slate-700">
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-900/50 rounded-lg">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search apps..."
                  className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2 max-h-80 overflow-y-auto">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => {
                    onOpenFolder(item.id);
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-cyan-500/10 transition-colors text-foreground group"
                >
                  <item.icon className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-2 border-t border-slate-700">
              <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-500/20 rounded-lg transition-colors text-foreground"
              >
                <Power className="w-5 h-5 text-red-400" />
                <span className="text-sm">Shutdown</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
