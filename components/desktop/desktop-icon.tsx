"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Folder,
  FileText,
  ImageIcon,
  Music,
  Film,
  Settings,
  Trash2,
  Globe,
  Terminal,
  Code,
  Table,
  Briefcase,
  User,
  FileCode2,
} from "lucide-react";

export type IconType =
  | "folder"
  | "file"
  | "image"
  | "music"
  | "video"
  | "settings"
  | "trash"
  | "browser"
  | "terminal";

interface DesktopIconProps {
  id: string;
  name: string;
  type: IconType;
  isSelected: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
  badgeCount?: number;
}

const iconMap: Record<IconType, LucideIcon> = {
  folder: Folder,
  file: FileText,
  image: ImageIcon,
  music: Music,
  video: Film,
  settings: Settings,
  trash: Trash2,
  browser: Globe,
  terminal: Terminal,
};

const iconColorMap: Record<IconType, string> = {
  folder: "text-amber-400",
  file: "text-blue-400",
  image: "text-green-400",
  music: "text-pink-400",
  video: "text-purple-400",
  settings: "text-slate-300",
  trash: "text-slate-400",
  browser: "text-cyan-400",
  terminal: "text-emerald-400",
};

// Special icons for specific apps
const specialIcons: Record<string, { icon: LucideIcon; color: string }> = {
  vscode: { icon: Code, color: "text-blue-500" },
  jupyter: { icon: FileCode2, color: "text-orange-500" },
  excel: { icon: Table, color: "text-green-600" },
  about: { icon: User, color: "text-cyan-400" },
  experience: { icon: Briefcase, color: "text-amber-500" },
};

export function DesktopIcon({
  id,
  name,
  type,
  isSelected,
  onClick,
  onDoubleClick,
  badgeCount,
}: DesktopIconProps) {
  const special = specialIcons[id];
  const IconComponent = special?.icon || iconMap[type];
  const iconColor = special?.color || iconColorMap[type];

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer select-none w-24 transition-all",
        isSelected
          ? "bg-white/15 backdrop-blur-sm border border-white/30 shadow-lg shadow-cyan-500/20"
          : "hover:bg-white/10 hover:backdrop-blur-sm"
      )}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <motion.div
        whileHover={{ rotate: [0, -8, 8, 0] }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <IconComponent className={cn("w-14 h-14 drop-shadow-lg", iconColor)} strokeWidth={1.5} />
        {/* Glow effect */}
        <div className={cn("absolute inset-0 w-14 h-14 blur-xl opacity-30", iconColor.replace("text-", "bg-"))} />
        {/* Badge count */}
        {badgeCount !== undefined && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 min-w-5 h-5 px-1.5 bg-amber-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
          >
            {badgeCount}
          </motion.div>
        )}
      </motion.div>
      <span
        className={cn(
          "text-xs text-center text-white leading-tight w-full px-1 py-1 rounded-md font-medium drop-shadow-md",
          isSelected && "bg-white/20 backdrop-blur-sm"
        )}
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
      >
        {name}
      </span>
    </motion.button>
  );
}
