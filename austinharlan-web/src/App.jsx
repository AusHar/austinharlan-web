import React from "react";
import WorkHistory from "./components/WorkHistory.jsx";
import "./styles.css";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <div>
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="logo">
          <span className="main-text">AH</span>
        </div>
        <nav className="navbar">
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="https://www.linkedin.com/in/austinharlan">LinkedIn</a></li>
          </ul>
        </nav>
      </aside>

      {/* Hero Section */}
      <main className="content-container">
        <section className="hero">
          <div className="hero-content-wrapper">
            <div className="hero-content">
              <h1>Hi, I'm <span className="highlight">Austin Harlan</span>. <br />I like to build things.</h1>
              <p>Software Analyst / Cloud Developer</p>
              <a href="https://www.linkedin.com/in/austinharlan" className="cta-button">Contact me!</a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <h2>About Me</h2>
          <div className="about-section-text">
            <p>
              Hey, I’m Austin Harlan—a software engineer passionate about equities trading and
              building scalable systems in diverse environments.
            </p>
            <AnimatePresence>
              <WorkHistory />
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Austin Harlan. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;