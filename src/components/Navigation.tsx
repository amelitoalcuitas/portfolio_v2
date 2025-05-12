'use client';

import useKeyboardNavigation from '@/hooks/useKeyboardNavigation';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  // Use our custom hook for keyboard navigation
  useKeyboardNavigation({ sections, activeSection, setActiveSection });

  return (
    <nav className="navigation">
      {sections.map((section) => (
        <a
          key={section.id}
          className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
          onClick={() => setActiveSection(section.id)}
        >
          <span className="nav-prefix">{activeSection === section.id ? '>' : ' '}</span>
          {section.label}
        </a>
      ))}
    </nav>
  );
}
