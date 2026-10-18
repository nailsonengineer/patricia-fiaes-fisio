import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import About from './components/sections/About';
import Gallery from './components/sections/Gallery';
import Free from './components/sections/Free';
import Plans from './components/sections/Plans';
import Scheduling from './components/sections/Scheduling';
import Contact from './components/sections/Contact';

import { MessageCircle } from 'lucide-react';
import { PROFESSIONAL_DATA } from './data/professional';
import { buildWhatsAppUrl } from './utils/whatsapp';

function App() {
  const handleScrollToBooking = () => {
    const element = document.querySelector('#agendamento');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 selection:bg-teal-900 selection:text-white">
      {/* HEADER FIXO */}
      <Header onBookClick={handleScrollToBooking} />

      {/* CONTEÚDO PRINCIPAL (SPA) */}
      <main>
        <Hero onBookClick={handleScrollToBooking} />
        <Services />
        <About />
        <Gallery />
        <Free onBookClick={handleScrollToBooking} />
        <Plans />
        <Scheduling />
        <Contact />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* BOTÃO FLUTUANTE DO WHATSAPP */}
      <a
        href={buildWhatsAppUrl(PROFESSIONAL_DATA.phone, 'Consulta Geral')}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-emerald-700 hover:scale-105 transition-all duration-300"
        aria-label="Falar pelo WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
}

export default App;