import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import {
  Check,
  Calendar,
  CreditCard,
  ShieldAlert,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

import { PLANS_DATA } from '../../data/plans';
import { PROFESSIONAL_DATA } from '../../data/professional';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

const EASE = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const cardIn = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE },
  },
};

const lineGrow = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease: EASE } },
};

const featuresList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
};

const featureItem = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

const VIEWPORT = { once: true, amount: 0.2 };

const Plans = () => {
  const reduce = useReducedMotion();

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
      id="planos"
      className="
        relative
        overflow-hidden
        bg-[#F7F6F0]
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* ============ ELEMENTOS DECORATIVOS ============ */}

      {/* Orbes com movimento lento */}
      <motion.div
        aria-hidden="true"
        {...drift(-40, 35, 20)}
        className="
          pointer-events-none
          absolute -top-40 -right-40
          h-96 w-96
          rounded-full
          bg-[#E8DDD0]/40
          blur-3xl
        "
      />

      <motion.div
        aria-hidden="true"
        {...drift(40, -30, 24, 2)}
        className="
          pointer-events-none
          absolute -bottom-48 -left-48
          h-96 w-96
          rounded-full
          bg-[#DCC9B5]/20
          blur-3xl
        "
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
        className="
          pointer-events-none
          absolute top-28 left-[3%]
          hidden h-40 w-40
          text-[#C4A078]/35
          md:block
        "
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
        className="
          pointer-events-none
          absolute bottom-32 right-[3%]
          hidden h-48 w-48
          text-[#C4A078]/30
          md:block
        "
      >
        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.4" />
        <circle cx="50" cy="50" r="36" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 3" />
        <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="0.4" />
        <circle cx="98" cy="50" r="1.4" fill="currentColor" />
      </motion.svg>

      {/* Pequenos elementos flutuantes */}
      <motion.span
        aria-hidden="true"
        {...bob(12, 6)}
        className="pointer-events-none absolute top-[15%] right-[14%] hidden h-3 w-3 rounded-full border border-[#C4A078]/60 lg:block"
      />
      <motion.span
        aria-hidden="true"
        {...bob(10, 5, 1)}
        className="pointer-events-none absolute top-[48%] left-[4%] hidden h-2 w-2 rounded-full bg-[#C4A078]/50 md:block"
      />
      <motion.span
        aria-hidden="true"
        {...bob(14, 7, 2)}
        className="pointer-events-none absolute bottom-[12%] left-[20%] hidden h-2.5 w-2.5 rounded-full bg-[#DCC9B5] md:block"
      />
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        {...spin(40, true)}
        className="pointer-events-none absolute top-[30%] right-[5%] hidden h-5 w-5 text-[#C4A078]/60 lg:block"
      >
        <path d="M12 3v18M3 12h18" />
      </motion.svg>

      {/* ============ CONTEÚDO ============ */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* ==========================================
            CABEÇALHO
        ========================================== */}
        <motion.div
          variants={stagger}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={VIEWPORT}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          {/* IDENTIFICAÇÃO */}
          <motion.div
            variants={fadeUp}
            className="mb-6 flex items-center justify-center gap-3"
          >
            <motion.span
              variants={lineGrow}
              className="h-px w-8 origin-right bg-[#C4A078]"
            />

            <span
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-[#A9855D]
              "
            >
              Planos e Atendimentos
            </span>

            <motion.span
              variants={lineGrow}
              className="h-px w-8 origin-left bg-[#C4A078]"
            />
          </motion.div>

          {/* TÍTULO */}
          <motion.h2
            variants={fadeUp}
            className="
              font-serif
              text-4xl
              font-normal
              leading-[1.2]
              tracking-tight
              text-[#49382E]
              sm:text-5xl
              lg:text-[54px]
            "
          >
            Escolha a forma de cuidado
            <span className="block italic text-[#A9855D]">
              ideal para você.
            </span>
          </motion.h2>

          {/* DESCRIÇÃO */}
          <motion.p
            variants={fadeUp}
            className="
              mx-auto mt-7
              max-w-2xl
              text-[15px]
              leading-[1.9]
              text-[#74675D]
              sm:text-base
            "
          >
            Conheça as opções de acompanhamento fisioterapêutico
            e encontre uma alternativa adequada às suas
            necessidades e objetivos.
          </motion.p>
        </motion.div>

        {/* ==========================================
            CARDS DE PLANOS
        ========================================== */}
        <motion.div
          variants={stagger}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="
            mx-auto
            grid
            max-w-6xl
            grid-cols-1
            gap-8
            md:grid-cols-3
            lg:gap-8
          "
        >
          {PLANS_DATA.map((plan) => (
            <motion.article
              key={plan.id}
              variants={cardIn}
              whileHover={reduce ? undefined : { y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className={`
                group
                relative
                flex
                flex-col
                overflow-visible
                rounded-3xl
                border
                p-7
                transition-[border-color,box-shadow] duration-500
                sm:p-8
                ${plan.popular
                  ? `
                      border-[#C4A078]
                      bg-[#FFFEFB]
                      shadow-[0_20px_50px_rgba(73,56,46,0.12)]
                      ring-1 ring-[#C4A078]/20
                    `
                  : `
                      border-[#E8DFD3]
                      bg-[#FFFEFB]
                      shadow-[0_8px_30px_rgba(73,56,46,0.04)]
                      hover:border-[#C4A078]/60
                      hover:shadow-[0_20px_45px_rgba(73,56,46,0.10)]
                    `
                }
              `}
            >
              {/* HALO PULSANTE NO PLANO RECOMENDADO */}
              {plan.popular && !reduce && (
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-px rounded-3xl"
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(196,160,120,0.25)',
                      '0 0 0 14px rgba(196,160,120,0)',
                    ],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              )}

              {/* CÍRCULOS MINIMALISTAS NO CANTO (clipados dentro do card) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
              >
                <div
                  className="
                    absolute -bottom-14 -right-14
                    h-40 w-40
                    rounded-full
                    border border-[#EDE5DA]
                    transition-transform duration-700 ease-out
                    group-hover:scale-150
                    group-hover:border-[#C4A078]/40
                  "
                />
                <div
                  className="
                    absolute -bottom-7 -right-7
                    h-24 w-24
                    rounded-full
                    border border-dashed border-[#EDE5DA]
                    transition-transform duration-700 ease-out
                    group-hover:scale-150
                    group-hover:rotate-90
                    group-hover:border-[#C4A078]/40
                  "
                />
              </div>

              {/* DETALHE SUPERIOR */}
              <div
                className={`
                  absolute
                  left-6 right-6 top-0
                  h-1
                  rounded-b-full
                  transition-all duration-500
                  ${plan.popular
                    ? 'bg-[#C4A078]'
                    : 'bg-transparent group-hover:bg-[#D9C8B5]'
                  }
                `}
              />

              {/* SELO RECOMENDADO */}
              {plan.popular && (
                <div
                  className="
                    absolute
                    -top-4
                    left-1/2
                    z-10
                    -translate-x-1/2
                    whitespace-nowrap
                  "
                >
                  <motion.span
                    {...bob(3, 3)}
                    className="
                      relative
                      inline-flex
                      items-center
                      gap-2
                      overflow-hidden
                      rounded-full
                      bg-[#C4A078]
                      px-5
                      py-2
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-white
                      shadow-[0_6px_18px_rgba(169,133,93,0.25)]
                    "
                  >
                    {/* brilho que passa periodicamente */}
                    {!reduce && (
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/30"
                        animate={{ x: ['-100%', '450%'] }}
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                          repeatDelay: 3.2,
                          ease: 'easeInOut',
                        }}
                      />
                    )}

                    <motion.span
                      className="relative flex"
                      {...(reduce
                        ? {}
                        : {
                          animate: { rotate: [0, 18, 0, -18, 0], scale: [1, 1.15, 1] },
                          transition: {
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          },
                        })}
                    >
                      <Sparkles size={14} strokeWidth={1.8} />
                    </motion.span>

                    <span className="relative">Recomendado</span>
                  </motion.span>
                </div>
              )}

              {/* CONTEÚDO */}
              <div className="relative flex flex-1 flex-col">
                {/* IDENTIFICAÇÃO DO PLANO */}
                <div className="mb-7">
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className={`
                        flex h-12 w-12
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        transition-all duration-500
                        group-hover:border-[#C4A078]
                        group-hover:bg-[#C4A078]
                        group-hover:text-white
                        group-hover:scale-110
                        group-hover:-rotate-6
                        group-hover:shadow-[0_10px_22px_rgba(169,133,93,0.25)]
                        ${plan.popular
                          ? `
                              border-[#C4A078]/40
                              bg-[#F1E9DC]
                              text-[#A9855D]
                            `
                          : `
                              border-[#E8DFD3]
                              bg-[#F3EEE7]
                              text-[#A9855D]
                            `
                        }
                      `}
                    >
                      <Calendar size={23} strokeWidth={1.6} />
                    </div>

                    {plan.popular && (
                      <span
                        className="
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.15em]
                          text-[#A9855D]
                        "
                      >
                        Destaque
                      </span>
                    )}
                  </div>

                  <h3
                    className="
                      font-serif
                      text-[27px]
                      font-medium
                      leading-snug
                      text-[#49382E]
                      transition-colors duration-300
                      group-hover:text-[#A9855D]
                    "
                  >
                    {plan.name}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-[12px]
                      font-semibold
                      tracking-wide
                      text-[#A9855D]
                    "
                  >
                    {plan.sessions}
                  </p>
                </div>

                {/* VALOR */}
                <div
                  className="
                    relative
                    mb-7
                    border-y
                    border-[#EDE5DA]
                    py-6
                  "
                >
                  {/* linha dourada que se desenha no hover */}
                  <span
                    aria-hidden="true"
                    className="
                      absolute -top-px left-0
                      h-px w-0
                      bg-[#C4A078]
                      transition-all duration-700
                      group-hover:w-full
                    "
                  />

                  <p
                    className="
                      mb-2
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-[#8B7A68]
                    "
                  >
                    Investimento
                  </p>

                  <p
                    className="
                      font-serif
                      text-3xl
                      font-medium
                      leading-tight
                      text-[#49382E]
                      sm:text-[34px]
                    "
                  >
                    {plan.price}
                  </p>

                  {plan.isPlaceholderPrice && (
                    <p
                      className="
                        mt-3
                        text-[11px]
                        leading-relaxed
                        text-[#8B7A68]
                      "
                    >
                      Consulte condições específicas sob avaliação.
                    </p>
                  )}
                </div>

                {/* DESCRIÇÃO */}
                <p
                  className="
                    mb-7
                    text-[14px]
                    leading-[1.9]
                    text-[#74675D]
                  "
                >
                  {plan.description}
                </p>

                {/* BENEFÍCIOS */}
                <div className="flex-1">
                  <p
                    className="
                      mb-4
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-[#A9855D]
                    "
                  >
                    O que está incluído
                  </p>

                  <motion.ul variants={featuresList} className="space-y-4">
                    {plan.features.map((feat, idx) => (
                      <motion.li
                        key={idx}
                        variants={featureItem}
                        className="
                          group/feat
                          flex
                          items-start
                          gap-3
                          text-[13px]
                          leading-relaxed
                          text-[#62574E]
                        "
                      >
                        <div
                          className="
                            mt-0.5
                            flex h-5 w-5
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-[#F1E9DC]
                            text-[#A9855D]
                            transition-all duration-300
                            group-hover/feat:bg-[#C4A078]
                            group-hover/feat:text-white
                            group-hover/feat:scale-110
                          "
                        >
                          <Check size={13} strokeWidth={2} />
                        </div>

                        <span className="transition-colors duration-300 group-hover/feat:text-[#49382E]">
                          {feat}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                {/* ==========================================
                    BOTÃO DE CONTRATAÇÃO
                ========================================== */}
                <div className="mt-9 border-t border-[#EDE5DA] pt-7">
                  {plan.checkoutUrl ? (
                    <motion.a
                      href={plan.checkoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileTap={{ scale: 0.97 }}
                      className="
                        group/btn
                        relative
                        overflow-hidden
                        inline-flex
                        w-full
                        items-center
                        justify-center
                        gap-2.5
                        rounded-xl
                        bg-[#C4A078]
                        px-4
                        py-4
                        text-center
                        text-[13px]
                        font-semibold
                        text-white
                        shadow-[0_8px_20px_rgba(169,133,93,0.16)]
                        transition-all duration-300
                        hover:-translate-y-0.5
                        hover:bg-[#A9855D]
                        hover:shadow-[0_12px_25px_rgba(169,133,93,0.25)]
                      "
                    >
                      <span
                        aria-hidden="true"
                        className="
                          absolute inset-y-0 -left-1/3
                          w-1/3
                          -skew-x-12
                          bg-white/25
                          -translate-x-full
                          group-hover/btn:translate-x-[450%]
                          transition-transform
                          duration-1000
                          ease-out
                        "
                      />

                      <CreditCard size={18} strokeWidth={1.7} className="relative" />

                      <span className="relative">Contratar Plano Online</span>

                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.7}
                        className="
                          relative
                          transition-transform duration-300
                          group-hover/btn:translate-x-0.5
                          group-hover/btn:-translate-y-0.5
                        "
                      />
                    </motion.a>
                  ) : (
                    <motion.a
                      href={buildWhatsAppUrl(
                        PROFESSIONAL_DATA.phone,
                        plan.name
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileTap={{ scale: 0.97 }}
                      className={`
                        group/btn
                        relative
                        overflow-hidden
                        inline-flex
                        w-full
                        items-center
                        justify-center
                        gap-2.5
                        rounded-xl
                        border
                        px-4
                        py-4
                        text-center
                        text-[13px]
                        font-semibold
                        transition-all duration-300
                        hover:-translate-y-0.5
                        ${plan.popular
                          ? `
                              border-[#C4A078]
                              bg-[#C4A078]
                              text-white
                              shadow-[0_8px_20px_rgba(169,133,93,0.16)]
                              hover:bg-[#A9855D]
                            `
                          : `
                              border-[#C4A078]/60
                              bg-[#F7F3EC]
                              text-[#8C6B45]
                              hover:border-[#C4A078]
                              hover:bg-[#F1E9DC]
                            `
                        }
                      `}
                    >
                      <span
                        aria-hidden="true"
                        className={`
                          absolute inset-y-0 -left-1/3
                          w-1/3
                          -skew-x-12
                          -translate-x-full
                          group-hover/btn:translate-x-[450%]
                          transition-transform
                          duration-1000
                          ease-out
                          ${plan.popular ? 'bg-white/25' : 'bg-[#C4A078]/15'}
                        `}
                      />

                      <Calendar size={18} strokeWidth={1.7} className="relative" />

                      <span className="relative">Consultar Disponibilidade</span>

                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.7}
                        className="
                          relative
                          transition-transform duration-300
                          group-hover/btn:translate-x-0.5
                          group-hover/btn:-translate-y-0.5
                        "
                      />
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* ==========================================
            NOTA DE TRANSPARÊNCIA
        ========================================== */}
        <motion.div
          variants={fadeUp}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={VIEWPORT}
          className="
            group
            mx-auto
            mt-12
            flex
            max-w-4xl
            items-start
            justify-center
            gap-3
            rounded-2xl
            border border-[#E8DFD3]
            bg-[#FFFEFB]/80
            px-5
            py-5
            text-left
            transition-colors duration-500
            hover:border-[#D9C8B5]
            sm:items-center
            sm:px-7
            sm:text-center
          "
        >
          <ShieldAlert
            size={19}
            strokeWidth={1.7}
            className="
              mt-0.5
              shrink-0
              text-[#A9855D]
              transition-transform duration-500
              group-hover:scale-110
              group-hover:-rotate-6
              sm:mt-0
            "
          />

          <p
            className="
              text-[12px]
              leading-[1.8]
              text-[#74675D]
              sm:text-[13px]
            "
          >
            Os valores oficiais e o plano terapêutico definitivo
            serão definidos após a avaliação presencial.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Plans;