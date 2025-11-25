import CardsFeatures from "../CardsFeatures";
import WaveDivider from "../WaveDivider";

const AboutUs = () => {
  return (
    <section className="">
      <div className="mx-auto max-w-7xl space-y-4 px-4 py-10 text-center">
        <h2 className="text-4xl font-bold text-gray-900 lg:text-5xl">
          Mas, o que é a plataforma{" "}
          <strong className="text-orange-500">Rangooo</strong>?
        </h2>
        <p className="mx-auto max-w-3xl text-xl text-gray-600">
          O <span className="text-orange-500">Rangooo</span> é uma plataforma de
          gestão de pedidos para estabelecimentos. Ele organiza seu cardápio,
          centraliza pedidos e simplifica a experiência de compra do cliente.
        </p>
      </div>
      <div className="">
        <WaveDivider />
        <div className="">
          <CardsFeatures />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
