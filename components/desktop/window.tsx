"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, Minus, Square, Maximize2 } from "lucide-react";

interface WindowProps {
  id: string;
  title: string;
  children: ReactNode;
  isActive: boolean;
  isMinimized: boolean;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  zIndex: number;
}

export function Window({
  title,
  children,
  isActive,
  isMinimized,
  initialPosition = { x: 100, y: 50 },
  initialSize = { width: 600, height: 400 },
  onClose,
  onMinimize,
  onFocus,
  zIndex,
}: WindowProps) {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    onFocus();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || isMaximized) return;
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: Math.max(0, e.clientY - dragOffset.current.y),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isMaximized]);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
    onFocus();
  };

  if (isMinimized) return null;

  return (
    <motion.div
      ref={windowRef}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn(
        "absolute flex flex-col rounded-xl overflow-hidden",
        isActive
          ? "shadow-2xl shadow-cyan-500/20 ring-1 ring-cyan-500/30"
          : "shadow-xl opacity-90"
      )}
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? "100%" : size.width,
        height: isMaximized ? "calc(100% - 48px)" : size.height,
        zIndex,
      }}
      onMouseDown={onFocus}
    >
      {/* Window Header */}
      <div
        className={cn(
          "flex items-center justify-between px-4 py-2.5 cursor-move select-none backdrop-blur-sm",
          isActive
            ? "bg-gradient-to-r from-slate-800 to-slate-800/90"
            : "bg-slate-800/80"
        )}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.2 }}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex items-center justify-center group"
            >
              <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
            <motion.button
              type="button"
              onClick={onMinimize}
              whileHover={{ scale: 1.2 }}
              className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-400 transition-colors flex items-center justify-center group"
            >
              <Minus className="w-2 h-2 text-amber-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
            <motion.button
              type="button"
              onClick={toggleMaximize}
              whileHover={{ scale: 1.2 }}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors flex items-center justify-center group"
            >
              <Maximize2 className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>
        </div>
        
        <span className="text-sm font-medium text-foreground truncate absolute left-1/2 -translate-x-1/2">
          {title}
        </span>

        <div className="w-16" /> {/* Spacer for centering title */}
      </div>

      {/* Window Content */}
      <div className="flex-1 bg-slate-100 dark:bg-slate-800 overflow-auto">
        {children}
      </div>
    </motion.div>
  );
}
