// components/account-settings-accordion.jsx
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NotebookText } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AccountSettingsAccordion = () => {
  const { data: session, update } = useSession();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Estados do formulário
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/users");
        if (res.ok) {
          const data = await res.json();
          setUserData(data.user);

          // Preenche o formulário
          setName(data.user.name || "");
          setPhone(data.user.phone || "");
          setAddress({
            street: data.user.address?.street || "",
            number: data.user.address?.number || "",
            complement: data.user.address?.complement || "",
            neighborhood: data.user.address?.neighborhood || "",
            city: data.user.address?.city || "",
            state: data.user.address?.state || "",
            zipCode: data.user.address?.zipCode || "",
          });
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        toast.error("Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchUserData();
    }
  }, [session]);

  const onUpdate = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, address }),
      });

      if (res.ok) {
        const data = await res.json();

        // Atualiza a session com os novos dados
        await update({
          ...session,
          user: {
            ...session.user,
            name: data.user.name,
            phone: data.user.phone,
          },
        });

        toast.success("Dados atualizados com sucesso!");
      } else {
        const error = await res.json();
        toast.error(error.error || "Falha ao salvar dados");
      }
    } catch (e) {
      console.error("Erro ao salvar:", e);
      toast.error("Erro ao salvar dados");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Carregando dados...</div>;
  }

  if (!userData) {
    return <div>Erro ao carregar dados do usuário</div>;
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <NotebookText className="text-orange-500" />
            Meus Dados
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2 p-1">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="space-y-2 p-1">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="col-span-2 space-y-2 p-1">
              <Label htmlFor="street">Rua</Label>
              <Input
                id="street"
                value={address.street}
                onChange={(e) => onUpdate("street", e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="space-y-2 p-1">
              <Label htmlFor="number">Número</Label>
              <Input
                id="number"
                value={address.number}
                onChange={(e) => onUpdate("number", e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="space-y-2 p-1">
              <Label htmlFor="complement">Complemento</Label>
              <Input
                id="complement"
                value={address.complement}
                onChange={(e) => onUpdate("complement", e.target.value)}
                autoComplete="off"
                placeholder="Opcional"
              />
            </div>

            <div className="space-y-2 p-1">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                value={address.neighborhood}
                onChange={(e) => onUpdate("neighborhood", e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="space-y-2 p-1">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={address.city}
                onChange={(e) => onUpdate("city", e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="space-y-2 p-1">
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                value={address.state}
                onChange={(e) => onUpdate("state", e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Salvando..." : "Salvar alterações"}
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccountSettingsAccordion;
