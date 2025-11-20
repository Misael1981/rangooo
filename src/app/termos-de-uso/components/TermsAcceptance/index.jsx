"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const TermsAcceptance = ({ onAccept }) => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    onAccept();
  };

  return (
    <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
      <div className="flex items-start gap-2">
        <div className="pt-1">
          <Checkbox
            id="terms"
            checked={accepted}
            onCheckedChange={handleAccept}
          />
        </div>
        <Label htmlFor="terms" className="text-sm leading-relaxed">
          Concordo com os{" "}
          <Link
            href="/termos-de-uso"
            className="font-medium text-primary hover:underline"
            target="_blank"
          >
            Termos de Uso e Política de Privacidade
          </Link>
          . Entendo que meus dados serão utilizados apenas para processar meu
          pedido e melhorar minha experiência.
        </Label>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Seus dados estão seguros. Não compartilhamos informações com terceiros.
      </p>
    </div>
  );
};

export default TermsAcceptance;
