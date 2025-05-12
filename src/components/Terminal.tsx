'use client';

interface TerminalProps {
  header: React.ReactNode;
  navigation: React.ReactNode;
  content: React.ReactNode;
  footer: React.ReactNode;
}

export default function Terminal({ header, navigation, content, footer }: TerminalProps) {
  return (
    <>
      <div className="overlay"></div>
      <div className="terminal">
        <header className="terminal-header">
          {header}
          <div className="terminal-navigation">
            {navigation}
          </div>
        </header>

        <main className="terminal-content">
          {content}
        </main>

        <footer className="terminal-footer">
          {footer}
        </footer>
      </div>
    </>
  );
}
