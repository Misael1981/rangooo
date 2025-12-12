// api/onboarding/step1/route.js

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Seu cliente Prisma
import { ownerSchema } from "@/app/schemas/onboarding/owner-schema";

// 1. Defina a função POST
export async function POST(request) {
  try {
    const body = await request.json();

    const validation = ownerSchema.safeParse(body);

    if (!validation.success) {
      // ... (tratamento de erro de validação)
      return NextResponse.json(
        {
          message: "Erro de validação",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }
    const { name, email, phone } = validation.data;

    // 1. Tentar encontrar o usuário primeiro
    let user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user) {
      return NextResponse.json(
        {
          message: "Este e-mail já está em uso. Por favor, faça login.",
          code: "EMAIL_EXISTS",
        },
        { status: 409 }, // 409 Conflict
      );
    }

    // 4. INTERAÇÃO COM O BANCO (Criação do Usuário)
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        role: "RESTAURANT_OWNER",
        // Você pode adicionar um campo 'isOwnerOnboarded' ou 'status' aqui se precisar de controle extra.
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    // 3. RETORNO DE SUCESSO
    return NextResponse.json(
      {
        message: "Conta criada com sucesso.",
        userId: newUser.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Erro na API Step 1:", error);

    // Tratamento de Erro de Email Duplicado (Unique Constraint)
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "E-mail já cadastrado (P2002).", code: "EMAIL_EXISTS" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Ocorreu um erro interno do servidor." },
      { status: 500 },
    );
  }
}
