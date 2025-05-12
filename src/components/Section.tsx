'use client';

interface SectionProps {
  id: string;
  activeSection: string;
  children: React.ReactNode;
}

export default function Section({ id, activeSection, children }: SectionProps) {
  return (
    <section className={`section ${activeSection === id ? 'active' : ''} section-${id}`}>
      <div className="section-content">
        {children}
      </div>
    </section>
  );
}
