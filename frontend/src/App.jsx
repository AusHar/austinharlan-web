import React, { useEffect } from "react";
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
        <nav className="navbar" aria-label="Main navigation">
          <ul>
            <li><a href="#about" aria-label="About section">About</a></li>
            <li><a href="#skills" aria-label="Skills section">Skills</a></li>
            <li><a href="#portfolio" aria-label="Portfolio section">Portfolio</a></li>
            <li><a href="#work-history-container" aria-label="Work history section">Experience</a></li>
            <li><a href="#contact" aria-label="Contact section">Contact</a></li>
          </ul>
        </nav>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/austinharlan/" title="LinkedIn Profile" aria-label="Visit LinkedIn profile"><i className="fab fa-linkedin"></i></a>
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
                  I architect scalable systems.
                </h1>
                <p>Software Analyst | Cloud Developer | Systems Engineer</p>
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
                I'm Austin Harlan—a software analyst passionate about building reliable,
                scalable systems and continuously improving development processes.<br /><br />
                With 7+ years of IT and cloud expertise at Merck &amp; Co., Cognizant, Mears Group,
                and now Meta in Austin, TX, I specialize in platform stability, automation,
                and cross-functional observability solutions.<br /><br />
                Currently completing my B.S. in Software Engineering at WGU, I'm always looking
                for opportunities to solve complex technical challenges.
              </p>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="skills-section">
            <h2>Skills</h2>
            <div className="skills-grid">
              <div className="skill-category">
                <h3>Languages</h3>
                <div className="skill-tags">
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">JavaScript</span>
                  <span className="skill-tag">PHP</span>
                  <span className="skill-tag">SQL</span>
                  <span className="skill-tag">Bash</span>
                </div>
              </div>
              <div className="skill-category">
                <h3>Cloud & Infrastructure</h3>
                <div className="skill-tags">
                  <span className="skill-tag">AWS</span>
                  <span className="skill-tag">S3</span>
                  <span className="skill-tag">CI/CD</span>
                  <span className="skill-tag">SCCM</span>
                  <span className="skill-tag">Windows Server</span>
                </div>
              </div>
              <div className="skill-category">
                <h3>Tools & Frameworks</h3>
                <div className="skill-tags">
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">Git</span>
                  <span className="skill-tag">REST APIs</span>
                  <span className="skill-tag">Observability Dashboards</span>
                </div>
              </div>
              <div className="skill-category">
                <h3>Methodologies</h3>
                <div className="skill-tags">
                  <span className="skill-tag">Agile</span>
                  <span className="skill-tag">Debugging</span>
                  <span className="skill-tag">Automation</span>
                  <span className="skill-tag">Technical Documentation</span>
                </div>
              </div>
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
            <WorkHistory />
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
        <p>&copy; {new Date().getFullYear()} Austin Harlan. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;