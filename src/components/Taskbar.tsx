"use client";

import { useState, useEffect } from "react";

export default function Taskbar() {
  const [currentTime, setCurrentTime] = useState<string>("");

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

  return (
    <div className="win95-taskbar">
      <div className="win95-taskbar-start">
        <button className="win95-start-button">
          <span className="win95-start-logo">⊞</span>
          <span className="win95-start-text">Start</span>
        </button>
      </div>
      <div className="win95-taskbar-items">
        <button className="win95-taskbar-item win95-taskbar-item-active">
          <span className="win95-taskbar-item-icon">📄</span>
          <span className="win95-taskbar-item-text">Portfolio Console</span>
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
