// app/terms/page.jsx
export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Termos e Condições</h1>
          <p className="mt-2 text-muted-foreground">
            Última atualização: {new Date().toLocaleDateString("pt-BR")}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          {/* Termos de Uso */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold">1. Termos de Uso</h2>

            <div className="space-y-4">
              <p>
                Ao utilizar nosso serviço de delivery, você concorda com estes
                termos. Leia-os atentamente antes de fazer seu pedido.
              </p>

              <h3 className="mt-6 text-xl font-semibold">
                1.1. Cadastro e Conta
              </h3>
              <ul className="list-disc space-y-2 pl-6">
                <li>Você deve fornecer informações verdadeiras no cadastro</li>
                <li>É de sua responsabilidade manter a segurança da conta</li>
                <li>
                  Menores de 18 anos devem estar acompanhados de responsáveis
                </li>
                <li>
                  Reservamos o direito de suspender contas em caso de violação
                  dos termos
                </li>
              </ul>

              <h3 className="mt-6 text-xl font-semibold">
                1.2. Realização de Pedidos
              </h3>
              <ul className="list-disc space-y-2 pl-6">
                <li>Os preços podem variar de acordo com o estabelecimento</li>
                <li>Taxas de entrega são calculadas com base na localização</li>
                <li>
                  Pedidos confirmados não podem ser cancelados após o início do
                  preparo
                </li>
                <li>
                  Estabelecimentos têm até 60 minutos para aceitar ou recusar
                  pedidos
                </li>
              </ul>

              <h3 className="mt-6 text-xl font-semibold">1.3. Pagamentos</h3>
              <ul className="list-disc space-y-2 pl-6">
                <li>Aceitamos PIX, cartão de crédito/débito e dinheiro</li>
                <li>Pagamentos online são processados por gateways seguros</li>
                <li>
                  Em caso de pagamento em dinheiro, tenha o valor exato ou
                  informe necessidade de troco
                </li>
                <li>Reembolsos seguem a política de cada estabelecimento</li>
              </ul>
            </div>
          </section>

          {/* Política de Privacidade */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold">
              2. Política de Privacidade
            </h2>

            <div className="space-y-4">
              <p className="text-lg font-semibold">
                Sua privacidade é importante para nós. Coletamos apenas dados
                necessários para proporcionar a melhor experiência de delivery.
              </p>

              <h3 className="mt-6 text-xl font-semibold">
                2.1. Dados que Coletamos
              </h3>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Dados pessoais:</strong> nome, e-mail, telefone - para
                  criar sua conta e entregar pedidos
                </li>
                <li>
                  <strong>Localização:</strong> endereço completo - apenas para
                  calcular frete e realizar entregas
                </li>
                <li>
                  <strong>Dados de pagamento:</strong> processados de forma
                  segura pelos provedores de pagamento
                </li>
                <li>
                  <strong>Dados de uso:</strong> histórico de pedidos - para
                  melhorar nossos serviços
                </li>
              </ul>

              <h3 className="mt-6 text-xl font-semibold">
                2.2. Como Usamos Seus Dados
              </h3>
              <ul className="list-disc space-y-2 pl-6">
                <li>Processar e entregar seus pedidos</li>
                <li>Enviar atualizações sobre o status das entregas</li>
                <li>Melhorar nossos serviços e experiência do usuário</li>
                <li>Enviar ofertas personalizadas (quando autorizado)</li>
                <li>Prevenir fraudes e garantir a segurança</li>
              </ul>

              <div className="my-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="font-semibold text-blue-800">
                  Seus dados NUNCA serão vendidos ou compartilhados com
                  terceiros para fins de marketing sem sua autorização
                  explícita.
                </p>
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                2.3. Compartilhamento com Estabelecimentos
              </h3>
              <p>
                Para que seu pedido seja processado, compartilhamos com o
                estabelecimento:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Seu nome e telefone para contato sobre o pedido</li>
                <li>Endereço completo para entrega (apenas em deliveries)</li>
                <li>Itens do pedido e observações</li>
                <li>Forma de pagamento escolhida</li>
              </ul>

              <h3 className="mt-6 text-xl font-semibold">2.4. Seus Direitos</h3>
              <ul className="list-disc space-y-2 pl-6">
                <li>Acessar todos os dados que temos sobre você</li>
                <li>Corrigir informações desatualizadas ou incorretas</li>
                <li>Solicitar a exclusão de sua conta e dados</li>
                <li>Revogar consentimentos a qualquer momento</li>
                <li>Exportar seus dados em formato legível</li>
              </ul>
            </div>
          </section>

          {/* Responsabilidades */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold">3. Responsabilidades</h2>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">3.1. Do Usuário</h3>
              <ul className="list-disc space-y-2 pl-6">
                <li>Fornecer informações verdadeiras e atualizadas</li>
                <li>
                  Estar disponível no telefone informado durante a entrega
                </li>
                <li>Informar endereço completo e corretos</li>
                <li>Verificar os itens do pedido no momento da entrega</li>
              </ul>

              <h3 className="mt-6 text-xl font-semibold">3.2. Da Plataforma</h3>
              <ul className="list-disc space-y-2 pl-6">
                <li>Garantir a segurança dos dados dos usuários</li>
                <li>Manter a plataforma funcionando adequadamente</li>
                <li>Mediar conflitos entre usuários e estabelecimentos</li>
                <li>Oferecer suporte técnico quando necessário</li>
              </ul>

              <h3 className="mt-6 text-xl font-semibold">
                3.3. Dos Estabelecimentos
              </h3>
              <ul className="list-disc space-y-2 pl-6">
                <li>Preparar os pedidos dentro do tempo estimado</li>
                <li>Manter a qualidade dos produtos</li>
                <li>Informar corretamente preços e disponibilidade</li>
                <li>Tratar dados dos usuários com confidencialidade</li>
              </ul>
            </div>
          </section>

          {/* Contato e Suporte */}
          <section>
            <h2 className="mb-6 text-2xl font-bold">4. Contato</h2>

            <div className="space-y-4">
              <p>
                Em caso de dúvidas sobre estes Termos ou Política de
                Privacidade, entre em contato conosco:
              </p>

              <div className="rounded-lg bg-muted p-4">
                <p>
                  <strong>E-mail:</strong> misaelborges1981@gmail.com
                </p>
                <p>
                  <strong>WhatsApp:</strong> (35) 99911-0933
                </p>
                <p>
                  <strong>Horário de atendimento:</strong> Segunda a Sábado, 8h
                  às 18h
                </p>
              </div>

              <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="text-sm text-green-800">
                  <strong>Transparência é nosso compromisso!</strong> Estamos
                  sempre disponíveis para esclarecer como seus dados são
                  utilizados e para garantir que sua experiência seja segura e
                  agradável.
                </p>
              </div>
            </div>
          </section>

          {/* Rodapé */}
          <div className="mt-12 border-t pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Estes termos podem ser atualizados periodicamente. Alterações
              significativas serão comunicadas por e-mail.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
