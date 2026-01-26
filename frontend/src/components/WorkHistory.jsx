import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card.jsx";
import { Button } from "./ui/button.jsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import metaLogo from "../assets/meta-logo.svg";
import merckLogo from "../assets/merck-logo.png";
import mearsLogo from "../assets/mears-logo.png";

// 1) Minimal sample data
//    Adjust job details, logos, and descriptions as needed
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
          <Card className="mt-8 w-96 bg-[#282C35] border border-[#3d4150] rounded-lg p-4 shadow-lg">
            <CardContent className="flex flex-col items-center text-center">
              {/* Company Logo */}
              <img
                src={job.logo}
                alt={job.company}
                className="w-16 h-16 mb-2 rounded-full shadow-md bg-white p-1"
              />

              {/* Job Title & Company */}
              <h3 className="text-lg font-semibold text-[#FFF8F0]">{job.title}</h3>
              <p className="text-[#CED0CE]">
                {job.company} | {job.period}
              </p>

              {/* Expandable Details Button */}
              <Button
                variant="ghost"
                className="mt-2 flex items-center text-[#5E81AC] hover:text-[#F9A03F] hover:bg-[#3d4150]"
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
                  className="mt-2 text-[#E6E8E6] text-center"
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