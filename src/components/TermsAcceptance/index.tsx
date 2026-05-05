"use client"

import { useState } from "react"
import Link from "next/link"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"

type TermsAcceptanceProps = {
  onAccept: () => void
}

const TermsAcceptance = ({ onAccept }: TermsAcceptanceProps) => {
  const [accepted, setAccepted] = useState(false)

  const handleAccept = () => {
    setAccepted(true)
    onAccept()
  }

  return (
    <div className="bg-muted/30 space-y-4 rounded-lg border p-4">
      <div className="flex items-start gap-2">
        <div className="pt-1">
          <Checkbox
            id="terms"
            className="border-primary border"
            checked={accepted}
            onCheckedChange={handleAccept}
          />
        </div>
        <div>
          <Label htmlFor="terms" className="inline text-sm leading-relaxed">
            {/* Removi o inline-block daqui e do link */}
            <span>Concordo com os </span>
            <Link
              href="/termos-de-uso"
              className="text-primary font-medium hover:underline"
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

      <p className="text-muted-foreground text-center text-xs">
        Seus dados estão seguros. Não compartilhamos informações com terceiros.
      </p>
    </div>
  )
}

export default TermsAcceptance
