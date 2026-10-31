import React, { useState } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion';

import {
  Camera,
  Video,
  Play,
  ArrowUpRight,
  Images,
} from 'lucide-react';

import { GALLERY_PHOTOS, GALLERY_VIDEOS } from '../../data/gallery';
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

const lineGrow = (origin) => ({
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease: EASE } },
  origin,
});

const VIEWPORT = { once: true, amount: 0.2 };

const TABS = [
  { id: 'photos', label: 'Ver Fotos', icon: Camera },
  { id: 'videos', label: 'Assistir Vídeos', icon: Video },
];

const Gallery = () => {
  const reduce = useReducedMotion();

  const [activeTab, setActiveTab] = useState('photos');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedPhoto(null);
    setSelectedVideo(null);
  };

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

  const panelMotion = reduce
    ? {}
    : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -12 },
      transition: { duration: 0.35, ease: EASE },
    };

  return (
    <section
      id="galeria"
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
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
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
          absolute bottom-28 right-[3%]
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
        className="pointer-events-none absolute top-[16%] right-[16%] hidden h-3 w-3 rounded-full border border-[#C4A078]/60 lg:block"
      />
      <motion.span
        aria-hidden="true"
        {...bob(10, 5, 1)}
        className="pointer-events-none absolute top-[45%] left-[5%] hidden h-2 w-2 rounded-full bg-[#C4A078]/50 md:block"
      />
      <motion.span
        aria-hidden="true"
        {...bob(14, 7, 2)}
        className="pointer-events-none absolute bottom-[16%] left-[18%] hidden h-2.5 w-2.5 rounded-full bg-[#DCC9B5] md:block"
      />
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        {...spin(40, true)}
        className="pointer-events-none absolute top-[32%] right-[6%] hidden h-5 w-5 text-[#C4A078]/60 lg:block"
      >
        <path d="M12 3v18M3 12h18" />
      </motion.svg>

      {/* ============ CONTEÚDO ============ */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* CABEÇALHO DA SEÇÃO */}
        <motion.div
          variants={stagger}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={VIEWPORT}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          {/* IDENTIFICAÇÃO */}
          <motion.div
            variants={fadeUp}
            className="mb-6 flex items-center justify-center gap-3"
          >
            <motion.span
              variants={lineGrow()}
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
              Galeria de Mídias
            </span>

            <motion.span
              variants={lineGrow()}
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
            Movimento, cuidado e
            <span className="block italic text-[#A9855D]">
              dedicação na prática.
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
            Conheça um pouco mais do ambiente de atendimento,
            das atividades profissionais e dos conteúdos
            relacionados à fisioterapia e ao cuidado com o movimento.
          </motion.p>

          {/* SELETOR DE MÍDIAS */}
          <motion.div
            variants={fadeUp}
            className="
              mt-10
              inline-flex
              max-w-full
              items-center
              gap-1.5
              rounded-2xl
              border border-[#E8DFD3]
              bg-[#EEE8DE]
              p-1.5
            "
            role="group"
            aria-label="Selecionar tipo de mídia"
          >
            {TABS.map(({ id, label, icon: Icon }) => {
              const isActive = activeTab === id;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleTabChange(id)}
                  aria-pressed={isActive}
                  className={`
                    relative
                    inline-flex
                    cursor-pointer
                    items-center
                    justify-center
                    gap-2.5
                    rounded-xl
                    px-4
                    py-3
                    text-xs
                    font-medium
                    transition-colors duration-300
                    active:scale-95
                    sm:px-7
                    sm:text-sm
                    ${isActive
                      ? 'text-white'
                      : 'text-[#74675D] hover:bg-[#FFFEFB] hover:text-[#49382E]'
                    }
                  `}
                >
                  {/* fundo dourado que desliza entre as abas */}
                  {isActive && (
                    <motion.span
                      layoutId="gallery-tab-pill"
                      aria-hidden="true"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="
                        absolute inset-0
                        rounded-xl
                        bg-[#C4A078]
                        shadow-[0_5px_15px_rgba(169,133,93,0.18)]
                      "
                    />
                  )}

                  <Icon size={18} strokeWidth={1.7} className="relative z-10" />
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ==========================================
            PAINÉIS (transição suave entre abas)
        ========================================== */}
        <AnimatePresence mode="wait" initial={false}>
          {/* ---------- GALERIA DE FOTOGRAFIAS ---------- */}
          {activeTab === 'photos' && (
            <motion.div key="photos" {...panelMotion}>
              {GALLERY_PHOTOS.length > 0 ? (
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
                  {GALLERY_PHOTOS.map((photo) => (
                    <motion.button
                      key={photo.id}
                      type="button"
                      variants={cardIn}
                      whileHover={reduce ? undefined : { y: -8 }}
                      whileTap={reduce ? undefined : { scale: 0.98 }}
                      onClick={() => setSelectedPhoto(photo)}
                      aria-label={`Visualizar foto: ${photo.title}`}
                      className="
                        group
                        relative
                        block
                        aspect-square
                        w-full
                        cursor-pointer
                        overflow-hidden
                        rounded-3xl
                        border border-[#E8DFD3]
                        bg-[#EDE5DA]
                        text-left
                        shadow-[0_8px_30px_rgba(73,56,46,0.05)]
                        transition-[border-color,box-shadow] duration-500
                        hover:border-[#C4A078]/60
                        hover:shadow-[0_20px_45px_rgba(73,56,46,0.13)]
                        focus-visible:outline-2
                        focus-visible:outline-offset-4
                        focus-visible:outline-[#A9855D]
                      "
                    >
                      {/* FOTOGRAFIA */}
                      <img
                        src={photo.url}
                        alt={photo.title}
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

                      {/* DEGRADÊ */}
                      <div
                        className="
                          pointer-events-none
                          absolute inset-0
                          bg-linear-to-t
                          from-[#30251D]/90
                          via-[#49382E]/25
                          to-transparent
                          opacity-70
                          transition-opacity duration-500
                          group-hover:opacity-100
                        "
                      />

                      {/* MOLDURA FINA QUE APARECE NO HOVER */}
                      <div
                        aria-hidden="true"
                        className="
                          pointer-events-none
                          absolute inset-3
                          rounded-2xl
                          border border-white/0
                          scale-95
                          transition-all duration-500
                          group-hover:scale-100
                          group-hover:border-white/40
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

                      {/* INFORMAÇÕES */}
                      <div
                        className="
                          pointer-events-none
                          absolute inset-x-0 bottom-0
                          flex
                          flex-col
                          justify-end
                          p-6
                          text-white
                          transition-transform duration-500
                          group-hover:-translate-y-1
                        "
                      >
                        <span
                          className="
                            mb-2
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.18em]
                            text-[#E8D0AC]
                          "
                        >
                          {photo.category}
                        </span>

                        <h3
                          className="
                            font-serif
                            text-xl
                            font-medium
                            leading-snug
                            text-white
                          "
                        >
                          {photo.title}
                        </h3>

                        <div
                          className="
                            mt-3
                            flex
                            items-center
                            gap-2
                            text-xs
                            font-medium
                            text-[#F5E7D3]
                            opacity-0
                            transition-all duration-300
                            group-hover:opacity-100
                            group-focus-visible:opacity-100
                          "
                        >
                          Ampliar fotografia

                          <ArrowUpRight size={15} strokeWidth={1.7} />
                        </div>
                      </div>

                      {/* ÍCONE SUPERIOR */}
                      <div
                        className="
                          pointer-events-none
                          absolute right-4 top-4
                          flex h-9 w-9
                          items-center justify-center
                          rounded-full
                          border border-white/40
                          bg-[#FFFEFB]/90
                          text-[#A9855D]
                          opacity-0
                          scale-75
                          backdrop-blur-sm
                          transition-all duration-300
                          group-hover:opacity-100
                          group-hover:scale-100
                          group-focus-visible:opacity-100
                        "
                      >
                        <ArrowUpRight size={17} />
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              ) : (
                <div
                  className="
                    relative
                    mx-auto
                    flex max-w-xl
                    flex-col
                    items-center
                    overflow-hidden
                    rounded-3xl
                    border border-[#E8DFD3]
                    bg-[#FFFEFB]
                    px-6 py-14
                    text-center
                  "
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full border border-[#E8DFD3]"
                  />
                  <motion.span {...bob(6, 4)} className="mb-4 text-[#A9855D]">
                    <Images size={38} strokeWidth={1.3} />
                  </motion.span>

                  <p className="font-serif text-xl text-[#49382E]">
                    Fotografias em breve
                  </p>

                  <p className="mt-2 text-sm text-[#74675D]">
                    Estamos preparando novos registros para esta galeria.
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* ---------- GALERIA DE VÍDEOS ---------- */}
          {activeTab === 'videos' && (
            <motion.div key="videos" {...panelMotion}>
              {GALLERY_VIDEOS.length > 0 ? (
                <motion.div
                  variants={stagger}
                  initial={reduce ? false : 'hidden'}
                  whileInView="show"
                  viewport={{ once: true, amount: 0.05 }}
                  className="
                    mx-auto
                    grid
                    max-w-5xl
                    grid-cols-1
                    gap-8
                    sm:grid-cols-2
                  "
                >
                  {GALLERY_VIDEOS.map((video) => (
                    <motion.button
                      key={video.id}
                      type="button"
                      variants={cardIn}
                      whileHover={reduce ? undefined : { y: -8 }}
                      whileTap={reduce ? undefined : { scale: 0.98 }}
                      onClick={() => setSelectedVideo(video)}
                      aria-label={`Assistir vídeo: ${video.title}`}
                      className="
                        group
                        overflow-hidden
                        rounded-3xl
                        border border-[#E8DFD3]
                        bg-[#FFFEFB]
                        text-left
                        shadow-[0_8px_30px_rgba(73,56,46,0.05)]
                        transition-[border-color,box-shadow] duration-500
                        hover:border-[#C4A078]/60
                        hover:shadow-[0_20px_45px_rgba(73,56,46,0.12)]
                        focus-visible:outline-2
                        focus-visible:outline-offset-4
                        focus-visible:outline-[#A9855D]
                        cursor-pointer
                      "
                    >
                      {/* MINIATURA DO VÍDEO */}
                      <div
                        className="
                          relative
                          aspect-video
                          overflow-hidden
                          bg-[#49382E]
                        "
                      >
                        <img
                          src={video.thumbnail}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="
                            h-full
                            w-full
                            object-cover
                            opacity-85
                            transition-all duration-700
                            group-hover:scale-105
                            group-hover:opacity-100
                          "
                        />

                        {/* SOBREPOSIÇÃO */}
                        <div
                          className="
                            absolute inset-0
                            bg-[#30251D]/15
                            transition-colors duration-300
                            group-hover:bg-transparent
                          "
                        />

                        {/* BOTÃO PLAY */}
                        <div
                          className="
                            absolute inset-0
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <div className="relative">
                            {/* ondas pulsando ao redor do play */}
                            {!reduce && (
                              <>
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
                                <motion.span
                                  aria-hidden="true"
                                  className="absolute inset-0 rounded-full border border-white/40"
                                  animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
                                  transition={{
                                    duration: 2.4,
                                    delay: 1.2,
                                    repeat: Infinity,
                                    ease: 'easeOut',
                                  }}
                                />
                              </>
                            )}

                            <div
                              className="
                                relative
                                flex h-16 w-16
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
                                size={25}
                                strokeWidth={1.5}
                                className="ml-1 fill-current"
                              />
                            </div>
                          </div>
                        </div>

                        {/* DURAÇÃO */}
                        {video.duration && (
                          <span
                            className="
                              absolute bottom-4 right-4
                              rounded-lg
                              bg-[#30251D]/80
                              px-3 py-1.5
                              text-xs
                              font-medium
                              text-white
                              backdrop-blur-sm
                            "
                          >
                            {video.duration}
                          </span>
                        )}
                      </div>

                      {/* INFORMAÇÕES DO VÍDEO */}
                      <div className="relative p-6 sm:p-7">
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

                        <span
                          className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.18em]
                            text-[#A9855D]
                          "
                        >
                          {video.category}
                        </span>

                        <div
                          className="
                            mt-2
                            flex
                            items-center
                            justify-between
                            gap-4
                          "
                        >
                          <h3
                            className="
                              font-serif
                              text-xl
                              font-medium
                              leading-snug
                              text-[#49382E]
                              transition-colors duration-300
                              group-hover:text-[#A9855D]
                            "
                          >
                            {video.title}
                          </h3>

                          <ArrowUpRight
                            size={20}
                            strokeWidth={1.6}
                            className="
                              shrink-0
                              text-[#A9855D]
                              transition-transform duration-300
                              group-hover:translate-x-0.5
                              group-hover:-translate-y-0.5
                            "
                          />
                        </div>

                        <p
                          className="
                            mt-4
                            text-[13px]
                            font-medium
                            text-[#8B7A68]
                            transition-colors duration-300
                            group-hover:text-[#A9855D]
                          "
                        >
                          Clique para assistir
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              ) : (
                <div
                  className="
                    relative
                    mx-auto
                    flex max-w-xl
                    flex-col
                    items-center
                    overflow-hidden
                    rounded-3xl
                    border border-[#E8DFD3]
                    bg-[#FFFEFB]
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
                    Vídeos em breve
                  </p>

                  <p className="mt-2 text-sm text-[#74675D]">
                    Novos conteúdos serão disponibilizados nesta seção.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ==========================================
          MODAL DE FOTOGRAFIA
      ========================================== */}
      {selectedPhoto && (
        <Modal
          isOpen={Boolean(selectedPhoto)}
          onClose={() => setSelectedPhoto(null)}
          title={selectedPhoto.title}
        >
          <div className="space-y-5">
            <div
              className="
                overflow-hidden
                rounded-2xl
                border border-[#E8DFD3]
                bg-[#F3EEE7]
              "
            >
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="
                  max-h-[65vh]
                  w-full
                  object-contain
                "
              />
            </div>

            {selectedPhoto.category && (
              <span
                className="
                  inline-block
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#A9855D]
                "
              >
                {selectedPhoto.category}
              </span>
            )}

            {selectedPhoto.caption && (
              <p
                className="
                  text-sm
                  leading-[1.9]
                  text-[#74675D]
                "
              >
                {selectedPhoto.caption}
              </p>
            )}
          </div>
        </Modal>
      )}

      {/* ==========================================
          MODAL DE VÍDEO
      ========================================== */}
      {selectedVideo && (
        <Modal
          isOpen={Boolean(selectedVideo)}
          onClose={() => setSelectedVideo(null)}
          title={selectedVideo.title}
        >
          <div className="space-y-4">
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
                src={selectedVideo.embedUrl}
                title={selectedVideo.title}
                className="h-full w-full border-0"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            {selectedVideo.category && (
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-[#A9855D]
                "
              >
                {selectedVideo.category}
              </p>
            )}
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Gallery;