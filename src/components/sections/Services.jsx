import React, { useState } from 'react';
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useMotionTemplate,
} from 'framer-motion';
import { ArrowUpRight, Calendar, ArrowRight, Flower2 } from 'lucide-react';

import { SERVICES_DATA } from '../../data/services';
import { PROFESSIONAL_DATA } from '../../data/professional';

import DynamicIcon from '../ui/DynamicIcon';
import Modal from '../ui/Modal';

import { buildWhatsAppUrl } from '../../utils/whatsapp';

const EASE = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const VIEWPORT = { once: true, amount: 0.2 };

/* ============ CARD INDIVIDUAL ============ */
const ServiceCard = ({ service, index, onOpen, reduce }) => {
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  /* luz suave que acompanha o mouse dentro do card */
  const spotlight = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(196,160,120,0.14), transparent 70%)`;

  const handleMouseMove = (e) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-300);
    mouseY.set(-300);
  };

  return (
    <motion.article
      variants={fadeUp}
      whileHover={reduce ? undefined : { y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        group
        relative
        flex flex-col
        overflow-hidden
        rounded-3xl
        border border-[#E8DFD3]
        bg-[#FFFEFB]
        p-8
        shadow-[0_8px_30px_rgba(73,56,46,0.035)]
        transition-[border-color,box-shadow] duration-500
        hover:border-[#C4A078]/60
        hover:shadow-[0_20px_50px_rgba(73,56,46,0.10)]
        sm:p-9
      "
    >
      {/* LUZ QUE SEGUE O MOUSE */}
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="
          pointer-events-none
          absolute inset-0
          opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
        "
      />

      {/* CÍRCULOS MINIMALISTAS NO CANTO */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -bottom-12 -right-12
          h-36 w-36
          rounded-full
          border border-[#E8DFD3]
          transition-transform duration-700 ease-out
          group-hover:scale-150
          group-hover:border-[#C4A078]/40
        "
      />
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -bottom-6 -right-6
          h-20 w-20
          rounded-full
          border border-dashed border-[#E8DFD3]
          transition-transform duration-700 ease-out
          group-hover:scale-150
          group-hover:rotate-90
          group-hover:border-[#C4A078]/40
        "
      />

      {/* DETALHE SUPERIOR */}
      <div
        className="
          absolute left-0 top-0
          h-1 w-0
          bg-[#C4A078]
          transition-all duration-500
          group-hover:w-full
        "
      />

      {/* ÍCONE + NUMERAÇÃO */}
      <div className="relative mb-8 flex items-start justify-between">
        <div
          className="
            flex h-16 w-16
            items-center justify-center
            rounded-2xl
            border border-[#E8DFD3]
            bg-[#F3EEE7]
            text-[#A9855D]
            transition-all duration-500
            group-hover:border-[#C4A078]
            group-hover:bg-[#C4A078]
            group-hover:text-white
            group-hover:scale-110
            group-hover:-rotate-6
            group-hover:shadow-[0_12px_25px_rgba(169,133,93,0.25)]
          "
        >
          <DynamicIcon name={service.icon} className="h-7 w-7" />
        </div>

        <span
          className="
            font-serif
            text-3xl
            font-normal
            text-[#D9CABB]
            transition-all duration-500
            group-hover:text-[#C4A078]
            group-hover:-translate-y-1
          "
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* CONTEÚDO */}
      <div className="relative flex flex-1 flex-col">
        <h3
          className="
            mb-4
            font-serif
            text-[25px]
            font-medium
            leading-snug
            text-[#49382E]
            transition-colors duration-300
            group-hover:text-[#A9855D]
          "
        >
          {service.title}
        </h3>

        <p
          className="
            mb-8
            flex-1
            text-[14px]
            leading-[1.9]
            text-[#74675D]
          "
        >
          {service.shortDescription}
        </p>

        {/* RODAPÉ DO CARD */}
        <div
          className="
            flex items-center justify-between
            border-t border-[#EEE7DE]
            pt-6
          "
        >
          <button
            type="button"
            onClick={() => onOpen(service)}
            className="
              group/btn
              inline-flex
              cursor-pointer
              items-center gap-2
              text-[13px]
              font-semibold
              tracking-wide
              text-[#A9855D]
              transition-all duration-300
              hover:gap-3
              hover:text-[#49382E]
            "
          >
            Conhecer tratamento
            <ArrowRight
              size={17}
              strokeWidth={1.7}
              className="transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          </button>

          <button
            type="button"
            onClick={() => onOpen(service)}
            aria-label={`Conhecer ${service.title}`}
            className="
              flex h-9 w-9
              cursor-pointer
              items-center justify-center
              rounded-full
              border border-[#E8DFD3]
              text-[#A9855D]
              transition-all duration-300
              group-hover:border-[#C4A078]
              group-hover:bg-[#C4A078]
              group-hover:text-white
              hover:scale-110
              active:scale-95
            "
          >
            <ArrowUpRight
              size={17}
              strokeWidth={1.7}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </motion.article>
  );
};

/* ============ SEÇÃO ============ */
const Services = () => {
  const reduce = useReducedMotion();
  const [selectedService, setSelectedService] = useState(null);

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
      id="servicos"
      className="relative overflow-hidden bg-[#F7F6F0] py-20 sm:py-24 lg:py-28"
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
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: 'radial-gradient(#DCC9B5 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          WebkitMaskImage:
            'radial-gradient(ellipse at 50% 0%, black 0%, transparent 60%)',
          maskImage:
            'radial-gradient(ellipse at 50% 0%, black 0%, transparent 60%)',
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
          absolute top-24 left-[3%]
          hidden md:block
          h-40 w-40
          text-[#C4A078]/35
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
          hidden md:block
          h-48 w-48
          text-[#C4A078]/30
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
        className="pointer-events-none absolute top-[14%] right-[18%] hidden h-3 w-3 rounded-full border border-[#C4A078]/60 lg:block"
      />
      <motion.span
        aria-hidden="true"
        {...bob(10, 5, 1)}
        className="pointer-events-none absolute top-[40%] left-[6%] hidden h-2 w-2 rounded-full bg-[#C4A078]/50 md:block"
      />
      <motion.span
        aria-hidden="true"
        {...bob(14, 7, 2)}
        className="pointer-events-none absolute bottom-[18%] left-[16%] hidden h-2.5 w-2.5 rounded-full bg-[#DCC9B5] md:block"
      />
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        {...spin(40, true)}
        className="pointer-events-none absolute top-[30%] right-[7%] hidden h-5 w-5 text-[#C4A078]/60 lg:block"
      >
        <path d="M12 3v18M3 12h18" />
      </motion.svg>

      {/* ============ CONTEÚDO ============ */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* CABEÇALHO */}
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
              variants={{
                hidden: { scaleX: 0 },
                show: { scaleX: 1, transition: { duration: 0.8, ease: EASE } },
              }}
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
              Nossas Especialidades
            </span>

            <motion.span
              variants={{
                hidden: { scaleX: 0 },
                show: { scaleX: 1, transition: { duration: 0.8, ease: EASE } },
              }}
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
            Cuidado especializado para
            <span className="block italic text-[#A9855D]">
              cada etapa da sua recuperação.
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
            Tratamentos fisioterapêuticos personalizados,
            fundamentados em avaliação individualizada e
            direcionados à recuperação dos movimentos,
            ao alívio da dor e à melhoria da qualidade de vida.
          </motion.p>
        </motion.div>

        {/* GRID DE SERVIÇOS */}
        <motion.div
          variants={stagger}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="
            grid grid-cols-1
            gap-6
            md:grid-cols-2
            lg:grid-cols-3
            lg:gap-8
          "
        >
          {SERVICES_DATA.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onOpen={setSelectedService}
              reduce={reduce}
            />
          ))}
        </motion.div>

        {/* MENSAGEM INSTITUCIONAL */}
        <motion.div
          variants={stagger}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={VIEWPORT}
          className="mx-auto mt-16 max-w-3xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mx-auto mb-6 flex items-center justify-center gap-4"
          >
            <span className="h-px w-16 bg-[#C4A078]/60" />
            <motion.span {...bob(5, 4)} className="text-[#C4A078]">
              <Flower2 size={26} strokeWidth={1.1} />
            </motion.span>
            <span className="h-px w-16 bg-[#C4A078]/60" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="
              font-serif
              text-xl
              italic
              leading-relaxed
              text-[#74675D]
              sm:text-2xl
            "
          >
            Cada pessoa possui uma história, necessidades
            e objetivos únicos. O tratamento também deve ser assim.
          </motion.p>
        </motion.div>
      </div>

      {/* MODAL DE DETALHES */}
      {selectedService && (
        <Modal
          isOpen={Boolean(selectedService)}
          onClose={() => setSelectedService(null)}
          title={selectedService.title}
        >
          <div className="space-y-7">
            {/* IDENTIFICAÇÃO */}
            <div className="flex items-center gap-4">
              <div
                className="
                  flex h-16 w-16
                  shrink-0
                  items-center justify-center
                  rounded-2xl
                  border border-[#E8DFD3]
                  bg-[#F3EEE7]
                  text-[#A9855D]
                "
              >
                <DynamicIcon
                  name={selectedService.icon}
                  className="h-8 w-8"
                />
              </div>

              <div>
                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#A9855D]
                  "
                >
                  Serviço Especializado
                </span>

                <h4
                  className="
                    mt-1
                    font-serif
                    text-xl
                    font-medium
                    text-[#49382E]
                  "
                >
                  {selectedService.title}
                </h4>

                <p className="mt-1 text-xs text-[#74675D]">
                  Atendimento individualizado
                </p>
              </div>
            </div>

            {/* DESCRIÇÃO */}
            <div
              className="
                rounded-2xl
                border border-[#EDE5DA]
                bg-[#F7F6F0]
                p-5
                sm:p-6
              "
            >
              <p
                className="
                  whitespace-pre-line
                  text-sm
                  leading-[1.9]
                  text-[#62574E]
                  sm:text-base
                "
              >
                {selectedService.fullDescription}
              </p>
            </div>

            {/* BOTÕES */}
            <div
              className="
                flex flex-col
                justify-end
                gap-3
                border-t border-[#E8DFD3]
                pt-5
                sm:flex-row
              "
            >
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="
                  cursor-pointer
                  rounded-xl
                  border border-[#DED3C5]
                  px-6 py-3
                  text-sm
                  font-medium
                  text-[#74675D]
                  transition-colors duration-300
                  hover:bg-[#F3EEE7]
                "
              >
                Fechar
              </button>

              <a
                href={buildWhatsAppUrl(
                  PROFESSIONAL_DATA.phone,
                  selectedService.title
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  relative
                  overflow-hidden
                  inline-flex
                  items-center justify-center
                  gap-2.5
                  rounded-xl
                  bg-[#C4A078]
                  px-7 py-3
                  text-sm
                  font-medium
                  text-white
                  shadow-[0_8px_20px_rgba(169,133,93,0.18)]
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#A9855D]
                  hover:shadow-[0_12px_25px_rgba(169,133,93,0.25)]
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
                <Calendar size={17} strokeWidth={1.8} className="relative" />
                <span className="relative">
                  Agendar {selectedService.title}
                </span>
              </a>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Services;