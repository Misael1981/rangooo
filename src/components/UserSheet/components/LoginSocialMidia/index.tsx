import { Button } from "@/components/ui/button";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import TermsAcceptance from "@/components/TermsAcceptance";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { SheetFooter } from "@/components/ui/sheet";

const LoginSocialMidia = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleLoginWithGoogle = () => {
    if (termsAccepted) {
      signIn("google");
      return;
    }
    toast.error("É necessário aceitar os termos e condições");
  };
  const handleLoginWithFacebook = () => {
    if (!termsAccepted) {
      toast.error("É necessário aceitar os termos e condições");
      return;
    }
    signIn("facebook");
  };
  const handleTermsAccept = () => {
    setTermsAccepted(true);
  };
  return (
    <div className="flex-1 flex flex-col justify-between gap-4">
      <div className="space-y-1">
        <h2 className="mb-2 text-xl leading-none">
          Olá, <strong>Usuário</strong>
        </h2>
        <p className="text-sm text-gray-500">
          Faça login com a sua rede social preferida.
        </p>
        <p className="text-sm text-gray-500">
          Se este for seu primeiro acesso, preencha o cadastro com cuidado: são
          esses dados que usamos para entregar seu pedido certinho pra você.
        </p>
        <p className="text-sm text-gray-500">
          Usuários logados também desbloqueiam promoções exclusivas, novidades
          da plataforma e o histórico dos seus últimos pedidos.
        </p>
      </div>

      <SheetFooter>
        <div className="flex w-full flex-col gap-2">
          <Button
            className={`bg-[#d64131] ${!termsAccepted ? "cursor-not-allowed opacity-50" : ""}`}
            aria-disabled={!termsAccepted}
            onClick={handleLoginWithGoogle}
          >
            <FaGoogle />
            Entrar com Google
          </Button>
          <Button
            className={`bg-[#3b5a9a] ${!termsAccepted ? "cursor-not-allowed opacity-50" : ""}`}
            aria-disabled={!termsAccepted}
            onClick={handleLoginWithFacebook}
          >
            <FaFacebookF />
            Entrar com Facebook
          </Button>
        </div>
        <TermsAcceptance onAccept={handleTermsAccept} />
      </SheetFooter>
    </div>
  );
};

export default LoginSocialMidia;
