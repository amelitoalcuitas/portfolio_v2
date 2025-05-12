"use client";

import { useState, useEffect } from "react";
import { useConsole, SECTIONS } from "@/context/ConsoleContext";

// Map section IDs to appropriate icons
const SECTION_ICONS: Record<string, string> = {
  home: "🏠",
  about: "👤",
  education: "🎓",
  skills: "🛠️",
  experience: "💼",
  projects: "📂",
  contact: "📧",
};

export default function Taskbar() {
  const { handleCommand, activeSection, isMinimized, setIsMinimized } =
    useConsole();
  const [currentTime, setCurrentTime] = useState<string>("");
  const [showMenu, setShowMenu] = useState(false);

  // Update the time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };

    // Update time immediately
    updateTime();

    // Set up interval to update time every minute
    const intervalId = setInterval(updateTime, 60000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  // Handle navigation item click
  const handleNavClick = (sectionId: string) => {
    handleCommand(sectionId);
    setShowMenu(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showMenu) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="win95-taskbar">
      <div className="win95-taskbar-start">
        <button
          className="win95-start-button"
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
        >
          <span className="win95-start-logo">⊞</span>
          <span className="win95-start-text">Start</span>
        </button>
        {showMenu && (
          <div
            className="win95-start-menu"
            onClick={(e) => e.stopPropagation()}
          >
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                className={`win95-menu-item ${
                  section.id === activeSection ? "win95-menu-item-active" : ""
                }`}
                onClick={() => handleNavClick(section.id)}
              >
                <span className="win95-menu-item-icon">
                  {SECTION_ICONS[section.id]}
                </span>
                <span className="win95-menu-item-text">{section.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="win95-taskbar-items">
        <button
          className={`win95-taskbar-item ${
            isMinimized ? "" : "win95-taskbar-item-active"
          }`}
          onClick={() => setIsMinimized(!isMinimized)}
        >
          <span className="win95-taskbar-item-icon">📄</span>
          <span className="win95-taskbar-item-text">Console</span>
        </button>
      </div>
      <div className="win95-taskbar-tray">
        <div className="win95-tray-icons">
          <span className="win95-tray-icon">🔊</span>
          <span className="win95-tray-icon">📶</span>
        </div>
        <div className="win95-taskbar-clock">{currentTime}</div>
      </div>
    </div>
  );
}
