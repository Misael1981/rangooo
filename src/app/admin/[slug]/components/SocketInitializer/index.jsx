"use client";

import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

export default function SocketInitializer() {
  useEffect(() => {
    fetch("/api/socket")
      .then(() => {
        console.log("🔌 Socket.IO garantido");
      })
      .catch((err) => {
        console.error("❌ Erro ao iniciar Socket.IO", err);
      });
  }, []);

  return (
    <div>
      <Badge>Socket.IO conectado</Badge>
    </div>
  );
}
