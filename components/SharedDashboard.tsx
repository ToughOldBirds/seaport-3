"use client";

import { useMemo, useState } from "react";
import { EnvironmentGate } from "@/components/EnvironmentGate";
import { BrowserToolbar, WordToolbar } from "@/components/Toolbars";
import { TaskpaneDialogActions } from "@/components/TaskpaneDialogActions";
import { fetchWithSharedAuth } from "@/lib/backend";
import { readSession, signInDemoUser, signOut } from "@/lib/auth";
import { useOffice } from "@/office/OfficeContext";

type SharedDashboardProps = {
  experience: "browser" | "taskpane";
};

export function SharedDashboard({ experience }: SharedDashboardProps) {
  const { isWord, isOfficeHost } = useOffice();
  const [data, setData] = useState<string>("No backend call yet.");
  const [authStamp, setAuthStamp] = useState(0);

  const session = useMemo(() => readSession(), [authStamp]);

  const handleSignIn = () => {
    signInDemoUser();
    setAuthStamp(Date.now());
  };

  const handleSignOut = () => {
    signOut();
    setAuthStamp(Date.now());
  };

  const handleBackendCall = async () => {
    if (!session) {
      setData("Sign in first to call the backend.");
      return;
    }

    const payload = await fetchWithSharedAuth("/api/me", session);
    setData(JSON.stringify(payload, null, 2));
  };

  return (
    <EnvironmentGate>
      <main>
        <h1>Shared Next.js experience</h1>
        <p>
          Experience: <strong>{experience}</strong> | Host: <strong>{isOfficeHost ? "Office" : "Browser"}</strong>
        </p>
        <div className="card">
          <p>
            This setup serves a single URL for website routes and Office add-in taskpane routes, while reusing
            authentication + backend access logic.
          </p>
          {isWord ? <WordToolbar /> : <BrowserToolbar />}
        </div>

        <div className="card">
          <h2>Shared authentication</h2>
          <p>Current user: {session?.user.email ?? "Anonymous"}</p>
          <button onClick={handleSignIn}>Sign in demo user</button>
          <button className="secondary" onClick={handleSignOut}>
            Sign out
          </button>
        </div>

        <div className="card">
          <h2>Shared backend pattern</h2>
          <button onClick={handleBackendCall}>Call /api/me</button>
          <pre>{data}</pre>
        </div>

        {experience === "taskpane" ? <TaskpaneDialogActions /> : null}
      </main>
    </EnvironmentGate>
  );
}
