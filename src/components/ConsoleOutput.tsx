'use client';

import { useEffect, useRef } from 'react';

interface ConsoleOutputProps {
  output: Array<{
    id: string;
    content: React.ReactNode;
  }>;
}

export default function ConsoleOutput({ output }: ConsoleOutputProps) {
  const outputRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when output changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="console-output" ref={outputRef}>
      {output.map((item) => (
        <div key={item.id} className="output-item">
          {item.content}
        </div>
      ))}
    </div>
  );
}
