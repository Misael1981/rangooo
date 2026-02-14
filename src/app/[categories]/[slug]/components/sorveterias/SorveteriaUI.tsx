import { EstablishmentForCategorieDTO } from "@/dtos/establishment-for-categorie.dto";

type SorveteriaUIProps = {
  establishment: EstablishmentForCategorieDTO;
};

const SorveteriaUI = ({ establishment }: SorveteriaUIProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[--brand-primary]">
        {establishment.name}
      </h1>
    </div>
  );
};

export default SorveteriaUI;
