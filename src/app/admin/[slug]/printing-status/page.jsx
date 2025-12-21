"use client";

import { useEffect, useState } from "react";

export default function PrintingStatusPage() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetch("/api/admin/printing-status")
      .then((res) => res.json())
      .then(setStores);

    // Atualização em tempo real com WebSocket
    const ws = new WebSocket(
      `ws://${window.location.host}/api/printing/ws-admin`,
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "status_update") {
        setStores(data.stores);
      }
    };
  }, []);

  return (
    <div>
      <h1>Status de Impressão - Todas as Lojas</h1>
      <table>
        <thead>
          <tr>
            <th>Loja</th>
            <th>Status</th>
            <th>Última Impressão</th>
            <th>Versão Agent</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.restaurantId}>
              <td>{store.restaurantName}</td>
              <td>
                <span
                  className={`status-dot ${store.connected ? "online" : "offline"}`}
                >
                  {store.connected ? "✅ Online" : "❌ Offline"}
                </span>
              </td>
              <td>
                {store.lastPrintedAt
                  ? new Date(store.lastPrintedAt).toLocaleString()
                  : "Nunca"}
              </td>
              <td>{store.agentVersion || "Desconhecida"}</td>
              <td>
                <button onClick={() => testPrint(store.restaurantId)}>
                  Testar Impressão
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
