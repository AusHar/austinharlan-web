import React from "react";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1],
      staggerChildren: 0.12,
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

/**
 * Wraps content in a scroll-triggered reveal animation.
 * Each direct child animates in with a staggered delay.
 */
export default function AnimatedSection({
  children,
  className = "",
  id,
  delay = 0,
  threshold = 0.15,
}) {
  return (
    <motion.section
      id={id}
      className={className}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      transition={{ delay }}
    >
      {children}
    </motion.section>
  );
}

export { childVariants, sectionVariants };
