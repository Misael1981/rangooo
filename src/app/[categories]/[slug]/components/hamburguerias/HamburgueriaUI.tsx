import { EstablishmentForCategorieDTO } from "@/dtos/establishment-for-categorie.dto";

type HamburgueriaUIProps = {
  establishment: EstablishmentForCategorieDTO;
};

const HamburgueriaUI = ({ establishment }: HamburgueriaUIProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[--brand-primary]">
        {establishment.name}
      </h1>
    </div>
  );
};

export default HamburgueriaUI;
