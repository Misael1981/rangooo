export type AreaType = "URBAN" | "RURAL";
export type UserRole = "ADMIN" | "USER";

export interface AddressDTO {
  id: string;
  userId: string;

  name: string | null;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;

  complement: string | null;
  reference: string | null;

  areaType: AreaType;
  isDefault: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;

  image: string | null;
  phone: string | null;

  role: UserRole;
  isProfileCompleted: boolean;

  password: string | null;

  addresses: AddressDTO[];

  createdAt: Date;
  updatedAt: Date;
}
