import React, { useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { Menu, X, Calendar, Flower2 } from 'lucide-react';
import { PROFESSIONAL_DATA } from '../../data/professional';

const NAV_LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Conteúdos', href: '#conteudos' },
  { label: 'Planos', href: '#planos' },
  { label: 'Contato', href: '#contato' },
];

const EASE = [0.22, 1, 0.36, 1];

const Header = ({ onBookClick }) => {
  const reduce = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#inicio');

  /* BARRA DE PROGRESSO DE LEITURA */
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /* SEÇÃO ATIVA CONFORME A ROLAGEM */
  useEffect(() => {
    const elements = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(
      Boolean
    );
    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(href);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBooking = () => {
    setMobileMenuOpen(false);
    onBookClick?.();
  };

  return (
    <motion.header
      initial={reduce ? false : { y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE }}
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500
        ${isScrolled
          ? 'bg-[#F7F6F0]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(115,91,64,0.08)] py-3'
          : 'bg-[#F7F6F0]/95 backdrop-blur-md py-4 lg:py-5'
        }
      `}
    >
      <div className="max-w-360 mx-auto px-5 sm:px-8 lg:px-10 xl:px-14">
        <div className="flex items-center justify-between gap-5">
          {/* LOGOTIPO */}
          <a
            href="#inicio"
            onClick={(e) => handleNavClick(e, '#inicio')}
            className="flex items-center gap-3 shrink-0 group"
            aria-label="Ir para o início"
          >
            {/* SÍMBOLO PF */}
            <div
              className="
                relative
                w-12 h-12
                sm:w-14 sm:h-14
                lg:w-16 lg:h-16
                rounded-full
                border border-[#D6C4B5]
                flex items-center justify-center
                transition-all duration-500
                group-hover:border-[#A9855D]
                group-hover:shadow-md
                group-hover:scale-105
              "
            >
              {/* anel suave pulsando */}
              {!reduce && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-[#C4A078]/50"
                  animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              )}
              <span
                className="
                  font-serif
                  text-[27px]
                  sm:text-[31px]
                  lg:text-[35px]
                  font-normal
                  tracking-[-0.12em]
                  text-[#A9855D]
                  pr-1
                "
              >
                PF
              </span>
              <Flower2
                strokeWidth={1.1}
                className="
                  absolute
                  -bottom-1 -left-2
                  w-6 h-6
                  text-[#C4A078]
                  bg-[#F7F6F0]
                  rounded-full
                  p-0.5
                  transition-transform duration-700
                  group-hover:rotate-90
                "
              />
            </div>

            {/* NOME PROFISSIONAL */}
            <div className="flex flex-col">
              <span
                className="
                  font-serif
                  text-[18px]
                  sm:text-[21px]
                  lg:text-[24px]
                  leading-tight
                  text-[#49382E]
                  whitespace-nowrap
                "
              >
                {PROFESSIONAL_DATA.name}
              </span>
              <span
                className="
                  text-[9px]
                  sm:text-[10px]
                  uppercase
                  tracking-[0.28em]
                  text-[#74675D]
                  mt-1
                  font-medium
                  transition-all duration-500
                  group-hover:tracking-[0.36em]
                "
              >
                Fisioterapia
              </span>
            </div>
          </a>

          {/* NAVEGAÇÃO DESKTOP */}
          <nav
            className="
              hidden lg:flex
              items-center
              justify-center
              gap-4 xl:gap-7
            "
            aria-label="Navegação principal"
          >
            {NAV_LINKS.map((link, i) => {
              const isActive = activeSection === link.href;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={reduce ? false : { opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.06,
                    ease: EASE,
                  }}
                  className={`
                    group/link
                    relative
                    text-[13px] xl:text-sm
                    font-medium
                    whitespace-nowrap
                    py-3
                    transition-colors duration-300
                    ${isActive
                      ? 'text-[#A9855D]'
                      : 'text-[#49382E] hover:text-[#A9855D]'
                    }
                  `}
                >
                  {link.label}

                  {/* sublinhado que desliza entre os itens */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-1 left-0 h-0.5 w-full bg-[#C4A078]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}

                  {/* sublinhado de hover para itens inativos */}
                  {!isActive && (
                    <span
                      className="
                        absolute bottom-1 left-0
                        h-0.5 w-0
                        bg-[#C4A078]/60
                        transition-all duration-300
                        group-hover/link:w-full
                      "
                    />
                  )}
                </motion.a>
              );
            })}
          </nav>

          {/* AGENDAMENTO DESKTOP */}
          <motion.button
            type="button"
            onClick={handleBooking}
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
            whileTap={{ scale: 0.96 }}
            className="
              group
              relative
              overflow-hidden
              hidden lg:inline-flex
              items-center justify-center
              gap-2.5
              shrink-0
              bg-[#C4A078]
              text-white
              px-5 xl:px-7
              py-3.5
              rounded-full
              text-[13px] xl:text-sm
              font-medium
              shadow-[0_8px_20px_rgba(115,91,64,0.15)]
              hover:bg-[#A9855D]
              hover:shadow-[0_10px_25px_rgba(115,91,64,0.25)]
              hover:-translate-y-0.5
              transition-all duration-300
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
              size={18}
              strokeWidth={1.8}
              className="relative group-hover:rotate-[-8deg] transition-transform duration-300"
            />
            <span className="relative">Agendar Consulta</span>
          </motion.button>

          {/* BOTÃO MOBILE */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="
              lg:hidden
              w-11 h-11
              flex items-center justify-center
              rounded-full
              text-[#74675D]
              hover:bg-[#EDE8DE]
              transition-colors
              cursor-pointer
            "
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileMenuOpen ? 'close' : 'open'}
                initial={reduce ? false : { rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={reduce ? {} : { rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                {mobileMenuOpen ? (
                  <X size={25} strokeWidth={1.7} />
                ) : (
                  <Menu size={25} strokeWidth={1.7} />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? {} : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="
              lg:hidden
              absolute
              top-full left-0 right-0
              bg-[#F7F6F0]
              border-t border-[#DED3C5]
              shadow-[0_20px_35px_rgba(115,91,64,0.10)]
              max-h-[calc(100dvh-80px)]
              overflow-y-auto
            "
          >
            <nav
              className="
                px-6
                py-6
                space-y-1
              "
              aria-label="Navegação mobile"
            >
              {NAV_LINKS.map((link, i) => {
                const isActive = activeSection === link.href;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={reduce ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.05 + i * 0.05,
                      ease: EASE,
                    }}
                    className={`
                      flex items-center gap-3
                      px-4 py-3
                      rounded-xl
                      text-sm
                      font-medium
                      hover:bg-[#F3EEE7]
                      hover:text-[#A9855D]
                      transition-colors
                      ${isActive
                        ? 'bg-[#F3EEE7] text-[#A9855D]'
                        : 'text-[#49382E]'
                      }
                    `}
                  >
                    <span
                      className={`
                        h-1.5 rounded-full bg-[#C4A078]
                        transition-all duration-300
                        ${isActive ? 'w-4' : 'w-1.5 opacity-40'}
                      `}
                    />
                    {link.label}
                  </motion.a>
                );
              })}

              <motion.div
                className="pt-5"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5, ease: EASE }}
              >
                <button
                  type="button"
                  onClick={handleBooking}
                  className="
                    w-full
                    inline-flex
                    items-center justify-center
                    gap-3
                    bg-[#C4A078]
                    text-white
                    py-4
                    rounded-2xl
                    font-medium
                    hover:bg-[#A9855D]
                    transition-all
                    cursor-pointer
                  "
                >
                  <Calendar size={19} />
                  Agendar Consulta
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BARRA DE PROGRESSO DA PÁGINA */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-[#C4A078]"
      />
    </motion.header>
  );
};

export default Header;