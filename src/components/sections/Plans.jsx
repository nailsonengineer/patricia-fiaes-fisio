import React from 'react';
import { PLANS_DATA } from '../../data/plans';
import { PROFESSIONAL_DATA } from '../../data/professional';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { Check, Calendar, CreditCard, ShieldAlert } from 'lucide-react';

const Plans = () => {
  return (
    <section id="planos" className="py-20 bg-gray-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CABEÇALHO */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-800">Planos e Atendimentos</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-teal-950">
            Escolha a forma de cuidado ideal para você
          </h2>
          <p className="text-gray-600 text-base">
            Conheça as opções de acompanhamento fisioterapêutico e encontre uma alternativa adequada às suas necessidades.
          </p>
        </div>

        {/* CARDS DE PLANOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS_DATA.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl p-8 border transition duration-300 flex flex-col justify-between ${
                plan.popular
                  ? 'border-teal-900 shadow-xl ring-2 ring-teal-900/10'
                  : 'border-gray-100 shadow-sm hover:shadow-md'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-teal-900 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow">
                  Recomendado
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-2xl text-teal-950">{plan.name}</h3>
                  <p className="text-xs font-semibold text-teal-800 mt-1">{plan.sessions}</p>
                </div>

                <div className="py-3 border-y border-gray-100">
                  <span className="text-xl font-bold text-gray-800">{plan.price}</span>
                  {plan.isPlaceholderPrice && (
                    <p className="text-[11px] text-gray-500 mt-1">Consulte condições específicas sob avaliação</p>
                  )}
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">{plan.description}</p>

                <ul className="space-y-3 pt-2">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                      <Check className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* BOTÃO DE AÇÃO / PAGAMENTO OU WHATSAPP */}
              <div className="pt-8">
                {plan.checkoutUrl ? (
                  <a
                    href={plan.checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-teal-900 text-white py-3 rounded-xl font-medium text-sm hover:bg-teal-800 transition"
                  >
                    <CreditCard className="w-4 h-4" />
                    Contratar Plano Online
                  </a>
                ) : (
                  <a
                    href={buildWhatsAppUrl(PROFESSIONAL_DATA.phone, plan.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-white text-teal-900 border border-teal-900/30 py-3 rounded-xl font-medium text-sm hover:bg-teal-50 transition"
                  >
                    <Calendar className="w-4 h-4 text-teal-800" />
                    Consultar Disponibilidade
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* NOTA DE TRANSPARÊNCIA */}
        <div className="mt-8 text-center text-xs text-gray-500 flex items-center justify-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-gray-400" />
          Os valores oficiais e o plano terapêutico definitivo serão definidos após a avaliação presencial.
        </div>

      </div>
    </section>
  );
};

export default Plans;