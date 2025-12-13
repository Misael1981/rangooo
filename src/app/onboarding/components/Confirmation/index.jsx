"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  User,
  Building,
  Utensils,
  Phone,
  Mail,
  MapPin,
  Clock,
  CreditCard,
} from "lucide-react";
import { useFormContext } from "react-hook-form";

const Confirmation = () => {
  const form = useFormContext();
  const formData = form.getValues();

  if (!formData) return <div>Carregando dados...</div>;

  const { owner, store, openingHours, menu } = formData;

  // Contadores
  const productsCount = menu?.products?.length || 0;
  const categoriesCount =
    menu?.menuCategory?.filter((cat) => cat.trim()).length || 0;
  const additionalIngredientsCount = menu?.additionalIngredients?.length || 0;

  // Horários formatados
  const formatTimeSlots = (timeSlots) => {
    if (!timeSlots || timeSlots.length === 0) return "Fechado";

    return timeSlots
      .map((slot) => {
        if (!slot.open || !slot.close) return "Horário incompleto";

        let typeLabel = "";
        switch (slot.type) {
          case "BREAKFAST":
            typeLabel = "☕ Café";
            break;
          case "LUNCH":
            typeLabel = "🍽️ Almoço";
            break;
          case "DINNER":
            typeLabel = "🌙 Jantar";
            break;
          case "SPECIAL":
            typeLabel = "⭐ Especial";
            break;
          default:
            typeLabel = "⏰";
        }

        return `${typeLabel} ${slot.open} às ${slot.close}`;
      })
      .join(", ");
  };

  // Dias da semana
  const weekDays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  return (
    <div className="space-y-6">
      <div className="border-b-2 border-gray-200 pb-4">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <CheckCircle className="h-6 w-6 text-green-600" />
          Confirmação Final
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Revise todos os dados antes de finalizar o cadastro
        </p>
      </div>

      {/* Banner de sucesso */}
      <div className="rounded-lg border-2 border-green-200 bg-green-50 p-6">
        <div className="text-center">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-600" />
          <h3 className="mb-2 text-xl font-semibold text-green-800">
            Tudo Pronto para Ativar!
          </h3>
          <p className="mx-auto max-w-2xl text-green-700">
            Seu estabelecimento será publicado imediatamente após a confirmação.
            Você será redirecionado para o dashboard de gerenciamento.
          </p>
        </div>
      </div>

      {/* Grid de resumo */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* DADOS DO DONO */}
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">
                Dados do Responsável
              </h4>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Nome completo</p>
                <p className="font-medium">{owner?.name || "Não informado"}</p>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Telefone/WhatsApp</p>
                  <p className="flex items-center gap-1 font-medium">
                    <Phone className="h-4 w-4" />
                    {owner?.phone || "Não informado"}
                  </p>
                </div>

                <div className="flex-1">
                  <p className="text-sm text-gray-500">E-mail</p>
                  <p className="flex items-center gap-1 font-medium">
                    <Mail className="h-4 w-4" />
                    {owner?.email || "Não informado"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DADOS DO ESTABELECIMENTO */}
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Building className="h-5 w-5 text-purple-600" />
              <h4 className="font-semibold text-gray-900">
                Dados do Estabelecimento
              </h4>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Nome do negócio</p>
                <p className="font-medium">{store?.name || "Não informado"}</p>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Categoria</p>
                  <p className="font-medium">
                    {store?.category || "Não informada"}
                  </p>
                </div>

                <div className="flex-1">
                  <p className="text-sm text-gray-500">URL única</p>
                  <p className="font-medium text-blue-600">
                    seuapp.com/{store?.slug || "sem-link"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Endereço completo</p>
                <p className="flex items-center gap-1 font-medium">
                  <MapPin className="h-4 w-4" />
                  {store?.street && store?.number && store?.city
                    ? `${store.street}, ${store.number} - ${store.neighborhood}, ${store.city}/${store.state}`
                    : "Endereço incompleto"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* HORÁRIOS DE FUNCIONAMENTO */}
        <Card className="border-l-4 border-l-amber-500 md:col-span-2">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-600" />
              <h4 className="font-semibold text-gray-900">
                Horário de Funcionamento
              </h4>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {openingHours?.businessHours?.map((day, index) => {
                const isClosed = day.isClosed;
                const timeSlots = day.timeSlots || [];

                return (
                  <div
                    key={index}
                    className={`rounded-lg border p-3 ${isClosed ? "bg-gray-50" : "bg-white"}`}
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <span className="font-medium">
                        {weekDays[day.dayOfWeek] || `Dia ${index + 1}`}
                      </span>
                      {isClosed ? (
                        <span className="rounded bg-red-100 px-2 py-1 text-xs text-red-800">
                          Fechado
                        </span>
                      ) : timeSlots.length > 0 ? (
                        <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                          Aberto
                        </span>
                      ) : (
                        <span className="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                          Sem horário
                        </span>
                      )}
                    </div>

                    {!isClosed && timeSlots.length > 0 && (
                      <div className="space-y-1 text-sm">
                        {timeSlots.map((slot, idx) => (
                          <div key={idx} className="text-gray-600">
                            {slot.open && slot.close
                              ? `${slot.open} às ${slot.close}`
                              : "Horário incompleto"}
                          </div>
                        ))}
                      </div>
                    )}

                    {!isClosed && timeSlots.length === 0 && (
                      <p className="text-sm text-gray-500">
                        Horários não configurados
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* MÉTODOS DE PAGAMENTO E CONSUMO */}
        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-emerald-600" />
              <h4 className="font-semibold text-gray-900">Métodos Aceitos</h4>
            </div>

            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm text-gray-500">Formas de consumo</p>
                <div className="flex flex-wrap gap-2">
                  {store?.consumptionMethods?.map((method, idx) => {
                    let label = "";
                    switch (method) {
                      case "DELIVERY":
                        label = "🚚 Delivery";
                        break;
                      case "PICKUP":
                        label = "📦 Retirada";
                        break;
                      case "DINE_IN":
                        label = "🍽️ No local";
                        break;
                      default:
                        label = method;
                    }
                    return (
                      <span
                        key={idx}
                        className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800"
                      >
                        {label}
                      </span>
                    );
                  })}
                  {(!store?.consumptionMethods ||
                    store.consumptionMethods.length === 0) && (
                    <span className="text-sm text-gray-500">
                      Nenhum método selecionado
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm text-gray-500">
                  Formas de pagamento
                </p>
                <div className="flex flex-wrap gap-2">
                  {store?.paymentMethods?.map((method, idx) => {
                    let label = "";
                    switch (method) {
                      case "CREDIT_CARD":
                        label = "💳 Crédito";
                        break;
                      case "DEBIT_CARD":
                        label = "💳 Débito";
                        break;
                      case "PIX":
                        label = "📱 PIX";
                        break;
                      case "CASH":
                        label = "💵 Dinheiro";
                        break;
                      case "BANK_TRANSFER":
                        label = "🏦 Transferência";
                        break;
                      default:
                        label = method;
                    }
                    return (
                      <span
                        key={idx}
                        className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-800"
                      >
                        {label}
                      </span>
                    );
                  })}
                  {(!store?.paymentMethods ||
                    store.paymentMethods.length === 0) && (
                    <span className="text-sm text-gray-500">
                      Nenhum método selecionado
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RESUMO DO CARDÁPIO */}
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Utensils className="h-5 w-5 text-orange-600" />
              <h4 className="font-semibold text-gray-900">
                Resumo do Cardápio
              </h4>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="rounded-lg bg-blue-50 p-3">
                  <p className="text-2xl font-bold text-blue-700">
                    {categoriesCount}
                  </p>
                  <p className="text-xs text-blue-600">Categorias</p>
                </div>
                <div className="rounded-lg bg-green-50 p-3">
                  <p className="text-2xl font-bold text-green-700">
                    {productsCount}
                  </p>
                  <p className="text-xs text-green-600">Produtos</p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <p className="text-2xl font-bold text-purple-700">
                    {additionalIngredientsCount}
                  </p>
                  <p className="text-xs text-purple-600">Extras</p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm text-gray-500">
                  Categorias criadas:
                </p>
                <div className="flex flex-wrap gap-2">
                  {menu?.menuCategory
                    ?.filter((cat) => cat.trim())
                    .map((cat, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800"
                      >
                        {cat}
                      </span>
                    )) || (
                    <span className="text-sm text-gray-500">
                      Nenhuma categoria
                    </span>
                  )}
                </div>
              </div>

              {menu?.additionalIngredients &&
                menu.additionalIngredients.length > 0 && (
                  <div>
                    <p className="mb-2 text-sm text-gray-500">
                      Ingredientes extras:
                    </p>
                    <div className="space-y-2">
                      {menu.additionalIngredients.map((ing, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between border-b pb-2"
                        >
                          <span className="text-sm">{ing.name}</span>
                          <span className="text-sm font-medium text-green-600">
                            + R$ {ing.price?.toFixed(2) || "0.00"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              <div>
                <p className="mb-2 text-sm text-gray-500">
                  Produtos por categoria:
                </p>
                <div className="space-y-2">
                  {menu?.menuCategory
                    ?.filter((cat) => cat.trim())
                    .map((category, idx) => {
                      const productsInCategory =
                        menu?.products?.filter(
                          (p) => p.category === category,
                        ) || [];
                      return (
                        <div key={idx} className="text-sm">
                          <span className="font-medium">{category}:</span>
                          <span className="ml-2 text-gray-600">
                            {productsInCategory.length} produto
                            {productsInCategory.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Aviso de revisão */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-amber-100 p-2">
            <CheckCircle className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h4 className="font-medium text-amber-800">Revise com atenção!</h4>
            <p className="mt-1 text-sm text-amber-700">
              Após finalizar, você poderá editar essas informações no dashboard.
              Verifique principalmente: horários de funcionamento, preços e
              métodos de pagamento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
