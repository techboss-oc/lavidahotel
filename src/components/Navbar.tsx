import React, { useState, useEffect } from 'react';
import { Menu, X, Hotel, Calendar, Award, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookingCount: number;
}

export default function Navbar({ activeTab, setActiveTab, bookingCount }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'rooms', label: 'Rooms & Suites' },
    { id: 'dining', label: 'Dining' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'Our Story' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex flex-col">
      {/* Upper active promotions ticker */}
      <div id="hotel-promotions-ticker" className="w-full bg-gradient-to-r from-gold-700 via-gold-600 to-gold-700 py-1.5 px-4 text-center text-[10px] font-mono tracking-[0.2em] font-bold text-luxury-black flex items-center justify-center space-x-2 shrink-0 z-55">
        <Sparkles className="w-3 h-3 text-luxury-black animate-spin" style={{ animationDuration: '4s' }} />
        <span>WELCOME TO LAVIDA HOTEL & SUITES • IMMERSIVE COMFORT & DIPLOMATIC SECURITY GRID • OPEN 24/7 HOURS</span>
        <Sparkles className="w-3 h-3 text-luxury-black animate-spin" style={{ animationDuration: '4s' }} />
      </div>

      <div
        className={`w-full transition-all duration-500 relative ${
          isScrolled
            ? 'bg-luxury-black/95 backdrop-blur-md border-b border-gold-500/20 py-3 shadow-lg shadow-black/50'
            : 'bg-gradient-to-b from-luxury-black/80 via-luxury-black/30 to-transparent py-5'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Brand / Minimal Gold Star Badge */}
          <div
            id="brand-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="relative p-1">
              <Award className="w-8 h-8 text-gold-400 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gold-400/20 blur-md rounded-full scale-50 group-hover:scale-120 transition-all duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wider text-white group-hover:text-gold-300 transition-colors duration-300">
                LAVIDA
              </span>
              <span className="text-[9px] font-mono tracking-[0.25em] text-gold-400 uppercase -mt-1">
                HOTEL & SUITES
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (Editorial design) */}
          <nav className="hidden md:flex space-x-8 items-center" id="desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs uppercase tracking-widest transition-all duration-300 font-sans cursor-pointer py-1 relative ${
                  activeTab === item.id
                    ? 'text-gold-400 font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-400"></span>
                )}
              </button>
            ))}
          </nav>

          {/* Booking Widget Access and Dashboard Counters */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              id="nav-booking-btn"
              onClick={() => handleNavClick('booking-dashboard')}
              className={`relative flex items-center space-x-1 p-2 rounded-lg transition-all duration-300 border ${
                activeTab === 'booking-dashboard'
                  ? 'bg-gold-500/10 border-gold-400 text-gold-400'
                  : 'bg-luxury-gray/40 border-gold-500/10 hover:border-gold-500/40 text-gray-300 hover:text-gold-300'
              } cursor-pointer`}
              title="My Reservations"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline text-xs tracking-wider uppercase font-mono">My Bookings</span>
              {bookingCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold-500 text-luxury-black text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center animate-pulse">
                  {bookingCount}
                </span>
              )}
            </button>

            <button
              id="direct-reservations-cta"
              onClick={() => handleNavClick('rooms')}
              className="hidden lg:block bg-gradient-to-r from-gold-600 to-gold-400 text-luxury-black text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded hover:from-gold-500 hover:to-gold-300 active:scale-95 transition-all duration-300 shadow shadow-gold-500/20 cursor-pointer"
            >
              Reserve Room
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-gold-400 focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sliding Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-panel" className="md:hidden bg-luxury-black border-b border-gold-500/20 shadow-xl transition-all duration-500">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left font-serif text-lg tracking-wide py-2 border-b border-white/5 transition-all ${
                  activeTab === item.id ? 'text-gold-400 pl-4 border-l-2 border-gold-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 flex flex-col space-y-3">
              <button
                id="mobile-action-reserve"
                onClick={() => handleNavClick('rooms')}
                className="w-full text-center bg-gold-600 text-luxury-black text-sm font-semibold tracking-widest uppercase py-3 rounded active:scale-95 transition-all duration-300 cursor-pointer"
              >
                Reserve Room
              </button>
              <div className="flex justify-around items-center pt-2 text-[11px] font-mono text-gray-500 tracking-wider">
                <span>PH: 0808 265 2863</span>
                <span>•</span>
                <span>Open 24/7 Hours</span>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </header>
  );
}
