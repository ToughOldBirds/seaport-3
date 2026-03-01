export {};

declare global {
  interface OfficeInfo {
    host: string;
  }

  interface OfficeUI {
    displayDialogAsync: (
      startAddress: string,
      options: { height: number; width: number; displayInIframe?: boolean },
      callback?: (asyncResult: { status: string; value?: unknown; error?: { message: string } }) => void
    ) => void;
    messageParent: (message: string) => void;
  }

  interface OfficeContext {
    ui?: OfficeUI;
  }

  interface OfficeRuntime {
    HostType: { Word: string };
    context?: OfficeContext;
    onReady: (callback: (info: OfficeInfo) => void) => void;
  }

  var Office: OfficeRuntime;
  var Word: unknown;
}
