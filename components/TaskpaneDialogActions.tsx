"use client";

export function TaskpaneDialogActions() {
  const launchDialog = () => {
    const url = `${window.location.origin}/dialog`;

    if (typeof Office !== "undefined" && Office.context?.ui?.displayDialogAsync) {
      Office.context.ui.displayDialogAsync(url, { height: 45, width: 35, displayInIframe: true });
      return;
    }

    window.open(url, "_blank", "width=600,height=700");
  };

  return (
    <section className="card">
      <h2>Taskpane dialog</h2>
      <p>Uses Office modal dialogs in Word and popup fallback in a normal browser.</p>
      <button onClick={launchDialog}>Open shared dialog page</button>
    </section>
  );
}
