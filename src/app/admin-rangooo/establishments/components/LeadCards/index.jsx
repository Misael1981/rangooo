"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar1Icon,
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  Phone,
  XCircle,
} from "lucide-react";

const LeadCards = ({ leads }) => {
  const [loadingId, setLoadingId] = useState(null);
  const handleApprove = async (id) => {
    setLoadingId(id);
    try {
      const res = await fetch("/api/leads/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Erro ao aprovar");
      const token = json?.invite?.token;
      const link = token
        ? `/sobre/cadastro/novo-cadastro?token=${token}`
        : null;
      toast.success(link ? "Convite gerado" : "Lead aprovado");
    } catch (e) {
      toast.error("Erro ao aprovar");
    } finally {
      setLoadingId(null);
    }
  };
  const getStatusBadge = (leadStatus) => {
    const statusConfig = {
      PENDING: { variant: "secondary", icon: Clock, label: "Pendente" },
      APPROVED: { variant: "default", icon: CheckCircle, label: "Aprovado" },
      REJECTED: { variant: "destructive", icon: XCircle, label: "Rejeitado" },
    };

    const config = statusConfig[leadStatus] || statusConfig.PENDING;
    const IconComponent = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <IconComponent className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Solicitações de Cadastro
        </h2>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-blue-50">
            Total: 10
          </Badge>
          <Badge variant="outline" className="bg-amber-50">
            Pendentes:{" "}
            {leads.filter((lead) => lead.status === "PENDING").length}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {leads.map((lead) => (
          <Card
            key={lead.id}
            className="border border-gray-200 transition-shadow hover:shadow-md"
          >
            <CardContent className="p-6">
              {/* Header com nome e status */}
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {lead.restaurantName}
                  </h3>
                  <p className="text-sm text-gray-600">{lead.name}</p>
                </div>
                {getStatusBadge(lead.status)}
              </div>

              {/* Informações de contato */}
              <div className="mb-4 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">{lead.email}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">{lead.phone}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">
                    {lead.city} - {lead.state}
                  </span>
                </div>
              </div>

              {/* Observações */}
              {lead.notes && (
                <div className="mb-4">
                  <p className="mb-1 text-xs text-gray-500">Observações:</p>
                  <p className="rounded bg-gray-50 p-2 text-sm text-gray-700">
                    {lead.notes}
                  </p>
                </div>
              )}

              {/* Data e ações */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar1Icon className="h-3 w-3" />
                  {formatDate(lead.createdAt)}
                </div>

                <div className="flex gap-2">
                  {lead.status === "PENDING" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onReject?.(lead.id)}
                        className="h-8 text-xs"
                      >
                        Recusar
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleApprove(lead.id)}
                        className="h-8 text-xs"
                        disabled={loadingId === lead.id}
                      >
                        {loadingId === lead.id ? "Aprovando..." : "Aprovar"}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {leads.length === 0 && (
        <Card className="border border-dashed border-gray-300">
          <CardContent className="p-12 text-center">
            <div className="mb-2 text-gray-400">
              <Mail className="mx-auto h-12 w-12" />
            </div>
            <h3 className="mb-1 text-lg font-medium text-gray-900">
              Nenhuma solicitação encontrada
            </h3>
            <p className="text-sm text-gray-500">
              Todas as solicitações de cadastro foram processadas.
            </p>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default LeadCards;
