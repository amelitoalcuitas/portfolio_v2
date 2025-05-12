"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

// Define the sections for navigation
export const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

// Define the type for console output items
export type OutputItem = {
  id: string;
  content: React.ReactNode;
};

// Define the context type
type ConsoleContextType = {
  output: OutputItem[];
  activeSection: string;
  isMinimized: boolean;
  isClosed: boolean;
  setIsMinimized: (minimized: boolean) => void;
  setIsClosed: (closed: boolean) => void;
  handleCommand: (command: string) => void;
  setActiveSection: (section: string) => void;
};

// Create the context
const ConsoleContext = createContext<ConsoleContextType | undefined>(undefined);

// Helper function to get current time in HH:MM:SS format
const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString("en-US", { hour12: false });
};

// Provider component
export function ConsoleProvider({ children }: { children: ReactNode }) {
  const [output, setOutput] = useState<OutputItem[]>([]);
  const [activeSection, setActiveSection] = useState("home");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  // Add welcome message on initial load
  React.useEffect(() => {
    setOutput([
      {
        id: uuidv4(),
        content: (
          <div className="welcome-message">
            <p>Welcome to the Portfolio Terminal</p>
            <p>
              Type <span className="command-highlight">help</span> to see
              available commands
            </p>
          </div>
        ),
      },
    ]);
  }, []);

  // Handle commands
  const handleCommand = (command: string) => {
    // Add the command to the output
    setOutput((prev) => [
      ...prev,
      {
        id: uuidv4(),
        content: (
          <div className="command-entry">
            <span className="console-prompt">{">"}</span>
            <span className="command-text">{command}</span>
          </div>
        ),
      },
    ]);

    // Process the command
    switch (command) {
      case "help":
        showHelp();
        break;
      case "clear":
        clearConsole();
        break;
      case "home":
        showHome();
        setActiveSection("home");
        break;
      case "about":
        showAbout();
        setActiveSection("about");
        break;
      case "education":
        showEducation();
        setActiveSection("education");
        break;
      case "skills":
        showSkills();
        setActiveSection("skills");
        break;
      case "experience":
        showExperience();
        setActiveSection("experience");
        break;
      case "projects":
        showProjects();
        setActiveSection("projects");
        break;
      case "contact":
        showContact();
        setActiveSection("contact");
        break;
      case "ls":
        listSections();
        break;
      case "time":
        showTime();
        break;
      default:
        showUnknownCommand(command);
    }
  };

  // Command handlers
  const showHelp = () => {
    setOutput((prev) => [
      ...prev,
      {
        id: uuidv4(),
        content: (
          <div className="help-content">
            <p>Available commands:</p>
            <ul className="command-list">
              <li>
                <span className="command-highlight">help</span> - Show this help
                message
              </li>
              <li>
                <span className="command-highlight">clear</span> - Clear the
                console
              </li>
              <li>
                <span className="command-highlight">ls</span> - List all
                sections
              </li>
              <li>
                <span className="command-highlight">time</span> - Show current
                time
              </li>
              <li>
                <span className="command-highlight">home</span> - Display home
                section
              </li>
              <li>
                <span className="command-highlight">about</span> - Display about
                section
              </li>
              <li>
                <span className="command-highlight">education</span> - Display
                education section
              </li>
              <li>
                <span className="command-highlight">skills</span> - Display
                skills section
              </li>
              <li>
                <span className="command-highlight">experience</span> - Display
                experience section
              </li>
              <li>
                <span className="command-highlight">projects</span> - Display
                projects section
              </li>
              <li>
                <span className="command-highlight">contact</span> - Display
                contact section
              </li>
            </ul>
          </div>
        ),
      },
    ]);
  };

  const clearConsole = () => {
    setOutput([]);
  };

  const listSections = () => {
    setOutput((prev) => [
      ...prev,
      {
        id: uuidv4(),
        content: (
          <div className="sections-list">
            <p>Available sections:</p>
            <ul className="sections-list-items">
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  {section.id === activeSection ? (
                    <span className="active-section">
                      <span className="section-prefix">{">"} </span>
                      {section.label}
                    </span>
                  ) : (
                    <span>{section.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ),
      },
    ]);
  };

  const showTime = () => {
    setOutput((prev) => [
      ...prev,
      {
        id: uuidv4(),
        content: <p>Current time: {getCurrentTime()}</p>,
      },
    ]);
  };

  const showHome = () => {
    setOutput((prev) => [
      ...prev,
      {
        id: uuidv4(),
        content: (
          <div className="neofetch-output">
            <div className="neofetch-header">
              <pre className="ascii-art">{`
  ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗
  ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
  ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
  ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
  ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
  ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝
              `}</pre>
            </div>
            <div className="neofetch-info">
              <p>
                <span className="info-label">Name:</span> Your Name
              </p>
              <p>
                <span className="info-label">Email:</span>{" "}
                your.email@example.com
              </p>
            </div>
          </div>
        ),
      },
    ]);
  };

  const showAbout = () => {
    setOutput((prev) => [
      ...prev,
      {
        id: uuidv4(),
        content: (
          <div className="about-content">
            <h2>About Me</h2>
            <p>
              I am a passionate developer with experience in building web
              applications.
            </p>
            <p>My journey in tech started with [your background].</p>
            <p>I specialize in [your specialties].</p>
          </div>
        ),
      },
    ]);
  };

  const showEducation = () => {
    setOutput((prev) => [
      ...prev,
      {
        id: uuidv4(),
        content: (
          <div className="education-content">
            <h2>Education</h2>
            <div className="education-item">
              <h3>Degree Name</h3>
              <p>University Name | 20XX - 20XX</p>
              <p>Description of your studies and achievements.</p>
            </div>
          </div>
        ),
      },
    ]);
  };

  const showSkills = () => {
    setOutput((prev) => [
      ...prev,
      {
        id: uuidv4(),
        content: (
          <div className="skills-content">
            <h2>Skills</h2>
            <div className="skills-category">
              <h3>Frontend</h3>
              <ul className="output-list">
                <li className="output">HTML, CSS, JavaScript</li>
                <li className="output">React, Next.js</li>
                <li className="output">Tailwind CSS</li>
              </ul>
            </div>
            <div className="skills-category">
              <h3>Backend</h3>
              <ul className="output-list">
                <li className="output">Node.js, Express</li>
                <li className="output">Python, Django</li>
                <li className="output">Databases: MongoDB, PostgreSQL</li>
              </ul>
            </div>
          </div>
        ),
      },
    ]);
  };

  const showExperience = () => {
    setOutput((prev) => [
      ...prev,
      {
        id: uuidv4(),
        content: (
          <div className="experience-content">
            <h2>Experience</h2>
            <div className="experience-item">
              <h3>Job Title</h3>
              <p>Company Name | 20XX - Present</p>
              <ul className="output-list">
                <li className="output">Responsibility or achievement 1</li>
                <li className="output">Responsibility or achievement 2</li>
                <li className="output">Responsibility or achievement 3</li>
              </ul>
            </div>
          </div>
        ),
      },
    ]);
  };

  const showProjects = () => {
    setOutput((prev) => [
      ...prev,
      {
        id: uuidv4(),
        content: (
          <div className="projects-content">
            <h2>Projects</h2>
            <div className="project-item">
              <h3>Project Name</h3>
              <p>Description of the project and your role.</p>
              <p>Technologies used: React, Node.js, etc.</p>
              <p>
                <a
                  href="https://github.com/yourusername/project"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                {" | "}
                <a
                  href="https://project-demo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                </a>
              </p>
            </div>
          </div>
        ),
      },
    ]);
  };

  const showContact = () => {
    setOutput((prev) => [
      ...prev,
      {
        id: uuidv4(),
        content: (
          <div className="contact-content">
            <h2>Contact</h2>
            <div className="contact-item">
              <p>Email: your.email@example.com</p>
              <p>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                {" | "}
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                {" | "}
                <a
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </p>
            </div>
          </div>
        ),
      },
    ]);
  };

  const showUnknownCommand = (command: string) => {
    setOutput((prev) => [
      ...prev,
      {
        id: uuidv4(),
        content: (
          <p className="error-message">
            Command not found: {command}. Type{" "}
            <span className="command-highlight">help</span> to see available
            commands.
          </p>
        ),
      },
    ]);
  };

  return (
    <ConsoleContext.Provider
      value={{
        output,
        activeSection,
        isMinimized,
        isClosed,
        setIsMinimized,
        setIsClosed,
        handleCommand,
        setActiveSection,
      }}
    >
      {children}
    </ConsoleContext.Provider>
  );
}

// Custom hook to use the console context
export function useConsole() {
  const context = useContext(ConsoleContext);
  if (context === undefined) {
    throw new Error("useConsole must be used within a ConsoleProvider");
  }
  return context;
}
