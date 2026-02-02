"use client";

import React from "react"

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DesktopIcon, type IconType } from "./desktop-icon";
import { Window } from "./window";
import { Taskbar } from "./taskbar";
import { StartMenu } from "./start-menu";
import { FolderContent } from "./window-contents";
import { FloatingShapes } from "./floating-shapes";
import { SidebarWidgets } from "./sidebar-widgets";

interface DesktopItem {
  id: string;
  name: string;
  type: IconType;
  gridPosition: { row: number; col: number };
}

interface WindowState {
  id: string;
  title: string;
  folderId: string;
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

const desktopItems: DesktopItem[] = [
  { id: "about", name: "About Me", type: "folder", gridPosition: { row: 0, col: 0 } },
  { id: "vscode", name: "AboutMe.py", type: "file", gridPosition: { row: 1, col: 0 } },
  { id: "excel", name: "Skills & Technologies", type: "file", gridPosition: { row: 2, col: 0 } },
  { id: "mlmodels", name: "ML Models", type: "file", gridPosition: { row: 3, col: 0 } },
  { id: "experience", name: "Experience", type: "folder", gridPosition: { row: 0, col: 1 } },
  { id: "certifications", name: "Certifications", type: "folder", gridPosition: { row: 1, col: 1 } },
  { id: "browser", name: "Browser", type: "browser", gridPosition: { row: 2, col: 1 } },
  { id: "terminal", name: "Terminal", type: "terminal", gridPosition: { row: 3, col: 1 } },
  { id: "settings", name: "Settings", type: "settings", gridPosition: { row: 4, col: 1 } },
];

export function Desktop() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [windowZIndices, setWindowZIndices] = useState<Record<string, number>>({});
  const [nextZIndex, setNextZIndex] = useState(10);
  // Default certification count matches the defaultCertifications in certifications-content.tsx
  const [certificationCount, setCertificationCount] = useState(2);

  // Load and watch certification count from localStorage
  useEffect(() => {
    const updateCertCount = () => {
      const saved = localStorage.getItem('certifications');
      if (saved) {
        try {
          const certs = JSON.parse(saved);
          setCertificationCount(certs.length);
        } catch {
          setCertificationCount(0);
        }
      } else {
        // No saved data yet, use default count
        setCertificationCount(2);
      }
    };

    // Initial load
    updateCertCount();

    // Listen for storage changes (when certifications are added/removed)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'certifications') {
        updateCertCount();
      }
    };

    // Also poll periodically to catch same-tab changes
    const interval = setInterval(updateCertCount, 1000);

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

const getWindowSize = (folderId: string) => {
  switch (folderId) {
  case "vscode":
  case "jupyter":
  case "excel":
  return { width: 950, height: 620 };
  case "mlmodels":
  return { width: 1000, height: 650 };
  case "terminal":
  return { width: 700, height: 400 };
  default:
  return { width: 650, height: 450 };
  }
  };

  const openWindow = useCallback((item: { id: string; name: string }) => {
    const existingWindow = windows.find((w) => w.folderId === item.id);
    
    if (existingWindow) {
      setActiveWindowId(existingWindow.id);
      setWindowZIndices((prev) => ({ ...prev, [existingWindow.id]: nextZIndex }));
      setNextZIndex((prev) => prev + 1);
      
      if (existingWindow.isMinimized) {
        setWindows((prev) =>
          prev.map((w) =>
            w.id === existingWindow.id ? { ...w, isMinimized: false } : w
          )
        );
      }
      return;
    }

    const windowId = `window-${Date.now()}`;
    const offset = windows.length * 30;
    const size = getWindowSize(item.id);
    
    const newWindow: WindowState = {
      id: windowId,
      title: item.name,
      folderId: item.id,
      isMinimized: false,
      position: { x: 150 + offset, y: 50 + offset },
      size,
    };

    setWindows((prev) => [...prev, newWindow]);
    setActiveWindowId(windowId);
    setWindowZIndices((prev) => ({ ...prev, [windowId]: nextZIndex }));
    setNextZIndex((prev) => prev + 1);
  }, [windows, nextZIndex]);

  const closeWindow = useCallback((windowId: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId));
    if (activeWindowId === windowId) {
      const remaining = windows.filter((w) => w.id !== windowId);
      setActiveWindowId(remaining.length > 0 ? remaining[remaining.length - 1].id : null);
    }
  }, [windows, activeWindowId]);

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, isMinimized: true } : w))
    );
    const visibleWindows = windows.filter((w) => w.id !== windowId && !w.isMinimized);
    setActiveWindowId(visibleWindows.length > 0 ? visibleWindows[visibleWindows.length - 1].id : null);
  }, [windows]);

  const focusWindow = useCallback((windowId: string) => {
    setActiveWindowId(windowId);
    setWindowZIndices((prev) => ({ ...prev, [windowId]: nextZIndex }));
    setNextZIndex((prev) => prev + 1);
  }, [nextZIndex]);

  const handleTaskbarItemClick = useCallback((windowId: string) => {
    const window = windows.find((w) => w.id === windowId);
    if (!window) return;

    if (window.isMinimized) {
      setWindows((prev) =>
        prev.map((w) => (w.id === windowId ? { ...w, isMinimized: false } : w))
      );
      focusWindow(windowId);
    } else if (activeWindowId === windowId) {
      minimizeWindow(windowId);
    } else {
      focusWindow(windowId);
    }
  }, [windows, activeWindowId, focusWindow, minimizeWindow]);

  const handleDesktopClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedIcon(null);
      setIsStartMenuOpen(false);
    }
  }, []);

  const handleIconClick = useCallback((id: string) => {
    setSelectedIcon(id);
    setIsStartMenuOpen(false);
  }, []);

  const handleIconDoubleClick = useCallback((item: DesktopItem) => {
    openWindow({ id: item.id, name: item.name });
  }, [openWindow]);

  const handleStartMenuOpen = useCallback((folderId: string) => {
    const item = desktopItems.find((i) => i.id === folderId);
    if (item) {
      openWindow({ id: item.id, name: item.name });
    } else {
      openWindow({ id: folderId, name: folderId.charAt(0).toUpperCase() + folderId.slice(1) });
    }
  }, [openWindow]);

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative select-none"
      onClick={handleDesktopClick}
    >
      {/* Wallpaper background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/wallpaper.jpg')" }}
      />
      
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30" />

      {/* Floating shapes in background */}
      <FloatingShapes />

      {/* Main content area */}
      <div className="absolute inset-0 flex pb-16">
        {/* Desktop Icons on left */}
        <div className="p-4 flex flex-col gap-2">
          {/* Column 0 */}
          <div className="flex flex-col gap-2">
            {desktopItems
              .filter((item) => item.gridPosition.col === 0)
              .sort((a, b) => a.gridPosition.row - b.gridPosition.row)
              .map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.08, type: "spring", stiffness: 200 }}
                >
                  <DesktopIcon
                    id={item.id}
                    name={item.name}
                    type={item.type}
                    isSelected={selectedIcon === item.id}
                    onClick={() => handleIconClick(item.id)}
                    onDoubleClick={() => handleIconDoubleClick(item)}
                  />
                </motion.div>
              ))}
          </div>
        </div>

        {/* Column 1 icons */}
        <div className="p-4 flex flex-col gap-2">
          {desktopItems
            .filter((item) => item.gridPosition.col === 1)
            .sort((a, b) => a.gridPosition.row - b.gridPosition.row)
            .map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.08, type: "spring", stiffness: 200 }}
              >
                <DesktopIcon
                  id={item.id}
                  name={item.name}
                  type={item.type}
                  isSelected={selectedIcon === item.id}
                  onClick={() => handleIconClick(item.id)}
                  onDoubleClick={() => handleIconDoubleClick(item)}
                  badgeCount={item.id === "certifications" ? certificationCount : undefined}
                />
              </motion.div>
            ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right sidebar widgets */}
        <div className="p-4 overflow-y-auto max-h-full scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent hover:scrollbar-thumb-slate-500">
          <SidebarWidgets onOpenWindow={(id, name) => openWindow({ id, name })} />
        </div>
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows.map((window) => (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            isActive={activeWindowId === window.id}
            isMinimized={window.isMinimized}
            initialPosition={window.position}
            initialSize={window.size}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onFocus={() => focusWindow(window.id)}
            zIndex={windowZIndices[window.id] || 10}
          >
            <FolderContent folderId={window.folderId} onOpenWindow={(id, name) => openWindow({ id, name })} />
          </Window>
        ))}
      </AnimatePresence>

      {/* Start Menu */}
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onOpenFolder={handleStartMenuOpen}
      />

      {/* Taskbar */}
      <Taskbar
        items={windows.map((w) => ({
          id: w.id,
          title: w.title,
          isMinimized: w.isMinimized,
        }))}
        activeWindowId={activeWindowId}
        onItemClick={handleTaskbarItemClick}
        onCloseClick={closeWindow}
        onStartClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
      />
    </div>
  );
}
