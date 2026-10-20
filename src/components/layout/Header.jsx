import React, { useState, useEffect } from 'react';
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

const Header = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleBooking = () => {
    setMobileMenuOpen(false);
    onBookClick?.();
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500
        ${
          isScrolled
            ? 'bg-[#FFFCFA]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(145,87,78,0.08)] py-3'
            : 'bg-[#FFFCFA]/95 backdrop-blur-md py-4 lg:py-5'
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
                border border-[#DCA69B]
                flex items-center justify-center
                transition-all duration-500
                group-hover:border-[#BC7474]
                group-hover:shadow-md
              "
            >
              <span
                className="
                  font-serif
                  text-[27px]
                  sm:text-[31px]
                  lg:text-[35px]
                  font-normal
                  tracking-[-0.12em]
                  text-[#AD6665]
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
                  text-[#DDA99B]
                  bg-[#FFFCFA]
                  rounded-full
                  p-0.5
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
                  text-[#854E48]
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
                  text-[#A76E68]
                  mt-1
                  font-medium
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
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) =>
                    handleNavClick(e, link.href)
                  }
                  className={`
                    relative
                    text-[13px] xl:text-sm
                    font-medium
                    whitespace-nowrap
                    py-3
                    transition-colors duration-300
                    ${
                      isActive
                        ? 'text-[#B86F6C]'
                        : 'text-[#394346] hover:text-[#B86F6C]'
                    }
                  `}
                >
                  {link.label}

                  <span
                    className={`
                      absolute
                      bottom-1 left-0
                      h-0.5
                      bg-[#C77978]
                      transition-all duration-300
                      ${
                        isActive
                          ? 'w-full'
                          : 'w-0'
                      }
                    `}
                  />
                </a>
              );
            })}
          </nav>

          {/* AGENDAMENTO DESKTOP */}
          <button
            type="button"
            onClick={handleBooking}
            className="
              hidden lg:inline-flex
              items-center justify-center
              gap-2.5
              shrink-0
              bg-[#C87576]
              text-white
              px-5 xl:px-7
              py-3.5
              rounded-full
              text-[13px] xl:text-sm
              font-medium
              shadow-[0_8px_20px_rgba(190,110,110,0.15)]
              hover:bg-[#AD6062]
              hover:shadow-[0_10px_25px_rgba(190,110,110,0.25)]
              hover:-translate-y-0.5
              transition-all duration-300
              cursor-pointer
            "
          >
            <Calendar size={18} strokeWidth={1.8} />
            Agendar Consulta
          </button>

          {/* BOTÃO MOBILE */}
          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen((prev) => !prev)
            }
            className="
              lg:hidden
              w-11 h-11
              flex items-center justify-center
              rounded-full
              text-[#965A56]
              hover:bg-[#F8E8E4]
              transition-colors
              cursor-pointer
            "
            aria-label={
              mobileMenuOpen
                ? 'Fechar menu'
                : 'Abrir menu'
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? (
              <X size={25} strokeWidth={1.7} />
            ) : (
              <Menu size={25} strokeWidth={1.7} />
            )}
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="
            lg:hidden
            absolute
            top-full left-0 right-0
            bg-[#FFFCFA]
            border-t border-[#F1DDDA]
            shadow-[0_20px_35px_rgba(120,70,70,0.10)]
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
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) =>
                  handleNavClick(e, link.href)
                }
                className="
                  flex items-center
                  px-4 py-3
                  rounded-xl
                  text-[#704E4B]
                  text-sm
                  font-medium
                  hover:bg-[#FBEFEB]
                  hover:text-[#B86F6C]
                  transition-colors
                "
              >
                {link.label}
              </a>
            ))}

            <div className="pt-5">
              <button
                type="button"
                onClick={handleBooking}
                className="
                  w-full
                  inline-flex
                  items-center justify-center
                  gap-3
                  bg-[#C87576]
                  text-white
                  py-4
                  rounded-2xl
                  font-medium
                  hover:bg-[#AD6062]
                  transition-all
                  cursor-pointer
                "
              >
                <Calendar size={19} />
                Agendar Consulta
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;