import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import WorkHistory from "./components/WorkHistory.jsx";
import "./styles.css";

function App() {
  // Scroll effect
  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min(scrollTop / docHeight, 1); // Clamp between 0 and 1
      document.body.style.setProperty('--scroll-opacity', scrollPercent.toFixed(2));
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Sidebar Navi */}
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
        <div className="social-links">
          <a href="https://www.linkedin.com/in/austinharlan/" title="LinkedIn Profile"><i className="fab fa-linkedin"></i></a>
        </div>
      </aside>

      {/* Main Content / Hero */}
      <div className="container">
        <main className="content-container">
          <section className="hero">
            <div className="hero-content-wrapper">
              <div className="hero-content">
                <h1>
                  Hi, I'm <span className="highlight">Austin Harlan</span>. <br />
                  I like to build things.
                </h1>
                <p>Software Analyst / Cloud Developer</p>
                <a href="https://www.linkedin.com/in/austinharlan" className="cta-button">
                  Contact me!
                </a>
              </div>
              <div className="profile-photo">
                <img src="images/IMG_0586.png" alt="Austin Harlan Headshot" />
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="about-section">
            <h2>About Me</h2>
            <div className="about-section-text">
              <p>
                Hey, I’m Austin Harlan—a software engineer passionate about equities trading and
                building scalable systems in diverse environments.<br /><br />
                With 7+ years of IT and cloud expertise at Merck &amp; Co., Cognizant, Mears Group,
                and now Meta in Austin, TX, I’m currently completing my B.S. in Software Engineering
                at WGU. Life is good.<br /><br />
                What's our next project?
              </p>
            </div>
          </section>

          {/* Portfolio */}
          <section id="portfolio" className="portfolio-section">
            <h2>Portfolio</h2>
            <div className="portfolio-grid">
              <div className="project-card">
                <h2>Investing LLM</h2>
                <h4>Under Construction</h4>
                <p>
                  AI-powered investing assistant that reviews financials and provides expert
                  insights while allowing you to interact with legendary investing personas.
                </p>
              </div>
              <div className="project-card">
                <h2>Status LLM</h2>
                <h4>Under Construction</h4>
                <p>
                  LLM checking in on your preparedness for the coming week's events. Connect a
                  calendar and receive prompts asking you preparation questions regarding your
                  upcoming week's events.
                </p>
              </div>
            </div>
          </section>

          {/* Work History */}
          <section id="work-history-container" className="work-history-container">
            <h2>Work History</h2>
          </section>
          <section id="work-history" className="work-history-section">
            <AnimatePresence>
              <WorkHistory />
            </AnimatePresence>
          </section>

          {/* Contact */}
          <section id="contact" className="contact-section">
            <h2>Contact</h2>
            <p>
              Feel free to reach out to me at{" "}
              <a href="mailto:austinharlan@gmail.com">austinharlan@gmail.com</a>.
            </p>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Austin Harlan. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;