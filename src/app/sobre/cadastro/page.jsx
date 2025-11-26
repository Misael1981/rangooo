import { FcCheckmark } from "react-icons/fc";
import AboutHeader from "../components/AboutHeader";
import Image from "next/image";
import CustomerRegistration from "./components/CustomerRegistration";

const signupHighlights = [
  { id: "start", text: "Faça o seu cadastro para começar a usar o Rangooo!" },
  {
    id: "trial",
    text: "A primeira semana é gratuita para você avaliar o sistema.",
  },
  {
    id: "care",
    text: "Preencha os dados com cuidado; serão exibidos no seu site.",
  },
  { id: "support", text: "Dúvidas? Suporte via WhatsApp." },
];

export default function CadastroEstabelecimentoPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <AboutHeader />
      <main className="min-h-[80vh] overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-purple-50">
        {/* HeroSection */}
        <section className="flex flex-col items-center justify-center gap-2 px-4 pt-8">
          <div className="max-w-[80%] text-center">
            <h1 className="text-2xl font-bold leading-tight text-gray-900 md:text-3xl lg:text-4xl">
              Comece a usar o{" "}
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent">
                sistema
              </span>{" "}
              agora mesmo
            </h1>
          </div>
          <ul className="space-y-1">
            {signupHighlights.map((item) => (
              <li key={item.id} className="flex items-start gap-2">
                <FcCheckmark className="mt-0.5 h-5 w-5" />
                <span className="text-lg leading-relaxed">{item.text}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="flex items-center justify-center gap-8 px-4 pt-8">
          <CustomerRegistration />
          {/* <Image
            src="/images/cadastro.png"
            alt="Cadastro"
            width={600}
            height={400}
          /> */}
        </section>
      </main>
    </div>
  );
}
