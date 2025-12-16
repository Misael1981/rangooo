"use client";

import { useEffect, useState, useRef } from "react"; // Adicionei useRef
import { io } from "socket.io-client";

const PrintButton = ({ restaurantId }) => {
  // Receba o ID por props para ser dinâmico
  const [status, setStatus] = useState("Desconectado");
  const socketRef = useRef(null); // Usamos useRef para guardar o socket entre renderizações

  useEffect(() => {
    // 1. Inicializa a rota da API do socket
    fetch("/api/socket");

    // 2. Conecta
    socketRef.current = io({
      path: "/api/socket", // O path que configuramos na API
      addTrailingSlash: false,
      query: { restaurantId: restaurantId || "restaurante_01" },
    });

    socketRef.current.on("connect", () => setStatus("Conectado ao Servidor"));
    socketRef.current.on("disconnect", () => setStatus("Desconectado"));

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [restaurantId]);

  const enviarTesteImpressao = () => {
    if (!socketRef.current || !socketRef.current.connected) {
      alert("Socket não está conectado ainda!");
      return;
    }

    const pedidoFake = {
      id: Math.floor(Math.random() * 1000),
      cliente_nome: "Mano IA Simulator",
      total: "99,90",
      itens: [
        { qtd: 2, nome: "Pizza de Código", preco: "50,00" },
        { qtd: 1, nome: "Suco de Debug", preco: "10,00" },
      ],
    };

    io.on("connection", (socket) => {
      const { restaurantId } = socket.handshake.query;
      console.log(`📡 Agente conectado na sala: ${restaurantId}`);
      socket.join(restaurantId);

      // LOG DE TESTE AQUI
      socket.on("print_test", (data) => {
        console.log("📩 RECEBI 'print_test' DO BROWSER!"); // <--- Se esse log NÃO aparecer no terminal do VS Code (Next.js), o erro é no BOTÃO.
        console.log("📤 REPASSANDO PARA A SALA:", restaurantId);

        io.to(restaurantId).emit("print_test", data);
      });
    });

    // Agora o socketRef.current está acessível aqui!
    socketRef.current.emit("print_test", pedidoFake);
    alert("Sinal enviado! Olha o terminal do seu Agente Node!");
  };

  return (
    <div className="mt-4 rounded-lg border bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold">Automação de Impressão</h2>
      <p className="mb-4 text-sm text-gray-600">
        Status:{" "}
        <span
          className={
            status === "Conectado ao Servidor"
              ? "font-bold text-green-600"
              : "text-red-600"
          }
        >
          {status}
        </span>
      </p>

      <button
        onClick={enviarTesteImpressao}
        className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
      >
        🚀 Disparar Impressão de Teste
      </button>
    </div>
  );
};

export default PrintButton;
