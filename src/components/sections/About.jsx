import React, { useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { PROFESSIONAL_DATA } from '../../data/professional';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  BadgeCheck,
  Flower2,
  MessageCircle,
  ChevronDown,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* CONFIGURAÇÕES                                                       */
/* ------------------------------------------------------------------ */

// Quantidade de certificações visíveis antes de "Ver todas"
const CERTS_PREVIEW = 6;

// Foto: use PROFESSIONAL_DATA.photo quando existir; senão, imagem provisória
const FALLBACK_PHOTO =
  'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80';

const EASE = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 1, ease: EASE } },
};

const VIEWPORT = { once: true, amount: 0.2 };

/* ------------------------------------------------------------------ */
/* COMPONENTES AUXILIARES                                              */
/* ------------------------------------------------------------------ */

// Traço + rótulo (usado no topo da seção e nos blocos internos)
const Eyebrow = ({ children, centered = false, className = 'mb-5' }) => (
  <div
    className={`flex items-center gap-3 ${centered ? 'justify-center' : ''
      } ${className}`}
  >
    <motion.span
      aria-hidden="true"
      variants={{
        hidden: { scaleX: 0 },
        show: { scaleX: 1, transition: { duration: 0.8, ease: EASE } },
      }}
      className={`h-px w-8 bg-[#C4A078] ${centered ? 'origin-right' : 'origin-left'
        }`}
    />
    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A6A44]">
      {children}
    </span>
    {centered && (
      <motion.span
        aria-hidden="true"
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: 0.8, ease: EASE } },
        }}
        className="h-px w-8 origin-left bg-[#C4A078]"
      />
    )}
  </div>
);

// Ícone + título de bloco (Formação, Aperfeiçoamentos)
const BlockTitle = ({ icon: Icon, children, className = 'mb-5' }) => (
  <div className={`group flex items-center gap-3 ${className}`}>
    <div
      className="
        flex h-11 w-11 items-center justify-center
        rounded-xl bg-[#F3EEE7] text-[#A9855D]
        transition-all duration-500
        group-hover:bg-[#C4A078]
        group-hover:text-white
        group-hover:-rotate-6
        group-hover:scale-110
      "
    >
      <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
    </div>
    <h3 className="font-serif text-[23px] font-medium text-[#49382E]">
      {children}
    </h3>
  </div>
);

// Item com check
const CheckIcon = ({ size = 18 }) => (
  <CheckCircle2
    size={size}
    strokeWidth={1.7}
    aria-hidden="true"
    className="mt-0.5 shrink-0 text-[#A9855D]"
  />
);

/* ------------------------------------------------------------------ */
/* COMPONENTE PRINCIPAL                                                */
/* ------------------------------------------------------------------ */

const About = () => {
  const reduce = useReducedMotion();
  const [showAllCerts, setShowAllCerts] = useState(false);

  const {
    crefito,
    photo,
    aboutStory = '',
    academic = [],
    certifications = [],
    differentials = '',
    whatsappLink,
    schedulingLink,
  } = PROFESSIONAL_DATA;

  const ctaLink = schedulingLink || whatsappLink;
  const storyParagraphs = aboutStory.split('\n\n').filter(Boolean);

  const hasManyCerts = certifications.length > CERTS_PREVIEW;
  const visibleCerts =
    showAllCerts || !hasManyCerts
      ? certifications
      : certifications.slice(0, CERTS_PREVIEW);

  /* PARALLAX DA FOTO CONFORME A ROLAGEM */
  const photoRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

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
      id="sobre"
      aria-labelledby="sobre-titulo"
      className="relative overflow-hidden bg-[#FFFEFB] py-20 sm:py-24 lg:py-28"
    >
      {/* ============ ELEMENTOS DECORATIVOS ============ */}

      {/* Orbes com movimento lento (ocultos no mobile para poupar desempenho) */}
      <motion.div
        aria-hidden="true"
        {...drift(40, 30, 22)}
        className="
          pointer-events-none
          absolute -top-40 -left-40
          hidden h-96 w-96
          rounded-full
          bg-[#E8DDD0]/30
          blur-3xl
          sm:block
        "
      />
      <motion.div
        aria-hidden="true"
        {...drift(-40, -35, 26, 2)}
        className="
          pointer-events-none
          absolute -bottom-48 -right-48
          hidden h-96 w-96
          rounded-full
          bg-[#DCC9B5]/20
          blur-3xl
          sm:block
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
            'radial-gradient(ellipse at 20% 50%, black 0%, transparent 60%)',
          maskImage:
            'radial-gradient(ellipse at 20% 50%, black 0%, transparent 60%)',
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
          absolute top-32 right-[3%]
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
          absolute bottom-24 left-[2%]
          hidden h-44 w-44
          text-[#C4A078]/30
          md:block
        "
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
        className="pointer-events-none absolute top-[20%] left-[8%] hidden h-3 w-3 rounded-full border border-[#C4A078]/60 lg:block"
      />
      <motion.span
        aria-hidden="true"
        {...bob(10, 5, 1)}
        className="pointer-events-none absolute top-[55%] right-[6%] hidden h-2 w-2 rounded-full bg-[#C4A078]/50 md:block"
      />
      <motion.span
        aria-hidden="true"
        {...bob(14, 7, 2)}
        className="pointer-events-none absolute bottom-[12%] right-[22%] hidden h-2.5 w-2.5 rounded-full bg-[#DCC9B5] md:block"
      />
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        {...spin(40, true)}
        className="pointer-events-none absolute top-[36%] left-[4%] hidden h-5 w-5 text-[#C4A078]/60 lg:block"
      >
        <path d="M12 3v18M3 12h18" />
      </motion.svg>

      {/* ============ CONTEÚDO ============ */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* IDENTIFICAÇÃO DA SEÇÃO */}
        <motion.div
          variants={stagger}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={VIEWPORT}
          className="mb-14 text-center lg:mb-20"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow centered className="mb-5">
              Sobre a Profissional
            </Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            id="sobre-titulo"
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
            Conheça quem está por trás
            <span className="block italic text-[#8A6A44]">
              de cada cuidado.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-[15px] leading-[1.9] text-[#74675D] sm:text-base"
          >
            Uma trajetória dedicada à fisioterapia, à recuperação dos
            movimentos e ao cuidado individualizado.
          </motion.p>
        </motion.div>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* COLUNA DA FOTOGRAFIA */}
          <motion.div
            ref={photoRef}
            variants={slideLeft}
            initial={reduce ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:sticky lg:top-32 lg:col-span-5"
          >
            <div className="relative mx-auto max-w-lg">
              {/* ANEL TRACEJADO GIRANDO ATRÁS DA FOTO */}
              <motion.div
                aria-hidden="true"
                {...spin(80)}
                className="
                  pointer-events-none
                  absolute -inset-10
                  hidden
                  rounded-full
                  border border-dashed border-[#D9C8B5]/80
                  sm:block
                "
              />

              {/* MOLDURA DECORATIVA (respirando) */}
              <motion.div
                aria-hidden="true"
                {...(reduce
                  ? {}
                  : {
                    animate: { scale: [1, 1.02, 1], rotate: [0, 1, 0] },
                    transition: {
                      duration: 9,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  })}
                className="absolute -inset-3 rounded-4xl border border-[#D9C8B5] sm:-inset-4"
              />

              {/* FOTO */}
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[28px]
                  border-[5px]
                  border-white
                  bg-[#F1E9DC]
                  shadow-[0_25px_60px_rgba(73,56,46,0.12)]
                "
              >
                <div className="overflow-hidden">
                  <motion.img
                    src={photo || FALLBACK_PHOTO}
                    alt="Patrícia Fiaes, fisioterapeuta"
                    width={800}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    style={reduce ? undefined : { y: imgY, scale: 1.12 }}
                    className="aspect-4/5 w-full object-cover object-center"
                  />
                </div>

                {/* REGISTRO PROFISSIONAL */}
                {crefito && (
                  <div className="border-t border-[#E8DFD3] bg-[#F7F6F0] px-6 py-6 sm:px-8">
                    <div className="group flex items-center gap-4">
                      <div
                        className="
                          flex h-12 w-12
                          shrink-0
                          items-center justify-center
                          rounded-full
                          border border-[#D9C8B5]
                          bg-[#FFFEFB]
                          text-[#A9855D]
                          transition-all duration-500
                          group-hover:border-[#C4A078]
                          group-hover:bg-[#C4A078]
                          group-hover:text-white
                          group-hover:scale-110
                        "
                      >
                        <BadgeCheck
                          size={24}
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A6A44]">
                          Registro Profissional
                        </p>
                        <p className="mt-1 font-serif text-xl font-medium text-[#49382E]">
                          CREFITO {crefito}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* DETALHE FLORAL (flutuando) */}
              <motion.div
                aria-hidden="true"
                {...bob(8, 5)}
                className="
                  absolute
                  -bottom-8
                  -right-5
                  hidden
                  h-20 w-20
                  items-center
                  justify-center
                  rounded-full
                  border border-[#D9C8B5]
                  bg-[#FFFEFB]
                  text-[#C4A078]
                  shadow-lg
                  sm:flex
                "
              >
                <motion.span
                  {...(reduce
                    ? {}
                    : {
                      animate: { rotate: [0, 12, 0, -12, 0] },
                      transition: {
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    })}
                  className="flex"
                >
                  <Flower2 size={38} strokeWidth={1} />
                </motion.span>
              </motion.div>
            </div>
          </motion.div>

          {/* COLUNA DE INFORMAÇÕES */}
          <div className="space-y-9 lg:col-span-7">
            {/* APRESENTAÇÃO */}
            <motion.div
              variants={stagger}
              initial={reduce ? false : 'hidden'}
              whileInView="show"
              viewport={VIEWPORT}
            >
              <motion.div variants={fadeUp}>
                <Eyebrow>Minha Trajetória</Eyebrow>
              </motion.div>

              <motion.h3
                variants={fadeUp}
                className="mb-6 font-serif text-3xl font-normal leading-snug text-[#49382E] sm:text-4xl"
              >
                Patrícia Fiaes
                <span className="mt-1 block text-xl italic text-[#8A6A44] sm:text-2xl">
                  Fisioterapeuta
                </span>
              </motion.h3>

              {/* HISTÓRIA PROFISSIONAL */}
              <div className="space-y-5 text-[15px] leading-[1.95] text-[#74675D]">
                {storyParagraphs.map((paragraph) => (
                  <motion.p key={paragraph.slice(0, 40)} variants={fadeUp}>
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            {/* FORMAÇÃO ACADÊMICA */}
            {academic.length > 0 && (
              <motion.div
                variants={stagger}
                initial={reduce ? false : 'hidden'}
                whileInView="show"
                viewport={VIEWPORT}
                className="relative border-t border-[#E8DFD3] pt-8"
              >
                {/* linha dourada que se desenha sobre a borda */}
                <motion.span
                  aria-hidden="true"
                  variants={{
                    hidden: { scaleX: 0 },
                    show: {
                      scaleX: 1,
                      transition: { duration: 1.2, ease: EASE },
                    },
                  }}
                  className="absolute -top-px left-0 h-px w-24 origin-left bg-[#C4A078]"
                />

                <motion.div variants={fadeUp}>
                  <BlockTitle icon={GraduationCap}>
                    Formação Acadêmica
                  </BlockTitle>
                </motion.div>

                <ul className="space-y-3">
                  {academic.map((item) => (
                    <motion.li
                      key={item}
                      variants={fadeUp}
                      className="group flex items-start gap-3 text-[15px] leading-relaxed text-[#74675D] transition-transform duration-300 hover:translate-x-1"
                    >
                      <CheckIcon />
                      <span className="transition-colors duration-300 group-hover:text-[#49382E]">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* FORMAÇÕES E APERFEIÇOAMENTOS */}
            {certifications.length > 0 && (
              <motion.div
                variants={stagger}
                initial={reduce ? false : 'hidden'}
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="relative border-t border-[#E8DFD3] pt-8"
              >
                <motion.span
                  aria-hidden="true"
                  variants={{
                    hidden: { scaleX: 0 },
                    show: {
                      scaleX: 1,
                      transition: { duration: 1.2, ease: EASE },
                    },
                  }}
                  className="absolute -top-px left-0 h-px w-24 origin-left bg-[#C4A078]"
                />

                <motion.div variants={fadeUp}>
                  <BlockTitle icon={Award} className="mb-6">
                    Formações & Aperfeiçoamentos
                  </BlockTitle>
                </motion.div>

                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <AnimatePresence initial={false}>
                    {visibleCerts.map((cert, i) => (
                      <motion.li
                        key={cert}
                        layout={!reduce}
                        initial={
                          reduce ? false : { opacity: 0, y: 16, scale: 0.97 }
                        }
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: {
                            duration: 0.5,
                            ease: EASE,
                            delay: (i % CERTS_PREVIEW) * 0.05,
                          },
                        }}
                        exit={
                          reduce
                            ? undefined
                            : { opacity: 0, scale: 0.97, transition: { duration: 0.2 } }
                        }
                        whileHover={reduce ? undefined : { y: -3 }}
                        className="
                          flex
                          items-start
                          gap-3
                          rounded-xl
                          border border-[#E8DFD3]
                          bg-[#F9F7F2]
                          px-4
                          py-3.5
                          transition-[border-color,background-color,box-shadow] duration-300
                          hover:border-[#C4A078]
                          hover:bg-[#F3EEE7]
                          hover:shadow-[0_10px_25px_rgba(73,56,46,0.06)]
                        "
                      >
                        <CheckIcon size={17} />
                        <span className="text-[13px] leading-relaxed text-[#62574E]">
                          {cert}
                        </span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                {hasManyCerts && (
                  <motion.div variants={fadeUp}>
                    <button
                      type="button"
                      onClick={() => setShowAllCerts((prev) => !prev)}
                      aria-expanded={showAllCerts}
                      className="
                        mt-5
                        inline-flex items-center gap-2
                        rounded-full
                        border border-[#D9C8B5]
                        px-5 py-2.5
                        text-sm font-medium text-[#8A6A44]
                        transition-all duration-300
                        hover:bg-[#F3EEE7]
                        hover:border-[#C4A078]
                        active:scale-95
                        focus-visible:outline-2
                        focus-visible:outline-offset-2
                        focus-visible:outline-[#A9855D]
                      "
                    >
                      {showAllCerts
                        ? 'Ver menos'
                        : `Ver todas (${certifications.length})`}
                      <ChevronDown
                        size={16}
                        aria-hidden="true"
                        className={`transition-transform duration-300 ${showAllCerts ? 'rotate-180' : ''
                          }`}
                      />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* DIFERENCIAL PROFISSIONAL */}
            {differentials && (
              <motion.div
                variants={fadeUp}
                initial={reduce ? false : 'hidden'}
                whileInView="show"
                viewport={VIEWPORT}
                className="
                  relative
                  overflow-hidden
                  rounded-3xl
                  border border-[#D9C8B5]
                  bg-[#F1E9DC]
                  p-7
                  shadow-[0_12px_35px_rgba(73,56,46,0.06)]
                  sm:p-8
                "
              >
                {/* DETALHES DECORATIVOS */}
                <motion.div
                  aria-hidden="true"
                  {...spin(90)}
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border border-dashed border-[#D9C8B5]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full border border-[#D9C8B5]/70"
                />
                <motion.div
                  aria-hidden="true"
                  {...drift(10, -10, 12)}
                  className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-[#DCC9B5]/30 blur-2xl"
                />

                <div className="relative z-10">
                  <Eyebrow className="mb-4">Meu Diferencial</Eyebrow>

                  <h4 className="mb-4 font-serif text-2xl font-medium leading-snug text-[#49382E] sm:text-[28px]">
                    Um cuidado que considera
                    <span className="block italic text-[#8A6A44]">
                      você por inteiro.
                    </span>
                  </h4>

                  <p className="text-[15px] leading-[1.9] text-[#62574E]">
                    {differentials}
                  </p>

                  {/* CTA */}
                  {ctaLink && (
                    <motion.a
                      href={ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileTap={{ scale: 0.97 }}
                      className="
                        group
                        relative
                        overflow-hidden
                        mt-7
                        inline-flex items-center gap-2
                        rounded-full
                        bg-[#49382E]
                        px-7 py-3.5
                        text-sm font-medium text-white
                        shadow-[0_10px_25px_rgba(73,56,46,0.18)]
                        transition-all duration-300
                        hover:-translate-y-0.5
                        hover:bg-[#62574E]
                        focus-visible:outline-2
                        focus-visible:outline-offset-2
                        focus-visible:outline-[#A9855D]
                      "
                    >
                      {/* brilho que atravessa o botão */}
                      <span
                        aria-hidden="true"
                        className="
                          absolute inset-y-0 -left-1/3
                          w-1/3
                          -skew-x-12
                          bg-white/20
                          -translate-x-full
                          group-hover:translate-x-[400%]
                          transition-transform
                          duration-1000
                          ease-out
                        "
                      />
                      <MessageCircle
                        size={18}
                        aria-hidden="true"
                        className="relative transition-transform duration-300 group-hover:-rotate-12"
                      />
                      <span className="relative">Agendar uma avaliação</span>
                      <span className="sr-only"> (abre em nova aba)</span>
                    </motion.a>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;