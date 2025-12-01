import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const Confirmation = () => {
  return (
    <div className="space-y-6">
      <div className="border-b-2 border-gray-200 pb-2">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <CheckCircle className="h-6 w-6" />
          Confirmação
        </h2>
      </div>
      <div className="rounded-lg border-2 border-green-200 bg-green-50 p-6">
        <div className="text-center">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-600" />
          <h3 className="mb-2 text-xl font-semibold text-green-800">
            Tudo Pronto!
          </h3>
          <p className="text-green-700">
            Revise os dados abaixo e clique em "Finalizar Cadastro" para ativar
            seu dashboard.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <h4 className="mb-3 font-semibold text-gray-900">Dados do Dono</h4>
            <p>
              <strong>Nome:</strong> xxx xxxx
            </p>
            <p>
              <strong>Email:</strong> xxx xxxx
            </p>
            <p>
              <strong>Telefone:</strong> xxx xxxx
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="mb-3 font-semibold text-gray-900">
              Dados da Pizzaria
            </h4>
            <p>
              <strong>Nome:</strong> xxx xxxxx
            </p>
            <p>
              <strong>Endereço:</strong> xxx xxxxx
            </p>
            <p>
              <strong>Cidade/UF:</strong> xxx xxxxx - xxx xxxxx
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <h4 className="mb-3 font-semibold text-gray-900">Cardápio</h4>
            <p>
              <strong>Produtos cadastrados:</strong> xxx xxxxx
            </p>
            {/* <div className="mt-2 space-y-1">
                        {formData.menu.categories[0].products.filter(p => p.name).map((product, index) => (
                          <div key={index} className="flex justify-between">
                            <span>{product.name}</span>
                            <span>R$ {product.price}</span>
                          </div>
                        ))}
                      </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Confirmation;
