"use client";

import { MouseEvent } from "react";
import Image from "next/image";

interface DesktopIconProps {
  name: string;
  onClick: () => void;
}

export default function DesktopIcon({ name, onClick }: DesktopIconProps) {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div className="win95-desktop-icon" onClick={handleClick}>
      <div className="win95-desktop-icon-img">
        <Image src="/exe.png" alt={name} width={32} height={32} priority />
      </div>
      <div className="win95-desktop-icon-text">{name}</div>
    </div>
  );
}
