export const PLANS_DATA = [
  {
    id: "avaliacao",
    name: "Avaliação Fisioterapêutica",
    sessions: "1 Sessão (60 min)",
    price: "Consulte valores",
    isPlaceholderPrice: true,
    description: "Análise clínica minuciosa, testes biomecânicos e elaboração do plano de tratamento personalizado.",
    features: [
      "Análise postural e funcional",
      "Testes específicos ortopédicos",
      "Definição de metas terapêuticas",
      "Relatório direcionado"
    ],
    checkoutUrl: null // Pode receber link do Mercado Pago no futuro
  },
  {
    id: "sessao-avulsa",
    name: "Atendimento Individual",
    sessions: "Sessão Avulsa",
    price: "Consulte valores",
    isPlaceholderPrice: true,
    description: "Sessão focada em necessidades imediatas, alívio de quadros dolorosos agudos ou manutenção.",
    features: [
      "Atendimento 100% individualizado",
      "Uso de Terapia Manual e Recursos Específicos",
      "Exercícios terapêuticos direcionados",
      "Acompanhamento direto"
    ],
    checkoutUrl: null
  },
  {
    id: "pacote-reabilitacao",
    name: "Pacote de Reabilitação",
    sessions: "Plano Continuado",
    price: "Consulte condições",
    isPlaceholderPrice: true,
    popular: true,
    description: "Tratamento completo para reabilitação ortopédica, pós-operatória ou dores crônicas com acompanhamento de evolução.",
    features: [
      "Frequência planejada sob medida",
      "Reavaliações de progresso periódicas",
      "Suporte para dúvidas via WhatsApp",
      "Prioridade na escolha de horários"
    ],
    checkoutUrl: null
  }
];