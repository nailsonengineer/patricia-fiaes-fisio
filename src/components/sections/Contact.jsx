import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import {
  Send,
  Mail,
  Share2,
  MapPin,
  ArrowUpRight,
  MessageCircle,
  Clock3,
  ShieldCheck,
} from 'lucide-react';

import { PROFESSIONAL_DATA } from '../../data/professional';
import { SERVICES_DATA } from '../../data/services';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

const EASE = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
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

const Contact = () => {
  const reduce = useReducedMotion();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Consulta Geral',
    message: '',
  });

  // ATUALIZAÇÃO DOS CAMPOS
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ENVIO PARA WHATSAPP
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      return;
    }

    const completeMessage = [
      formData.phone.trim()
        ? `Telefone: ${formData.phone.trim()}`
        : '',
      formData.message.trim(),
    ]
      .filter(Boolean)
      .join('\n\n');

    const url = buildWhatsAppUrl(
      PROFESSIONAL_DATA.phone,
      formData.service,
      formData.name.trim(),
      completeMessage
    );

    window.location.href = url;
  };

  // ESTILO DOS CAMPOS
  const inputClass = `
    w-full
    rounded-xl
    border border-[#E8DFD3]
    bg-[#FFFEFB]
    px-4 py-3.5
    text-sm
    text-[#49382E]
    placeholder:text-[#74675D]
    outline-none
    transition-all duration-300
    hover:border-[#C4A078]
    focus:border-[#C4A078]
    focus:ring-2
    focus:ring-[#C4A078]/20
    focus:shadow-[0_8px_20px_rgba(169,133,93,0.10)]
  `;

  // ESTILO DOS LABELS
  const labelClass = `
    mb-2
    block
    text-xs
    font-semibold
    uppercase
    tracking-wider
    text-[#62574E]
    transition-colors duration-300
    group-focus-within/field:text-[#A9855D]
  `;

  /* CANAIS DE ATENDIMENTO (mesmos dados e links do original) */
  const channels = [
    {
      key: 'instagram',
      icon: Share2,
      label: 'Instagram',
      content: (
        <a
          href={PROFESSIONAL_DATA.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 break-all text-sm text-[#FFFEFB] transition-colors hover:text-[#C4A078]"
        >
          {PROFESSIONAL_DATA.instagram}
          <ArrowUpRight size={15} />
        </a>
      ),
    },
    {
      key: 'email',
      icon: Mail,
      label: 'E-mail',
      content: (
        <a
          href={`mailto:${PROFESSIONAL_DATA.email}`}
          className="break-all text-sm text-[#FFFEFB] transition-colors hover:text-[#C4A078]"
        >
          {PROFESSIONAL_DATA.email}
        </a>
      ),
    },
    {
      key: 'local',
      icon: MapPin,
      label: 'Localização',
      content: (
        <p className="text-sm leading-7 text-[#FFFEFB]">
          {PROFESSIONAL_DATA.address}
        </p>
      ),
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
      id="contato"
      aria-labelledby="contato-titulo"
      className="relative overflow-hidden bg-[#F7F6F0] py-20 sm:py-24 lg:py-28"
    >
      {/* ============ ELEMENTOS DECORATIVOS DA SEÇÃO ============ */}

      {/* Orbes com movimento lento */}
      <motion.div
        aria-hidden="true"
        {...drift(-40, 35, 20)}
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#E8DFD3]/40 blur-3xl"
      />

      <motion.div
        aria-hidden="true"
        {...drift(40, -30, 24, 2)}
        className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#DCC9B5]/20 blur-3xl"
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
        {...spin(100, true)}
        className="pointer-events-none absolute right-[3%] top-28 hidden h-40 w-40 text-[#C4A078]/35 md:block"
      >
        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 4" />
        <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="0.4" />
        <circle cx="50" cy="2" r="1.4" fill="currentColor" />
      </motion.svg>

      <motion.svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        fill="none"
        {...spin(120)}
        className="pointer-events-none absolute bottom-24 left-[2%] hidden h-44 w-44 text-[#C4A078]/30 md:block"
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
        className="pointer-events-none absolute left-[12%] top-[14%] hidden h-3 w-3 rounded-full border border-[#C4A078]/60 lg:block"
      />
      <motion.span
        aria-hidden="true"
        {...bob(10, 5, 1)}
        className="pointer-events-none absolute right-[4%] top-[52%] hidden h-2 w-2 rounded-full bg-[#C4A078]/50 md:block"
      />
      <motion.span
        aria-hidden="true"
        {...bob(14, 7, 2)}
        className="pointer-events-none absolute bottom-[8%] right-[22%] hidden h-2.5 w-2.5 rounded-full bg-[#DCC9B5] md:block"
      />
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        {...spin(40, true)}
        className="pointer-events-none absolute left-[4%] top-[34%] hidden h-5 w-5 text-[#C4A078]/60 lg:block"
      >
        <path d="M12 3v18M3 12h18" />
      </motion.svg>

      {/* ============ CONTEÚDO ============ */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =====================================
            CABEÇALHO
        ===================================== */}
        <motion.div
          variants={stagger}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={VIEWPORT}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 flex items-center justify-center gap-3"
          >
            <motion.span
              variants={lineGrow}
              className="h-px w-8 origin-right bg-[#C4A078]"
            />

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A9855D]">
              Entre em Contato
            </span>

            <motion.span
              variants={lineGrow}
              className="h-px w-8 origin-left bg-[#C4A078]"
            />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            id="contato-titulo"
            className="font-serif text-4xl font-normal leading-tight tracking-tight text-[#49382E] sm:text-5xl lg:text-[54px]"
          >
            Seu bem-estar começa

            <span className="block italic text-[#A9855D]">
              com uma conversa.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#74675D]"
          >
            Entre em contato para esclarecer suas dúvidas,
            conhecer os atendimentos e dar o primeiro passo
            para cuidar da sua saúde.
          </motion.p>
        </motion.div>

        {/* =====================================
            CONTEÚDO PRINCIPAL
        ===================================== */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* =====================================
              PAINEL DE CONTATO
          ===================================== */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.95, ease: EASE }}
            className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#49382E] p-8 text-white shadow-xl sm:p-10 lg:col-span-5"
          >
            {/* DECORAÇÃO: anéis girando (cada um dentro de um wrapper posicionado) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64"
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
              className="pointer-events-none absolute -right-28 -top-28 h-80 w-80"
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
              className="pointer-events-none absolute bottom-[24%] right-8 hidden h-2 w-2 rounded-full bg-[#C4A078]/50 sm:block"
            />
            <motion.span
              aria-hidden="true"
              {...bob(12, 7, 1.5)}
              className="pointer-events-none absolute right-[18%] top-[46%] hidden h-2.5 w-2.5 rounded-full border border-[#C4A078]/40 sm:block"
            />

            <motion.div
              variants={stagger}
              initial={reduce ? false : 'hidden'}
              whileInView="show"
              viewport={VIEWPORT}
              className="relative"
            >
              {/* IDENTIFICAÇÃO */}
              <motion.div
                variants={fadeUp}
                className="mb-6 flex items-center gap-3"
              >
                <motion.span
                  variants={lineGrow}
                  className="h-px w-8 origin-left bg-[#C4A078]"
                />

                <span className="text-xs font-semibold uppercase tracking-widest text-[#C4A078]">
                  Canais de Atendimento
                </span>
              </motion.div>

              {/* TÍTULO */}
              <motion.h3
                variants={fadeUp}
                className="font-serif text-3xl font-normal leading-snug text-[#FFFEFB] sm:text-4xl"
              >
                Estamos aqui

                <span className="block italic text-[#C4A078]">
                  para você.
                </span>
              </motion.h3>

              <motion.p
                variants={fadeUp}
                className="mt-5 text-sm leading-7 text-[#F1E9DC]"
              >
                Cada pessoa tem uma história, uma necessidade
                e um objetivo. O cuidado começa com uma escuta
                atenta e acolhedora.
              </motion.p>

              {/* =====================================
                  INFORMAÇÕES
              ===================================== */}
              <div className="mt-10 space-y-7">
                {channels.map(({ key, icon: Icon, label, content }) => (
                  <motion.div
                    key={key}
                    variants={slideRight}
                    className="group flex items-start gap-4"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#C4A078]/30 bg-[#C4A078]/15 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:border-[#C4A078] group-hover:bg-[#C4A078]">
                      <Icon
                        size={21}
                        strokeWidth={1.6}
                        className="text-[#C4A078] transition-colors duration-500 group-hover:text-white"
                      />
                    </div>

                    <div className="min-w-0 transition-transform duration-300 group-hover:translate-x-1">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#C4A078]">
                        {label}
                      </p>

                      {content}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RODAPÉ DO PAINEL */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="group relative mt-12 border-t border-[#C4A078]/25 pt-7"
            >
              {/* linha dourada que se desenha sobre a borda */}
              <motion.span
                aria-hidden="true"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
                className="absolute -top-px left-0 h-px w-20 origin-left bg-[#C4A078]"
              />

              <div className="flex items-center gap-3">
                <Clock3
                  size={19}
                  strokeWidth={1.6}
                  className="shrink-0 text-[#C4A078] transition-transform duration-700 group-hover:rotate-360"
                />

                <p className="text-xs leading-relaxed text-[#F1E9DC]">
                  Atendimento mediante agendamento prévio.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* =====================================
              FORMULÁRIO
          ===================================== */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.95, ease: EASE }}
            className="relative overflow-hidden rounded-3xl border border-[#E8DFD3] bg-[#FFFEFB] p-7 shadow-sm sm:p-10 lg:col-span-7"
          >
            {/* Círculos minimalistas no canto */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full border border-[#EDE5DA]"
            />
            <motion.div
              aria-hidden="true"
              {...spin(80)}
              className="pointer-events-none absolute -bottom-10 -right-10 h-36 w-36 rounded-full border border-dashed border-[#E8DFD3]"
            />

            <motion.div
              variants={stagger}
              initial={reduce ? false : 'hidden'}
              whileInView="show"
              viewport={VIEWPORT}
              className="relative"
            >
              {/* CABEÇALHO DO FORMULÁRIO */}
              <motion.div variants={fadeUp} className="mb-8">
                <div className="mb-4 flex items-center gap-2">
                  <motion.span {...bob(3, 3)} className="flex">
                    <MessageCircle
                      size={18}
                      strokeWidth={1.7}
                      className="text-[#A9855D]"
                    />
                  </motion.span>

                  <span className="text-xs font-semibold uppercase tracking-widest text-[#A9855D]">
                    Envie sua mensagem
                  </span>
                </div>

                <h3 className="font-serif text-3xl font-normal text-[#49382E]">
                  Como podemos ajudar?
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#74675D]">
                  Preencha os campos abaixo e fale diretamente
                  pelo WhatsApp.
                </p>
              </motion.div>

              {/* FORMULÁRIO */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* NOME E TELEFONE */}
                <motion.div
                  variants={fadeUp}
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2"
                >
                  {/* NOME */}
                  <div className="group/field">
                    <label htmlFor="contact-name" className={labelClass}>
                      Nome completo *
                    </label>

                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  {/* TELEFONE */}
                  <div className="group/field">
                    <label htmlFor="contact-phone" className={labelClass}>
                      Telefone (opcional)
                    </label>

                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="(71) 99999-9999"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </motion.div>

                {/* SERVIÇO */}
                <motion.div variants={fadeUp} className="group/field">
                  <label htmlFor="contact-service" className={labelClass}>
                    Serviço de interesse
                  </label>

                  <select
                    id="contact-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`${inputClass} cursor-pointer`}
                  >
                    {SERVICES_DATA.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}

                    <option value="Consulta Geral">
                      Outro / Dúvida geral
                    </option>
                  </select>
                </motion.div>

                {/* MENSAGEM */}
                <motion.div variants={fadeUp} className="group/field">
                  <label htmlFor="contact-message" className={labelClass}>
                    Sua mensagem
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Conte brevemente como podemos ajudar..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-y`}
                  />
                </motion.div>

                {/* AVISO */}
                <motion.div
                  variants={fadeUp}
                  className="group flex items-start gap-3 rounded-xl border border-[#E8DFD3] bg-[#F3EEE7]/50 p-4 transition-colors duration-500 hover:border-[#D9C8B5]"
                >
                  <ShieldCheck
                    size={18}
                    strokeWidth={1.7}
                    className="mt-0.5 shrink-0 text-[#A9855D] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                  />

                  <p className="text-xs leading-6 text-[#74675D]">
                    Sua mensagem será preparada para envio pelo
                    WhatsApp. Você poderá revisar as informações
                    antes de enviar.
                  </p>
                </motion.div>

                {/* BOTÃO */}
                <motion.div variants={fadeUp} className="space-y-6">
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    className="group relative flex w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#C4A078] px-6 py-4 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A9855D] hover:shadow-[0_12px_25px_rgba(169,133,93,0.25)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A9855D]"
                  >
                    {/* brilho que atravessa periodicamente */}
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

                    <Send
                      size={18}
                      strokeWidth={1.7}
                      className="relative transition-transform duration-300 group-hover:-rotate-12 group-hover:translate-x-0.5"
                    />

                    <span className="relative">Enviar pelo WhatsApp</span>

                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.7}
                      className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </motion.button>

                  <p className="text-center text-xs text-[#74675D]">
                    Atendimento individualizado • Agendamento prévio
                  </p>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;