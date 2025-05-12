"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useConsole } from "@/context/ConsoleContext";

// List of available commands for autocomplete
const AVAILABLE_COMMANDS = [
  "help",
  "clear",
  "home",
  "about",
  "education",
  "skills",
  "experience",
  "projects",
  "contact",
  "ls",
  "time",
];

export default function ConsoleInput() {
  const { handleCommand } = useConsole();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Focus the input when clicking anywhere on the page
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Handle key down events
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Enter key - execute command
    if (e.key === "Enter") {
      handleCommand(input.trim().toLowerCase());
      setInput("");
    }
    // Tab key - autocomplete
    else if (e.key === "Tab") {
      e.preventDefault(); // Prevent focus change

      if (input.length > 0) {
        // Find matching commands
        const matchingCommands = AVAILABLE_COMMANDS.filter((command) =>
          command.toLowerCase().startsWith(input.toLowerCase())
        );

        if (matchingCommands.length === 1) {
          // If there's only one match, use it
          setInput(matchingCommands[0]);
        } else if (matchingCommands.length > 1) {
          // Find common prefix among all matching commands
          const firstCommand = matchingCommands[0];
          let commonPrefix = "";

          for (let i = 0; i < firstCommand.length; i++) {
            const char = firstCommand[i];
            let allMatch = true;

            for (let j = 1; j < matchingCommands.length; j++) {
              if (matchingCommands[j][i] !== char) {
                allMatch = false;
                break;
              }
            }

            if (allMatch) {
              commonPrefix += char;
            } else {
              break;
            }
          }

          if (commonPrefix.length > input.length) {
            setInput(commonPrefix);
          }
          // If no common prefix beyond what's already typed, cycle through options
          else if (matchingCommands.length > 0) {
            // Find the current command in the matching commands
            const currentIndex = matchingCommands.findIndex(
              (cmd) => cmd.toLowerCase() === input.toLowerCase()
            );

            // Move to the next command in the list (or back to the first)
            const nextIndex =
              currentIndex === -1 ||
              currentIndex === matchingCommands.length - 1
                ? 0
                : currentIndex + 1;

            setInput(matchingCommands[nextIndex]);
          }
        }
      }
    }
  };

  return (
    <div className="console-input-container">
      <span className="console-prompt">{">"}</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="console-input"
        aria-label="Console input"
        autoComplete="off"
        spellCheck="false"
      />
    </div>
  );
}
