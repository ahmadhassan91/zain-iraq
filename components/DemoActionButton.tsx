"use client";

import { useState } from "react";

export function DemoActionButton({
  children,
  className = "btn",
  message,
  ...buttonProps
}: {
  children: React.ReactNode;
  className?: string;
  message: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [done, setDone] = useState(false);

  return (
    <button {...buttonProps} className={className} onClick={() => setDone(true)}>
      {done ? message : children}
    </button>
  );
}
