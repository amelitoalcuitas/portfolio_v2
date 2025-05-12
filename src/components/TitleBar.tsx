"use client";

import { MouseEvent } from "react";
import Image from "next/image";

interface TitleBarProps {
  title: string;
  onDragStart?: (e: MouseEvent<HTMLDivElement>) => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  isMaximized?: boolean;
}

export default function TitleBar({
  title,
  onDragStart,
  onMinimize,
  onMaximize,
  onClose,
  isMaximized = false,
}: TitleBarProps) {
  return (
    <div
      className="win95-title-bar"
      onMouseDown={onDragStart}
      style={{ cursor: onDragStart && !isMaximized ? "grab" : "default" }}
    >
      <div className="win95-title-content">
        <span className="win95-logo">
          <Image src="/exe.png" alt="Logo" width={16} height={16} />
        </span>
        <div className="win95-title-text">{title}</div>
      </div>
      <div className="win95-title-buttons">
        <button
          className="win95-button win95-minimize"
          aria-label="Minimize"
          onClick={onMinimize}
          onMouseDown={(e) => e.stopPropagation()} // Prevent dragging when clicking buttons
        >
          <span className="win95-button-icon">_</span>
        </button>
        <button
          className="win95-button win95-maximize"
          aria-label={isMaximized ? "Restore" : "Maximize"}
          onClick={onMaximize}
          onMouseDown={(e) => e.stopPropagation()} // Prevent dragging when clicking buttons
        >
          <span className="win95-button-icon">{isMaximized ? "❐" : "□"}</span>
        </button>
        <button
          className="win95-button win95-close"
          aria-label="Close"
          onClick={onClose}
          onMouseDown={(e) => e.stopPropagation()} // Prevent dragging when clicking buttons
        >
          <span className="win95-button-icon">✕</span>
        </button>
      </div>
    </div>
  );
}
