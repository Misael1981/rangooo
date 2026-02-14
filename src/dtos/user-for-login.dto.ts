import { AreaType } from "@/generated/prisma/enums";

export interface UserForLoginDTO {
  id: string;
  name: string;
  phone: string | null;
  addresses: {
    id: string;
    street: string;
    number: string;
    complement: string | null;
    neighborhood: string;
    city: string;
    state: string;
    reference: string | null;
    areaType: AreaType;
  }[];
}
