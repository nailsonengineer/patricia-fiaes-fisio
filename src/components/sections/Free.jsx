import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import {
  Play,
  AlertCircle,
  Calendar,
  ArrowUpRight,
  Video,
  Flower2,
} from 'lucide-react';

import { FREE_VIDEOS_DATA } from '../../data/freeVideos';
import Modal from '../ui/Modal';

const EASE = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const cardIn = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

const lineGrow = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease: EASE } },
};

const VIEWPORT = { once: true, amount: 0.2 };

const Free = ({ onBookClick }) => {
  const reduce = useReducedMotion();
  const [activeVideo, setActiveVideo] = useState(null);

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
      id="conteudos"
      className="
        relative
        overflow-hidden
        bg-[#FFFEFB]
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* ============ ELEMENTOS DECORATIVOS ============ */}

      {/* Orbes com movimento lento */}
      <motion.div
        aria-hidden="true"
        {...drift(40, 30, 22)}
        className="
          pointer-events-none
          absolute -top-40 -left-40
          h-96 w-96
          rounded-full
          bg-[#E8DDD0]/30
          blur-3xl
        "
      />

      <motion.div
        aria-hidden="true"
        {...drift(-40, -35, 26, 2)}
        className="
          pointer-events-none
          absolute -bottom-48 -right-48
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
        {...spin(100, true)}
        className="
          pointer-events-none
          absolute top-28 right-[3%]
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
        {...spin(120)}
        className="
          pointer-events-none
          absolute bottom-40 left-[2%]
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
        className="pointer-events-none absolute top-[18%] left-[10%] hidden h-3 w-3 rounded-full border border-[#C4A078]/60 lg:block"
      />
      <motion.span
        aria-hidden="true"
        {...bob(10, 5, 1)}
        className="pointer-events-none absolute top-[50%] right-[5%] hidden h-2 w-2 rounded-full bg-[#C4A078]/50 md:block"
      />
      <motion.span
        aria-hidden="true"
        {...bob(14, 7, 2)}
        className="pointer-events-none absolute bottom-[10%] right-[20%] hidden h-2.5 w-2.5 rounded-full bg-[#DCC9B5] md:block"
      />
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        {...spin(40, true)}
        className="pointer-events-none absolute top-[34%] left-[5%] hidden h-5 w-5 text-[#C4A078]/60 lg:block"
      >
        <path d="M12 3v18M3 12h18" />
      </motion.svg>

      {/* ============ CONTEÚDO ============ */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* ==========================================
            CABEÇALHO DA SEÇÃO
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
              Conteúdos Gratuitos
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
            Movimente-se melhor.
            <span className="block italic text-[#A9855D]">
              Cuide-se todos os dias.
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
            Conteúdos educativos sobre movimento, mobilidade,
            alongamentos e hábitos que contribuem para o
            bem-estar e a qualidade de vida.
          </motion.p>
        </motion.div>

        {/* ==========================================
            GRID DE VÍDEOS
        ========================================== */}
        {FREE_VIDEOS_DATA.length > 0 ? (
          <motion.div
            variants={stagger}
            initial={reduce ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
              lg:grid-cols-4
              lg:gap-7
            "
          >
            {FREE_VIDEOS_DATA.map((item) => (
              <motion.article
                key={item.id}
                variants={cardIn}
                whileHover={reduce ? undefined : { y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="
                  group
                  relative
                  flex
                  flex-col
                  overflow-hidden
                  rounded-3xl
                  border border-[#E8DFD3]
                  bg-[#FFFEFB]
                  shadow-[0_8px_30px_rgba(73,56,46,0.05)]
                  transition-[border-color,box-shadow] duration-500
                  hover:border-[#C4A078]/60
                  hover:shadow-[0_20px_45px_rgba(73,56,46,0.12)]
                "
              >
                {/* MINIATURA DO VÍDEO */}
                <button
                  type="button"
                  onClick={() => setActiveVideo(item)}
                  aria-label={`Assistir vídeo: ${item.title}`}
                  className="
                    relative
                    block
                    aspect-video
                    w-full
                    cursor-pointer
                    overflow-hidden
                    bg-[#EDE5DA]
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    focus-visible:outline-[#A9855D]
                  "
                >
                  <img
                    src={item.thumbnail}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform duration-700
                      group-hover:scale-110
                    "
                  />

                  {/* SOBREPOSIÇÃO */}
                  <div
                    className="
                      pointer-events-none
                      absolute inset-0
                      bg-[#30251D]/25
                      transition-colors duration-300
                      group-hover:bg-[#30251D]/10
                    "
                  />

                  {/* BRILHO QUE ATRAVESSA */}
                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute inset-y-0 -left-1/3
                      w-1/3
                      -skew-x-12
                      bg-white/15
                      -translate-x-full
                      group-hover:translate-x-[450%]
                      transition-transform
                      duration-1000
                      ease-out
                    "
                  />

                  {/* BOTÃO PLAY */}
                  <div
                    className="
                      pointer-events-none
                      absolute inset-0
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <div className="relative">
                      {/* onda pulsando ao redor do play */}
                      {!reduce && (
                        <motion.span
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full border border-white/60"
                          animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                          transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            ease: 'easeOut',
                          }}
                        />
                      )}

                      <div
                        className="
                          relative
                          flex
                          h-14 w-14
                          items-center
                          justify-center
                          rounded-full
                          border border-white/50
                          bg-[#C4A078]/95
                          text-white
                          shadow-[0_10px_30px_rgba(73,56,46,0.25)]
                          backdrop-blur-sm
                          transition-all duration-500
                          group-hover:scale-110
                          group-hover:bg-[#A9855D]
                        "
                      >
                        <Play
                          size={23}
                          strokeWidth={1.5}
                          className="ml-1 fill-current"
                        />
                      </div>
                    </div>
                  </div>

                  {/* DURAÇÃO */}
                  {item.duration && (
                    <span
                      className="
                        pointer-events-none
                        absolute bottom-3 right-3
                        rounded-lg
                        bg-[#30251D]/80
                        px-2.5 py-1
                        text-[10px]
                        font-medium
                        text-white
                        backdrop-blur-sm
                      "
                    >
                      {item.duration}
                    </span>
                  )}
                </button>

                {/* CONTEÚDO DO CARD */}
                <div className="relative flex flex-1 flex-col p-6">
                  {/* detalhe superior que se expande no hover */}
                  <span
                    aria-hidden="true"
                    className="
                      absolute left-0 top-0
                      h-0.5 w-0
                      bg-[#C4A078]
                      transition-all duration-500
                      group-hover:w-full
                    "
                  />

                  {/* CATEGORIA */}
                  <span
                    className="
                      mb-3
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-[#A9855D]
                    "
                  >
                    {item.category}
                  </span>

                  {/* TÍTULO */}
                  <h3
                    className="
                      mb-3
                      font-serif
                      text-xl
                      font-medium
                      leading-snug
                      text-[#49382E]
                      transition-colors duration-300
                      group-hover:text-[#A9855D]
                    "
                  >
                    {item.title}
                  </h3>

                  {/* DESCRIÇÃO */}
                  <p
                    className="
                      mb-6
                      flex-1
                      text-[13px]
                      leading-[1.85]
                      text-[#74675D]
                    "
                  >
                    {item.description}
                  </p>

                  {/* BOTÃO ASSISTIR */}
                  <div className="border-t border-[#EEE7DE] pt-5">
                    <button
                      type="button"
                      onClick={() => setActiveVideo(item)}
                      className="
                        group/btn
                        flex
                        w-full
                        cursor-pointer
                        items-center
                        justify-between
                        rounded-xl
                        border border-[#E8DFD3]
                        bg-[#F3EEE7]
                        px-4 py-3
                        text-[12px]
                        font-semibold
                        text-[#A9855D]
                        transition-all duration-300
                        hover:border-[#C4A078]
                        hover:bg-[#C4A078]
                        hover:text-white
                        active:scale-[0.98]
                      "
                    >
                      <span className="flex items-center gap-2">
                        <Play size={15} strokeWidth={1.7} />
                        Assistir Vídeo
                      </span>

                      <ArrowUpRight
                        size={17}
                        strokeWidth={1.7}
                        className="
                          transition-transform duration-300
                          group-hover/btn:translate-x-0.5
                          group-hover/btn:-translate-y-0.5
                        "
                      />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          /* ESTADO VAZIO */
          <motion.div
            variants={fadeUp}
            initial={reduce ? false : 'hidden'}
            whileInView="show"
            viewport={VIEWPORT}
            className="
              relative
              mx-auto
              flex max-w-xl
              flex-col
              items-center
              overflow-hidden
              rounded-3xl
              border border-[#E8DFD3]
              bg-[#F7F6F0]
              px-6 py-14
              text-center
            "
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full border border-[#E8DFD3]"
            />

            <motion.span {...bob(6, 4)} className="mb-4 text-[#A9855D]">
              <Video size={38} strokeWidth={1.3} />
            </motion.span>

            <p className="font-serif text-xl text-[#49382E]">
              Novos conteúdos em breve
            </p>

            <p className="mt-2 text-sm text-[#74675D]">
              Estamos preparando materiais educativos para você.
            </p>
          </motion.div>
        )}

        {/* ==========================================
            AVISO EDUCATIVO
        ========================================== */}
        <motion.div
          variants={fadeUp}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={VIEWPORT}
          className="
            group
            mx-auto
            mt-14
            flex
            max-w-4xl
            items-start
            gap-4
            rounded-2xl
            border border-[#E8DFD3]
            bg-[#F7F6F0]
            p-5
            transition-colors duration-500
            hover:border-[#D9C8B5]
            sm:p-6
          "
        >
          <div
            className="
              flex h-10 w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#F1E9DC]
              text-[#A9855D]
              transition-all duration-500
              group-hover:bg-[#C4A078]
              group-hover:text-white
              group-hover:-rotate-6
            "
          >
            <AlertCircle size={21} strokeWidth={1.7} />
          </div>

          <div>
            <h4
              className="
                mb-2
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-[#49382E]
              "
            >
              Aviso Educativo
            </h4>

            <p
              className="
                text-[12px]
                leading-[1.9]
                text-[#74675D]
                sm:text-[13px]
              "
            >
              Os conteúdos apresentados são estritamente informativos
              e não substituem uma avaliação fisioterapêutica
              individualizada. Interrompa qualquer atividade em caso
              de dor ou desconforto e busque orientação profissional.
            </p>
          </div>
        </motion.div>

        {/* ==========================================
            CTA FINAL
        ========================================== */}
        <motion.div
          variants={stagger}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-14 text-center"
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
              mb-6
              font-serif
              text-xl
              italic
              text-[#74675D]
              sm:text-2xl
            "
          >
            Seu cuidado merece uma atenção individualizada.
          </motion.p>

          <motion.div variants={fadeUp}>
            <motion.button
              type="button"
              onClick={() => onBookClick?.()}
              whileTap={{ scale: 0.97 }}
              className="
                group
                relative
                overflow-hidden
                inline-flex
                max-w-full
                cursor-pointer
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-[#C4A078]
                px-7 py-4
                text-center
                text-sm
                font-medium
                leading-relaxed
                text-white
                shadow-[0_10px_25px_rgba(169,133,93,0.18)]
                transition-all duration-300
                hover:-translate-y-1
                hover:bg-[#A9855D]
                hover:shadow-[0_15px_30px_rgba(169,133,93,0.25)]
                sm:text-base
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
                  group-hover:translate-x-[500%]
                  transition-transform
                  duration-1000
                  ease-out
                "
              />

              <Calendar
                size={19}
                strokeWidth={1.7}
                className="relative shrink-0 transition-transform duration-300 group-hover:-rotate-8"
              />

              <span className="relative">
                Precisa de acompanhamento individualizado? Agende sua avaliação
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* ==========================================
          MODAL REPRODUTOR DE VÍDEO
      ========================================== */}
      {activeVideo && (
        <Modal
          isOpen={Boolean(activeVideo)}
          onClose={() => setActiveVideo(null)}
          title={activeVideo.title}
        >
          <div className="space-y-5">
            {/* PLAYER */}
            <div
              className="
                aspect-video
                w-full
                overflow-hidden
                rounded-2xl
                bg-[#30251D]
                shadow-[0_10px_30px_rgba(73,56,46,0.12)]
              "
            >
              <iframe
                src={activeVideo.embedUrl}
                title={activeVideo.title}
                className="h-full w-full border-0"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            {/* INFORMAÇÕES */}
            <div>
              {activeVideo.category && (
                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#A9855D]
                  "
                >
                  {activeVideo.category}
                </span>
              )}

              <p
                className="
                  mt-3
                  text-sm
                  leading-[1.9]
                  text-[#74675D]
                "
              >
                {activeVideo.description}
              </p>
            </div>

            {/* AVISO */}
            <div
              className="
                flex
                items-start
                gap-3
                rounded-xl
                border border-[#E8DFD3]
                bg-[#F7F6F0]
                p-4
              "
            >
              <AlertCircle
                size={18}
                strokeWidth={1.7}
                className="mt-0.5 shrink-0 text-[#A9855D]"
              />

              <p
                className="
                  text-xs
                  leading-relaxed
                  text-[#74675D]
                "
              >
                Este conteúdo é educativo e não substitui
                uma avaliação fisioterapêutica individualizada.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Free;