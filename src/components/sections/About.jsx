import React from 'react';
import { PROFESSIONAL_DATA } from '../../data/professional';
import { GraduationCap, Award, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* FOTO / IMAGEM DE APRESENTAÇÃO */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"
                alt="Patrícia Fiaes Fisioterapeuta"
                className="w-full h-auto object-cover"
              />
              <div className="p-6 bg-teal-950 text-white">
                <p className="text-xs uppercase tracking-widest text-teal-300 font-semibold">Registro Profissional</p>
                <p className="font-serif text-xl font-bold">CREFITO {PROFESSIONAL_DATA.crefito}</p>
              </div>
            </div>
          </div>

          {/* TEXTO EDITORIAL */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-800">Conheça a Profissional</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-teal-950">
                Conheça a profissional por trás de cada cuidado.
              </h2>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              {PROFESSIONAL_DATA.aboutStory.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* FORMAÇÃO ACADÊMICA */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <h3 className="flex items-center gap-2 text-base font-bold text-teal-950">
                <GraduationCap className="w-5 h-5 text-teal-800" />
                Formação Acadêmica
              </h3>
              <ul className="space-y-1.5 text-sm text-gray-600 pl-7 list-disc">
                {PROFESSIONAL_DATA.academic.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* ESPECIALIZAÇÕES E APERFEIÇOAMENTOS */}
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-base font-bold text-teal-950">
                <Award className="w-5 h-5 text-teal-800" />
                Formações & Aperfeiçoamentos
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                {PROFESSIONAL_DATA.certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 bg-teal-50/50 p-2 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-teal-700 shrink-0" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD DE DIFERENCIAL */}
            <div className="p-5 rounded-2xl bg-teal-900 text-white space-y-2 shadow-md">
              <h4 className="font-serif font-bold text-base text-teal-100">Um cuidado que considera você por inteiro</h4>
              <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
                {PROFESSIONAL_DATA.differentials}
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;