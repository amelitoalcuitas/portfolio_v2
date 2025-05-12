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
  selectedIcon: string | null;
  setIsMinimized: (minimized: boolean) => void;
  setIsClosed: (closed: boolean) => void;
  setSelectedIcon: (iconName: string | null) => void;
  handleCommand: (command: string) => void;
  setActiveSection: (section: string) => void;
  resetOutput: () => void;
};

// Create the context
const ConsoleContext = createContext<ConsoleContextType | undefined>(undefined);

// Helper function to get current time in HH:MM:SS format
const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString("en-US", { hour12: false });
};

// Helper function to generate a percentage bar
const generatePercentageBar = (percentage: number) => {
  const totalLength = 10;
  const filledLength = Math.round((percentage / 100) * totalLength);
  const emptyLength = totalLength - filledLength;

  const filled = "=".repeat(filledLength);
  const empty = "-".repeat(emptyLength);

  return `[${filled}${empty}] ${percentage}%`;
};

// Provider component
export function ConsoleProvider({ children }: { children: ReactNode }) {
  const [output, setOutput] = useState<OutputItem[]>([]);
  const [activeSection, setActiveSection] = useState("home");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

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
            <p>Use TAB to autocomplete commands</p>
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

  // Reset output to initial welcome message
  const resetOutput = () => {
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
            <p>Use TAB to autocomplete commands</p>
          </div>
        ),
      },
    ]);
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
                <span className="info-label">Name:</span> Amelito N. Alcuitas
                Jr.
              </p>
              <p>
                <span className="info-label">Email:</span>{" "}
                amelitoalcuitasjr@gmail.com
              </p>
              <p>
                <span className="info-label">Role:</span> Full Stack Web
                Developer
              </p>
              <p>
                <span className="info-label">Location:</span> Pagadian City,
                Philippines
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
              I am a Full Stack Developer with 5+ years of experience building
              scalable web and mobile applications. Strong in debugging,
              performance optimization, and clean, maintainable code.
            </p>
            <p>
              I specialize in full-stack development with a focus on performance
              and UX, collaborating with remote teams across the full
              development lifecycle.
            </p>
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
              <p className="category-title">
                Bachelor of Science in Information and Communications Technology
              </p>
              <p>University of San Carlos | 2012 - 2017</p>
              <p>Dean&apos;s Lister, A.Y. 2015 - 2016, A.Y. 2016 - 2017</p>
            </div>
          </div>
        ),
      },
    ]);
  };

  const showSkills = () => {
    // Define skills data
    const frontendSkills = [
      { name: "HTML/CSS", level: "Expert", percentage: 95 },
      { name: "JavaScript/TypeScript", level: "Expert", percentage: 95 },
      { name: "Vue.js", level: "Expert", percentage: 90 },
      { name: "React", level: "Intermediate", percentage: 75 },
      { name: "Flutter", level: "Advanced", percentage: 85 },
    ];

    const backendSkills = [
      { name: "Node.js", level: "Advanced", percentage: 85 },
      { name: "Express.js", level: "Advanced", percentage: 85 },
      { name: "Laravel", level: "Basic", percentage: 50 },
      { name: "PHP", level: "Basic", percentage: 50 },
    ];

    const databaseSkills = [
      { name: "MongoDB", level: "Advanced", percentage: 85 },
      { name: "MySQL", level: "Advanced", percentage: 80 },
      { name: "PostgreSQL", level: "Intermediate", percentage: 75 },
      { name: "Firebase", level: "Advanced", percentage: 85 },
    ];

    const toolsSkills = [
      { name: "Git", level: "Advanced", percentage: 90 },
      { name: "Docker", level: "Basic", percentage: 50 },
      { name: "Postman", level: "Advanced", percentage: 60 },
      { name: "VSCode", level: "Expert", percentage: 95 },
      { name: "AI Tools", level: "Advanced", percentage: 90 },
    ];

    setOutput((prev) => [
      ...prev,
      {
        id: uuidv4(),
        content: (
          <div className="skills-content">
            <h2>Skills</h2>
            <div className="skills-category">
              <p className="category-title">Front-End</p>
              <ul className="output-list">
                {frontendSkills.map((skill, index) => (
                  <li key={index} className="output">
                    {skill.name} {generatePercentageBar(skill.percentage)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="skills-category">
              <p className="category-title">Back-End</p>
              <ul className="output-list">
                {backendSkills.map((skill, index) => (
                  <li key={index} className="output">
                    {skill.name} {generatePercentageBar(skill.percentage)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="skills-category">
              <p className="category-title">Databases</p>
              <ul className="output-list">
                {databaseSkills.map((skill, index) => (
                  <li key={index} className="output">
                    {skill.name} {generatePercentageBar(skill.percentage)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="skills-category">
              <p className="category-title">Tools</p>
              <ul className="output-list">
                {toolsSkills.map((skill, index) => (
                  <li key={index} className="output">
                    {skill.name} {generatePercentageBar(skill.percentage)}
                  </li>
                ))}
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
              <p className="category-title">Full Stack Web Developer</p>
              <p>Lanex Corporation | 2021 - Present</p>
              <ul className="output-list">
                <li className="output">
                  Built and maintained web and mobile apps with a focus on
                  performance and UX.
                </li>
                <li className="output">
                  Improved app speed by up to 30% through code optimization and
                  debugging.
                </li>
                <li className="output">
                  Collaborated with a remote team across the full development
                  lifecycle.
                </li>
                <li className="output">
                  Integrated third-party APIs and services to extend application
                  functionality.
                </li>
              </ul>
              <p>------------------------------------------------</p>
            </div>
            <div className="experience-item">
              <p className="category-title">Freelance Developer</p>
              <p>Freelance | 2019 - 2020</p>
              <ul className="output-list">
                <li className="output">
                  Delivered custom academic web and mobile projects for student
                  clients.
                </li>
                <li className="output">
                  Managed end-to-end development, from design to deployment.
                </li>
                <li className="output">
                  Ensured clean, maintainable code and responsive interfaces.
                </li>
                <li className="output">
                  Communicated directly with clients to gather requirements and
                  provide support.
                </li>
              </ul>
              <p>------------------------------------------------</p>
            </div>
            <div className="experience-item">
              <p className="category-title">Full Stack Web Developer</p>
              <p>Bluefrog Contents and Support Inc. | 2017 - 2018</p>
              <ul className="output-list">
                <li className="output">
                  Developed full-stack applications and integrated back-end
                  APIs.
                </li>
                <li className="output">
                  Wrote clean, scalable code for both front-end and back-end.
                </li>
                <li className="output">
                  Used modern frameworks to enhance software functionality and
                  UX.
                </li>
                <li className="output">
                  Maintained and updated legacy systems for improved stability
                  and performance.
                </li>
              </ul>
              <p>------------------------------------------------</p>
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
              <p className="under-construction">
                <span role="img" aria-label="construction">
                  🚧
                </span>{" "}
                Under Construction{" "}
                <span role="img" aria-label="construction">
                  🚧
                </span>
              </p>
              <p>
                Project showcase is currently being updated with my latest work.
              </p>
              <p>
                Please check back soon or contact me for more information about
                my projects.
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
              <p>Phone: +63 999 833 5043</p>
              <p>
                Email:{" "}
                <a href="mailto:amelitoalcuitasjr@gmail.com">
                  amelitoalcuitasjr@gmail.com
                </a>
              </p>
              <p>Location: Pagadian City, Philippines</p>
              <p>
                <a
                  href="https://linkedin.com/in/amelitoalcuitas"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                {" | "}
                <a
                  href="/Amelito%20Alcuitas%20(Resume).pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
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
        selectedIcon,
        setIsMinimized,
        setIsClosed,
        setSelectedIcon,
        handleCommand,
        setActiveSection,
        resetOutput,
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
