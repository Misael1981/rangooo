import LeadCards from "./components/LeadCards";

const leadApplicationMock = {
  id: "clz9af03s0001v2xk2p0o8s9m",
  name: "João da Silva",
  email: "joao.silva@example.com",
  phone: "(11) 9 8765-4321",
  restaurantName: "Pizzaria Sabor da Massa",
  city: "São Paulo",
  state: "SP",
  notes: "Tem interesse em migrar do sistema atual. Pediu retorno à tarde.",
  status: "PENDING",
  approvedAt: null,
  approvedBy: null,
  createdAt: "2025-01-12T17:32:10.000Z",
};

export default function EstablishmentsPage() {
  return (
    <div className="px-6">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
        Gerenciar Estabelecimentos
      </h1>
      <section>
        <LeadCards leads={[leadApplicationMock]} />
      </section>
    </div>
  );
}
