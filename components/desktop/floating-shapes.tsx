"use client";

import { motion } from "framer-motion";

const shapes = [
  { type: "cube", x: "10%", y: "15%", size: 40, color: "rgba(34, 211, 238, 0.4)", delay: 0, duration: 8 },
  { type: "sphere", x: "85%", y: "20%", size: 50, color: "rgba(168, 85, 247, 0.4)", delay: 1, duration: 10 },
  { type: "cube", x: "75%", y: "70%", size: 35, color: "rgba(245, 158, 11, 0.4)", delay: 2, duration: 9 },
  { type: "sphere", x: "15%", y: "75%", size: 45, color: "rgba(34, 211, 238, 0.4)", delay: 0.5, duration: 11 },
  { type: "ring", x: "50%", y: "10%", size: 60, color: "rgba(168, 85, 247, 0.3)", delay: 1.5, duration: 12 },
  { type: "cube", x: "90%", y: "50%", size: 30, color: "rgba(34, 211, 238, 0.4)", delay: 3, duration: 7 },
  { type: "sphere", x: "5%", y: "45%", size: 35, color: "rgba(245, 158, 11, 0.4)", delay: 2.5, duration: 10 },
  { type: "ring", x: "30%", y: "85%", size: 50, color: "rgba(34, 211, 238, 0.3)", delay: 0, duration: 13 },
  { type: "diamond", x: "60%", y: "30%", size: 40, color: "rgba(168, 85, 247, 0.4)", delay: 1, duration: 9 },
  { type: "diamond", x: "20%", y: "30%", size: 30, color: "rgba(245, 158, 11, 0.4)", delay: 2, duration: 8 },
];

function Shape({ type, x, y, size, color, delay, duration }: {
  type: string;
  x: string;
  y: string;
  size: number;
  color: string;
  delay: number;
  duration: number;
}) {
  const baseAnimation = {
    y: [0, -20, 0, 20, 0],
    x: [0, 10, 0, -10, 0],
    rotate: [0, 180, 360],
  };

  if (type === "cube") {
    return (
      <motion.div
        className="absolute"
        style={{
          left: x,
          top: y,
          width: size,
          height: size,
          background: `linear-gradient(135deg, ${color}, transparent)`,
          borderRadius: 4,
          boxShadow: `0 0 20px ${color}`,
          transformStyle: "preserve-3d",
        }}
        animate={baseAnimation}
        transition={{
          duration,
          repeat: Infinity,
          delay,
          ease: "easeInOut",
        }}
      />
    );
  }

  if (type === "sphere") {
    return (
      <motion.div
        className="absolute rounded-full"
        style={{
          left: x,
          top: y,
          width: size,
          height: size,
          background: `radial-gradient(circle at 30% 30%, ${color}, transparent 70%)`,
          boxShadow: `0 0 30px ${color}`,
        }}
        animate={{
          y: [0, -30, 0, 30, 0],
          x: [0, 15, 0, -15, 0],
          scale: [1, 1.1, 1, 0.9, 1],
        }}
        transition={{
          duration,
          repeat: Infinity,
          delay,
          ease: "easeInOut",
        }}
      />
    );
  }

  if (type === "ring") {
    return (
      <motion.div
        className="absolute rounded-full"
        style={{
          left: x,
          top: y,
          width: size,
          height: size,
          border: `3px solid ${color}`,
          boxShadow: `0 0 20px ${color}, inset 0 0 20px ${color}`,
        }}
        animate={{
          y: [0, -25, 0, 25, 0],
          rotate: [0, 360],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration,
          repeat: Infinity,
          delay,
          ease: "easeInOut",
        }}
      />
    );
  }

  if (type === "diamond") {
    return (
      <motion.div
        className="absolute"
        style={{
          left: x,
          top: y,
          width: size,
          height: size,
          background: `linear-gradient(135deg, ${color}, transparent)`,
          transform: "rotate(45deg)",
          boxShadow: `0 0 25px ${color}`,
        }}
        animate={{
          y: [0, -20, 0, 20, 0],
          rotate: [45, 225, 405],
          scale: [1, 1.1, 1, 0.9, 1],
        }}
        transition={{
          duration,
          repeat: Infinity,
          delay,
          ease: "easeInOut",
        }}
      />
    );
  }

  return null;
}

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
      {shapes.map((shape, index) => (
        <Shape key={index} {...shape} />
      ))}
      
      {/* Gradient orbs for depth */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl"
        style={{
          left: "60%",
          top: "20%",
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.15), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full blur-3xl"
        style={{
          left: "10%",
          top: "60%",
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.15), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
}
