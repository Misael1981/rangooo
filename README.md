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

Mano IA, essas duas, eu vou pedir pra vc fazer pra mim, eu não sei msm!!! Eu gostaria de enviar as imagens pro cloudinary,

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
<div className="space-y-4">
        <FormLabel>Contatos</FormLabel>
        {contacts.map((contact, index) => (
          <div key={index} className="flex items-center gap-2">
            <FormControl>
              <Input
                placeholder={`Contato ${index + 1} (ex: 11999999999)`}
                value={contact}
                onChange={(e) => updateContact(index, e.target.value)}
                className="flex-1"
              />
            </FormControl>
            {index > 0 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeContact(index)}
                className="shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addContact}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Adicionar Contato
        </Button>

        {/* Campo hidden para validação do React Hook Form */}
        <FormField
          control={form.control}
          name="contacts"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
```
