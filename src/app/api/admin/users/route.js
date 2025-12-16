// src/app/api/admin/users/route.js

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Assuma que você tem um utilitário prisma

// Opcional: Re-importar o esquema Zod para validação no lado do servidor
import z from "zod";

const establishmentOwnerSchema = z.object({
  id: z.string().uuid("ID de usuário inválido."),
  name: z.string().min(2, "Nome obrigatório."),
  email: z.string().email("Email inválido."),
  phone: z.string().min(10, "Número de telefone inválido."),
});

/**
 * Função PUT para atualizar os dados de um usuário.
 * @param {Request} request
 * @returns {NextResponse}
 */
export async function PUT(request) {
  try {
    const body = await request.json();

    // 1. Validação dos Dados Recebidos
    const validation = establishmentOwnerSchema.safeParse(body);

    if (!validation.success) {
      // Retorna 400 Bad Request se a validação falhar
      return NextResponse.json(
        {
          error: "Dados de entrada inválidos",
          details: validation.error.formErrors.fieldErrors,
        },
        { status: 400 },
      );
    }

    const { id, name, email, phone } = validation.data;

    // 2. Verificação de Email Duplicado
    // É uma boa prática verificar se o novo email já está sendo usado por outro usuário
    const existingUserWithEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUserWithEmail && existingUserWithEmail.id !== id) {
      return NextResponse.json(
        { error: "Email já cadastrado por outro usuário." },
        { status: 409 }, // 409 Conflict
      );
    }

    // 3. Atualização no Banco de Dados
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        phone: phone,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        updatedAt: true,
      },
    });

    // 4. Retorna Sucesso
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Erro na atualização do usuário:", error);

    // 5. Tratamento de Erros
    return NextResponse.json(
      { error: "Erro interno do servidor ao processar a atualização." },
      { status: 500 },
    );
  }
}

// Opcional: Implementar a função GET, POST ou DELETE se necessário para esta rota.
