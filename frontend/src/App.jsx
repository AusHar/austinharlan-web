import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WorkHistory from "./components/WorkHistory.jsx";
import AnimatedSection, { childVariants } from "./components/AnimatedSection.jsx";
import GradientOrbs from "./components/GradientOrbs.jsx";
import MagneticButton from "./components/MagneticButton.jsx";
import "./styles.css";

// --- Reusable animation variants ---

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const tagVariant = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

// --- Page load overlay animation ---

function PageLoader() {
  return (
    <AnimatePresence>
      <motion.div
        className="page-loader"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
        onAnimationComplete={(def) => {
          // Remove from DOM flow after fade
          if (def.opacity === 0) {
            const el = document.querySelector(".page-loader");
            if (el) el.style.display = "none";
          }
        }}
      />
    </AnimatePresence>
  );
}

// --- Main App ---

function App() {
  // Scroll-driven overlay effect (matching original behavior)
  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min(scrollTop / docHeight, 1);
      document.body.style.setProperty(
        "--scroll-opacity",
        scrollPercent.toFixed(2)
      );
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <PageLoader />
      <GradientOrbs />

      {/* Sidebar Navigation */}
      <motion.aside
        className="sidebar"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1], delay: 0.4 }}
      >
        <div className="logo">
          <motion.span
            className="main-text"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          >
            AH
          </motion.span>
        </div>
        <nav className="navbar" aria-label="Main navigation">
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {["about", "skills", "portfolio", "work-history-container", "contact"].map(
              (section, i) => {
                const labels = ["About", "Skills", "Portfolio", "Experience", "Contact"];
                return (
                  <motion.li
                    key={section}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.4,
                          delay: 0.6 + i * 0.08,
                          ease: [0.25, 0.4, 0.25, 1],
                        },
                      },
                    }}
                  >
                    <a href={`#${section}`} aria-label={`${labels[i]} section`}>
                      {labels[i]}
                    </a>
                  </motion.li>
                );
              }
            )}
          </motion.ul>
        </nav>
        <motion.div
          className="social-links"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <a
            href="https://www.linkedin.com/in/austinharlan/"
            title="LinkedIn Profile"
            aria-label="Visit LinkedIn profile"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </motion.div>
      </motion.aside>

      {/* Main Content */}
      <div className="container">
        <main className="content-container">
          {/* ── Hero Section ── */}
          <section className="hero">
            <div className="hero-content-wrapper">
              <motion.div
                className="hero-content"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } },
                }}
              >
                <motion.h1 variants={fadeUp}>
                  Hi, I'm{" "}
                  <motion.span
                    className="highlight gradient-text"
                    initial={{ backgroundSize: "0% 100%" }}
                    animate={{ backgroundSize: "100% 100%" }}
                    transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }}
                  >
                    Austin Harlan
                  </motion.span>
                  . <br />
                  I architect scalable systems.
                </motion.h1>
                <motion.p variants={fadeUp}>
                  Software Analyst | Cloud Developer | Systems Engineer
                </motion.p>
                <motion.div variants={fadeUp}>
                  <MagneticButton
                    href="https://www.linkedin.com/in/austinharlan"
                    className="cta-button glow-button"
                  >
                    Contact me!
                  </MagneticButton>
                </motion.div>
              </motion.div>

              <motion.div
                className="profile-photo"
                initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.9,
                  delay: 0.8,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                <motion.img
                  src="images/IMG_0586.png"
                  alt="Austin Harlan Headshot"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </div>
          </section>

          {/* ── About Section ── */}
          <AnimatedSection id="about" className="about-section">
            <motion.h2 variants={childVariants}>About Me</motion.h2>
            <motion.div className="about-section-text" variants={childVariants}>
              <p>
                I'm Austin Harlan—a software analyst passionate about building
                reliable, scalable systems and continuously improving development
                processes.
                <br />
                <br />
                With 7+ years of IT and cloud expertise at Merck &amp; Co.,
                Cognizant, Mears Group, and now Meta in Austin, TX, I specialize
                in platform stability, automation, and cross-functional
                observability solutions.
                <br />
                <br />
                Currently completing my B.S. in Software Engineering at WGU, I'm
                always looking for opportunities to solve complex technical
                challenges.
              </p>
            </motion.div>
          </AnimatedSection>

          {/* ── Skills Section ── */}
          <AnimatedSection id="skills" className="skills-section">
            <motion.h2 variants={childVariants}>Skills</motion.h2>
            <motion.div
              className="skills-grid"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } },
              }}
            >
              {[
                {
                  title: "Languages",
                  tags: ["Python", "JavaScript", "PHP", "SQL", "Bash"],
                },
                {
                  title: "Cloud & Infrastructure",
                  tags: ["AWS", "S3", "CI/CD", "SCCM", "Windows Server"],
                },
                {
                  title: "Tools & Frameworks",
                  tags: ["React", "Git", "REST APIs", "Observability Dashboards"],
                },
                {
                  title: "Methodologies",
                  tags: [
                    "Agile",
                    "Debugging",
                    "Automation",
                    "Technical Documentation",
                  ],
                },
              ].map((category) => (
                <motion.div
                  key={category.title}
                  className="skill-category"
                  variants={childVariants}
                >
                  <h3>{category.title}</h3>
                  <motion.div
                    className="skill-tags"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    {category.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        className="skill-tag"
                        variants={tagVariant}
                        whileHover={{
                          y: -3,
                          scale: 1.05,
                          transition: { duration: 0.2 },
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>

          {/* ── Portfolio Section ── */}
          <AnimatedSection id="portfolio" className="portfolio-section">
            <motion.h2 variants={childVariants}>Portfolio</motion.h2>
            <motion.div
              className="portfolio-grid"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
              }}
            >
              {[
                {
                  title: "Investing LLM",
                  subtitle: "Under Construction",
                  desc: "AI-powered investing assistant that reviews financials and provides expert insights while allowing you to interact with legendary investing personas.",
                },
                {
                  title: "Status LLM",
                  subtitle: "Under Construction",
                  desc: "LLM checking in on your preparedness for the coming week's events. Connect a calendar and receive prompts asking you preparation questions regarding your upcoming week's events.",
                },
              ].map((project) => (
                <motion.div
                  key={project.title}
                  className="project-card glass-card"
                  variants={cardVariant}
                  whileHover={{
                    scale: 1.04,
                    rotateX: 2,
                    rotateY: 2,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="card-glow" />
                  <h2>{project.title}</h2>
                  <h4>{project.subtitle}</h4>
                  <p>{project.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>

          {/* ── Work History ── */}
          <AnimatedSection
            id="work-history-container"
            className="work-history-container"
          >
            <motion.h2 variants={childVariants}>Work History</motion.h2>
          </AnimatedSection>
          <section id="work-history" className="work-history-section">
            <WorkHistory />
          </section>

          {/* ── Contact Section ── */}
          <AnimatedSection id="contact" className="contact-section">
            <motion.h2 variants={childVariants}>Contact</motion.h2>
            <motion.p variants={childVariants}>
              Feel free to reach out to me at{" "}
              <a href="mailto:austinharlan@gmail.com">austinharlan@gmail.com</a>.
            </motion.p>
          </AnimatedSection>
        </main>
      </div>

      {/* Footer */}
      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p>
          &copy; {new Date().getFullYear()} Austin Harlan. All rights reserved.
        </p>
      </motion.footer>
    </>
  );
}

export default App;
