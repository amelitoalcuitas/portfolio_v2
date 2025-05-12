"use client";

import { MouseEvent } from "react";
import Image from "next/image";

interface DesktopIconProps {
  name: string;
  onClick: () => void;
  isSelected?: boolean;
}

export default function DesktopIcon({
  name,
  onClick,
  isSelected = false,
}: DesktopIconProps) {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div
      className={`win95-desktop-icon ${
        isSelected ? "win95-desktop-icon-selected" : ""
      }`}
      onClick={handleClick}
    >
      <div className="win95-desktop-icon-img">
        <Image src="/exe.png" alt={name} width={32} height={32} priority />
      </div>
      <div className="win95-desktop-icon-text">{name}</div>
    </div>
  );
}
