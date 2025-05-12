"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ConsoleInput from "./ConsoleInput";
import ConsoleOutput from "./ConsoleOutput";
import TitleBar from "./TitleBar";
import { useConsole } from "@/context/ConsoleContext";

export default function Console() {
  const {
    output,
    isMinimized,
    setIsMinimized,
    isClosed,
    setIsClosed,
    resetOutput,
    handleCommand,
  } = useConsole();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaximizeState, setPreMaximizeState] = useState({
    position: { x: 0, y: 0 },
    size: { width: 800, height: 600 },
  });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const consoleRef = useRef<HTMLDivElement>(null);

  // Minimum size constraints
  const MIN_WIDTH = 400;
  const MIN_HEIGHT = 300;

  const TASKBAR_HEIGHT = 30; // Height of the Windows 95 taskbar

  // Handle minimize functionality
  const handleMinimize = () => {
    // Toggle minimized state in context
    setIsMinimized(!isMinimized);
  };

  // Handle close functionality
  const handleClose = () => {
    // Reset the output before closing
    resetOutput();
    // Set closed state to true
    setIsClosed(true);
  };

  // Handle maximize functionality
  const handleMaximize = () => {
    if (isMaximized) {
      // Restore from maximized state
      setIsMaximized(false);

      // Get the restored position and size
      const restoredPosition = preMaximizeState.position;
      const restoredSize = preMaximizeState.size;

      // Make sure the restored window is within screen boundaries
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Adjust position if needed
      const newX = Math.max(
        0,
        Math.min(restoredPosition.x, windowWidth - restoredSize.width)
      );
      const newY = Math.max(
        0,
        Math.min(restoredPosition.y, windowHeight - restoredSize.height)
      );

      // If the window size is larger than the screen, adjust it
      const newWidth = Math.min(restoredSize.width, windowWidth);
      const newHeight = Math.min(restoredSize.height, windowHeight);

      setPosition({ x: newX, y: newY });
      setSize({ width: newWidth, height: newHeight });
    } else {
      // Save current state before maximizing
      setPreMaximizeState({
        position: { x: position.x, y: position.y },
        size: { width: size.width, height: size.height },
      });

      // Maximize the window to fill the screen, accounting for taskbar height
      setIsMaximized(true);
      setPosition({ x: 0, y: 0 });
      setSize({
        width: window.innerWidth,
        height: window.innerHeight - TASKBAR_HEIGHT,
      });
    }
  };

  // Center the console when it first loads - only once
  useEffect(() => {
    // Use a small timeout to ensure the component is fully rendered
    const timer = setTimeout(() => {
      if (consoleRef.current) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Calculate center position
        const centerX = (windowWidth - size.width) / 2;
        const centerY = (windowHeight - size.height) / 2;

        setPosition({ x: centerX, y: centerY });
      }
    }, 100); // Small delay to ensure accurate measurements

    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this effect runs once after initial render

  // Initiate "home" command when the component mounts - only once
  const initialRenderRef = useRef(true);
  useEffect(() => {
    if (initialRenderRef.current) {
      // Execute the home command on initial mount only
      handleCommand("home");
      initialRenderRef.current = false;
    }
  }, [handleCommand]); // Include handleCommand in dependencies, but use ref to ensure it only runs once

  // Resize direction types
  type ResizeDirection =
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | null;

  const [resizeDirection, setResizeDirection] = useState<ResizeDirection>(null);

  // Handle the start of resizing
  const handleResizeStart =
    (direction: ResizeDirection) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (consoleRef.current) {
        setResizeStart({
          x: e.clientX,
          y: e.clientY,
          width: size.width,
          height: size.height,
        });
        setResizeDirection(direction);
        setIsResizing(true);
      }
    };

  // Function to ensure console stays within screen boundaries
  const ensureWithinBoundaries = useCallback(() => {
    if (consoleRef.current) {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Calculate new position that's within boundaries
      let newX = position.x;
      let newY = position.y;

      // Restrict to screen boundaries
      newX = Math.max(0, Math.min(newX, windowWidth - size.width));
      newY = Math.max(0, Math.min(newY, windowHeight - size.height));

      if (newX !== position.x || newY !== position.y) {
        setPosition({ x: newX, y: newY });
      }
    }
  }, [position, size, consoleRef]);

  // Handle mouse movement during resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing && resizeDirection) {
        let newWidth = size.width;
        let newHeight = size.height;
        let newX = position.x;
        let newY = position.y;

        // Handle resizing based on direction
        if (resizeDirection.includes("right")) {
          newWidth = resizeStart.width + (e.clientX - resizeStart.x);
        }

        if (resizeDirection.includes("bottom")) {
          newHeight = resizeStart.height + (e.clientY - resizeStart.y);
        }

        if (resizeDirection.includes("left")) {
          const deltaX = resizeStart.x - e.clientX;
          newWidth = resizeStart.width + deltaX;
          if (newWidth >= MIN_WIDTH) {
            newX = resizeStart.x - deltaX;
          } else {
            newWidth = MIN_WIDTH;
          }
        }

        if (resizeDirection.includes("top")) {
          const deltaY = resizeStart.y - e.clientY;
          newHeight = resizeStart.height + deltaY;
          if (newHeight >= MIN_HEIGHT) {
            newY = resizeStart.y - deltaY;
          } else {
            newHeight = MIN_HEIGHT;
          }
        }

        // Apply minimum size constraints
        newWidth = Math.max(MIN_WIDTH, newWidth);
        newHeight = Math.max(MIN_HEIGHT, newHeight);

        // Ensure the window doesn't exceed screen boundaries
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        if (newX < 0) {
          const offset = -newX;
          newX = 0;
          newWidth -= offset;
        }

        if (newY < 0) {
          const offset = -newY;
          newY = 0;
          newHeight -= offset;
        }

        if (newX + newWidth > windowWidth) {
          newWidth = windowWidth - newX;
        }

        if (newY + newHeight > windowHeight) {
          newHeight = windowHeight - newY;
        }

        // Update size and position
        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeDirection(null);
    };

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      // Change cursor during resize based on direction
      if (resizeDirection) {
        let cursor = "default";
        switch (resizeDirection) {
          case "top":
          case "bottom":
            cursor = "ns-resize";
            break;
          case "left":
          case "right":
            cursor = "ew-resize";
            break;
          case "top-left":
          case "bottom-right":
            cursor = "nwse-resize";
            break;
          case "top-right":
          case "bottom-left":
            cursor = "nesw-resize";
            break;
        }
        document.body.style.cursor = cursor;
      }
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      // Reset cursor
      document.body.style.cursor = "default";
    };
  }, [
    isResizing,
    resizeDirection,
    resizeStart,
    position,
    size,
    MIN_WIDTH,
    MIN_HEIGHT,
  ]);

  // Handle window resize to keep console within boundaries
  useEffect(() => {
    const handleResize = () => {
      ensureWithinBoundaries();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ensureWithinBoundaries]);

  // Handle the start of dragging
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    // Don't allow dragging when maximized
    if (isMaximized) return;

    if (consoleRef.current) {
      const rect = consoleRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  // Handle mouse movement during dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && consoleRef.current) {
        const rect = consoleRef.current.getBoundingClientRect();

        // Calculate new position
        let newX = e.clientX - dragOffset.x;
        let newY = e.clientY - dragOffset.y;

        // Get window dimensions
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Restrict to screen boundaries
        newX = Math.max(0, Math.min(newX, windowWidth - rect.width));
        newY = Math.max(
          0,
          Math.min(newY, windowHeight - rect.height - TASKBAR_HEIGHT)
        );

        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Don't render anything if minimized or closed
  if (isMinimized || isClosed) {
    return null;
  }

  return (
    <div
      ref={consoleRef}
      className={`win95-window ${isMaximized ? "maximized" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        cursor: isDragging ? "grabbing" : "default",
      }}
    >
      <TitleBar
        title="Console"
        onDragStart={handleDragStart}
        onMinimize={handleMinimize}
        onMaximize={handleMaximize}
        onClose={handleClose}
        isMaximized={isMaximized}
      />
      <div className="console-container">
        <ConsoleOutput output={output} />
        <ConsoleInput />
      </div>

      {/* Resize handles for all sides and corners - hidden when maximized */}
      {!isMaximized && (
        <>
          <div
            className="win95-resize-handle top"
            onMouseDown={handleResizeStart("top")}
          />
          <div
            className="win95-resize-handle right"
            onMouseDown={handleResizeStart("right")}
          />
          <div
            className="win95-resize-handle bottom"
            onMouseDown={handleResizeStart("bottom")}
          />
          <div
            className="win95-resize-handle left"
            onMouseDown={handleResizeStart("left")}
          />
          <div
            className="win95-resize-handle top-left"
            onMouseDown={handleResizeStart("top-left")}
          />
          <div
            className="win95-resize-handle top-right"
            onMouseDown={handleResizeStart("top-right")}
          />
          <div
            className="win95-resize-handle bottom-left"
            onMouseDown={handleResizeStart("bottom-left")}
          />
          <div
            className="win95-resize-handle bottom-right"
            onMouseDown={handleResizeStart("bottom-right")}
          />
        </>
      )}
    </div>
  );
}
