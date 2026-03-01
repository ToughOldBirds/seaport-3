"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type OfficeState = {
  isOfficeHost: boolean;
  isWord: boolean;
  isReady: boolean;
};

const OfficeContext = createContext<OfficeState>({
  isOfficeHost: false,
  isWord: false,
  isReady: false
});

export const OfficeProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<OfficeState>({
    isOfficeHost: false,
    isWord: false,
    isReady: false
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (typeof Office === "undefined") {
      setState({ isOfficeHost: false, isWord: false, isReady: true });
      return;
    }

    let resolved = false;

    Office.onReady((info) => {
      resolved = true;
      setState({
        isOfficeHost: true,
        isWord: info.host === Office.HostType.Word,
        isReady: true
      });
    });

    const timeoutId = window.setTimeout(() => {
      if (!resolved) {
        setState({ isOfficeHost: false, isWord: false, isReady: true });
      }
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const value = useMemo(() => state, [state]);

  return <OfficeContext.Provider value={value}>{children}</OfficeContext.Provider>;
};

export const useOffice = () => useContext(OfficeContext);
