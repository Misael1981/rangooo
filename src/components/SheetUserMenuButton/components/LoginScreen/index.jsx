"use client";

import { Button } from "@/components/ui/button";
import { NotebookText } from "lucide-react";
import DialogDataUser from "../DialogDataUser";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { signIn } from "next-auth/react";

const LoginScreen = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleLoginWithGoogle = async () => {
    await signIn("google");
  };
  const handleLoginWithFacebook = async () => {
    await signIn("facebook");
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <h2 className="mb-2 text-xl leading-none">
          Olá, <strong>faça seu login</strong>
        </h2>
        <p className="text-sm text-gray-500">
          Preencha o formulário, com seus dados corretamente, eles vão garantir
          que seu pedido chegue direitinho até você.
        </p>
        <p className="text-sm text-gray-500">
          Depois, é só se conectar com a sua rede preferida e aproveitar a
          experiência.
        </p>
      </div>
      <Button
        className="w-fit"
        variant="ghost"
        onClick={() => setDialogOpen(true)}
      >
        <NotebookText />
        Preencha os dados
      </Button>
      <DialogDataUser open={dialogOpen} onOpenChange={setDialogOpen} />
      <div className="flex w-full flex-col gap-2">
        <Button className="bg-[#d64131]" onClick={handleLoginWithGoogle}>
          <FaGoogle />
          Entrar com Google
        </Button>
        <Button className="bg-[#3b5a9a]" onClick={handleLoginWithFacebook}>
          <FaFacebookF />
          Entrar com Facebook
        </Button>
      </div>
    </div>
  );
};

export default LoginScreen;
