"use client";

import { useState } from "react";

export function DemoActionButton({
  children,
  className = "btn",
  message
}: {
  children: React.ReactNode;
  className?: string;
  message: string;
}) {
  const [done, setDone] = useState(false);

  return (
    <button className={className} onClick={() => setDone(true)}>
      {done ? message : children}
    </button>
  );
}
