// admin/[slug]/components/PrintWSWrapper.tsx
"use client";

import { usePrintWS } from "@/hooks/usePrintWS";

export default function PrintWSWrapper({ printingToken }) {
  usePrintWS({ printingToken });
  return null;
}
