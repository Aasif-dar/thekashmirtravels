"use client";

import { createContext, useContext, type ReactNode } from "react";

const DemoContext = createContext(false);

/** Lets client-side admin components (image upload) know demo mode is on. */
export function DemoProvider({
  demo,
  children,
}: {
  demo: boolean;
  children: ReactNode;
}) {
  return <DemoContext.Provider value={demo}>{children}</DemoContext.Provider>;
}

export const useDemo = () => useContext(DemoContext);
