"use client";

import { useConsole } from "@/context/ConsoleContext";
import DesktopIcon from "./DesktopIcon";

export default function Desktop() {
  const { setIsClosed, setIsMinimized } = useConsole();

  // Handle console icon click
  const handleConsoleIconClick = () => {
    // Show the console by setting isClosed to false and ensuring it's not minimized
    setIsClosed(false);
    setIsMinimized(false);
  };

  return (
    <div className="win95-desktop">
      <DesktopIcon name="Console" onClick={handleConsoleIconClick} />
    </div>
  );
}
