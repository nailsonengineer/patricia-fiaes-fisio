import React from 'react';

import { PROFESSIONAL_DATA } from '../../data/professional';

import {
  Share2,
  Mail,
  MapPin,
  Heart,
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Sobre a Profissional', href: '#sobre' },
    { label: 'Galeria', href: '#galeria' },
    { label: 'Conteúdos Gratuitos', href: '#conteudos' },
    { label: 'Planos', href: '#planos' },
    { label: 'Agendamento', href: '#agendamento' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <footer
      className="
        relative
        overflow-hidden
        bg-[#49382E]
        text-[#FFFEFB]
      "
    >
      {/* ==========================================
          ELEMENTOS DECORATIVOS
      ========================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-40 -top-40
          h-96 w-96
          rounded-full
          border border-[#C4A078]/10
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-28 -top-28
          h-72 w-72
          rounded-full
          border border-[#C4A078]/15
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -bottom-40 -left-40
          h-80 w-80
          rounded-full
          bg-[#C4A078]/5
          blur-3xl
        "
      />

      {/* ==========================================
          CONTEÚDO PRINCIPAL
      ========================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-20 sm:px-8 lg:px-10 lg:pt-24">

        {/* ==========================================
            CABEÇALHO DO RODAPÉ
        ========================================== */}

        <div
          className="
            mb-16
            flex
            flex-col
            gap-8
            border-b border-[#C4A078]/20
            pb-12
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div className="max-w-2xl">

            <div className="mb-5 flex items-center gap-3">

              <span className="h-px w-8 bg-[#C4A078]" />

              <span
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-[#C4A078]
                "
              >
                Cuidado que transforma
              </span>

            </div>

            <h2
              className="
                font-serif
                text-3xl
                font-normal
                leading-tight
                text-[#FFFEFB]
                sm:text-4xl
                lg:text-[42px]
              "
            >
              Seu movimento merece

              <span className="block italic text-[#C4A078]">
                atenção e cuidado.
              </span>
            </h2>

          </div>

          {/* BOTÃO DE AGENDAMENTO */}

          <a
            href="#agendamento"
            className="
              group
              inline-flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-xl
              bg-[#C4A078]
              px-7
              py-4
              text-sm
              font-semibold
              text-[#FFFEFB]
              shadow-lg
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-[#A9855D]
              sm:w-auto
            "
          >
            Agendar uma consulta

            <ArrowUpRight
              size={18}
              strokeWidth={1.7}
              className="
                transition-transform duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </a>

        </div>

        {/* ==========================================
            GRID PRINCIPAL
        ========================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-12
            pb-16
            sm:grid-cols-2
            lg:grid-cols-12
            lg:gap-10
          "
        >

          {/* ==========================================
              COLUNA 1 - MARCA
          ========================================== */}

          <div className="space-y-7 lg:col-span-4">

            {/* LOGOMARCA */}

            <a
              href="#inicio"
              aria-label="Voltar ao início"
              className="group inline-flex items-center gap-4"
            >

              <div
                className="
                  flex
                  h-14 w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  border border-[#C4A078]/40
                  bg-[#C4A078]/15
                  transition-all duration-300
                  group-hover:border-[#C4A078]
                  group-hover:bg-[#C4A078]/25
                "
              >
                <span
                  className="
                    font-serif
                    text-2xl
                    font-semibold
                    tracking-tight
                    text-[#E8DFD3]
                  "
                >
                  PF
                </span>
              </div>

              <div>

                <h3
                  className="
                    font-serif
                    text-xl
                    font-medium
                    leading-tight
                    text-[#FFFEFB]
                    sm:text-[22px]
                  "
                >
                  {PROFESSIONAL_DATA.name}
                </h3>

                <p
                  className="
                    mt-1
                    text-[10px]
                    uppercase
                    tracking-[0.17em]
                    text-[#C4A078]
                  "
                >
                  Fisioterapeuta
                </p>

                <p
                  className="
                    mt-1
                    text-[11px]
                    text-[#F1E9DC]/70
                  "
                >
                  CREFITO {PROFESSIONAL_DATA.crefito}
                </p>

              </div>

            </a>

            {/* DESCRIÇÃO */}

            <p
              className="
                max-w-sm
                text-sm
                leading-[1.9]
                text-[#F1E9DC]/80
              "
            >
              Fisioterapia individualizada com foco em
              movimento, funcionalidade e qualidade de vida.
              Um atendimento humanizado, acolhedor e
              fundamentado em conhecimento científico.
            </p>

            {/* ASSINATURA */}

            <div className="border-l-2 border-[#C4A078] pl-4">

              <p
                className="
                  font-serif
                  text-lg
                  italic
                  text-[#E8DFD3]
                "
              >
                Cuidar é também acolher.
              </p>

            </div>

          </div>

          {/* ==========================================
              COLUNA 2 - NAVEGAÇÃO
          ========================================== */}

          <div className="lg:col-span-2">

            <h4
              className="
                mb-7
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#C4A078]
              "
            >
              Navegação
            </h4>

            <ul className="space-y-4">

              {navigationLinks.map((link) => (

                <li key={link.href}>

                  <a
                    href={link.href}
                    className="
                      group
                      inline-flex
                      items-center
                      gap-2
                      text-[13px]
                      text-[#F1E9DC]/80
                      transition-all duration-300
                      hover:translate-x-1
                      hover:text-[#C4A078]
                    "
                  >
                    <ArrowRight
                      size={13}
                      strokeWidth={1.6}
                      className="
                        text-[#C4A078]/50
                        transition-colors
                        group-hover:text-[#C4A078]
                      "
                    />

                    {link.label}

                  </a>

                </li>

              ))}

            </ul>

          </div>

          {/* ==========================================
              COLUNA 3 - CONTATO
          ========================================== */}

          <div className="lg:col-span-3">

            <h4
              className="
                mb-7
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#C4A078]
              "
            >
              Entre em Contato
            </h4>

            <ul className="space-y-6">

              {/* INSTAGRAM */}

              <li className="flex items-start gap-3">

                <div
                  className="
                    flex
                    h-9 w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border border-[#C4A078]/20
                    bg-[#C4A078]/10
                  "
                >
                  <Share2
                    size={16}
                    strokeWidth={1.6}
                    className="text-[#C4A078]"
                  />
                </div>

                <div className="min-w-0">

                  <p className="mb-1 text-[10px] uppercase tracking-wider text-[#C4A078]">
                    Instagram
                  </p>

                  <a
                    href={PROFESSIONAL_DATA.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      break-all
                      text-[13px]
                      text-[#F1E9DC]/80
                      transition-colors
                      hover:text-[#C4A078]
                    "
                  >
                    {PROFESSIONAL_DATA.instagram}
                  </a>

                </div>

              </li>

              {/* E-MAIL */}

              <li className="flex items-start gap-3">

                <div
                  className="
                    flex
                    h-9 w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border border-[#C4A078]/20
                    bg-[#C4A078]/10
                  "
                >
                  <Mail
                    size={16}
                    strokeWidth={1.6}
                    className="text-[#C4A078]"
                  />
                </div>

                <div className="min-w-0">

                  <p className="mb-1 text-[10px] uppercase tracking-wider text-[#C4A078]">
                    E-mail
                  </p>

                  <a
                    href={`mailto:${PROFESSIONAL_DATA.email}`}
                    className="
                      break-all
                      text-[13px]
                      text-[#F1E9DC]/80
                      transition-colors
                      hover:text-[#C4A078]
                    "
                  >
                    {PROFESSIONAL_DATA.email}
                  </a>

                </div>

              </li>

              {/* ENDEREÇO */}

              <li className="flex items-start gap-3">

                <div
                  className="
                    flex
                    h-9 w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border border-[#C4A078]/20
                    bg-[#C4A078]/10
                  "
                >
                  <MapPin
                    size={16}
                    strokeWidth={1.6}
                    className="text-[#C4A078]"
                  />
                </div>

                <div className="min-w-0">

                  <p className="mb-1 text-[10px] uppercase tracking-wider text-[#C4A078]">
                    Localização
                  </p>

                  <p
                    className="
                      text-[13px]
                      leading-[1.8]
                      text-[#F1E9DC]/80
                    "
                  >
                    {PROFESSIONAL_DATA.address}
                  </p>

                </div>

              </li>

            </ul>

          </div>

          {/* ==========================================
              COLUNA 4 - AVISO LEGAL
          ========================================== */}

          <div className="lg:col-span-3">

            <h4
              className="
                mb-7
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#C4A078]
              "
            >
              Informações Importantes
            </h4>

            <div
              className="
                rounded-2xl
                border border-[#C4A078]/20
                bg-[#30251D]/40
                p-6
              "
            >

              <p
                className="
                  text-xs
                  leading-[1.9]
                  text-[#F1E9DC]/75
                "
              >
                As informações disponibilizadas neste site
                possuem caráter educativo e informativo.
                Não substituem uma avaliação fisioterapêutica
                ou médica individualizada.
              </p>

              <div
                className="
                  mt-5
                  border-t border-[#C4A078]/15
                  pt-5
                "
              >
                <p
                  className="
                    text-[11px]
                    leading-relaxed
                    text-[#C4A078]
                  "
                >
                  Atendimento mediante agendamento prévio.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ==========================================
          RODAPÉ INFERIOR
      ========================================== */}

      <div
        className="
          relative
          z-10
          border-t border-[#C4A078]/15
          bg-[#30251D]
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-center
            justify-between
            gap-5
            px-5
            py-7
            text-center
            sm:px-8
            lg:flex-row
            lg:px-10
            lg:text-left
          "
        >

          {/* COPYRIGHT */}

          <p
            className="
              text-[11px]
              leading-relaxed
              text-[#F1E9DC]/65
            "
          >
            © {currentYear} {PROFESSIONAL_DATA.name}.
            Todos os direitos reservados.
          </p>

          {/* DESENVOLVIMENTO */}

          <p
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-1.5
              text-[11px]
              text-[#F1E9DC]/65
            "
          >
            Desenvolvido com

            <Heart
              size={13}
              className="fill-[#C4A078] text-[#C4A078]"
            />

            para uma experiência de cuidado.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;