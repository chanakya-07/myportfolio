"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Monitor, Wifi, Volume2, Battery, Search, X } from "lucide-react";

interface TaskbarItem {
  id: string;
  title: string;
  isMinimized: boolean;
}

interface TaskbarProps {
  items: TaskbarItem[];
  activeWindowId: string | null;
  onItemClick: (id: string) => void;
  onCloseClick: (id: string) => void;
  onStartClick: () => void;
}

export function Taskbar({
  items,
  activeWindowId,
  onItemClick,
  onCloseClick,
  onStartClick,
}: TaskbarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      className="absolute bottom-0 left-0 right-0 h-12 bg-slate-900/90 backdrop-blur-xl border-t border-slate-700/50 flex items-center justify-between px-2 z-50"
    >
      {/* Start Button */}
      <div className="flex items-center gap-2">
        <motion.button
          type="button"
          onClick={onStartClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 rounded-lg transition-all border border-cyan-500/20"
        >
          <Monitor className="w-5 h-5 text-cyan-400" />
          <span className="text-sm font-medium text-foreground">Start</span>
        </motion.button>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-32 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
          />
        </div>

        {/* Taskbar Items */}
        <div className="flex items-center gap-1 ml-2">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className={cn(
                  "flex items-center gap-1 px-2 py-1 text-sm text-foreground rounded-lg transition-all max-w-44 relative group",
                  activeWindowId === item.id && !item.isMinimized
                    ? "bg-cyan-500/30 border border-cyan-500/50"
                    : "bg-slate-700/50 hover:bg-slate-600/50 border border-transparent"
                )}
              >
                <button
                  type="button"
                  onClick={() => onItemClick(item.id)}
                  className="truncate flex-1 text-left"
                >
                  {item.title}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseClick(item.id);
                  }}
                  className="p-0.5 rounded hover:bg-red-500/50 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X className="w-3.5 h-3.5 text-slate-300 hover:text-white" />
                </button>
                {activeWindowId === item.id && !item.isMinimized && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cyan-400 rounded-full"
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-4 px-3">
        <div className="flex items-center gap-3 text-muted-foreground">
          <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
            <Wifi className="w-4 h-4 text-cyan-400" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
            <Volume2 className="w-4 h-4" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-1 cursor-pointer">
            <Battery className="w-4 h-4 text-green-400" />
            <span className="text-xs">100%</span>
          </motion.div>
        </div>
        <div className="text-right border-l border-slate-700 pl-4">
          <div className="text-sm font-medium text-foreground">{formatTime(currentTime)}</div>
          <div className="text-xs text-muted-foreground">{formatDate(currentTime)}</div>
        </div>
      </div>
    </motion.div>
  );
}
