"use client";

import { MouseEvent } from "react";

interface DesktopIconProps {
  name: string;
  icon: string;
  onClick: () => void;
}

export default function DesktopIcon({ name, icon, onClick }: DesktopIconProps) {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div className="win95-desktop-icon" onClick={handleClick}>
      <div className="win95-desktop-icon-img">{icon}</div>
      <div className="win95-desktop-icon-text">{name}</div>
    </div>
  );
}
