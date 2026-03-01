"use client";

import { Session } from "@/lib/auth";

export async function fetchWithSharedAuth(path: string, session: Session) {
  const response = await fetch(path, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      "Content-Type": "application/json"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Backend call failed (${response.status})`);
  }

  return response.json();
}
