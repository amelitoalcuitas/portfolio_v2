"use client";

import { useConsole } from "@/context/ConsoleContext";
import DesktopIcon from "./DesktopIcon";
import { useState, useEffect } from "react";

export default function Desktop() {
  const {
    setIsClosed,
    setIsMinimized,
    isClosed,
    selectedIcon,
    setSelectedIcon,
  } = useConsole();
  const [lastClickTime, setLastClickTime] = useState(0);

  // Handle console icon click with double-click detection
  const handleConsoleIconClick = () => {
    const currentTime = new Date().getTime();
    const timeSinceLastClick = currentTime - lastClickTime;

    // Check if this is a double click (within 300ms of the last click)
    if (timeSinceLastClick < 300 && timeSinceLastClick > 0) {
      // Double click detected
      if (isClosed) {
        setIsClosed(false);
        setIsMinimized(false);
      }
      // Reset the click timer
      setLastClickTime(0);
    } else {
      // First click, just update the time and set as selected
      setLastClickTime(currentTime);
      setSelectedIcon("Console");
    }
  };

  // Add click event listener to the document to handle deselection
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Check if the click was outside of any desktop icon
      const target = e.target as HTMLElement;
      if (!target.closest(".win95-desktop-icon")) {
        setSelectedIcon(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setSelectedIcon]);

  return (
    <div className="win95-desktop">
      <DesktopIcon
        name="Console"
        onClick={handleConsoleIconClick}
        isSelected={selectedIcon === "Console"}
      />
    </div>
  );
}
