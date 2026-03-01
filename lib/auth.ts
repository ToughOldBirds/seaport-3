"use client";

export type Session = {
  accessToken: string;
  user: { id: string; email: string };
};

const SESSION_KEY = "shared_session";

export function readSession(): Session | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function signInDemoUser(): Session {
  const session: Session = {
    accessToken: "demo-token",
    user: { id: "1", email: "word-web-shared@example.com" }
  };

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function signOut() {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(SESSION_KEY);
}
