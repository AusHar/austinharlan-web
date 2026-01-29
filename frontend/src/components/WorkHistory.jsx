import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "./ui/card.jsx";
import { Button } from "./ui/button.jsx";
import { ChevronDown } from "lucide-react";
import metaLogo from "../assets/meta-logo.svg";
import merckLogo from "../assets/merck-logo.png";
import mearsLogo from "../assets/mears-logo.png";

const jobs = [
  {
    title: "Software Analyst",
    company: "Meta",
    logo: metaLogo,
    period: "2022 - Present",
    description:
      "Drive platform stability and efficiency for the Single Review Tool (SRT) by debugging complex PHP and JavaScript issues, triaging high-priority bugs, and managing user permissions and configurations. Develop and maintain scalable SQL dashboards that power cross-functional observability. Automate content review workflows and lead regular knowledge-sharing sessions to elevate team performance and operational smoothness.",
  },
  {
    title: "Application Support Engineer",
    company: "Merck Pharmaceuticals",
    logo: merckLogo,
    period: "2021 - 2022",
    description:
      "Ensured stable Windows 11 SCCM patching, automated test cases, and provided detailed debugging reports for a wide array of supported softwares.",
  },
  {
    title: "Senior IT Support",
    company: "Mears Group",
    logo: mearsLogo,
    period: "2017 - 2021",
    description:
      "Hands and feet IT support for a large-scale Windows 10 organization, including hardware and software support, user training, and everything in between.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

const nodeVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: i * 0.15 + 0.1,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

const descriptionVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    y: -8,
  },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: {
      height: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] },
      opacity: { duration: 0.3, delay: 0.1 },
      y: { duration: 0.3, delay: 0.05 },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -8,
    transition: {
      height: { duration: 0.25, delay: 0.1 },
      opacity: { duration: 0.2 },
      y: { duration: 0.2 },
    },
  },
};

export default function WorkHistory() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="relative w-full p-6">
      {/* Gradient timeline line */}
      <div className="timeline-line" />

      {jobs.map((job, index) => (
        <motion.div
          key={index}
          className="relative flex flex-col items-center w-full mb-10"
          custom={index}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Timeline node with animated ring */}
          <motion.div
            className="timeline-node"
            custom={index}
            variants={nodeVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="timeline-node-ring" />
          </motion.div>

          {/* Job Card */}
          <Card className="mt-8 w-96 bg-[rgba(20,20,28,0.8)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-4 shadow-lg backdrop-blur-sm">
            <CardContent className="flex flex-col items-center text-center">
              {/* Company Logo */}
              <motion.img
                src={job.logo}
                alt={job.company}
                className="w-16 h-16 mb-2 rounded-full shadow-md bg-white p-1"
                whileHover={{ scale: 1.08, rotate: 2 }}
                transition={{ duration: 0.3 }}
              />

              {/* Job Title & Company */}
              <h3 className="text-lg font-semibold text-[#FFF8F0]">
                {job.title}
              </h3>
              <p className="text-[#9ca3af]">
                {job.company} | {job.period}
              </p>

              {/* Expandable Details Button */}
              <Button
                variant="ghost"
                className="mt-2 flex items-center text-[#5E81AC] hover:text-[#88C0D0] hover:bg-[rgba(255,255,255,0.05)]"
                onClick={() =>
                  setExpanded(expanded === index ? null : index)
                }
              >
                {expanded === index ? "Hide Details" : "View Details"}
                <motion.span
                  className="ml-2 inline-flex"
                  animate={{ rotate: expanded === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDown size={16} />
                </motion.span>
              </Button>

              {/* Animated description expand/collapse */}
              <AnimatePresence mode="wait">
                {expanded === index && (
                  <motion.div
                    className="overflow-hidden"
                    variants={descriptionVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <p className="mt-2 text-[#d1d5db] text-center leading-relaxed">
                      {job.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
