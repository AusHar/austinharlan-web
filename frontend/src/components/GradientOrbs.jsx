import React from "react";
import { motion } from "framer-motion";

const orbs = [
  {
    color: "rgba(94, 129, 172, 0.15)",
    size: 600,
    x: "10%",
    y: "5%",
    duration: 25,
  },
  {
    color: "rgba(249, 160, 63, 0.08)",
    size: 500,
    x: "70%",
    y: "20%",
    duration: 30,
  },
  {
    color: "rgba(94, 129, 172, 0.1)",
    size: 450,
    x: "50%",
    y: "60%",
    duration: 22,
  },
  {
    color: "rgba(127, 90, 240, 0.06)",
    size: 550,
    x: "80%",
    y: "70%",
    duration: 28,
  },
];

/**
 * Floating gradient orbs that create a subtle OpenAI-style aurora background.
 * Uses absolute positioning and low opacity so it sits behind all content.
 */
export default function GradientOrbs() {
  return (
    <div
      className="gradient-orbs-container"
      aria-hidden="true"
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="gradient-orb"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            left: orb.x,
            top: orb.y,
          }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -30, 20, -40, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
