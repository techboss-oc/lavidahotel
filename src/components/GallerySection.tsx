import React, { useState } from 'react';
import { Image as ImageIcon, ChevronLeft, ChevronRight, X, ArrowUpRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Rooms', 'Dining', 'Exterior', 'Lounge', 'Wellness', 'Events'];

  const filteredItems = activeTab === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeTab);

  const handleOpenLightbox = (item: GalleryItem) => {
    // Find index inside filtered array
    const idx = filteredItems.findIndex(f => f.id === item.id);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const handleNextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-24 bg-luxury-black text-white relative" id="gallery-section">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Editorial Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-gold-400 font-semibold mb-2 block animate-pulse">
            IMMERSIVE MEDIA FRAME
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            The Golden Mosaic
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto font-sans leading-relaxed">
            Glance through the visual story of Port Harcourt’s finest residency. Marvel at our custom architectural facets, relaxing wellness massage suites, and champagne lounges.
          </p>

          {/* Filter tabs */}
          <div className="mt-10 flex flex-wrap justify-center gap-2" id="gallery-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`gallery-tab-${cat.toLowerCase().replace(' ', '-')}`}
                onClick={() => {
                  setActiveTab(cat);
                  setLightboxIndex(null);
                }}
                className={`text-[10px] sm:text-xs uppercase tracking-widest font-mono py-2.5 px-5 rounded-full border transition cursor-pointer ${
                  activeTab === cat
                    ? 'bg-gold-500 text-luxury-black font-semibold border-gold-400 shadow shadow-gold-500/10'
                    : 'bg-luxury-gray/40 border-white/5 hover:border-gold-500/40 text-gray-300 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Mosaic Grid Layout list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-mosaic-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              id={`gallery-item-${item.id}`}
              onClick={() => handleOpenLightbox(item)}
              className="bg-luxury-gray/40 rounded-xl overflow-hidden border border-white/5 hover:border-gold-500/30 group transition-all duration-500 cursor-pointer shadow-lg relative h-72 group"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-1000 select-none"
                referrerPolicy="no-referrer"
              />
              {/* Glass golden visual hover layer */}
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
              
              {/* Hover Text and icon reveals */}
              <div className="absolute p-6 bottom-0 left-0 w-full text-left flex justify-between items-end transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-gold-400 uppercase font-semibold">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-lg font-semibold text-white mt-1 group-hover:text-gold-200 transition-colors">
                    {item.title}
                  </h4>
                </div>
                <div className="p-2.5 bg-gold-500 text-luxury-black rounded-full shrink-0 shadow transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX CAROUSEL CONTAINER */}
      {lightboxIndex !== null && (
        <div id="gallery-lightbox" className="fixed inset-0 z-55 bg-luxury-black/98 flex flex-col justify-center items-center p-4">
          
          {/* Lightbox upper specs */}
          <div className="absolute top-4 left-4 sm:left-8 flex items-center space-x-3 text-left">
            <ImageIcon className="w-5 h-5 text-gold-400" />
            <div>
              <span className="text-[10px] font-mono uppercase text-gold-400 tracking-[0.2em] block font-semibold">
                {filteredItems[lightboxIndex].category} SPECIFICATION
              </span>
              <span className="font-serif text-base font-semibold text-white">
                {filteredItems[lightboxIndex].title}
              </span>
            </div>
          </div>

          {/* Lightbox Exit handle */}
          <button
            id="close-lightbox-btn"
            onClick={handleCloseLightbox}
            className="absolute top-4 right-4 sm:right-8 bg-luxury-gray/80 hover:bg-gold-500 hover:text-luxury-black text-white p-3 rounded-full transition cursor-pointer border border-white/5"
            title="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Core frame with Swipe controls */}
          <div className="relative w-full max-w-4xl aspect-[4/3] sm:aspect-video flex items-center justify-center p-2 rounded-xl overflow-hidden border border-gold-500/10 shadow-3xl bg-luxury-charcoal">
            
            <img
              src={filteredItems[lightboxIndex].image}
              alt="Lightbox view"
              className="w-full h-full object-contain pointer-events-none select-none"
              referrerPolicy="no-referrer"
            />

            {/* Back button */}
            <button
              id="lightbox-prev-btn"
              onClick={handlePrevLightbox}
              className="absolute left-4 bg-luxury-black/85 border border-white/5 text-white hover:text-gold-400 p-2.5 rounded-full transition-all cursor-pointer"
              title="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next button */}
            <button
              id="lightbox-next-btn"
              onClick={handleNextLightbox}
              className="absolute right-4 bg-luxury-black/85 border border-white/5 text-white hover:text-gold-400 p-2.5 rounded-full transition-all cursor-pointer"
              title="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Slider counts */}
          <div className="mt-4 font-mono text-[10px] text-gray-500 tracking-widest uppercase">
            Image {lightboxIndex + 1} of {filteredItems.length} inside {activeTab === 'All' ? 'Complete Portfolio' : activeTab}
          </div>

        </div>
      )}
    </section>
  );
}
