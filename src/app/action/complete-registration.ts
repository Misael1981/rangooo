"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { OnboardingFormValues } from "@/schemas/login-schema";
import { getSession } from "@/lib/auth";

export async function completeRegistration(values: OnboardingFormValues) {
  const session = await getSession();

  if (!session?.user?.id) {
    return { success: false, error: "Usuário não autenticado." };
  }

  const userId = session.user.id;

  try {
    await db.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: {
          name: values.name,
          phone: values.phone,
          isProfileCompleted: true,
        },
      });

      await tx.address.create({
        data: {
          userId: userId,
          street: values.street,
          number: values.number,
          neighborhood: values.neighborhood,
          city: values.city,
          state: values.state,
          complement: values.complement,
          reference: values.reference,
          areaType: values.areaType,
          isDefault: true,
        },
      });
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Erro no onboarding:", error);
    return { success: false, error: "Erro ao salvar os dados." };
  }
}
