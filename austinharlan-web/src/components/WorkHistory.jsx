import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card.jsx";
import { Button } from "./ui/button.jsx";
import { ChevronDown, ChevronUp } from "lucide-react";

const jobs = [
  {
    title: "Software Engineer",
    company: "Meta",
    logo: "https://blog.logomyway.com/wp-content/uploads/2021/11/meta-logo.png",
    period: "2023 - Present",
    description: "Working on cutting-edge web technologies, improving performance, and scaling applications.",
  },
  {
    title: "QA Engineer",
    company: "Twisted Pixel",
    logo: "https://upload.wikimedia.org/wikipedia/en/4/4d/Twisted_Pixel_Games_Logo.png",
    period: "2021 - 2023",
    description: "Ensured game quality, automated test cases, and provided detailed debugging reports.",
  },
  {
    title: "Software Analyst",
    company: "Facebook",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Facebook_Logo_2023.png",
    period: "2019 - 2021",
    description: "Performed deep analysis on software performance, identifying key optimizations for UI.",
  }
];

function WorkHistory() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="flex flex-col items-center w-full p-6 relative">
      {/* Timeline Line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full"></div>

      {jobs.map((job, index) => (
        <motion.div
          key={index}
          className="relative flex flex-col items-center w-full mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          {/* Circular node for timeline */}
          <div className="w-4 h-4 bg-blue-500 rounded-full absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

          {/* Job Card */}
          <Card className="mt-4 w-96 shadow-lg bg-white border border-gray-200 rounded-lg p-4">
            <CardContent className="flex flex-col items-center text-center">
              {/* Company Logo */}
              <img src={job.logo} alt={job.company} className="w-16 h-16 mb-2 rounded-full shadow-md" />

              {/* Job Title & Company */}
              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
              <p className="text-gray-500">{job.company} | {job.period}</p>

              {/* Expandable Description Button */}
              <Button
                variant="ghost"
                className="mt-2 flex items-center"
                onClick={() => setExpanded(expanded === index ? null : index)}
              >
                {expanded === index ? "Hide Details" : "View Details"}
                {expanded === index ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
              </Button>

              {/* Expandable Job Description */}
              {expanded === index && (
                <motion.p
                  className="mt-2 text-gray-700 text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
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

export default WorkHistory;