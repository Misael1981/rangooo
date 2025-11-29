// app/onboarding/page.jsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Building,
  User,
  Pizza,
  CheckCircle,
  MapPin,
  Phone,
  DollarSign,
} from "lucide-react";

const OnboardingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Dados do formulário
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

  // Atualizar dados do formulário
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

  // Submissão final
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

  // Steps do formulário
  const steps = [
    { number: 1, title: "Dados do Dono", icon: User },
    { number: 2, title: "Dados da Pizzaria", icon: Building },
    { number: 3, title: "Cardápio", icon: Pizza },
    { number: 4, title: "Confirmação", icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Complete seu Cadastro
          </h1>
          <p className="text-lg text-gray-600">
            Preencha os dados da sua pizzaria para começar a vender
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12 flex justify-center">
          <div className="flex items-center space-x-8">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = step.number === currentStep;
              const isCompleted = step.number < currentStep;

              return (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`flex flex-col items-center ${
                      isActive
                        ? "text-orange-600"
                        : isCompleted
                          ? "text-green-600"
                          : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                        isActive
                          ? "border-orange-600 bg-orange-50"
                          : isCompleted
                            ? "border-green-600 bg-green-50"
                            : "border-gray-300 bg-white"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <StepIcon className="h-6 w-6" />
                      )}
                    </div>
                    <span className="mt-2 text-sm font-medium">
                      {step.title}
                    </span>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`mx-4 h-0.5 w-16 ${
                        isCompleted ? "bg-green-600" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <Card className="border-2 border-orange-100 shadow-lg">
          <CardContent className="p-8">
            {/* Step 1: Dados do Dono */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                  <User className="h-6 w-6" />
                  Dados do Responsável
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Nome Completo *</Label>
                    <Input
                      id="ownerName"
                      value={formData.owner.name}
                      onChange={(e) =>
                        updateFormData("owner", "name", e.target.value)
                      }
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ownerEmail">Email *</Label>
                    <Input
                      id="ownerEmail"
                      type="email"
                      value={formData.owner.email}
                      onChange={(e) =>
                        updateFormData("owner", "email", e.target.value)
                      }
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ownerPhone">Telefone/WhatsApp *</Label>
                    <Input
                      id="ownerPhone"
                      value={formData.owner.phone}
                      onChange={(e) =>
                        updateFormData("owner", "phone", e.target.value)
                      }
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Senha *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.owner.password}
                      onChange={(e) =>
                        updateFormData("owner", "password", e.target.value)
                      }
                      placeholder="Crie uma senha segura"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.owner.confirmPassword}
                      onChange={(e) =>
                        updateFormData(
                          "owner",
                          "confirmPassword",
                          e.target.value,
                        )
                      }
                      placeholder="Digite a senha novamente"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Dados da Pizzaria */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                  <Building className="h-6 w-6" />
                  Dados da Pizzaria
                </h2>

                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="restaurantName">Nome da Pizzaria *</Label>
                    <Input
                      id="restaurantName"
                      value={formData.restaurant.name}
                      onChange={(e) =>
                        updateFormData("restaurant", "name", e.target.value)
                      }
                      placeholder="Ex: Pizzaria do Zé"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={formData.restaurant.description}
                      onChange={(e) =>
                        updateFormData(
                          "restaurant",
                          "description",
                          e.target.value,
                        )
                      }
                      placeholder="Descreva sua pizzaria..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="address">Endereço Completo *</Label>
                      <Input
                        id="address"
                        value={formData.restaurant.address}
                        onChange={(e) =>
                          updateFormData(
                            "restaurant",
                            "address",
                            e.target.value,
                          )
                        }
                        placeholder="Rua, número, bairro"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade *</Label>
                        <Input
                          id="city"
                          value={formData.restaurant.city}
                          onChange={(e) =>
                            updateFormData("restaurant", "city", e.target.value)
                          }
                          placeholder="São Paulo"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">Estado *</Label>
                        <Input
                          id="state"
                          value={formData.restaurant.state}
                          onChange={(e) =>
                            updateFormData(
                              "restaurant",
                              "state",
                              e.target.value,
                            )
                          }
                          placeholder="SP"
                          maxLength={2}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contatos */}
                  <div className="space-y-4">
                    <Label>Contatos da Pizzaria</Label>
                    {formData.restaurant.contacts.map((contact, index) => (
                      <div key={index} className="flex items-end gap-4">
                        <div className="flex-1">
                          <Label>Número do WhatsApp *</Label>
                          <Input
                            value={contact.number}
                            onChange={(e) => {
                              const newContacts = [
                                ...formData.restaurant.contacts,
                              ];
                              newContacts[index].number = e.target.value;
                              updateFormData(
                                "restaurant",
                                "contacts",
                                newContacts,
                              );
                            }}
                            placeholder="(11) 99999-9999"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Cardápio */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                  <Pizza className="h-6 w-6" />
                  Configurar Cardápio
                </h2>

                <div className="space-y-6">
                  {formData.menu.categories.map((category, categoryIndex) => (
                    <div
                      key={category.id}
                      className="rounded-lg border-2 border-orange-200 p-6"
                    >
                      <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        {category.name}
                      </h3>

                      {/* Produtos da categoria */}
                      <div className="space-y-4">
                        {category.products.map((product, productIndex) => (
                          <div
                            key={productIndex}
                            className="grid grid-cols-1 gap-4 rounded-lg bg-orange-50 p-4 md:grid-cols-2"
                          >
                            <div className="space-y-2">
                              <Label>Nome do Produto *</Label>
                              <Input
                                value={product.name}
                                onChange={(e) => {
                                  const newCategories = [
                                    ...formData.menu.categories,
                                  ];
                                  newCategories[categoryIndex].products[
                                    productIndex
                                  ].name = e.target.value;
                                  updateFormData(
                                    "menu",
                                    "categories",
                                    newCategories,
                                  );
                                }}
                                placeholder="Ex: Pizza Calabresa"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Preço *</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={product.price}
                                onChange={(e) => {
                                  const newCategories = [
                                    ...formData.menu.categories,
                                  ];
                                  newCategories[categoryIndex].products[
                                    productIndex
                                  ].price = e.target.value;
                                  updateFormData(
                                    "menu",
                                    "categories",
                                    newCategories,
                                  );
                                }}
                                placeholder="29.90"
                              />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                              <Label>Descrição</Label>
                              <Textarea
                                value={product.description}
                                onChange={(e) => {
                                  const newCategories = [
                                    ...formData.menu.categories,
                                  ];
                                  newCategories[categoryIndex].products[
                                    productIndex
                                  ].description = e.target.value;
                                  updateFormData(
                                    "menu",
                                    "categories",
                                    newCategories,
                                  );
                                }}
                                placeholder="Descreva o produto..."
                                rows={2}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const newCategories = [...formData.menu.categories];
                      newCategories[0].products.push({
                        name: "",
                        description: "",
                        price: "",
                        ingredients: [""],
                        imageUrl: "",
                      });
                      updateFormData("menu", "categories", newCategories);
                    }}
                  >
                    + Adicionar Produto
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmação */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                  <CheckCircle className="h-6 w-6" />
                  Confirmação
                </h2>

                <div className="rounded-lg border-2 border-green-200 bg-green-50 p-6">
                  <div className="text-center">
                    <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-600" />
                    <h3 className="mb-2 text-xl font-semibold text-green-800">
                      Tudo Pronto!
                    </h3>
                    <p className="text-green-700">
                      Revise os dados abaixo e clique em "Finalizar Cadastro"
                      para ativar sua pizzaria.
                    </p>
                  </div>
                </div>

                {/* Resumo dos dados */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="mb-3 font-semibold text-gray-900">
                        Dados do Dono
                      </h4>
                      <p>
                        <strong>Nome:</strong> {formData.owner.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {formData.owner.email}
                      </p>
                      <p>
                        <strong>Telefone:</strong> {formData.owner.phone}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="mb-3 font-semibold text-gray-900">
                        Dados da Pizzaria
                      </h4>
                      <p>
                        <strong>Nome:</strong> {formData.restaurant.name}
                      </p>
                      <p>
                        <strong>Endereço:</strong> {formData.restaurant.address}
                      </p>
                      <p>
                        <strong>Cidade/UF:</strong> {formData.restaurant.city} -{" "}
                        {formData.restaurant.state}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardContent className="p-4">
                      <h4 className="mb-3 font-semibold text-gray-900">
                        Cardápio
                      </h4>
                      <p>
                        <strong>Produtos cadastrados:</strong>{" "}
                        {
                          formData.menu.categories[0].products.filter(
                            (p) => p.name,
                          ).length
                        }
                      </p>
                      <div className="mt-2 space-y-1">
                        {formData.menu.categories[0].products
                          .filter((p) => p.name)
                          .map((product, index) => (
                            <div key={index} className="flex justify-between">
                              <span>{product.name}</span>
                              <span>R$ {product.price}</span>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between border-t border-gray-200 pt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                disabled={currentStep === 1 || isLoading}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  disabled={isLoading}
                >
                  Próximo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? "Finalizando..." : "Finalizar Cadastro"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingPage;
