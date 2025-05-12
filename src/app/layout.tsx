import "./globals.css";
import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import Taskbar from "@/components/Taskbar";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio Console",
  description: "A Windows 95-style terminal portfolio with console interface",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={vt323.variable}>
        <div className="overlay"></div>
        <div className="desktop-container">
          <div className="terminal">{children}</div>
          <Taskbar />
        </div>
      </body>
    </html>
  );
}
