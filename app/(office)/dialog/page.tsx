"use client";

import { useState } from "react";

export default function DialogPage() {
  const [message, setMessage] = useState("Dialog response from shared Next.js URL");

  const closeDialog = () => {
    if (typeof Office !== "undefined" && Office.context?.ui?.messageParent) {
      Office.context.ui.messageParent(message);
      return;
    }

    window.close();
  };

  return (
    <main>
      <h1>Taskpane dialog</h1>
      <p>This page can be hosted as an Office modal dialog or a normal browser popup.</p>
      <div className="card">
        <label htmlFor="dialog-message">Message to parent</label>
        <input
          id="dialog-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          style={{ display: "block", margin: "0.5rem 0 1rem", width: "100%", padding: "0.5rem" }}
        />
        <button onClick={closeDialog}>Send message</button>
      </div>
    </main>
  );
}
