'use client';

import { useState } from 'react';
import Terminal from '@/components/Terminal';
import Navigation from '@/components/Navigation';
import Section from '@/components/Section';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <Terminal
      header={<h1>Welcome <span className="errorcode">v1.0</span></h1>}
      navigation={<Navigation activeSection={activeSection} setActiveSection={setActiveSection} />}
      content={
        <>
          <Section id="home" activeSection={activeSection}>
            <h2>Home <span className="errorcode">Terminal</span></h2>
            <div className="section-divider"></div>
            <p className="output typing">{'>'} Welcome to my portfolio. Navigate through the sections to learn more about me.</p>
            <p className="output">{'>'} Use the navigation links above or press the ← → arrow keys to navigate between sections.</p>

            {/* Image placeholder - will be replaced with actual image later */}
            <div className="image-placeholder">
              <span>Profile Image Placeholder - Will be added later</span>
            </div>
          </Section>

          <Section id="about" activeSection={activeSection}>
            <h2>About <span className="errorcode">Me</span></h2>
            <div className="section-divider"></div>
            <p className="output">I am a passionate developer with a love for creating elegant solutions to complex problems.</p>
            <p className="output">My journey in technology began with a curiosity about how things work, which evolved into a career in software development.</p>
            <p className="output">With a focus on user experience and clean code, I strive to build applications that are both functional and intuitive.</p>
          </Section>

          <Section id="education" activeSection={activeSection}>
            <h2>Education <span className="errorcode">Path</span></h2>
            <div className="section-divider"></div>
            <div className="education-item">
              <h3 className="output">Bachelor of Science in Computer Science</h3>
              <p className="output">University of Technology, 2018-2022</p>
              <p className="output">Relevant coursework:</p>
              <ul className="output-list">
                <li className="output">Data Structures and Algorithms</li>
                <li className="output">Web Development</li>
                <li className="output">Database Systems</li>
                <li className="output">Software Engineering</li>
              </ul>
            </div>
          </Section>

          <Section id="skills" activeSection={activeSection}>
            <h2>Skills <span className="errorcode">Matrix</span></h2>
            <div className="section-divider"></div>
            <div className="skills-category">
              <h3 className="output">Languages</h3>
              <p className="output">JavaScript, TypeScript, Python, Java</p>
            </div>

            <div className="skills-category">
              <h3 className="output">Frontend</h3>
              <p className="output">React, Next.js, HTML, CSS, Tailwind</p>
            </div>

            <div className="skills-category">
              <h3 className="output">Backend</h3>
              <p className="output">Node.js, Express, Django</p>
            </div>

            <div className="skills-category">
              <h3 className="output">Database</h3>
              <p className="output">MongoDB, PostgreSQL, MySQL</p>
            </div>

            <div className="skills-category">
              <h3 className="output">Tools</h3>
              <p className="output">Git, Docker, AWS, Figma</p>
            </div>
          </Section>

          <Section id="experience" activeSection={activeSection}>
            <h2>Experience <span className="errorcode">Log</span></h2>
            <div className="section-divider"></div>
            <div className="experience-item">
              <h3 className="output">Senior Frontend Developer</h3>
              <p className="output">Tech Innovations Inc., 2022-Present</p>
              <ul className="output-list">
                <li className="output">Developed and maintained multiple React applications</li>
                <li className="output">Collaborated with UX/UI designers to implement responsive designs</li>
                <li className="output">Mentored junior developers and conducted code reviews</li>
                <li className="output">Implemented CI/CD pipelines for automated testing and deployment</li>
              </ul>
            </div>
          </Section>

          <Section id="projects" activeSection={activeSection}>
            <h2>Projects <span className="errorcode">Showcase</span></h2>
            <div className="section-divider"></div>

            <div className="project-item">
              <h3 className="output">Project 1: E-commerce Platform</h3>
              <p className="output">A full-stack application built with React, Node.js, and MongoDB.</p>
              <p className="output">Features include user authentication, product catalog, shopping cart, and payment processing.</p>

              {/* Image placeholder - will be replaced with actual project image later */}
              <div className="image-placeholder">
                <span>Project 1 Screenshot - Will be added later</span>
              </div>
            </div>

            <div className="project-item">
              <h3 className="output">Project 2: Weather App</h3>
              <p className="output">A mobile application that provides real-time weather updates using OpenWeatherMap API.</p>
              <p className="output">Features include location-based forecasts, hourly and daily predictions, and weather alerts.</p>

              {/* Image placeholder - will be replaced with actual project image later */}
              <div className="image-placeholder">
                <span>Project 2 Screenshot - Will be added later</span>
              </div>
            </div>
          </Section>

          <Section id="contact" activeSection={activeSection}>
            <h2>Contact <span className="errorcode">Terminal</span></h2>
            <div className="section-divider"></div>
            <div className="contact-item">
              <h3 className="output">Get In Touch</h3>
              <p className="output">Feel free to reach out for collaborations or just a friendly chat.</p>

              <div className="contact-details">
                <p className="output">Email: developer@example.com</p>
                <p className="output">GitHub: github.com/developer</p>
                <p className="output">LinkedIn: linkedin.com/in/developer</p>
                <p className="output">Twitter: @developer</p>
              </div>
            </div>
          </Section>
        </>
      }
      footer={
        <div className="output">
          <p> {'>'} © 2024 | Built with Next.js and a passion for retro aesthetics</p>
        </div>
      }
    />
  );
}
