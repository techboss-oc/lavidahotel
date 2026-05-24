import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, ArrowUp, Sparkles, Phone, Shield, ExternalLink, RefreshCw, X, Check, Award } from 'lucide-react';

// Data types
import { Room } from './types';
import { ROOMS_DATA } from './data';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import RoomsSection from './components/RoomsSection';
import DiningSection from './components/DiningSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import FaqSection from './components/FaqSection';
import BookingDashboard from './components/BookingDashboard';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [bookingCount, setBookingCount] = useState<number>(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);
  
  // Track active reservation transactions
  const [pendingRoom, setPendingRoom] = useState<Room | null>(null);
  const [pendingDates, setPendingDates] = useState<{ checkIn: string; checkOut: string; guests: number } | null>(null);

  // Monitors page scrolls
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync bookings count on mount
  useEffect(() => {
    const saved = localStorage.getItem('lavida_reservations');
    if (saved) {
      setBookingCount(JSON.parse(saved).length);
    }
  }, []);

  // Triggers luxury Toast alerts
  const handleNotifyMessage = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => {
      setShowToast(null);
    }, 4000);
  };

  const handleInitiateBooking = (room: Room, checkIn?: string, checkOut?: string, guests?: number) => {
    setPendingRoom(room);
    if (checkIn && checkOut && guests) {
      setPendingDates({ checkIn, checkOut, guests });
    }
    setActiveTab('booking-dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleNotifyMessage(`Initiated checkout process for ${room.name}!`);
  };

  const handleClearPendingTransaction = () => {
    setPendingRoom(null);
    setPendingDates(null);
  };

  const handleSearchChambers = (searchData: { checkIn: string; checkOut: string; guests: number; roomType: string }) => {
    // If specific room type was requested
    if (searchData.roomType !== 'All') {
      const matchedRoom = ROOMS_DATA.find(r => r.type === searchData.roomType);
      if (matchedRoom) {
        handleInitiateBooking(matchedRoom, searchData.checkIn, searchData.checkOut, searchData.guests);
        return;
      }
    }
    // Default fallback: direct to general dashboard with dates
    setPendingDates({ checkIn: searchData.checkIn, checkOut: searchData.checkOut, guests: searchData.guests });
    setActiveTab('rooms');
    window.scrollTo({ top: 400, behavior: 'smooth' });
    handleNotifyMessage("Select your desired Luxury chamber suite to check rate summaries.");
  };

  const handleOpenWhatsAppChat = () => {
    const message = encodeURIComponent("Hello Lavida Hotel VIP Desk, I am accessing your online portal and would like to request premium booking assistance.");
    window.open(`https://wa.me/2348082652863?text=${message}`, '_blank');
  };

  return (
    <div className="bg-luxury-black text-white min-h-screen relative font-sans select-none selection:bg-gold-500 selection:text-black">
      


      {/* Primary Sticky Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookingCount={bookingCount}
      />

      {/* Main Multi-Screen Route switcher Wrapper */}
      <main className="relative z-10" id="main-portal-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {activeTab === 'home' && (
              <>
                <Hero
                  onSearch={handleSearchChambers}
                  onExploreRooms={() => {
                    setActiveTab('rooms');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onContactUs={() => {
                    setActiveTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
                <AboutSection onViewRooms={() => setActiveTab('rooms')} />
                <RoomsSection onInitiateBooking={handleInitiateBooking} searchFilter={null} />
                <DiningSection onNotifyMessage={handleNotifyMessage} />
                <GallerySection />
                <FaqSection />
              </>
            )}

            {activeTab === 'rooms' && (
              <RoomsSection
                onInitiateBooking={handleInitiateBooking}
                searchFilter={pendingDates ? { ...pendingDates, roomType: 'All' } : null}
              />
            )}

            {activeTab === 'dining' && (
              <DiningSection onNotifyMessage={handleNotifyMessage} />
            )}

            {activeTab === 'gallery' && (
              <GallerySection />
            )}

            {activeTab === 'about' && (
              <>
                <AboutSection onViewRooms={() => setActiveTab('rooms')} />
                <FaqSection />
              </>
            )}

            {activeTab === 'contact' && (
              <ContactSection />
            )}

            {activeTab === 'booking-dashboard' && (
              <BookingDashboard
                activePendingRoom={pendingRoom}
                activePendingDates={pendingDates}
                onClearPendingTransaction={handleClearPendingTransaction}
                onUpdateBookingCount={setBookingCount}
                onTabChange={setActiveTab}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER CONTAINER */}
      <Footer onTabChange={setActiveTab} />

      {/* FLOATING ACTION UTILITIES (WhatsApp & Back To Top) */}
      <div id="floating-action-bar" className="fixed bottom-6 right-6 z-45 flex flex-col space-y-3 items-center">
        
        {/* Scroll back to top */}
        {showScrollTop && (
          <button
            id="back-to-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-3.5 rounded-full bg-luxury-gray/90 border border-gold-500/25 text-gold-400 hover:bg-gold-500 hover:text-luxury-black shadow-2xl transition duration-300 relative group cursor-pointer"
            title="Return to top"
          >
            <ArrowUp className="w-5 h-5" />
            <span className="absolute right-12 top-1/2 -translate-y-1/2 bg-luxury-black border border-white/5 py-1 px-2.5 rounded font-mono text-[9px] text-gray-300 scale-0 group-hover:scale-100 transition duration-300 pointer-events-none tracking-widest uppercase">
              TOP
            </span>
          </button>
        )}

        {/* WhatsApp Float Chat Widget */}
        <button
          id="whatsapp-floating-widget"
          onClick={handleOpenWhatsAppChat}
          className="p-4 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white shadow-2xl transition duration-300 relative group flex items-center justify-center cursor-pointer animate-float border border-white/10"
          title="Direct WhatsApp Reservation Help"
        >
          <MessageSquare className="w-6 h-6 fill-white" />
          
          {/* Pulsing indicator ring */}
          <span className="absolute inset-0 border-2 border-green-400/30 rounded-full animate-ping scale-110 pointer-events-none"></span>

          {/* Tooltip */}
          <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-luxury-black border border-white/5 py-1.5 px-3 rounded font-mono text-[9px] text-gold-400 scale-0 group-hover:scale-100 transition duration-300 pointer-events-none tracking-widest uppercase whitespace-nowrap font-bold">
            🟢 Desk Active
          </span>
        </button>

      </div>

      {/* LUXE TOAST NOTIFICATION CONTAINER */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-6 z-55 max-w-sm bg-luxury-charcoal/95 border border-gold-500 p-4 rounded-xl shadow-2xl flex items-start space-x-3 text-left backdrop-blur-md"
            id="luxe-toast-alert"
          >
            <div className="p-1 bg-gold-400 text-luxury-black rounded-lg shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </div>
            <div className="flex-grow">
              <span className="text-[9px] font-mono tracking-widest uppercase text-gold-400 block font-semibold">LAVIDA ALERTS</span>
              <p className="text-gray-200 text-xs mt-0.5 leading-normal font-sans pr-4">{showToast}</p>
            </div>
            <button
              onClick={() => setShowToast(null)}
              className="text-gray-400 hover:text-white shrink-0 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
