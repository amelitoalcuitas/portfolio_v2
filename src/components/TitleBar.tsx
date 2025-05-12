"use client";

interface TitleBarProps {
  title: string;
}

export default function TitleBar({ title }: TitleBarProps) {
  return (
    <div className="win95-title-bar">
      <div className="win95-title-content">
        <span className="win95-logo">📄</span>
        <div className="win95-title-text">{title}</div>
      </div>
      <div className="win95-title-buttons">
        <button className="win95-button win95-minimize" aria-label="Minimize">
          <span className="win95-button-icon">_</span>
        </button>
        <button className="win95-button win95-maximize" aria-label="Maximize">
          <span className="win95-button-icon">□</span>
        </button>
        <button className="win95-button win95-close" aria-label="Close">
          <span className="win95-button-icon">✕</span>
        </button>
      </div>
    </div>
  );
}
