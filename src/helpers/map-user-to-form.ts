import { UserForLoginDTO } from "@/dtos/user-for-login.dto";
import { OnboardingFormValues } from "@/schemas/login-schema";

export function mapUserToForm(
  user: UserForLoginDTO | null,
): OnboardingFormValues {
  return {
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    street: user?.addresses?.[0]?.street ?? "",
    number: user?.addresses?.[0]?.number ?? "",
    neighborhood: user?.addresses?.[0]?.neighborhood ?? "",
    city: user?.addresses?.[0]?.city ?? "",
    state: user?.addresses?.[0]?.state ?? "",
    areaType: user?.addresses?.[0]?.areaType ?? "URBAN",
    complement: user?.addresses?.[0]?.complement ?? "",
    reference: user?.addresses?.[0]?.reference ?? "",
  };
}
