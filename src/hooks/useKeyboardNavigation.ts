'use client';

import { useEffect } from 'react';

interface UseKeyboardNavigationProps {
  sections: { id: string; label: string }[];
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function useKeyboardNavigation({
  sections,
  activeSection,
  setActiveSection,
}: UseKeyboardNavigationProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const currentIndex = sections.findIndex(section => section.id === activeSection);

      switch (event.key) {
        case 'ArrowRight':
          // Navigate to next section (or wrap to first)
          const nextIndex = (currentIndex + 1) % sections.length;
          setActiveSection(sections[nextIndex].id);
          break;
        case 'ArrowLeft':
          // Navigate to previous section (or wrap to last)
          const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
          setActiveSection(sections[prevIndex].id);
          break;
        default:
          break;
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sections, activeSection, setActiveSection]);
}
