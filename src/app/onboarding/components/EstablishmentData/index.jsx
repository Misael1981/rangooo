"use client";

import AboutEstablishment from "./components/AboutEstablishment";
import InitialData from "./components/InitialData";
import OpeningHours from "./components/OpeningHours";

const EstablishmentData = () => {
  return (
    <div className="space-y-6 pb-4">
      <div className="border-b-2 border-gray-200 pb-2">
        <h1 className="text-2xl font-bold text-gray-900">
          Dados do Estabelecimento
        </h1>
        <p className="text-sm text-gray-500">
          Preencha os dados do seu estabelecimento, preencha com atenção, esses
          são os dados que serão usados para exibição no aplicativo.
        </p>
      </div>
      <InitialData />
      <AboutEstablishment />
      <OpeningHours />
    </div>
  );
};

export default EstablishmentData;
