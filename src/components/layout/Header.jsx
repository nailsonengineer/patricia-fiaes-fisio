import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3 border-b border-teal-900/10'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LOGO */}
        <a href="#inicio" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-teal-900 text-white flex items-center justify-center font-serif font-bold text-lg shadow-md group-hover:bg-teal-800 transition">
            PF
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-teal-950 text-lg leading-tight">
              {PROFESSIONAL_DATA.name}
            </span>
            <span className="text-xs text-teal-800 tracking-wider uppercase font-medium">
              Fisioterapia
            </span>
          </div>
        </a>

        {/* NAVEGAÇÃO DESKTOP */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-gray-700 hover:text-teal-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA DESKTOP */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onBookClick}
            className="inline-flex items-center gap-2 bg-teal-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-teal-800 transition shadow-sm hover:shadow"
          >
            <Calendar className="w-4 h-4" />
            Agendar Consulta
          </button>
        </div>

        {/* BOTÃO MOBILE MENU */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-teal-900"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MENU MOBILE OVERLAY */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-3 shadow-xl">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block py-2 text-base font-medium text-gray-800 hover:text-teal-900 border-b border-gray-50"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-teal-900 text-white py-3 rounded-xl font-medium"
            >
              <Calendar className="w-4 h-4" />
              Agendar Consulta
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;