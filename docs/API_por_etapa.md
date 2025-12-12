# API por etapa + salvamento progressivo

Exemplo de rotas:

```
POST /api/onboarding/owner
POST /api/onboarding/storeSchema
POST /api/onboarding/categories
POST /api/onboarding/products
POST /api/onboarding/images
POST /api/onboarding/finish
```

### Benefícios:

- Cada etapa é validada isoladamente.

- Se falhar uma parte, o resto já está salvo.

- Dá pra fazer autosave a cada etapa.

- Escala fácil: adicionar uma nova etapa é simples.

- Otimiza performance (payloads menores).

const handleNextStep = async () => {
setIsLoading(true);
setError(null);
const fieldsToValidate = STEP_FIELDS[currentStep];

    const isValid = await form.trigger(fieldsToValidate, { shouldFocus: true });
    if (!isValid) {
      setIsLoading(false);
      return;
    }

    try {
      let dataToSave;
      let apiResponse;

      if (currentStep === 1) {
        dataToSave = form.getValues("owner");
        apiResponse = await saveStepData(1, dataToSave);

        setPersistentIds((prev) => ({ ...prev, userId: apiResponse.userId }));
      } else if (currentStep === 2) {
        dataToSave = form.getValues("store");
        apiResponse = await saveStepData(2, dataToSave);
        setPersistentIds((prev) => ({
          ...prev,
          restaurantId: apiResponse.restaurantId,
        }));
      } else if (currentStep === 3) {
        dataToSave = form.getValues();
        apiResponse = await saveStepData(3, dataToSave);
      }

      setCurrentStep((prev) => prev + 1);
    } catch (e) {
      setError(e.message);
      console.error(e);
    } finally {
      setIsLoading(false);
    }

};

const handleFinalSubmit = async () => {
const formData = form.getValues();

// Verifica slug disponível apenas no final
const slugCheck = await fetch(`/api/stores/check-slug?slug=${formData.store.slug}`);
const { available } = await slugCheck.json();

if (!available) {
form.setError("store.slug", {
type: "manual",
message: "Este link já está em uso"
});
return;
}

// Continua com o submit...
};
