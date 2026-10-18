import React, { useState } from 'react';
import { PROFESSIONAL_DATA } from '../../data/professional';
import { SERVICES_DATA } from '../../data/services';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { Send, Phone, Mail, Share2, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Fisioterapia Ortopédica',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = buildWhatsAppUrl(
      PROFESSIONAL_DATA.phone,
      formData.service,
      formData.name,
      formData.message
    );
    window.open(url, '_blank');
  };

  return (
    <section id="contato" className="py-20 bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-800">Entre em Contato</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-teal-950">
            Vamos conversar sobre sua saúde e seu movimento?
          </h2>
          <p className="text-gray-600 text-base">
            Entre em contato para tirar dúvidas sobre os atendimentos ou solicitar seu agendamento.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* INFORMAÇÕES DE CONTATO */}
          <div className="lg:col-span-5 space-y-8 bg-teal-950 text-white p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold">Informações Diretas</h3>
              <p className="text-teal-200/80 text-sm leading-relaxed">
                Estou à disposição para responder suas dúvidas sobre tratamentos, indicações e disponibilidade.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 text-sm text-teal-100">
                  <Share2 className="w-5 h-5 text-teal-400 shrink-0" />
                  <a href={PROFESSIONAL_DATA.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {PROFESSIONAL_DATA.instagram}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-teal-100">
                  <Mail className="w-5 h-5 text-teal-400 shrink-0" />
                  <span>{PROFESSIONAL_DATA.email}</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-teal-100">
                  <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <span>{PROFESSIONAL_DATA.address}</span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-teal-900/80 text-xs text-teal-300/60">
              Atendimento mediante agendamento prévio.
            </div>
          </div>

          {/* FORMULÁRIO DE CONTATO */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Seu Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Maria Silva"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/20 focus:border-teal-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Telefone / WhatsApp (Opcional)
                </label>
                <input
                  type="tel"
                  placeholder="(71) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/20 focus:border-teal-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Serviço de Interesse
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/20 focus:border-teal-900 bg-white"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                  <option value="Consulta Geral">Outro / Dúvida Geral</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Sua Mensagem
                </label>
                <textarea
                  rows="4"
                  placeholder="Conte resumidamente o que está sentindo ou qual a sua dúvida..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/20 focus:border-teal-900"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-teal-900 text-white py-3.5 rounded-xl font-medium text-sm hover:bg-teal-800 transition shadow-md"
              >
                <Send className="w-4 h-4" />
                Enviar pelo WhatsApp
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;