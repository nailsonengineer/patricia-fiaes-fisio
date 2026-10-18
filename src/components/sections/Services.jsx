import React, { useState } from 'react';
import { SERVICES_DATA } from '../../data/services';
import DynamicIcon from '../ui/DynamicIcon';
import Modal from '../ui/Modal';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { PROFESSIONAL_DATA } from '../../data/professional';
import { ArrowRight, Calendar } from 'lucide-react';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="servicos" className="py-20 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CABEÇALHO DA SEÇÃO */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <h2 className="text-xs font-bold uppercase tracking-widest text-teal-800">Serviços Especializados</h2>
          <p className="font-serif text-3xl sm:text-4xl font-bold text-teal-950">
            Cuidado especializado para cada etapa da sua recuperação
          </p>
          <p className="text-gray-600 text-base">
            Tratamentos fisioterapêuticos planejados de acordo com suas necessidades, objetivos e condições individuais.
          </p>
        </div>

        {/* GRID DE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-xl hover:border-teal-900/20 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-900 flex items-center justify-center group-hover:bg-teal-900 group-hover:text-white transition-colors duration-300">
                  <DynamicIcon name={service.icon} className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-teal-950">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.shortDescription}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-50 flex items-center justify-between">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-sm font-semibold text-teal-900 hover:text-teal-700 inline-flex items-center gap-1"
                >
                  Saiba mais
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* MODAL DE DETALHES DO SERVIÇO */}
      {selectedService && (
        <Modal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={selectedService.title}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-teal-900">
              <div className="p-3 bg-teal-50 rounded-xl">
                <DynamicIcon name={selectedService.icon} className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-xl">{selectedService.title}</h4>
                <p className="text-xs text-gray-500">Atendimento Individualizado</p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {selectedService.fullDescription}
            </p>

            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50"
              >
                Fechar
              </button>
              <a
                href={buildWhatsAppUrl(PROFESSIONAL_DATA.phone, selectedService.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-teal-900 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-teal-800 transition"
              >
                <Calendar className="w-4 h-4" />
                Agendar {selectedService.title}
              </a>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Services;