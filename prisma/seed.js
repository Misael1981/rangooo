const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

const main = async () => {
  // Removido $transaction; usar prismaClient direto

  // Limpeza (sequencial, sem transação)
  await prismaClient.product.deleteMany();
  await prismaClient.menuCategory.deleteMany();
  await prismaClient.restaurant.deleteMany();
  await prismaClient.user.deleteMany();

  // 1. Dono e Restaurante: Congo Burger
  const congoOwner = await prismaClient.user.upsert({
    where: { email: "owner@congo-burger.com" },
    update: {},
    create: {
      email: "owner@congo-burger.com",
      password: "dev-password",
      name: "Dono Congo Burger",
      role: "RESTAURANT_OWNER",
    },
  });

  const congoRestaurant = await prismaClient.restaurant.create({
    data: {
      name: "Congo Burger",
      slug: "congo-burger",
      description: "O melhor fast food do mundo",
      avatarImageUrl:
        "https://res.cloudinary.com/dsxpenevq/image/upload/v1761599120/logo-congoBurger-Photoroom_gtebnp.png",
      coverImageUrl:
        "https://res.cloudinary.com/dsxpenevq/image/upload/v1761659324/fachada-C_B_bvdctz.png",
      ownerId: congoOwner.id,
      category: "HAMBURGUERIA",
      latitude: -23.5505,
      longitude: -46.6333,
      address: "Av. Paulista, 1000 - São Paulo/SP",
      phones: ["+55 11 99999-9999", "+55 11 3333-3333"],
      brandColors: ["#0d1c2c", "#e8af44", "#ffffff"],
    },
  });

  const combosCategory = await prismaClient.menuCategory.create({
    data: {
      name: "Combos",
      restaurantId: congoRestaurant.id,
    },
  });

  await prismaClient.product.createMany({
    data: [
      {
        name: "CongOferta Média Congo Mac Duplo",
        description:
          "Quatro hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles e pão com gergilim, acompanhamento e bebida.",
        price: 39.9,
        imageUrl:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1762344248/1_okucta.png",
        menuCategoryId: combosCategory.id,
        restaurantId: congoRestaurant.id,
        ingredients: [
          "Pão com gergilim",
          "Hambúrguer de carne 100% bovina",
          "Alface americana",
          "Queijo fatiado sabor cheddar",
          "Molho especial",
          "Cebola",
          "Picles",
        ],
      },
      {
        name: "Novo Brabo Melt Onion Rings",
        description:
          "Dois hambúrgueres de carne 100% bovina, méquinese, a exclusiva maionese especial com sabor de carne defumada, onion rings, fatias de bacon, queijo processado sabor cheddar, o delicioso molho lácteo com queijo tipo cheddar tudo isso no pão tipo brioche trazendo uma explosão de sabores pros seus dias de glória! Acompanhamento e Bebida.",
        price: 41.5,
        imageUrl:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1762344604/2_artand.png",
        menuCategoryId: combosCategory.id,
        restaurantId: congoRestaurant.id,
        ingredients: [
          "Pão tipo brioche",
          "Hambúrguer de carne 100% bovina",
          "Méquinese",
          "Maionese especial com sabor de carne defumada",
          "Onion rings",
          "Fatias de bacon",
          "Queijo processado sabor cheddar",
          "Molho lácteo com queijo tipo cheddar",
        ],
      },
      {
        name: "CongoCrispy Chicken Elite",
        description:
          "Composto por pão tipo brioche com batata, molho Honey&Fire, bacon em fatias, alface, tomate, queijo sabor cheddar e carne 100% de peito de frango, temperada e empanada, acompanhamento e bebida.",
        price: 39.9,
        imageUrl:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1762344780/3_buyjr3.png",
        menuCategoryId: combosCategory.id,
        restaurantId: congoRestaurant.id,
        ingredients: [
          "Pão tipo brioche",
          "Batata",
          "Molho Honey&Fire",
          "Bacon em fatias",
          "Alface",
          "Tomate",
          "Queijo sabor cheddar",
          "Carne 100% de peito de frango",
        ],
      },
      {
        name: "Duplo Cheddar McMelt",
        description:
          "Dois hambúrgueres (100% carne bovina), molho lácteo com queijo tipo cheddar, cebola ao molho shoyu e pão escuro com gergelim, acompanhamento e bebida.",
        price: 36.2,
        imageUrl:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1762344932/4_kmwwu7.png",
        menuCategoryId: combosCategory.id,
        restaurantId: congoRestaurant.id,
        ingredients: [
          "Pão escuro com gergelim",
          "Hambúrguer de carne 100% bovina",
          "Molho lácteo com queijo tipo cheddar",
          "Cebola ao molho shoyu",
        ],
      },
    ],
  });
  const hamburguersCategory = await prismaClient.menuCategory.create({
    data: {
      name: "Lanches",
      restaurantId: congoRestaurant.id,
    },
  });
  await prismaClient.product.createMany({
    data: [
      {
        name: "Congo Mac",
        description:
          "Quatro hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles e pão com gergilim, acompanhamento e bebida.",
        ingredients: [
          "Pão com gergilim",
          "Hambúrguer de carne 100% bovina",
          "Alface americana",
          "Queijo fatiado sabor cheddar",
          "Molho especial",
          "Cebola",
          "Picles",
        ],
        price: 39.9,
        imageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQKfI6fivqActTvBGLXfQe4a8CJ6d3HiR7USPK",
        menuCategoryId: hamburguersCategory.id,
        restaurantId: congoRestaurant.id,
      },
      {
        name: "Duplo Quarterão",
        description:
          "Dois hambúrgueres de carne 100% bovina, méquinese, a exclusiva maionese especial com sabor de carne defumada, onion rings, fatias de bacon, queijo processado sabor cheddar, o delicioso molho lácteo com queijo tipo cheddar tudo isso no pão tipo brioche trazendo uma explosão de sabores pros seus dias de glória! Acompanhamento e Bebida.",
        ingredients: [
          "Pão tipo brioche",
          "Hambúrguer de carne 100% bovina",
          "Méquinese",
          "Maionese especial com sabor de carne defumada",
          "Onion rings",
          "Fatias de bacon",
          "Queijo processado sabor cheddar",
          "Molho lácteo com queijo tipo cheddar",
        ],
        price: 41.5,
        imageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ99rtECuYaDgmA4VujBU0wKn2ThXJvF3LHfyc",
        menuCategoryId: hamburguersCategory.id,
        restaurantId: congoRestaurant.id,
      },
      {
        name: "CongoMelt",
        description:
          "Composto por pão tipo brioche com batata, molho Honey&Fire, bacon em fatias, alface, tomate, queijo sabor cheddar e carne 100% de peito de frango, temperada e empanada, acompanhamento e bebida.",
        ingredients: [
          "Pão tipo brioche",
          "Batata",
          "Molho Honey&Fire",
          "Bacon em fatias",
          "Alface",
          "Tomate",
          "Queijo sabor cheddar",
          "Carne 100% de peito de frango",
        ],
        price: 39.9,
        imageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQUY0VlDTmvPeJLoyOjzNsMqFdxUI423nBl6br",
        menuCategoryId: hamburguersCategory.id,
        restaurantId: congoRestaurant.id,
      },
      {
        name: "CongoNífico Bacon",
        description:
          "Dois hambúrgueres (100% carne bovina), molho lácteo com queijo tipo cheddar, cebola ao molho shoyu e pão escuro com gergelim, acompanhamento e bebida.",
        ingredients: [
          "Pão escuro com gergelim",
          "Hambúrguer de carne 100% bovina",
          "Molho lácteo com queijo tipo cheddar",
          "Cebola ao molho shoyu",
        ],
        price: 36.2,
        imageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQBBmifbjzEVXRoycAtrP9vH45bZ6WDl3QF0a1",
        menuCategoryId: hamburguersCategory.id,
        restaurantId: congoRestaurant.id,
      },
    ],
  });
  const frenchFriesCategory = await prismaClient.menuCategory.create({
    data: {
      name: "Fritas",
      restaurantId: congoRestaurant.id,
    },
  });
  await prismaClient.product.createMany({
    data: [
      {
        name: "Fritas Grande",
        description: "Batatas fritas crocantes e sequinhas. Vem bastante!",
        ingredients: [],
        price: 10.9,
        imageUrl:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1762345183/5_jit9yh.png",
        menuCategoryId: frenchFriesCategory.id,
        restaurantId: congoRestaurant.id,
      },
      {
        name: "Fritas Média",
        description:
          "Batatas fritas crocantes e sequinhas. Vem uma média quantidade!",
        ingredients: [],
        price: 9.9,
        imageUrl:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1762345586/7_cm0me8.png",
        menuCategoryId: frenchFriesCategory.id,
        restaurantId: congoRestaurant.id,
      },
      {
        name: "Fritas Pequena",
        description:
          "Batatas fritas crocantes e sequinhas. Vem pouquinho (é bom pra sua dieta)!",
        ingredients: [],
        price: 5.9,
        imageUrl:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1762345537/6_yqiabt.png",
        menuCategoryId: frenchFriesCategory.id,
        restaurantId: congoRestaurant.id,
      },
    ],
  });
  const drinksCategory = await prismaClient.menuCategory.create({
    data: {
      name: "Bebidas",
      restaurantId: congoRestaurant.id,
    },
  });
  await prismaClient.product.createMany({
    data: [
      {
        name: "Coca-cola",
        description: "Coca-cola gelada para acompanhar seu lanche.",
        ingredients: [],
        price: 5.9,
        imageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQJS1b33q29eEsh0CVmOywrqx1UPnJpRGcHN5v",
        menuCategoryId: drinksCategory.id,
        restaurantId: congoRestaurant.id,
      },
      {
        name: "Fanta Laranja",
        description: "Fanta Laranja gelada para acompanhar seu lanche.",
        ingredients: [],
        price: 5.9,
        imageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQW7Kxm9gniS9XCLQu7Nb4jvBYZze16goaOqsK",
        menuCategoryId: drinksCategory.id,
        restaurantId: congoRestaurant.id,
      },
      {
        name: "Água Mineral",
        description: "A bebida favorita do Cristiano Ronaldo.",
        ingredients: [],
        price: 2.9,
        imageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ7i05S5tkc0L9oMIXZsFJtwnBh2KCz3y6uSW1",
        menuCategoryId: drinksCategory.id,
        restaurantId: congoRestaurant.id,
      },
    ],
  });
  const desertsCategory = await prismaClient.menuCategory.create({
    data: {
      name: "Sobremesas",
      restaurantId: congoRestaurant.id,
    },
  });
  await prismaClient.product.createMany({
    data: [
      {
        name: "Casquinha de Baunilha",
        description: "Casquinha de sorvete sabor baunilha.",
        ingredients: [],
        price: 3.9,
        imageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQtfuQrAKkI75oJfPT0crZxvX82ui9qV3hLFdY",
        menuCategoryId: desertsCategory.id,
        restaurantId: congoRestaurant.id,
      },
      {
        name: "Casquinha de Chocolate",
        description: "Casquinha de sorvete sabor chocolate.",
        ingredients: [],
        price: 3.9,
        imageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQBH21ijzEVXRoycAtrP9vH45bZ6WDl3QF0a1M",
        menuCategoryId: desertsCategory.id,
        restaurantId: congoRestaurant.id,
      },
      {
        name: "Casquinha de Mista",
        description: "Casquinha de sorvete sabor baunilha e chocolate.",
        ingredients: [],
        price: 2.9,
        imageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ4rBrtULypXmR6JiWuhzS8ALjVkrF3yfatC7E",
        menuCategoryId: desertsCategory.id,
        restaurantId: congoRestaurant.id,
      },
    ],
  });

  // --- 2. SETUP DA PIZZARIA JK ---

  // Cria o dono da Pizzaria JK
  const pizzaOwner = await prismaClient.user.upsert({
    where: { email: "owner@pizzaria-jk.com" },
    update: {},
    create: {
      email: "owner@pizzaria-jk.com",
      password: "dev-password",
      name: "Dono Pizzaria JK",
      role: "RESTAURANT_OWNER",
    },
  });

  const pizzaRestaurant = await prismaClient.restaurant.create({
    data: {
      name: "Pizzaria JK",
      slug: "pizzaria-jk",
      description:
        "A melhor pizza de São Paulo, forno à lenha e ingredientes frescos.",
      avatarImageUrl:
        "https://res.cloudinary.com/dsxpenevq/image/upload/v1761599121/logo_jk_alpgnl.svg",
      coverImageUrl:
        "https://res.cloudinary.com/dsxpenevq/image/upload/v1761659324/fachada-JK_y8evr0.jpg",
      ownerId: pizzaOwner.id,
      category: "PIZZARIA",
      latitude: -23.5505,
      longitude: -46.6333,
      address: "Rua das Pizzas, 2000 - São Paulo/SP",
      phones: ["+55 11 88888-8888", "+55 11 2222-2222"],
      brandColors: ["#8c110e", "#e1a432", "#000000"],
    },
  });

  const classicPizzasCategory = await prismaClient.menuCategory.create({
    data: { name: "Pizzas Clássicas", restaurantId: pizzaRestaurant.id },
  });

  await prismaClient.product.createMany({
    data: [
      {
        name: "Mussarela",
        description: "Queijo mussarela de búfala, tomate cereja e orégano.",
        price: 45.0,
        imageUrl: "https://placehold.co/100x100/6ee7b7/000000?text=Mussarela",
        menuCategoryId: classicPizzasCategory.id,
        restaurantId: pizzaRestaurant.id,
        ingredients: ["Mussarela", "Tomate", "Orégano"],
      },
      {
        name: "Calabresa Premium",
        description: "Calabresa artesanal, cebola roxa e azeitonas pretas.",
        price: 52.0,
        imageUrl: "https://placehold.co/100x100/6ee7b7/000000?text=Calabresa",
        menuCategoryId: classicPizzasCategory.id,
        restaurantId: pizzaRestaurant.id,
        ingredients: ["Calabresa", "Cebola Roxa", "Azeitonas"],
      },
      {
        name: "Marguerita",
        description:
          "Molho de tomate, mussarela, manjericão e parmesão ralado.",
        price: 48.0,
        imageUrl: "https://placehold.co/100x100/6ee7b7/000000?text=Marguerita",
        menuCategoryId: classicPizzasCategory.id,
        restaurantId: pizzaRestaurant.id,
        ingredients: ["Molho de Tomate", "Mussarela", "Manjericão"],
      },
    ],
  });

  const specialPizzasCategory = await prismaClient.menuCategory.create({
    data: {
      name: "Pizzas Especiais",
      restaurantId: pizzaRestaurant.id,
    },
  });

  await prismaClient.product.createMany({
    data: [
      {
        name: "Quatro Queijos Rangooo",
        description: "Mussarela, provolone, gorgonzola e catupiry original.",
        price: 65.0,
        imageUrl: "https://placehold.co/100x100/fcd34d/000000?text=4+Queijos",
        menuCategoryId: specialPizzasCategory.id,
        restaurantId: pizzaRestaurant.id,
        ingredients: ["Mussarela", "Provolone", "Gorgonzola", "Catupiry"],
      },
      {
        name: "Pepperoni Picante",
        description:
          "Pepperoni, pimenta jalapeño, e um toque de azeite trufado.",
        price: 68.0,
        imageUrl: "https://placehold.co/100x100/fcd34d/000000?text=Pepperoni",
        menuCategoryId: specialPizzasCategory.id,
        restaurantId: pizzaRestaurant.id,
        ingredients: ["Pepperoni", "Jalapeño", "Azeite Trufado"],
      },
    ],
  });

  const dessertPizzasCategory = await prismaClient.menuCategory.create({
    data: {
      name: "Pizzas Doces",
      restaurantId: pizzaRestaurant.id,
    },
  });

  await prismaClient.product.createMany({
    data: [
      {
        name: "Chocolate com Morango",
        description: "Massa fininha, chocolate cremoso e morangos frescos.",
        price: 55.0,
        imageUrl: "https://placehold.co/100x100/fda4af/000000?text=Doce",
        menuCategoryId: dessertPizzasCategory.id,
        restaurantId: pizzaRestaurant.id,
        ingredients: ["Chocolate", "Morango"],
      },
      {
        name: "Banana com Canela",
        description: "Banana caramelizada, canela e toque de açúcar mascavo.",
        price: 49.0,
        imageUrl: "https://placehold.co/100x100/fda4af/000000?text=Banana",
        menuCategoryId: dessertPizzasCategory.id,
        restaurantId: pizzaRestaurant.id,
        ingredients: ["Banana", "Canela", "Açúcar Mascavo"],
      },
    ],
  });
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
