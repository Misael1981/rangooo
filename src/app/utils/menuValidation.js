// utils/menuValidation.js
export const validateMenuForm = (formData) => {
  const errors = [];

  // Valida categorias
  if (!formData.menu?.menuCategory?.length) {
    errors.push("Adicione pelo menos uma categoria");
  } else {
    const uniqueCategories = new Set(formData.menu.menuCategory);
    if (uniqueCategories.size !== formData.menu.menuCategory.length) {
      errors.push("Categorias duplicadas não são permitidas");
    }
  }

  // Valida produtos
  if (!formData.menu?.products?.length) {
    errors.push("Adicione pelo menos um produto");
  } else {
    formData.menu.products.forEach((product, index) => {
      if (!product.name?.trim()) {
        errors.push(`Produto ${index + 1}: Nome é obrigatório`);
      }
      if (!product.price || product.price <= 0) {
        errors.push(`Produto ${index + 1}: Preço inválido`);
      }
      if (!product.category?.trim()) {
        errors.push(`Produto ${index + 1}: Selecione uma categoria`);
      }
      if (!product.ingredients?.length || !product.ingredients[0]?.trim()) {
        errors.push(`Produto ${index + 1}: Adicione pelo menos um ingrediente`);
      }
    });
  }

  return errors;
};
