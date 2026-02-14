import { EstablishmentForCategorieDTO } from "@/dtos/establishment-for-categorie.dto";

type RestauranteUIProps = {
  establishment: EstablishmentForCategorieDTO;
};

const RestauranteUI = ({ establishment }: RestauranteUIProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[--brand-primary]">
        {establishment.name}
      </h1>
    </div>
  );
};

export default RestauranteUI;
