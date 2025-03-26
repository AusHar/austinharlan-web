import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card.jsx";
import { Button } from "./ui/button.jsx";
import { ChevronDown, ChevronUp } from "lucide-react";

// 1) Minimal sample data
//    Adjust job details, logos, and descriptions as needed
const jobs = [
  {
    title: "Software Analyst",
    company: "Meta",
    logo: "https://www.codinginterview.com/wp-content/uploads/2025/03/meta-logo.svg",
    period: "2023 - Present",
    description:
      "Diagnose and triage platform bugs, debug PHP and JavaScript code, manage user permissions and configurations, and automate content review workflows. Develop large-scale SQL dashboards for cross-functional observability, lead knowledge-sharing sessions, and enhance platform stability.",
  },
  {
    title: "Application Support Engineer",
    company: "Merck Pharmaceuticals",
    logo: "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1484319228/r5dfop9wrdxrsbkflim9.png",
    period: "2021 - 2023",
    description:
      "Ensured game quality, automated test cases, and provided detailed debugging reports.",
  },
  {
    title: "Senior IT Support",
    company: "Mears Group",
    logo: "https://d1hbpr09pwz0sk.cloudfront.net/logo_url/mears-group-inc-3974b2a8",
    period: "2019 - 2021",
    description:
      "Performed deep analysis on software performance, identifying key optimizations for UI.",
  },
];

// 2) Timeline component
export default function WorkHistory() {
  const [expanded, setExpanded] = useState(null);

  return (
    // Parent container: absolute positioning for the timeline line,
    // with enough height (min-h-screen) to display everything
    <div className="relative w-full p-6 bg-gray-0">
      {/* The vertical timeline line, absolutely positioned */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 bg-orange-400 h-full z-0" />

      {/* 3) Map over jobs to create each timeline item */}
      {jobs.map((job, index) => (
        <motion.div
          key={index}
          className="relative flex flex-col items-center w-full mb-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          {/* Circular node on the timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full z-20" />

          {/* 4) The card for each job */}
          <Card className="mt-8 w-96 bg-white border border-gray-200 rounded-lg p-4 shadow-lg">
            <CardContent className="flex flex-col items-center text-center">
              {/* Company Logo */}
              <img
                src={job.logo}
                alt={job.company}
                className="w-16 h-16 mb-2 rounded-full shadow-md"
              />

              {/* Job Title & Company */}
              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
              <p className="text-gray-500">
                {job.company} | {job.period}
              </p>

              {/* Expandable Description Button */}
              <Button
                variant="ghost"
                className="mt-2 flex items-center"
                onClick={() => setExpanded(expanded === index ? null : index)}
              >
                {expanded === index ? "Hide Details" : "View Details"}
                {expanded === index ? (
                  <ChevronUp className="ml-2" />
                ) : (
                  <ChevronDown className="ml-2" />
                )}
              </Button>

              {/* Conditionally render the description with a simple animation */}
              {expanded === index && (
                <motion.p
                  className="mt-2 text-gray-700 text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4,
                    delay: .05,
                    type: "spring",
                    stiffness: 80,
                    ease: [0, 0.71, 0.29, 0.99]
                  }}
                >
                  {job.description}
                </motion.p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}