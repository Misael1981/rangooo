## Links Úteis

- https://linktr.ee/elternazo

- https://pedir.delivery/app/merpizzariamaritacas/menu

- https://www.grandchef.com.br/

https://rangooo.vercel.app/

https://{YOUR_DOMAIN}/api/auth/callback/google

npx prisma migrate dev -n add_additional_ingredients

Testando se a problemas no GitHub

FinishOrderButton

EnrollmentInvite 123

// Atualizar dados do formulário

```
const updateFormData = (section, field, value) => {
setFormData((prev) => ({
...prev,
[section]: {
...prev[section],
[field]: value,
},
}));
};

// Validação do token (simplificada)

```

const validateToken = async () => {
if (!token) {
router.push("/sobre/cadastro?error=token-invalido");
return false;
}

    try {
      const response = await fetch(
        `/api/onboarding/validate-token?token=${token}`,
      );
      return response.ok;
    } catch (error) {
      return false;
    }

};

```
Submissão final
```

const handleSubmit = async () => {
setIsLoading(true);

    try {
      const response = await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          ...formData,
        }),
      });

      if (response.ok) {
        const { restaurantSlug } = await response.json();
        router.push(`/pizzarias/${restaurantSlug}/admin?welcome=true`);
      } else {
        alert("Erro ao completar cadastro. Tente novamente.");
      }
    } catch (error) {
      alert("Erro de conexão. Tente novamente.");
    } finally {
      setIsLoading(false);
    }

};

```


```

const [formData, setFormData] = useState({
// Dados do Dono (Step 1)
owner: {
name: "",
email: "",
phone: "",
password: "",
confirmPassword: "",
},

    // Dados do Estabelecimento (Step 2)
    restaurant: {
      name: "",
      description: "",
      category: "PIZZARIA",
      address: "",
      city: "",
      state: "",
      latitude: "",
      longitude: "",
      contacts: [
        { type: "WHATSAPP", number: "", label: "Principal", isPrimary: true },
      ],
    },

    // Categorias e Produtos (Step 3)
    menu: {
      categories: [
        {
          id: "1",
          name: "Pizzas",
          products: [
            {
              name: "",
              description: "",
              price: "",
              ingredients: [""],
              imageUrl: "",
            },
          ],
          additionalIngredients: [
            { name: "Borda Recheada", price: "8.00" },
            { name: "Extra Queijo", price: "5.00" },
          ],
        },
      ],
    },

});

```

```
