import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { PROFESSIONAL_DATA } from '../../data/professional';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

import {
  CalendarDays,
  ArrowUpRight,
  Clock3,
  CheckCircle2,
  ShieldCheck,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';

// LINK OFICIAL DO GOOGLE CALENDAR
const GOOGLE_CALENDAR_URL =
  'https://calendar.app.google/PrqXZxNFf4mSipUv9';

const EASE = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const slideRight = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

const lineGrow = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease: EASE } },
};

const VIEWPORT = { once: true, amount: 0.2 };

const Scheduling = () => {
  const reduce = useReducedMotion();

  // WhatsApp somente para dúvidas.
  const whatsappUrl = buildWhatsAppUrl(
    PROFESSIONAL_DATA.phone,
    'Consulta Geral'
  );

  const benefits = [
    {
      icon: Clock3,
      title: 'Escolha seu melhor horário',
      description:
        'Consulte os dias e horários disponíveis na agenda online.',
    },
    {
      icon: CheckCircle2,
      title: 'Agendamento simplificado',
      description:
        'Reserve seu atendimento diretamente pelo Google Calendar.',
    },
    {
      icon: ShieldCheck,
      title: 'Confirmação por e-mail',
      description:
        'Receba os detalhes da reserva por e-mail, conforme as configurações da agenda.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Escolha a data',
      description: 'Visualize os dias disponíveis na agenda.',
    },
    {
      number: '02',
      title: 'Selecione o horário',
      description: 'Escolha o horário mais conveniente.',
    },
    {
      number: '03',
      title: 'Confirme sua reserva',
      description: 'Informe seus dados e finalize o agendamento.',
    },
  ];

  /* HELPERS DE MOVIMENTO (desligados com prefers-reduced-motion) */
  const drift = (x, y, duration, delay = 0) =>
    reduce
      ? {}
      : {
        animate: { x: [0, x, 0], y: [0, y, 0] },
        transition: {
          duration,
          delay,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      };

  const spin = (duration, reverse = false) =>
    reduce
      ? {}
      : {
        animate: { rotate: reverse ? -360 : 360 },
        transition: { duration, repeat: Infinity, ease: 'linear' },
      };

  const bob = (amount, duration, delay = 0) =>
    reduce
      ? {}
      : {
        animate: { y: [0, -amount, 0] },
        transition: {
          duration,
          delay,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      };

  return (
    <section
      id="agendamento"
      aria-labelledby="agendamento-titulo"
      className="relative overflow-hidden bg-[#FFFEFB] py-20 sm:py-24 lg:py-28"
    >
      {/* ============ DECORAÇÃO DA SEÇÃO ============ */}

      {/* Orbes com movimento lento */}
      <motion.div
        aria-hidden="true"
        {...drift(-40, 35, 20)}
        className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#E8DFD3]/30 blur-3xl"
      />

      <motion.div
        aria-hidden="true"
        {...drift(40, -30, 24, 2)}
        className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#DCC9B5]/20 blur-3xl"
      />

      {/* Grade de pontos minimalista */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden opacity-[0.3] md:block"
        style={{
          backgroundImage: 'radial-gradient(#DCC9B5 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          WebkitMaskImage:
            'radial-gradient(ellipse at 50% 0%, black 0%, transparent 55%)',
          maskImage:
            'radial-gradient(ellipse at 50% 0%, black 0%, transparent 55%)',
        }}
      />

      {/* Anéis girando devagar */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        fill="none"
        {...spin(100)}
        className="pointer-events-none absolute left-[3%] top-28 hidden h-40 w-40 text-[#C4A078]/35 md:block"
      >
        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 4" />
        <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="0.4" />
        <circle cx="50" cy="2" r="1.4" fill="currentColor" />
      </motion.svg>

      <motion.svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        fill="none"
        {...spin(120, true)}
        className="pointer-events-none absolute bottom-24 right-[3%] hidden h-44 w-44 text-[#C4A078]/30 md:block"
      >
        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.4" />
        <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 3" />
        <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.4" />
        <circle cx="98" cy="50" r="1.4" fill="currentColor" />
      </motion.svg>

      {/* Pequenos elementos flutuantes */}
      <motion.span
        aria-hidden="true"
        {...bob(12, 6)}
        className="pointer-events-none absolute right-[16%] top-[14%] hidden h-3 w-3 rounded-full border border-[#C4A078]/60 lg:block"
      />
      <motion.span
        aria-hidden="true"
        {...bob(10, 5, 1)}
        className="pointer-events-none absolute left-[5%] top-[50%] hidden h-2 w-2 rounded-full bg-[#C4A078]/50 md:block"
      />
      <motion.span
        aria-hidden="true"
        {...bob(14, 7, 2)}
        className="pointer-events-none absolute bottom-[10%] left-[22%] hidden h-2.5 w-2.5 rounded-full bg-[#DCC9B5] md:block"
      />
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        {...spin(40, true)}
        className="pointer-events-none absolute right-[5%] top-[32%] hidden h-5 w-5 text-[#C4A078]/60 lg:block"
      >
        <path d="M12 3v18M3 12h18" />
      </motion.svg>

      {/* ============ CONTEÚDO ============ */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* CABEÇALHO */}
        <motion.div
          variants={stagger}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={VIEWPORT}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-3"
          >
            <motion.span
              variants={lineGrow}
              className="h-px w-8 origin-right bg-[#C4A078]"
            />

            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A9855D]">
              Agendamento Online
            </span>

            <motion.span
              variants={lineGrow}
              className="h-px w-8 origin-left bg-[#C4A078]"
            />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            id="agendamento-titulo"
            className="font-serif text-4xl font-normal leading-[1.2] tracking-tight text-[#49382E] sm:text-5xl lg:text-[54px]"
          >
            O primeiro passo para

            <span className="block italic text-[#A9855D]">
              cuidar de você.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-7 max-w-2xl text-[15px] leading-[1.9] text-[#74675D] sm:text-base"
          >
            Reserve um momento para sua saúde. Escolha o dia e
            horário mais conveniente para seu atendimento,
            diretamente pelo Google Calendar.
          </motion.p>
        </motion.div>

        {/* CARD PRINCIPAL */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 44, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.95, ease: EASE }}
          className="mx-auto grid max-w-6xl grid-cols-1 overflow-hidden rounded-[28px] border border-[#E8DFD3] bg-[#FFFEFB] shadow-[0_25px_70px_rgba(73,56,46,0.10)] lg:grid-cols-2"
        >
          {/* ==========================================
              COLUNA ESQUERDA
          ========================================== */}
          <div className="relative flex flex-col justify-between overflow-hidden bg-[#49382E] p-8 text-white sm:p-12 lg:p-14">
            {/* Anéis decorativos girando (cada um dentro de um wrapper posicionado) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-1/3 translate-x-1/3"
            >
              <motion.div
                {...spin(90)}
                className="relative h-full w-full rounded-full border border-dashed border-[#C4A078]/30"
              >
                <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C4A078]" />
              </motion.div>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 h-80 w-80 -translate-y-1/3 translate-x-1/3"
            >
              <motion.div
                {...spin(130, true)}
                className="relative h-full w-full rounded-full border border-[#C4A078]/15"
              >
                <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#C4A078]/70" />
              </motion.div>
            </div>

            {/* Brilho suave no canto inferior */}
            <motion.div
              aria-hidden="true"
              {...drift(14, -12, 14)}
              className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#C4A078]/10 blur-3xl"
            />

            {/* Pontinhos flutuantes */}
            <motion.span
              aria-hidden="true"
              {...bob(10, 5)}
              className="pointer-events-none absolute bottom-[26%] right-8 hidden h-2 w-2 rounded-full bg-[#C4A078]/50 sm:block"
            />
            <motion.span
              aria-hidden="true"
              {...bob(12, 7, 1.5)}
              className="pointer-events-none absolute right-[22%] top-[44%] hidden h-2.5 w-2.5 rounded-full border border-[#C4A078]/40 sm:block"
            />

            <motion.div
              variants={stagger}
              initial={reduce ? false : 'hidden'}
              whileInView="show"
              viewport={VIEWPORT}
              className="relative"
            >
              <motion.div
                variants={fadeUp}
                className="relative mb-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#C4A078]/30 bg-[#C4A078]/15"
              >
                {/* onda suave ao redor do ícone */}
                {!reduce && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-2xl border border-[#C4A078]/50"
                    animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  />
                )}

                <CalendarDays
                  className="relative h-6 w-6 text-[#C4A078]"
                  strokeWidth={1.5}
                />
              </motion.div>

              <motion.span
                variants={fadeUp}
                className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C4A078]"
              >
                Atendimento Individualizado
              </motion.span>

              <motion.h3
                variants={fadeUp}
                className="max-w-md font-serif text-3xl font-normal leading-snug sm:text-4xl"
              >
                Sua saúde merece

                <span className="block italic text-[#C4A078]">
                  atenção em cada detalhe.
                </span>
              </motion.h3>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-md text-sm leading-[1.9] text-[#E8DFD3] sm:text-base"
              >
                Cada atendimento é pensado para compreender
                suas necessidades e oferecer um cuidado
                fisioterapêutico individualizado, respeitando
                seu ritmo e seus objetivos.
              </motion.p>

              {/* BENEFÍCIOS */}
              <div className="mt-10 space-y-7">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;

                  return (
                    <motion.div
                      key={benefit.title}
                      variants={slideRight}
                      className="group flex items-start gap-4"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#C4A078]/20 bg-[#C4A078]/15 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:border-[#C4A078] group-hover:bg-[#C4A078]">
                        <Icon
                          className="h-5 w-5 text-[#C4A078] transition-colors duration-500 group-hover:text-white"
                          strokeWidth={1.6}
                        />
                      </div>

                      <div className="transition-transform duration-300 group-hover:translate-x-1">
                        <h4 className="text-sm font-semibold text-[#FFFEFB]">
                          {benefit.title}
                        </h4>

                        <p className="mt-1.5 text-[13px] leading-relaxed text-[#E8DFD3]">
                          {benefit.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* ASSINATURA */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="relative mt-14 border-t border-[#C4A078]/25 pt-7"
            >
              {/* linha dourada que se desenha */}
              <motion.span
                aria-hidden="true"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
                className="absolute -top-px left-0 h-px w-20 origin-left bg-[#C4A078]"
              />

              <p className="font-serif text-xl italic text-[#FFFEFB]">
                {PROFESSIONAL_DATA.name}
              </p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-[#C4A078]">
                Fisioterapeuta · CREFITO {PROFESSIONAL_DATA.crefito}
              </p>
            </motion.div>
          </div>

          {/* ==========================================
              COLUNA DIREITA
          ========================================== */}
          <div className="relative flex flex-col justify-center overflow-hidden bg-[#FFFEFB] p-8 sm:p-12 lg:p-14">
            {/* Círculos minimalistas no canto */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-16 -right-16 h-52 w-52 rounded-full border border-[#EDE5DA]"
            />
            <motion.div
              aria-hidden="true"
              {...spin(80)}
              className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full border border-dashed border-[#E8DFD3]"
            />

            <motion.div
              variants={stagger}
              initial={reduce ? false : 'hidden'}
              whileInView="show"
              viewport={VIEWPORT}
              className="relative"
            >
              <motion.div variants={fadeUp} className="mb-9">
                <span className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#E8DFD3] bg-[#F3EEE7] px-4 py-2 text-[11px] font-semibold text-[#A9855D]">
                  {/* ponto pulsando */}
                  <span className="relative flex h-2 w-2">
                    {!reduce && (
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-[#C4A078]"
                        animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: 'easeOut',
                        }}
                      />
                    )}
                    <span className="relative h-2 w-2 rounded-full bg-[#C4A078]" />
                  </span>
                  Google Calendar
                </span>

                <h3 className="font-serif text-3xl font-medium leading-tight text-[#49382E] sm:text-[34px]">
                  Agende sua consulta
                </h3>

                <p className="mt-4 text-[14px] leading-[1.9] text-[#74675D]">
                  Escolha um horário disponível, informe seus
                  dados e confirme sua reserva diretamente
                  na página de agendamento do Google.
                </p>
              </motion.div>

              {/* PASSO A PASSO */}
              <div className="relative mb-10">
                {/* linha vertical que liga os passos */}
                <motion.span
                  aria-hidden="true"
                  variants={{
                    hidden: { scaleY: 0 },
                    show: {
                      scaleY: 1,
                      transition: { duration: 1.4, delay: 0.3, ease: EASE },
                    },
                  }}
                  className="absolute bottom-6 left-5.25 top-6 w-px origin-top bg-linear-to-b from-[#C4A078]/60 via-[#E8DFD3] to-[#E8DFD3]"
                />

                <div className="space-y-7">
                  {steps.map((step) => (
                    <motion.div
                      key={step.number}
                      variants={slideRight}
                      className="group relative flex items-start gap-4"
                    >
                      <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E8DFD3] bg-[#F3EEE7] font-serif text-sm font-medium text-[#A9855D] transition-all duration-500 group-hover:scale-110 group-hover:border-[#C4A078] group-hover:bg-[#C4A078] group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(169,133,93,0.25)]">
                        {step.number}
                      </span>

                      <div className="transition-transform duration-300 group-hover:translate-x-1">
                        <p className="text-sm font-semibold text-[#49382E]">
                          {step.title}
                        </p>

                        <p className="mt-1.5 text-[13px] leading-relaxed text-[#74675D]">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                variants={{
                  hidden: { scaleX: 0 },
                  show: {
                    scaleX: 1,
                    transition: { duration: 0.9, ease: EASE },
                  },
                }}
                className="mb-8 h-px w-full origin-left bg-[#E8DFD3]"
              />

              {/* BOTÃO DE AGENDAMENTO */}
              <motion.div variants={fadeUp}>
                <motion.a
                  href={GOOGLE_CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.97 }}
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#C4A078] px-6 py-4 text-center text-sm font-semibold text-white shadow-[0_10px_25px_rgba(169,133,93,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A9855D] hover:shadow-[0_15px_30px_rgba(169,133,93,0.28)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A9855D]"
                >
                  {/* brilho que atravessa periodicamente e no hover */}
                  {!reduce && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25"
                      animate={{ x: ['-100%', '480%'] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 4,
                        ease: 'easeInOut',
                      }}
                    />
                  )}

                  <CalendarDays className="relative h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-rotate-8" />

                  <span className="relative">Agendar minha consulta</span>

                  <ArrowUpRight className="relative h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </motion.a>

                <p className="mt-4 text-center text-xs text-[#74675D]">
                  A agenda será aberta em uma nova aba.
                </p>
              </motion.div>

              {/* AVISO */}
              <motion.div
                variants={fadeUp}
                className="group mt-8 rounded-2xl border border-[#E8DFD3] bg-[#F7F6F0] p-5 transition-colors duration-500 hover:border-[#D9C8B5]"
              >
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#A9855D] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                    strokeWidth={1.7}
                  />

                  <p className="text-[12px] leading-[1.9] text-[#74675D]">
                    O agendamento é realizado pelo Google Calendar.
                    Após a confirmação, os detalhes da consulta
                    serão enviados ao e-mail informado, conforme
                    as configurações de notificação da agenda.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* CONTATO PARA DÚVIDAS */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-5 border-t border-[#E8DFD3] pt-8 text-center sm:flex-row sm:text-left"
        >
          {/* linha dourada que se desenha sobre a borda */}
          <motion.span
            aria-hidden="true"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
            className="absolute -top-px left-0 h-px w-24 origin-left bg-[#C4A078]"
          />

          <p className="text-sm text-[#74675D]">
            Precisa esclarecer alguma dúvida antes de agendar?
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#A9855D] transition-colors duration-300 hover:text-[#49382E]"
          >
            <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />

            Falar pelo WhatsApp

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Scheduling;