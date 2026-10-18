import React from 'react';
import { PROFESSIONAL_DATA } from '../../data/professional';
import { Calendar, Award, CheckCircle2, ArrowRight } from 'lucide-react';

const Hero = ({ onBookClick }) => {
  return (
    <section id="inicio" className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-teal-50/50 via-white to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LADO ESQUERDO: TEXTO */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-teal-100/80 text-teal-900 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Award className="w-4 h-4 text-teal-800" />
              <span>{PROFESSIONAL_DATA.title} | CREFITO {PROFESSIONAL_DATA.crefito}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-teal-950 leading-tight">
              {PROFESSIONAL_DATA.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {PROFESSIONAL_DATA.heroSubheadline}
            </p>

            {/* BOTÕES DE AÇÃO */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-900 text-white px-7 py-3.5 rounded-xl font-medium shadow-lg hover:bg-teal-800 transition hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5" />
                Agendar minha avaliação
              </button>
              <a
                href="#servicos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-teal-900 border border-teal-900/20 px-7 py-3.5 rounded-xl font-medium hover:bg-teal-50 transition"
              >
                Conhecer tratamentos
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* DESTAQUES DE CREDIBILIDADE */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-left">
                <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Atuação desde 2017</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Sessões Individuais</span>
              </div>
              <div className="flex items-center gap-2 text-left col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Fisioterapia Ortopédica</span>
              </div>
            </div>
          </div>

          {/* LADO DIREITO: FOTO PROVISÓRIA COM COMPOSIÇÃO DESIGN */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
                alt="Fisioterapeuta Patrícia Fiaes em atendimento"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/40 via-transparent to-transparent"></div>
              
              {/* SELO FLUTUANTE */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 text-teal-950">
                <p className="font-serif text-sm font-bold">Atendimento Humanizado</p>
                <p className="text-xs text-gray-600">Cuidado focado na sua reabilitação real.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;