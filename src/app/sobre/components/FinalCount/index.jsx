import Link from "next/link";

const FinalCount = () => {
  return (
    <section
      id="planos"
      className="bg-gradient-to-r from-orange-500 to-red-500 py-20"
    >
      <div className="mx-auto max-w-4xl px-4 text-center text-white">
        <h2 className="mb-6 text-4xl font-bold lg:text-5xl">
          Pronto para revolucionar seu negócio?
        </h2>
        <p className="mb-8 text-xl text-white/90">
          Gerencie seus pedidos, clientes... Tudo de forma digitalizada, tenha
          seu próprio site de vendas!
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/cadastro-estabelecimento"
            className="rounded-xl bg-white px-8 py-4 text-lg font-bold text-orange-600 shadow-2xl transition-all duration-300 hover:bg-gray-100"
          >
            Testar Grátis por 7 Dias
          </Link>
          <Link
            href="/contato"
            className="rounded-xl border-2 border-white px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:bg-white/10"
          >
            Falar com Especialista
          </Link>
        </div>

        <p className="mt-6 text-white/80">
          Sem compromisso, sem cartão de crédito
        </p>
      </div>
    </section>
  );
};

export default FinalCount;
