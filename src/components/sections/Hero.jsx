import React from 'react';
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  Calendar,
  Award,
  ArrowRight,
  Heart,
  Users,
  Flower2,
  Camera,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

import { PROFESSIONAL_DATA } from '../../data/professional';

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const INDICATORS = [
  { icon: Calendar, size: 22, lines: ['Atuação', 'desde 2017'] },
  { icon: Users, size: 23, lines: ['Sessões', 'individuais'] },
  { icon: Heart, size: 23, lines: ['Fisioterapia', 'ortopédica'] },
];

const Hero = ({ onBookClick }) => {
  const reduce = useReducedMotion();

  const headline =
    PROFESSIONAL_DATA.heroHeadline ||
    'Recupere seus movimentos e retome sua rotina com confiança.';
  const headlineParts = headline.match(
    /^(Recupere seus movimentos)\s+(e retome sua rotina com confiança\.)$/i
  );

  /* PARALLAX SUAVE COM O MOUSE */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const photoX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const photoY = useTransform(sy, [-0.5, 0.5], [-10, 10]);
  const decoX = useTransform(sx, [-0.5, 0.5], [22, -22]);
  const decoY = useTransform(sy, [-0.5, 0.5], [16, -16]);

  const handleMouseMove = (e) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  /* HELPERS DE ANIMAÇÃO (desligados se o usuário preferir menos movimento) */
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
      id="inicio"
      onMouseMove={handleMouseMove}
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#F7F6F0]
        pt-36
        pb-24
        sm:pt-40
        lg:pt-44
        lg:pb-32
      "
    >
      {/* ============ FUNDO DECORATIVO ============ */}

      {/* Orbes com movimento lento */}
      <motion.div
        aria-hidden="true"
        {...drift(40, 30, 18)}
        className="
          absolute
          -top-40 -left-40
          w-125 h-125
          rounded-full
          bg-[#EDE8DE]/50
          blur-3xl
          pointer-events-none
        "
      />
      <motion.div
        aria-hidden="true"
        {...drift(-50, 40, 22, 2)}
        className="
          absolute
          top-10 -right-40
          w-137.5 h-137.5
          rounded-full
          bg-[#D6C4B5]/40
          blur-3xl
          pointer-events-none
        "
      />
      <motion.div
        aria-hidden="true"
        {...drift(30, -25, 26, 1)}
        className="
          absolute
          -bottom-72 -left-32
          w-175 h-125
          rounded-[50%]
          bg-[#EDE8DE]/40
          rotate-[-15deg]
          pointer-events-none
        "
      />

      {/* Grade de pontos minimalista */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(#D6C4B5 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          WebkitMaskImage:
            'radial-gradient(ellipse at 70% 40%, black 0%, transparent 65%)',
          maskImage:
            'radial-gradient(ellipse at 70% 40%, black 0%, transparent 65%)',
        }}
      />

      {/* Anéis concêntricos girando devagar */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        fill="none"
        {...spin(90)}
        className="
          absolute
          top-28 left-[4%]
          hidden md:block
          w-44 h-44
          text-[#C4A078]/40
          pointer-events-none
        "
      >
        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 4" />
        <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="0.4" />
        <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 3" />
        <circle cx="50" cy="2" r="1.4" fill="currentColor" />
      </motion.svg>

      {/* Pequenos elementos flutuantes */}
      <motion.span
        aria-hidden="true"
        {...bob(14, 6)}
        className="absolute top-[22%] left-[46%] hidden lg:block w-3 h-3 rounded-full border border-[#C4A078]/60 pointer-events-none"
      />
      <motion.span
        aria-hidden="true"
        {...bob(10, 5, 1)}
        className="absolute top-[62%] left-[8%] hidden md:block w-2 h-2 rounded-full bg-[#C4A078]/50 pointer-events-none"
      />
      <motion.span
        aria-hidden="true"
        {...bob(12, 7, 2)}
        className="absolute bottom-[14%] right-[10%] hidden md:block w-2.5 h-2.5 rounded-full bg-[#D6C4B5] pointer-events-none"
      />
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        {...spin(40, true)}
        className="absolute top-[18%] right-[42%] hidden lg:block w-5 h-5 text-[#C4A078]/60 pointer-events-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      >
        <path d="M12 3v18M3 12h18" />
      </motion.svg>

      {/* Linha ondulada na base */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-20 sm:h-28 text-[#D6C4B5]/60 pointer-events-none"
        fill="none"
      >
        <motion.path
          d="M0 70 C 240 20, 480 110, 720 65 S 1200 20, 1440 70"
          stroke="currentColor"
          strokeWidth="1"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.4, delay: 0.6, ease: 'easeInOut' }}
        />
        <motion.path
          d="M0 90 C 300 50, 520 120, 800 85 S 1250 50, 1440 95"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeDasharray="3 6"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 2.8, delay: 0.9, ease: 'easeInOut' }}
        />
      </svg>

      {/* ============ CONTEÚDO ============ */}
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
          <motion.div
            variants={container}
            initial={reduce ? false : 'hidden'}
            animate="show"
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
            <motion.div
              variants={fadeUp}
              className="
                inline-flex
                items-center
                justify-center
                gap-2.5
                bg-[#EDE8DE]
                text-[#74675D]
                px-4 sm:px-5
                py-2.5
                rounded-full
                mb-8
                shadow-[0_4px_15px_rgba(115,91,64,0.05)]
              "
            >
              <Award size={17} strokeWidth={1.7} className="shrink-0" />
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
              </span>
            </motion.div>

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
                  <motion.span
                    variants={fadeUp}
                    className="block text-[#49382E]"
                  >
                    {headlineParts[1]}
                  </motion.span>
                  <motion.span
                    variants={fadeUp}
                    className="block text-[#A9855D] mt-1"
                  >
                    {headlineParts[2]}
                  </motion.span>
                </>
              ) : (
                <motion.span variants={fadeUp} className="block text-[#49382E]">
                  {headline}
                </motion.span>
              )}
            </h1>

            {/* LINHA DECORATIVA */}
            <motion.div
              variants={{
                hidden: { scaleX: 0, opacity: 0 },
                show: {
                  scaleX: 1,
                  opacity: 1,
                  transition: { duration: 0.9, ease: EASE },
                },
              }}
              className="mt-7 h-px w-24 bg-[#C4A078] origin-left"
            />

            {/* DESCRIÇÃO */}
            <motion.p
              variants={fadeUp}
              className="
                mt-6
                text-[15px]
                sm:text-lg
                lg:text-[19px]
                leading-[1.8]
                text-[#74675D]
                max-w-147.5
              "
            >
              {PROFESSIONAL_DATA.heroSubheadline}
            </motion.p>

            {/* BOTÕES */}
            <motion.div
              variants={fadeUp}
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
              <motion.button
                type="button"
                onClick={() => onBookClick?.()}
                whileTap={{ scale: 0.97 }}
                className="
                  group
                  relative
                  overflow-hidden
                  w-full
                  sm:w-auto
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  bg-[#C4A078]
                  text-white
                  px-7
                  py-4
                  rounded-2xl
                  text-sm
                  sm:text-base
                  font-medium
                  shadow-[0_12px_25px_rgba(115,91,64,0.18)]
                  hover:bg-[#A9855D]
                  hover:shadow-[0_15px_30px_rgba(115,91,64,0.25)]
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  cursor-pointer
                "
              >
                {/* brilho que atravessa o botão */}
                <span
                  aria-hidden="true"
                  className="
                    absolute inset-y-0 -left-1/3
                    w-1/3
                    -skew-x-12
                    bg-white/25
                    -translate-x-full
                    group-hover:translate-x-[400%]
                    transition-transform
                    duration-1000
                    ease-out
                  "
                />
                <Calendar
                  size={20}
                  strokeWidth={1.7}
                  className="relative group-hover:rotate-[-8deg] transition-transform duration-300"
                />
                <span className="relative">Agendar minha avaliação</span>
              </motion.button>

              {/* BOTÃO SECUNDÁRIO */}
              <motion.a
                href="#servicos"
                whileTap={{ scale: 0.97 }}
                className="
                  group
                  w-full
                  sm:w-auto
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  bg-white/70
                  text-[#806348]
                  border
                  border-[#D6C4B5]
                  px-7
                  py-4
                  rounded-2xl
                  text-sm
                  sm:text-base
                  font-medium
                  hover:bg-[#F3EEE7]
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                Conhecer tratamentos
                <ArrowRight
                  size={19}
                  strokeWidth={1.7}
                  className="group-hover:translate-x-1.5 transition-transform duration-300"
                />
              </motion.a>
            </motion.div>

            {/* INDICADORES DE CREDIBILIDADE */}
            <motion.div
              variants={fadeUp}
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
                border-[#DED3C5]
              "
            >
              {INDICATORS.map(({ icon: Icon, size, lines }) => (
                <div key={lines[0]} className="group flex items-center gap-3">
                  <div
                    className="
                      w-12 h-12
                      shrink-0
                      rounded-full
                      bg-[#EDE8DE]
                      flex items-center justify-center
                      text-[#A9855D]
                      transition-all duration-500
                      group-hover:bg-[#C4A078]
                      group-hover:text-white
                      group-hover:scale-110
                      group-hover:shadow-[0_8px_20px_rgba(115,91,64,0.18)]
                    "
                  >
                    <Icon size={size} strokeWidth={1.5} />
                  </div>
                  <span
                    className="
                      text-sm
                      leading-relaxed
                      text-[#49382E]
                      text-left
                    "
                  >
                    {lines[0]}
                    <br />
                    {lines[1]}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

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
            {/* ANEL TRACEJADO GIRANDO */}
            <motion.div
              aria-hidden="true"
              {...spin(70)}
              className="
                absolute
                -inset-10
                sm:-inset-14
                rounded-full
                border
                border-dashed
                border-[#D6C4B5]/80
                pointer-events-none
              "
            />

            {/* ELEMENTO ORGÂNICO EXTERNO */}
            <motion.div
              aria-hidden="true"
              style={{ x: decoX, y: decoY }}
              className="absolute -inset-4 sm:-inset-6 pointer-events-none"
            >
              <motion.div
                {...(reduce
                  ? {}
                  : {
                    animate: { rotate: [5, 9, 5], scale: [1, 1.025, 1] },
                    transition: {
                      duration: 10,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  })}
                className="
                  w-full h-full
                  rounded-[44%_56%_42%_58%/52%_42%_58%_48%]
                  border
                  border-[#D6C4B5]
                  rotate-[5deg]
                "
              />
            </motion.div>

            {/* FUNDO DECORATIVO */}
            <motion.div
              aria-hidden="true"
              {...(reduce
                ? {}
                : {
                  animate: { opacity: [0.55, 0.8, 0.55], scale: [1, 1.12, 1] },
                  transition: {
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                })}
              className="
                absolute
                -bottom-8 -right-8
                w-48 h-48
                bg-[#D6C4B5]
                rounded-full
                blur-3xl
                opacity-70
              "
            />

            {/* FOTO */}
            <motion.div
              style={{ x: photoX, y: photoY }}
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
              className="relative w-full max-w-120"
            >
              <div
                className="
                  relative
                  w-full
                  aspect-4/5
                  overflow-hidden
                  rounded-[35%_28%_25%_28%/25%_24%_20%_20%]
                  border-[6px]
                  border-white
                  shadow-[0_25px_60px_rgba(115,91,64,0.15)]
                  bg-[#EDE8DE]
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
                    from-[#806348]/15
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
                  <motion.div
                    {...bob(8, 5)}
                    className="
                      w-28 h-28
                      sm:w-32 sm:h-32
                      rounded-full
                      bg-[#F3EEE7]/80
                      backdrop-blur-sm
                      flex items-center justify-center
                      mb-5
                    "
                  >
                    <Camera
                      size={56}
                      strokeWidth={1.2}
                      className="text-[#806348]"
                    />
                  </motion.div>
                  <span
                    className="
                      font-serif
                      text-5xl
                      sm:text-6xl
                      text-[#49382E]
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
                      text-[#49382E]
                      mt-1
                    "
                  >
                    Profissional
                  </span>
                  <div className="w-20 h-0.5 bg-[#C4A078] mt-6" />
                </div>
              </div>

              {/* CARTÃO FLUTUANTE 1 */}
              <motion.div
                {...bob(8, 5, 0.5)}
                className="
                  absolute
                  top-[18%]
                  -left-3 sm:-left-12
                  flex items-center gap-3
                  bg-white/85
                  backdrop-blur-md
                  border border-[#EDE8DE]
                  rounded-2xl
                  px-4 py-3
                  shadow-[0_15px_35px_rgba(115,91,64,0.12)]
                "
              >
                <span className="w-9 h-9 rounded-full bg-[#EDE8DE] text-[#A9855D] flex items-center justify-center">
                  <Heart size={18} strokeWidth={1.6} />
                </span>
                <span className="text-xs sm:text-[13px] leading-snug text-[#49382E] font-medium text-left">
                  Cuidado
                  <br />
                  individualizado
                </span>
              </motion.div>

              {/* CARTÃO FLUTUANTE 2 */}
              <motion.div
                {...bob(10, 6, 1.2)}
                className="
                  absolute
                  bottom-[14%]
                  -right-3 sm:-right-10
                  flex items-center gap-3
                  bg-white/85
                  backdrop-blur-md
                  border border-[#EDE8DE]
                  rounded-2xl
                  px-4 py-3
                  shadow-[0_15px_35px_rgba(115,91,64,0.12)]
                "
              >
                <span className="w-9 h-9 rounded-full bg-[#EDE8DE] text-[#A9855D] flex items-center justify-center">
                  <Sparkles size={18} strokeWidth={1.6} />
                </span>
                <span className="text-xs sm:text-[13px] leading-snug text-[#49382E] font-medium text-left">
                  Avaliação
                  <br />
                  personalizada
                </span>
              </motion.div>
            </motion.div>

            {/* ELEMENTO BOTÂNICO */}
            <motion.div
              aria-hidden="true"
              style={{ x: decoX, y: decoY }}
              className="
                absolute
                -bottom-7
                -left-5
                sm:-left-10
                pointer-events-none
              "
            >
              <motion.div
                {...(reduce
                  ? {}
                  : {
                    animate: { rotate: [-25, -15, -25] },
                    transition: {
                      duration: 9,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  })}
                className="text-[#C4A078] opacity-60 rotate-[-25deg]"
              >
                <Flower2 size={105} strokeWidth={0.7} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* INDICADOR DE ROLAGEM */}
      <a
        href="#servicos"
        aria-label="Rolar para os serviços"
        className="
          absolute
          bottom-6 left-1/2
          -translate-x-1/2
          z-10
          hidden lg:flex
          flex-col items-center
          text-[#A9855D]
          hover:text-[#806348]
          transition-colors
        "
      >
        <motion.span {...bob(6, 2)}>
          <ChevronDown size={26} strokeWidth={1.4} />
        </motion.span>
      </a>
    </section>
  );
};

export default Hero;