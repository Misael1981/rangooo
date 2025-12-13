// app/api/onboarding/complete/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { formSchema } from "@/app/schemas/form-schema";

export async function POST(request) {
  console.log("=== ONBOARDING API CALLED ===");

  try {
    const body = await request.json();
    console.log("📦 Request body received");
    console.log("Owner email:", body.owner?.email);
    console.log("Restaurant slug:", body.store?.slug);
    console.log("Products count:", body.menu?.products?.length);

    const token = request.headers.get("authorization")?.replace("Bearer ", "");

    // 1. VALIDAÇÃO DO TOKEN
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: "Token de autenticação não fornecido",
        },
        { status: 401 },
      );
    }

    // 2. VALIDAÇÃO COM ZOD (CORRIGIDA)
    console.log("🔍 Validando dados com Zod...");
    const validationResult = formSchema.safeParse(body);

    console.log("🔍 Estrutura do validationResult:", {
      success: validationResult.success,
      error: validationResult.error,
      hasError: !!validationResult.error,
      errorType: typeof validationResult.error,
      errorKeys: validationResult.error
        ? Object.keys(validationResult.error)
        : [],
      errorStructure: validationResult.error
        ? JSON.stringify(validationResult.error, null, 2)
        : "no error",
    });

    if (!validationResult.success) {
      console.log("❌ VALIDAÇÃO ZOD FALHOU");

      // Extrai erros de forma segura
      let errorDetails = [];

      if (validationResult.error?.errors) {
        errorDetails = validationResult.error.errors.map((err) => ({
          path: Array.isArray(err.path)
            ? err.path.join(".")
            : String(err.path || "unknown"),
          message: err.message || "Erro de validação",
          code: err.code || "invalid_type",
        }));
      } else if (validationResult.error?.message) {
        errorDetails = [
          {
            path: "unknown",
            message: validationResult.error.message,
          },
        ];
      } else {
        errorDetails = [
          {
            path: "unknown",
            message: "Erro de validação desconhecido",
          },
        ];
      }

      console.log("📋 Erros encontrados:", errorDetails);

      return NextResponse.json(
        {
          success: false,
          error: "Dados do formulário inválidos",
          details: errorDetails,
          message:
            errorDetails[0]?.message || "Corrija os dados e tente novamente",
        },
        { status: 400 },
      );
    }

    console.log("✅ Validação Zod bem-sucedida!");
    const data = validationResult.data;

    // 3. VERIFICA SLUG ÚNICO
    console.log(`🔍 Verificando slug único: ${data.store.slug}`);
    const existingRestaurant = await prisma.restaurant.findUnique({
      where: { slug: data.store.slug },
    });

    if (existingRestaurant) {
      console.log(`❌ Slug já em uso: ${data.store.slug}`);
      return NextResponse.json(
        {
          success: false,
          error: "Este link já está em uso. Escolha outro.",
        },
        { status: 409 },
      );
    }

    console.log("✅ Slug disponível!");

    // 4. TRANSACTION: Salva TUDO de uma vez
    const result = await prisma.$transaction(
      async (tx) => {
        // ========================
        // A. CRIA/USA O USUÁRIO
        // ========================
        let user;

        // Tenta encontrar usuário pelo email
        user = await tx.user.findUnique({
          where: { email: data.owner.email },
        });

        if (!user) {
          // Cria novo usuário se não existir
          console.log("Criando novo usuário...");
          user = await tx.user.create({
            data: {
              name: data.owner.name,
              email: data.owner.email,
              phone: data.owner.phone,
              role: "RESTAURANT_OWNER",
              // password será definido depois via invite ou OAuth
            },
          });
        } else {
          // Atualiza dados do usuário existente
          console.log("Atualizando usuário existente...");
          user = await tx.user.update({
            where: { id: user.id },
            data: {
              name: data.owner.name,
              phone: data.owner.phone,
              role: "RESTAURANT_OWNER",
            },
          });
        }

        // ========================
        // B. CRIA O RESTAURANTE
        // ========================
        console.log("Criando novo restaurante...");
        const restaurant = await tx.restaurant.create({
          data: {
            ownerId: user.id,
            name: data.store.name,
            slug: data.store.slug,
            description: data.store.description,
            category: data.store.category,

            // Endereço
            street: data.store.street,
            number: data.store.number,
            complement: data.store.complement || null,
            neighborhood: data.store.neighborhood,
            city: data.store.city,
            state: data.store.state,
            zipCode: data.store.zipCode,

            // Coordenadas (mock por enquanto - pode usar geocoding depois)
            latitude: 0,
            longitude: 0,
            address: `${data.store.street}, ${data.store.number} - ${data.store.neighborhood}, ${data.store.city}/${data.store.state}`,

            // Contatos
            email: data.owner.email,
            socialMedia: data.store.socialMedia,

            // Imagens
            avatarImageUrl: data.store.avatarImageUrl || null,
            coverImageUrl: data.store.coverImageUrl || null,

            // Status
            isOpen: false, // Fechado até ativar horários
          },
          include: {
            users: true,
          },
        });
        console.log("Restaurante criado com ID:", restaurant.id);
        // ========================
        // C. VINCULA USUÁRIO AO RESTAURANTE
        // ========================
        await tx.restaurantUser.create({
          data: {
            userId: user.id,
            restaurantId: restaurant.id,
            role: "OWNER",
          },
        });

        // ========================
        // D. CONTATOS TELEFÔNICOS
        // ========================
        console.log("Criando contatos telefônicos...");
        for (const contactNumber of data.store.contacts) {
          if (contactNumber.trim()) {
            await tx.contactNumber.create({
              data: {
                restaurantId: restaurant.id,
                type: "WHATSAPP", // Assume WhatsApp por padrão
                number: contactNumber,
                isPrimary: true, // Primeiro contato é o principal
              },
            });
          }
        }
        console.log("Contatos telefônicos criados.");
        // ========================
        // E. HORÁRIOS DE FUNCIONAMENTO
        // ========================
        for (const businessDay of data.openingHours.businessHours) {
          await tx.businessHours.create({
            data: {
              restaurantId: restaurant.id,
              dayOfWeek: businessDay.dayOfWeek,
              isClosed: businessDay.isClosed,
              timeSlots: businessDay.timeSlots,
              displayOrder: businessDay.dayOfWeek,
            },
          });
        }
        console.log("Horários de funcionamento criados.");
        // ========================
        // F. MÉTODOS DE CONSUMO
        // ========================
        for (const method of data.store.consumptionMethods) {
          await tx.restaurantConsumptionMethod.create({
            data: {
              restaurantId: restaurant.id,
              method: method,
              isActive: true,
              displayOrder: 0,
            },
          });
        }
        console.log("Métodos de consumo criados.");
        // ========================
        // G. MÉTODOS DE PAGAMENTO
        // ========================
        for (const method of data.store.paymentMethods) {
          await tx.restaurantPaymentMethod.create({
            data: {
              restaurantId: restaurant.id,
              method: method,
              isActive: true,
              displayOrder: 0,
              cardBrands:
                method === "CREDIT_CARD" || method === "DEBIT_CARD"
                  ? ["VISA", "MASTERCARD"]
                  : [],
            },
          });
        }
        console.log("Métodos de pagamento criados.");
        // ========================
        // H. CATEGORIAS DO CARDÁPIO
        // ========================
        const createdCategories = [];

        for (const categoryName of data.menu.menuCategory.filter((c) =>
          c.trim(),
        )) {
          const category = await tx.menuCategory.create({
            data: {
              name: categoryName,
              restaurantId: restaurant.id,
            },
          });
          createdCategories.push(category);
        }
        console.log("Categorias do cardápio criadas.");
        // ========================
        // I. PRODUTOS
        // ========================
        for (const productData of data.menu.products) {
          // Encontra a categoria correspondente
          const category = createdCategories.find(
            (c) => c.name === productData.category,
          );

          if (category) {
            await tx.product.create({
              data: {
                restaurantId: restaurant.id,
                menuCategoryId: category.id,
                name: productData.name,
                description: productData.description,
                price: productData.price,
                imageUrl: productData.imageUrl || null,
                ingredients: productData.ingredients.filter((i) => i.trim()),
              },
            });
          }
        }
        console.log("Produtos criados.");
        // ========================
        // J. INGREDIENTES ADICIONAIS
        // ========================
        if (
          data.menu.additionalIngredients &&
          data.menu.additionalIngredients.length > 0
        ) {
          console.log(
            `🍽️ Processando ${data.menu.additionalIngredients.length} ingredientes extras`,
          );

          for (const extraIng of data.menu.additionalIngredients) {
            console.log(
              `➡️ Ingrediente: ${extraIng.name}, Categorias: ${extraIng.categories?.length || 0}`,
            );

            if (!extraIng.categories || extraIng.categories.length === 0) {
              console.warn(
                `⚠️ Ingrediente ${extraIng.name} sem categorias definidas`,
              );
              continue;
            }

            for (const categoryName of extraIng.categories) {
              // Busca a categoria EXATA (case sensitive)
              const category = createdCategories.find(
                (c) =>
                  c.name.trim().toLowerCase() ===
                  categoryName.trim().toLowerCase(),
              );

              if (category) {
                try {
                  await tx.additionalIngredient.create({
                    data: {
                      menuCategoryId: category.id,
                      name: extraIng.name,
                      price: extraIng.price,
                      isActive: true,
                    },
                  });
                  console.log(
                    `✅ ${extraIng.name} vinculado à categoria ${category.name}`,
                  );
                } catch (ingError) {
                  console.error(
                    `❌ Erro ao criar ingrediente ${extraIng.name}:`,
                    ingError.message,
                  );
                  // Continua com outros ingredientes
                }
              } else {
                console.warn(
                  `🔍 Categoria "${categoryName}" não encontrada para ${extraIng.name}. Disponíveis:`,
                  createdCategories.map((c) => c.name),
                );
              }
            }
          }
        } else {
          console.log("📝 Nenhum ingrediente adicional para processar");
        }

        return { user, restaurant };
      },
      {
        maxWait: 5000,
        timeout: 25000, // Coloquei 25s pra garantir com folga
      },
    );
    console.log("Ingredientes adicionais criados.");
    // ========================
    // 5. RESPOSTA DE SUCESSO
    // ========================
    return NextResponse.json(
      {
        success: true,
        message: "🎉 Estabelecimento cadastrado com sucesso!",
        data: {
          restaurantId: result.restaurant.id,
          restaurantSlug: result.restaurant.slug,
          restaurantName: result.restaurant.name,
          ownerId: result.user.id,
          dashboardUrl: `/dashboard/${result.restaurant.slug}`,
          publicUrl: `/restaurant/${result.restaurant.slug}`,
          adminUrl: `/admin/restaurants/${result.restaurant.id}`,
        },
        nextSteps: [
          "Configure os horários de funcionamento no dashboard",
          "Adicione mais produtos ao cardápio",
          "Convide outros funcionários para gerenciar",
          "Teste o fluxo de pedidos",
        ],
        timestamp: new Date().toISOString(),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("❌ Erro no cadastro completo:", error);

    // Tratamento de erros específicos do Prisma
    if (error.code === "P2002") {
      const field = error.meta?.target?.[0];
      const fieldNames = {
        slug: "Link único (URL)",
        email: "E-mail",
        phone: "Telefone",
      };

      return NextResponse.json(
        {
          error: `Este ${fieldNames[field] || field} já está em uso.`,
          code: "DUPLICATE_ENTRY",
        },
        { status: 409 },
      );
    }

    if (error.code === "P2003") {
      return NextResponse.json(
        {
          error: "Erro de referência. Verifique os dados relacionados.",
          code: "FOREIGN_KEY_CONSTRAINT",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: "Erro interno ao processar cadastro",
        code: "INTERNAL_ERROR",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    );
  }
}
