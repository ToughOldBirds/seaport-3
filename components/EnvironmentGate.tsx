"use client";

import { useOffice } from "@/office/OfficeContext";

export function EnvironmentGate({ children }: { children: React.ReactNode }) {
  const { isReady } = useOffice();

  if (!isReady) {
    return <main>Loading environment...</main>;
  }

  return <>{children}</>;
}
