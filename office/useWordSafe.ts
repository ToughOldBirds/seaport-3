"use client";

import { useOffice } from "@/office/OfficeContext";

export function useWordSafe() {
  const { isReady, isWord } = useOffice();

  if (!isReady) {
    throw new Error("Office not ready yet");
  }

  if (!isWord) {
    throw new Error("Not running inside Word");
  }

  return Word;
}
