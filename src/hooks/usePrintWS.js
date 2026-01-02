"use client";

import { connectPrintWS, disconnectPrintWS } from "@/lib/printing/client";
import { useEffect } from "react";

export function usePrintWS({ printingToken }) {
  useEffect(() => {
    if (!printingToken) {
      console.log("ℹ️ WS não iniciado: restaurante sem token");
      return;
    }

    connectPrintWS({
      serverUrl: process.env.NEXT_PUBLIC_SAAS_WS_URL,
      token: printingToken,
    });

    return () => {
      disconnectPrintWS();
    };
  }, [printingToken]);
}
