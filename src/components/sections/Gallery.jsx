import React, { useState } from 'react';
import { GALLERY_PHOTOS, GALLERY_VIDEOS } from '../../data/gallery';
import Modal from '../ui/Modal';
import { Camera, Video, Play } from 'lucide-react';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('photos'); // 'photos' ou 'videos'
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section id="galeria" className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CABEÇALHO */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-800">Galeria de Mídias</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-teal-950">
            Movimento, cuidado e dedicação na prática.
          </h2>
          <p className="text-gray-600 text-base">
            Conheça um pouco mais do ambiente de atendimento, das atividades profissionais e dos conteúdos fisioterapêuticos.
          </p>

          {/* BOTÕES DE TROCA DE MÍDIA (SPA) */}
          <div className="inline-flex p-1.5 bg-gray-200/80 rounded-2xl gap-2 mt-4">
            <button
              onClick={() => setActiveTab('photos')}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition ${
                activeTab === 'photos'
                  ? 'bg-teal-900 text-white shadow-sm'
                  : 'text-gray-700 hover:text-teal-950'
              }`}
            >
              <Camera className="w-4 h-4" />
              Ver Fotos
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition ${
                activeTab === 'videos'
                  ? 'bg-teal-900 text-white shadow-sm'
                  : 'text-gray-700 hover:text-teal-950'
              }`}
            >
              <Video className="w-4 h-4" />
              Assistir Vídeos
            </button>
          </div>
        </div>

        {/* MÍDIAS - FOTOS */}
        {activeTab === 'photos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GALLERY_PHOTOS.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition duration-300 aspect-square bg-gray-200"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                  <span className="text-xs text-teal-300 font-semibold">{photo.category}</span>
                  <h4 className="text-sm font-bold">{photo.title}</h4>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MÍDIAS - VÍDEOS */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {GALLERY_VIDEOS.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition bg-white border border-gray-100"
              >
                <div className="relative aspect-video bg-gray-900">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-teal-900/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </span>
                </div>
                <div className="p-4">
                  <span className="text-xs text-teal-800 font-semibold">{video.category}</span>
                  <h4 className="font-serif font-bold text-teal-950 text-base">{video.title}</h4>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* LIGHTBOX / MODAL FOTO */}
      {selectedPhoto && (
        <Modal isOpen={!!selectedPhoto} onClose={() => setSelectedPhoto(null)} title={selectedPhoto.title}>
          <div className="space-y-4">
            <img src={selectedPhoto.url} alt={selectedPhoto.title} className="w-full rounded-xl object-cover max-h-[60vh]" />
            <p className="text-gray-700 text-sm">{selectedPhoto.caption}</p>
          </div>
        </Modal>
      )}

      {/* MODAL VÍDEO */}
      {selectedVideo && (
        <Modal isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} title={selectedVideo.title}>
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
            <iframe
              src={selectedVideo.embedUrl}
              title={selectedVideo.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Gallery;