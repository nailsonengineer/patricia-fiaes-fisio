import React from 'react';

import {
  Calendar,
  Award,
  ArrowRight,
  Heart,
  Users,
  Flower2,
  Camera,
} from 'lucide-react';

import { PROFESSIONAL_DATA } from '../../data/professional';

const Hero = ({ onBookClick }) => {
  const headline =
    PROFESSIONAL_DATA.heroHeadline ||
    'Recupere seus movimentos e retome sua rotina com confiança.';

  const headlineParts = headline.match(
  /^(Recupere seus movimentos)\s+(e retome sua rotina com confiança\.)$/i
);

  return (
    <section
      id="inicio"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#FFFCFA]
        pt-36
        pb-20
        sm:pt-40
        lg:pt-44
        lg:pb-28
      "
    >
      {/* FUNDO DECORATIVO */}
      <div
        aria-hidden="true"
        className="
          absolute
          -top-40 -left-40
          w-125 h-125
          rounded-full
          bg-[#FBE5E1]/50
          blur-3xl
          pointer-events-none
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          top-10 -right-40
          w-137.5 h-137.5
          rounded-full
          bg-[#F8DDD5]/40
          blur-3xl
          pointer-events-none
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          -bottom-72 -left-32
          w-175 h-125
          rounded-[50%]
          bg-[#F8E2DE]/40
          rotate-[-15deg]
          pointer-events-none
        "
      />

      {/* CONTEÚDO */}
      <div
        className="
          relative z-10
          max-w-360
          mx-auto
          px-5 sm:px-8 lg:px-10 xl:px-14
        "
      >
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-12
            items-center
            gap-14
            lg:gap-10
            xl:gap-16
          "
        >
          {/* COLUNA ESQUERDA */}
          <div
            className="
              lg:col-span-7
              flex flex-col
              items-center
              lg:items-start
              text-center
              lg:text-left
            "
          >
            {/* IDENTIFICAÇÃO PROFISSIONAL */}
            <div
              className="
                inline-flex
                items-center
                justify-center
                gap-2.5
                bg-[#F9E5E2]
                text-[#90534D]
                px-4 sm:px-5
                py-2.5
                rounded-full
                mb-8
                shadow-[0_4px_15px_rgba(190,120,110,0.05)]
              "
            >
              <Award
                size={17}
                strokeWidth={1.7}
                className="shrink-0"
              />

              <span
                className="
                  text-[10px]
                  sm:text-xs
                  font-semibold
                  uppercase
                  tracking-[0.08em]
                "
              >
                {PROFESSIONAL_DATA.title}
                {' | '}
                CREFITO {PROFESSIONAL_DATA.crefito}
              </span>
            </div>

            {/* TÍTULO PRINCIPAL */}
            {/* TÍTULO PRINCIPAL */}
            <h1
              className="
                font-serif
                text-[clamp(2.35rem,5vw,5.25rem)]
                leading-[1.12]
                tracking-[-0.035em]
                font-normal
                max-w-200
              "
            >
              {headlineParts ? (
                <>
                  {/* PRIMEIRA PARTE — PRETO */}
                  <span className="block text-[#2F3B3C]">
                    {headlineParts[1]}
                  </span>

                  {/* SEGUNDA PARTE — ROSA */}
                  <span className="block text-[#C9797B] mt-1">
                    {headlineParts[2]}
                  </span>
                </>
              ) : (
                <span className="text-[#2F3B3C]">
                  {headline}
                </span>
              )}
            </h1>
            {/* DESCRIÇÃO */}
            <p
              className="
                mt-7
                text-[15px]
                sm:text-lg
                lg:text-[19px]
                leading-[1.8]
                text-[#687174]
                max-w-147.5
              "
            >
              {PROFESSIONAL_DATA.heroSubheadline}
            </p>

            {/* BOTÕES */}
            <div
              className="
                w-full
                flex flex-col
                sm:flex-row
                items-center
                justify-center
                lg:justify-start
                gap-4
                mt-9
              "
            >
              {/* BOTÃO PRINCIPAL */}
              <button
                type="button"
                onClick={() => onBookClick?.()}
                className="
                  w-full
                  sm:w-auto
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  bg-[#C87576]
                  text-white
                  px-7
                  py-4
                  rounded-2xl
                  text-sm
                  sm:text-base
                  font-medium
                  shadow-[0_12px_25px_rgba(190,110,110,0.18)]
                  hover:bg-[#AD6062]
                  hover:shadow-[0_15px_30px_rgba(190,110,110,0.25)]
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  cursor-pointer
                "
              >
                <Calendar
                  size={20}
                  strokeWidth={1.7}
                />

                Agendar minha avaliação
              </button>

              {/* BOTÃO SECUNDÁRIO */}
              <a
                href="#servicos"
                className="
                  w-full
                  sm:w-auto
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  bg-white/70
                  text-[#8E5550]
                  border
                  border-[#DDA5A0]
                  px-7
                  py-4
                  rounded-2xl
                  text-sm
                  sm:text-base
                  font-medium
                  hover:bg-[#FBEFEB]
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                Conhecer tratamentos

                <ArrowRight
                  size={19}
                  strokeWidth={1.7}
                />
              </a>
            </div>

            {/* INDICADORES DE CREDIBILIDADE */}
            <div
              className="
                w-full
                grid
                grid-cols-1
                sm:grid-cols-3
                gap-5
                sm:gap-4
                mt-12
                pt-8
                border-t
                border-[#EFDCD7]
              "
            >
              {/* EXPERIÊNCIA */}
              <div className="flex items-center gap-3">
                <div
                  className="
                    w-12 h-12
                    shrink-0
                    rounded-full
                    bg-[#F8E8E4]
                    flex items-center justify-center
                    text-[#A86561]
                  "
                >
                  <Calendar
                    size={22}
                    strokeWidth={1.5}
                  />
                </div>

                <span
                  className="
                    text-sm
                    leading-relaxed
                    text-[#3E484A]
                    text-left
                  "
                >
                  Atuação
                  <br />
                  desde 2017
                </span>
              </div>

              {/* SESSÕES */}
              <div className="flex items-center gap-3">
                <div
                  className="
                    w-12 h-12
                    shrink-0
                    rounded-full
                    bg-[#F8E8E4]
                    flex items-center justify-center
                    text-[#A86561]
                  "
                >
                  <Users
                    size={23}
                    strokeWidth={1.5}
                  />
                </div>

                <span
                  className="
                    text-sm
                    leading-relaxed
                    text-[#3E484A]
                    text-left
                  "
                >
                  Sessões
                  <br />
                  individuais
                </span>
              </div>

              {/* ESPECIALIDADE */}
              <div className="flex items-center gap-3">
                <div
                  className="
                    w-12 h-12
                    shrink-0
                    rounded-full
                    bg-[#F8E8E4]
                    flex items-center justify-center
                    text-[#A86561]
                  "
                >
                  <Heart
                    size={23}
                    strokeWidth={1.5}
                  />
                </div>

                <span
                  className="
                    text-sm
                    leading-relaxed
                    text-[#3E484A]
                    text-left
                  "
                >
                  Fisioterapia
                  <br />
                  ortopédica
                </span>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA */}
          <div
            className="
              lg:col-span-5
              relative
              flex
              items-center
              justify-center
              w-full
            "
          >
            {/* ELEMENTO ORGÂNICO EXTERNO */}
            <div
              aria-hidden="true"
              className="
                absolute
                -inset-4
                sm:-inset-6
                rounded-[44%_56%_42%_58%/52%_42%_58%_48%]
                border
                border-[#DFAE9F]
                rotate-[5deg]
                pointer-events-none
              "
            />

            {/* FUNDO DECORATIVO */}
            <div
              aria-hidden="true"
              className="
                absolute
                -bottom-8 -right-8
                w-48 h-48
                bg-[#F4D5CF]
                rounded-full
                blur-3xl
                opacity-70
              "
            />

            {/* FOTO */}
            <div
              className="
                relative
                w-full
                max-w-120
                aspect-4/5
                overflow-hidden
                rounded-[35%_28%_25%_28%/25%_24%_20%_20%]
                border-[6px]
                border-white
                shadow-[0_25px_60px_rgba(160,100,90,0.15)]
                bg-[#F7E9E2]
              "
            >
              {/* IMAGEM PROVISÓRIA */}
              <img
                src="/images/foto-profissional.png"
                alt="Espaço reservado para fotografia profissional de Patrícia Fiaes"
                className="
                  absolute
                  inset-0
                  w-full h-full
                  object-cover
                  object-center
                "
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />

              {/* SOBREPOSIÇÃO SUAVE */}
              <div
                className="
                    absolute
                    inset-0
                    bg-linear-to-t
                    from-[#8F6054]/15
                    via-transparent
                    to-white/10
                    pointer-events-none
                  "
              />

              {/* IDENTIFICAÇÃO DA FOTO */}
              <div
                className="
                  absolute
                  inset-0
                  flex flex-col
                  items-center
                  justify-center
                  text-center
                  pointer-events-none
                "
              >
                <div
                  className="
                    w-28 h-28
                    sm:w-32 sm:h-32
                    rounded-full
                    bg-[#F9E9E5]/80
                    backdrop-blur-sm
                    flex items-center justify-center
                    mb-5
                  "
                >
                  <Camera
                    size={56}
                    strokeWidth={1.2}
                    className="text-[#96645A]"
                  />
                </div>

                <span
                  className="
                    font-serif
                    text-5xl
                    sm:text-6xl
                    text-[#7C534D]
                    leading-none
                  "
                >
                  Foto
                </span>

                <span
                  className="
                    font-serif
                    italic
                    text-4xl
                    sm:text-5xl
                    text-[#7C534D]
                    mt-1
                  "
                >
                  Profissional
                </span>

                <div className="w-20 h-0.5 bg-[#C87576] mt-6" />
              </div>
            </div>

            {/* ELEMENTO BOTÂNICO */}
            <div
              aria-hidden="true"
              className="
                absolute
                -bottom-7
                -left-5
                sm:-left-10
                text-[#DDA69D]
                opacity-60
                rotate-[-25deg]
                pointer-events-none
              "
            >
              <Flower2
                size={105}
                strokeWidth={0.7}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;