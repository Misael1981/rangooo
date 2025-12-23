"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";
import { toast } from "sonner"; // ou use seu toast favorito
import { connectPrintWS, disconnectPrintWS } from "@/lib/print-ws-client";

const StatusOpenSwitch = ({
  initialIsOpen, // ← Recebe do server
  restaurantId,
  restaurantSlug,
  printingToken,
}) => {
  // Estado local que começa com o valor do server
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [isUpdating, setIsUpdating] = useState(false);

  // Sincroniza se o prop mudar (raro, mas seguro)
  useEffect(() => {
    setIsOpen(initialIsOpen);
  }, [initialIsOpen]);

  // Função para atualizar no banco
  const handleToggle = async (newStatus) => {
    setIsUpdating(true);

    try {
      const response = await fetch(`/api/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: restaurantId,
          isOpen: newStatus,
          slug: restaurantSlug,
        }),
      });

      if (response.ok) {
        setIsOpen(newStatus);

        if (newStatus) {
          //  ABRIU → conecta WS
          connectPrintWS({
            serverUrl: process.env.NEXT_PUBLIC_PRINT_WS,
            token: printingToken,
          });
        } else {
          //  FECHOU → desconecta WS
          disconnectPrintWS();
        }

        toast.success(
          newStatus
            ? "Estabelecimento aberto com sucesso!"
            : "Estabelecimento fechado com sucesso!",
        );

        // Atualiza outras partes da UI se necessário
        window.dispatchEvent(
          new CustomEvent("restaurant-status-changed", {
            detail: { isOpen: newStatus },
          }),
        );
      } else {
        throw new Error("Erro ao atualizar");
      }
    } catch (error) {
      console.error("Erro:", error);
      toast.error("❌ Erro ao atualizar status");
      // Reverte o estado local em caso de erro
      setIsOpen(!newStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      connectPrintWS({
        serverUrl: process.env.NEXT_PUBLIC_PRINT_WS,
        token: printingToken,
      });
    }

    return () => {
      disconnectPrintWS();
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-4 shadow-sm">
      <div className="mb-1 text-center">
        <h3 className="text-sm font-semibold text-gray-900">
          Status do Estabelecimento
        </h3>
        <p className="text-xs text-gray-500">
          {isOpen
            ? "Seu estabelecimento está visível e aceitando pedidos"
            : "Seu estabelecimento está temporariamente fechado"}
        </p>
      </div>

      <div className="relative flex items-center gap-4">
        {/* Fechado */}
        <div
          className={`flex items-center gap-2 transition-all duration-300 ${
            !isOpen ? "scale-110" : "scale-100 opacity-70"
          }`}
        >
          <div className="flex flex-col items-center">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
                !isOpen
                  ? "border-2 border-red-300 bg-red-100 shadow-md"
                  : "border border-gray-200 bg-gray-100"
              }`}
            >
              <Moon
                className={`h-5 w-5 transition-colors duration-300 ${
                  !isOpen ? "text-red-600" : "text-gray-400"
                }`}
              />
            </div>
            <span
              className={`mt-1 text-xs font-medium transition-colors duration-300 ${
                !isOpen ? "text-red-700" : "text-gray-500"
              }`}
            >
              Fechado
            </span>
          </div>
        </div>

        {/* Switch */}
        <div className="relative">
          <Switch
            checked={isOpen}
            disabled={isUpdating}
            onCheckedChange={handleToggle}
            className={`h-8 w-14 ${isUpdating ? "cursor-not-allowed opacity-50" : ""} data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500`}
          />
          {isUpdating && (
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 transform">
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>

        {/* Aberto */}
        <div
          className={`flex items-center gap-2 transition-all duration-300 ${
            isOpen ? "scale-110" : "scale-100 opacity-70"
          }`}
        >
          <div className="flex flex-col items-center">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
                isOpen
                  ? "border-2 border-green-300 bg-green-100 shadow-md"
                  : "border border-gray-200 bg-gray-100"
              }`}
            >
              <Sun
                className={`h-5 w-5 transition-colors duration-300 ${
                  isOpen ? "text-green-600" : "text-gray-400"
                }`}
              />
            </div>
            <span
              className={`mt-1 text-xs font-medium transition-colors duration-300 ${
                isOpen ? "text-green-700" : "text-gray-500"
              }`}
            >
              Aberto
            </span>
          </div>
        </div>
      </div>

      {/* Badge de status */}
      <div
        className={`mt-3 rounded-full px-4 py-1.5 transition-all duration-300 ${
          isOpen
            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md"
            : "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md"
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 animate-pulse rounded-full ${
              isOpen ? "bg-white" : "bg-white"
            }`}
          />
          <span className="text-sm font-semibold">
            {isOpen
              ? `ACEITANDO PEDIDOS ${isUpdating ? "(Atualizando...)" : ""}`
              : `PEDIDOS PAUSADOS ${isUpdating ? "(Atualizando...)" : ""}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatusOpenSwitch;
