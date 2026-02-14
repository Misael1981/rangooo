"use server";

import { getSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { OnboardingFormValues } from "@/schemas/login-schema";

const fieldMap = {
  name: "user",
  phone: "user",
  street: "address",
  number: "address",
  neighborhood: "address",
  city: "address",
  state: "address",
  areaType: "address",
  reference: "address",
} as Record<keyof OnboardingFormValues, "user" | "address">;

export async function updateUserField<K extends keyof OnboardingFormValues>(
  fieldName: K,
  value: OnboardingFormValues[K],
) {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("Não autorizado");
  }

  const userId = session.user.id;
  const target = fieldMap[fieldName];

  try {
    if (target === "user") {
      await db.user.update({
        where: { id: userId },
        data: { [fieldName]: value },
      });
    }

    if (target === "address") {
      let mainAddress = await db.address.findFirst({
        where: { userId, isDefault: true },
      });

      if (!mainAddress) {
        mainAddress = await db.address.create({
          data: {
            userId,
            isDefault: true,
            street: "",
            number: "",
            neighborhood: "",
            city: "",
            state: "MG",
            areaType: "URBAN",
          },
        });
      }

      await db.address.update({
        where: { id: mainAddress.id },
        data: { [fieldName]: value },
      });
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Erro no Autosave:", error);
    return { success: false };
  }
}
