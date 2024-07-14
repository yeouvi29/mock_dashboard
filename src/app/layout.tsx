import type { Metadata } from "next";
import { lato } from "@/styles/fonts";

import "./globals.css";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

if (process.env.NODE_ENV !== "production") {
  const ignoredWarnings = [
    "data-new-gr-c-s-check-loaded",
    "data-gr-ext-installed",
  ];
  const consoleWarn = console.warn;
  console.warn = (...args) => {
    const warnMessage = args[0];
    const isIgnoredWarning = ignoredWarnings.some((e) =>
      warnMessage.includes(e)
    );
    if (!isIgnoredWarning) {
      consoleWarn(...args);
    }
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(lato.className, "bg-white")}>
        {children}
        <div id="modal-root" />
      </body>
    </html>
  );
}
