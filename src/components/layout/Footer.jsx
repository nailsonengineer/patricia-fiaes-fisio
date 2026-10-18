import React from 'react';
import { PROFESSIONAL_DATA } from '../../data/professional';
import { Share2, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-teal-950 text-white pt-16 pb-8 border-t border-teal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-teal-900/60">
          
          {/* COLUNA 1 - MARCA */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white text-teal-950 flex items-center justify-center font-serif font-bold text-lg">
                PF
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg">{PROFESSIONAL_DATA.name}</h3>
                <p className="text-xs text-teal-300">CREFITO {PROFESSIONAL_DATA.crefito}</p>
              </div>
            </div>
            <p className="text-sm text-teal-100/80 leading-relaxed">
              Fisioterapia individualizada com foco em movimento, funcionalidade e qualidade de vida. Atendimento humanizado e embasado cientificamente.
            </p>
          </div>

          {/* COLUNA 2 - LINKS */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-teal-200 tracking-wider uppercase">Navegação</h4>
            <ul className="space-y-2 text-sm text-teal-100/80">
              <li><a href="#inicio" className="hover:text-white transition">Início</a></li>
              <li><a href="#servicos" className="hover:text-white transition">Serviços</a></li>
              <li><a href="#sobre" className="hover:text-white transition">Sobre a Profissional</a></li>
              <li><a href="#galeria" className="hover:text-white transition">Galeria</a></li>
              <li><a href="#conteudos" className="hover:text-white transition">Conteúdos Gratuitos</a></li>
            </ul>
          </div>

          {/* COLUNA 3 - CONTATO */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-teal-200 tracking-wider uppercase">Contato</h4>
            <ul className="space-y-2.5 text-sm text-teal-100/80">
              <li className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-teal-300 shrink-0" />
                <a href={PROFESSIONAL_DATA.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {PROFESSIONAL_DATA.instagram}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-300 shrink-0" />
                <span>{PROFESSIONAL_DATA.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-300 shrink-0 mt-1" />
                <span>{PROFESSIONAL_DATA.address}</span>
              </li>
            </ul>
          </div>

          {/* COLUNA 4 - AVISO LEGAL */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-teal-200 tracking-wider uppercase">Aviso Importante</h4>
            <p className="text-xs text-teal-200/70 leading-relaxed">
              As informações contidas neste site possuem caráter estritamente educativo e informativo. Não substituem a avaliação fisioterapêutica ou médica presencial e individualizada.
            </p>
          </div>
        </div>

        {/* RODAPÉ INFERIOR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-teal-300/70 gap-4">
          <p>© {new Date().getFullYear()} Patrícia Fiaes Fisioterapia. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Desenvolvido com <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> para alta performance
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;