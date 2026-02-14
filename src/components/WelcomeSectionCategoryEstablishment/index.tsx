type WelcomeSectionCategoryEstablishmentProps = {
  establishmentName: string;
};

const WelcomeSectionCategoryEstablishment = ({
  establishmentName,
}: WelcomeSectionCategoryEstablishmentProps) => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 ">
      <h1 className="text-3xl font-bold">{establishmentName}</h1>
      <div className="space-y-2 p-4 text-center">
        <h2 className="text-2xl font-semibold">Seja bem-vindo!</h2>
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição. Estamos aqui para
          oferecer praticidade e sabor em cada detalhe!
        </p>
      </div>
    </section>
  );
};

export default WelcomeSectionCategoryEstablishment;
