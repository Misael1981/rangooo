"use client";

import { useState } from "react";
import Link from "next/link";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

type TermsAcceptanceProps = {
  onAccept: () => void;
};

const TermsAcceptance = ({ onAccept }: TermsAcceptanceProps) => {
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
            className="border border-primary"
            checked={accepted}
            onCheckedChange={handleAccept}
          />
        </div>
        <div>
          <Label htmlFor="terms" className="text-sm leading-relaxed inline">
            {/* Removi o inline-block daqui e do link */}
            <span>Concordo com os </span>
            <Link
              href="/termos-de-uso"
              className="font-medium text-primary hover:underline"
              target="_blank"
            >
              Termos de Uso e Política de Privacidade
            </Link>
            <span>
              . Entendo que meus dados serão utilizados apenas para processar
              meu pedido e melhorar minha experiência.
            </span>
          </Label>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Seus dados estão seguros. Não compartilhamos informações com terceiros.
      </p>
    </div>
  );
};

export default TermsAcceptance;
