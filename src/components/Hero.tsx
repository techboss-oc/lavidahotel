import React, { useState, useEffect } from 'react';
import { Compass, Calendar, Users, Home, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { ROOMS_DATA } from '../data';

interface HeroProps {
  onSearch: (searchData: {
    checkIn: string;
    checkOut: string;
    guests: number;
    roomType: string;
  }) => void;
  onExploreRooms: () => void;
  onContactUs: () => void;
}

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920',
    tagline: 'AN EXALTED LEISURE SANCTUARY',
    title: 'The Pinnacle of Five-Star Hospitality',
    sub: 'Experience unparalleled serenity and diplomatic grade security in the heart of Port Harcourt.'
  },
  {
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4db85b?auto=format&fit=crop&q=80&w=1920',
    tagline: 'BESPOKE PRESTIGE SUITES',
    title: 'Crafted For Refined Living',
    sub: 'Indulge in spacious, butler-served hotel chambers decorated in gold accents and deep comfort.'
  },
  {
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1920',
    tagline: 'AUTHENTIC CULINARY GENIUS',
    title: 'Gourmet African & Continental Dining',
    sub: 'From Rivers native Fisherman Soup to cast iron Ribeyes seared by award winning chefs.'
  }
];

export default function Hero({ onSearch, onExploreRooms, onContactUs }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState('Deluxe');

  // Slide rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Set default dates based on today's date
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 2);
    
    setCheckIn(today.toISOString().split('T')[0]);
    setCheckOut(tomorrow.toISOString().split('T')[0]);
  }, []);

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ checkIn, checkOut, guests, roomType });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-36 md:pt-40 pb-16 overflow-hidden bg-luxury-black" id="hero-section">
      {/* Dynamic Fading Slideshow */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-40 scale-100' : 'opacity-0 scale-[1.03]'
            }`}
          >
            <img
              src={slide.image}
              alt="Lavida Luxury Banner"
              className="w-full h-full object-cover select-none transition-transform duration-[6000ms] ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/70 to-luxury-black/30"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        {/* VIP Welcome Tag */}
        <div className="inline-flex items-center space-x-2 bg-gold-600/10 border border-gold-500/30 px-4 py-1.5 rounded-full mb-6 max-w-max animate-bounce">
          <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
          <span className="text-[10px] tracking-[0.25em] font-mono text-gold-300 uppercase font-semibold">
            {HERO_SLIDES[currentSlide].tagline}
          </span>
        </div>

        {/* Cinematic Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-tight sm:leading-none">
          {HERO_SLIDES[currentSlide].title.split(' ').map((word, i) => (
            <span key={i} className={word === 'Five-Star' || word === 'Refined' || word === 'Gourmet' ? 'text-gold-400 block sm:inline' : ''}>
              {word}{' '}
            </span>
          ))}
        </h1>

        {/* Elegant Body Subtext */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl font-sans leading-relaxed tracking-wide">
          {HERO_SLIDES[currentSlide].sub}
        </p>

        {/* Primary Screen Actions */}
        <div className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            id="hero-explore-cta"
            onClick={onExploreRooms}
            className="bg-gradient-to-r from-gold-600 to-gold-400 text-luxury-black text-xs font-bold tracking-widest uppercase px-8 py-3.5 rounded hover:from-gold-500 hover:to-gold-300 hover:shadow-lg hover:shadow-gold-500/20 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            Explore Rooms
          </button>
          <button
            id="hero-contact-cta"
            onClick={onContactUs}
            className="border border-white/20 hover:border-gold-400 text-white hover:text-gold-400 text-xs font-bold tracking-widest uppercase px-8 py-3.5 rounded hover:bg-white/5 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            Contact Elite Concierge
          </button>
        </div>

        {/* Integrated Floating Premium Room Booking Widget */}
        <div id="booking-widget-container" className="mt-14 w-full max-w-5xl bg-luxury-charcoal/90 backdrop-blur-md rounded-xl p-5 border border-gold-500/20 shadow-2xl shadow-black/80">
          <form onSubmit={handleBookSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end text-left" id="hero-booking-form">
            
            {/* Dates */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] tracking-widest uppercase text-gold-400 font-mono flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Check-In Date</span>
              </label>
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-luxury-black/60 border border-white/10 focus:border-gold-500 text-gray-200 text-xs rounded px-3 py-2.5 focus:outline-none transition font-sans"
                required
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] tracking-widest uppercase text-gold-400 font-mono flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Check-Out Date</span>
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-luxury-black/60 border border-white/10 focus:border-gold-500 text-gray-200 text-xs rounded px-3 py-2.5 focus:outline-none transition font-sans"
                required
              />
            </div>

            {/* Selection Options */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] tracking-widest uppercase text-gold-400 font-mono flex items-center space-x-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>Guests</span>
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-luxury-black/60 border border-white/10 focus:border-gold-500 text-gray-200 text-xs rounded px-2.5 py-2.5 focus:outline-none transition cursor-pointer"
                >
                  <option value={1} className="bg-luxury-black">1 Ambassador</option>
                  <option value={2} className="bg-luxury-black">2 Guests</option>
                  <option value={3} className="bg-luxury-black">3 Guests</option>
                  <option value={4} className="bg-luxury-black">4 Suite Party</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] tracking-widest uppercase text-gold-400 font-mono flex items-center space-x-1">
                  <Home className="w-3.5 h-3.5" />
                  <span>Tier</span>
                </label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full bg-luxury-black/60 border border-white/10 focus:border-gold-500 text-gray-200 text-xs rounded px-2.5 py-2.5 focus:outline-none transition cursor-pointer"
                >
                  <option value="All" className="bg-luxury-black">All Chambers</option>
                  <option value="Standard" className="bg-luxury-black">Standard</option>
                  <option value="Deluxe" className="bg-luxury-black">Signature Deluxe</option>
                  <option value="Executive" className="bg-luxury-black">Executive</option>
                  <option value="Presidential Suite" className="bg-luxury-black">Presidential</option>
                </select>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              id="booking-submit-cta"
              className="w-full bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-luxury-black text-xs font-bold tracking-widest uppercase py-3 px-4 rounded transition-all duration-300 shadow shadow-gold-500/20 active:scale-[0.98] cursor-pointer"
            >
              Check Instant Rates
            </button>
          </form>
          
          {/* Subtle Trust Indicators */}
          <div className="mt-3.5 pt-3 border-t border-white/5 flex flex-wrap gap-y-2 items-center justify-between text-[10px] font-mono text-gray-400 tracking-wide">
            <span className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 text-gold-400 mr-1" /> Armed Diplomatic Security Grid</span>
            <span className="hidden sm:inline">•</span>
            <span>📍 rumuekini/aluu Rd, Port Harcourt, Rivers State</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center">⚡ 24/7 Redundant Power & Fast Fiber</span>
          </div>
        </div>
      </div>
    </section>
  );
}
