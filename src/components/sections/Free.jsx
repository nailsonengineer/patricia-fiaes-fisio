import React, { useState } from 'react';
import { FREE_VIDEOS_DATA } from '../../data/freeVideos';
import Modal from '../ui/Modal';
import { Play, AlertCircle, Calendar } from 'lucide-react';

const Free = ({ onBookClick }) => {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section id="conteudos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CABEÇALHO */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-800">Conteúdos Gratuitos</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-teal-950">
            Movimente-se melhor. Cuide-se todos os dias.
          </h2>
          <p className="text-gray-600 text-base">
            Conteúdos educativos sobre movimento, mobilidade, alongamentos e hábitos que contribuem para o bem-estar e a qualidade de vida.
          </p>
        </div>

        {/* CARDS DE VÍDEO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FREE_VIDEOS_DATA.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col justify-between group"
            >
              <div>
                <div
                  className="relative aspect-video bg-gray-100 cursor-pointer overflow-hidden"
                  onClick={() => setActiveVideo(item)}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 text-teal-900 flex items-center justify-center shadow">
                      <Play className="w-5 h-5 fill-teal-900 ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">
                    {item.duration}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[11px] font-semibold text-teal-800 uppercase tracking-wider">{item.category}</span>
                  <h3 className="font-serif font-bold text-teal-950 text-base">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => setActiveVideo(item)}
                  className="w-full py-2 bg-teal-50 text-teal-900 rounded-xl text-xs font-semibold hover:bg-teal-900 hover:text-white transition"
                >
                  Assistir Vídeo
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* AVISO EDUCATIVO DISCRETO */}
        <div className="mt-12 max-w-3xl mx-auto p-4 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-start gap-3 text-amber-900 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <p>
            <strong>Aviso Educativo:</strong> Os conteúdos apresentados são estritamente informativos e não substituem uma avaliação fisioterapêutica individualizada. Interrompa qualquer atividade em caso de dor ou desconforto e busque orientação profissional.
          </p>
        </div>

        {/* CTA FINAL DE AGENDAMENTO */}
        <div className="mt-10 text-center">
          <button
            onClick={onBookClick}
            className="inline-flex items-center gap-2 bg-teal-900 text-white px-7 py-3 rounded-xl font-medium text-sm hover:bg-teal-800 transition"
          >
            <Calendar className="w-4 h-4" />
            Precisa de acompanhamento individualizado? Agende sua avaliação
          </button>
        </div>

      </div>

      {/* MODAL REPRODUTOR DE VÍDEO */}
      {activeVideo && (
        <Modal isOpen={!!activeVideo} onClose={() => setActiveVideo(null)} title={activeVideo.title}>
          <div className="space-y-4">
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
              <iframe
                src={activeVideo.embedUrl}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-sm text-gray-700">{activeVideo.description}</p>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Free;