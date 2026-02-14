import TermsAcceptance from "@/components/TermsAcceptance";
import { Button } from "@/components/ui/button";
import { UserLock } from "lucide-react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

type CardLoginProps = {
  termsAccepted: boolean;
  onAcceptTerms: () => void;
  onLogin: (provider: "google" | "facebook") => void;
};

const CardLogin = ({
  termsAccepted,
  onAcceptTerms,
  onLogin,
}: CardLoginProps) => {
  return (
    <div className="space-y-5 rounded-xl border bg-muted/40 p-6 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <UserLock className="text-primary" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">
          Entre para finalizar seu pedido
        </h3>

        <p className="text-sm text-muted-foreground">
          Para pedidos de entrega, precisamos que você esteja logado e tenha um
          endereço cadastrado.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          className={`gap-2 bg-[#d64131] text-white hover:bg-[#c0392b] ${
            !termsAccepted && "cursor-not-allowed opacity-50"
          }`}
          aria-disabled={!termsAccepted}
          onClick={() => onLogin("google")}
        >
          <FaGoogle />
          Entrar com Google
        </Button>

        <Button
          className={`gap-2 bg-[#1877F2] text-white hover:bg-[#166FE5] ${
            !termsAccepted && "cursor-not-allowed opacity-50"
          }`}
          aria-disabled={!termsAccepted}
          onClick={() => onLogin("facebook")}
        >
          <FaFacebookF />
          Entrar com Facebook
        </Button>

        <TermsAcceptance onAccept={onAcceptTerms} />
      </div>
    </div>
  );
};

export default CardLogin;
