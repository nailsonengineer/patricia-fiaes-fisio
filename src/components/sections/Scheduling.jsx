import React from 'react';
import { PROFESSIONAL_DATA } from '../../data/professional';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { Calendar, ExternalLink, MessageCircle } from 'lucide-react';

const Scheduling = () => {
  const isCalComConfigured = PROFESSIONAL_DATA.calComUrl && PROFESSIONAL_DATA.calComUrl !== "https://cal.com";

  return (
    <section id="agendamento" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-800">Agendamento Online</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-teal-950">
            Seu cuidado começa com o primeiro passo
          </h2>
          <p className="text-gray-600 text-base">
            Escolha um horário disponível e agende sua avaliação de maneira simples e prática.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-teal-50/50 rounded-3xl p-6 sm:p-10 border border-teal-900/10 shadow-sm text-center space-y-6">
          
          {isCalComConfigured ? (
            /* SE CAL.COM ESTIVER CONFIGURADO */
            <div className="space-y-4">
              <div className="aspect-[4/3] sm:aspect-video w-full rounded-2xl overflow-hidden border border-gray-200 bg-white">
                <iframe
                  src={PROFESSIONAL_DATA.calComUrl}
                  title="Agendamento de Consulta"
                  className="w-full h-full border-0"
                ></iframe>
              </div>
              <a
                href={PROFESSIONAL_DATA.calComUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-teal-900 hover:underline"
              >
                Abrir calendário em nova aba <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            /* FALLBACK AMIGÁVEL VIA WHATSAPP SE AINDA NÃO HOUVER INTEGRACÃO REAL */
            <div className="max-w-xl mx-auto space-y-6 py-6">
              <div className="w-16 h-16 rounded-full bg-teal-900 text-white flex items-center justify-center mx-auto shadow-md">
                <Calendar className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-2xl text-teal-950">Solicite seu horário diretamente</h3>
                <p className="text-sm text-gray-600">
                  Nosso sistema de agendamento automático está em atualização. Clique abaixo para verificar os horários de atendimento da semana no WhatsApp.
                </p>
              </div>

              <a
                href={buildWhatsAppUrl(PROFESSIONAL_DATA.phone, 'Consulta Geral')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-teal-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-teal-800 transition shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Agendar Horário pelo WhatsApp
              </a>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default Scheduling;