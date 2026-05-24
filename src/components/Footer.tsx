import React from 'react';
import { Award, Phone, Mail, MapPin, Inbox, Instagram, Facebook, Clock, Star } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';

interface FooterProps {
  onTabChange: (tabId: string) => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  const handleNavFooterClick = (tabId: string) => {
    onTabChange(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-luxury-black text-white border-t border-gold-500/20 pt-16 pb-8" id="footer-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Multi-Column Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-left mb-12">
          
          {/* Column 1: Brand Credentials */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Award className="w-8 h-8 text-gold-400" />
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-wider text-white">LAVIDA</span>
                <span className="text-[9px] font-mono tracking-widest text-gold-400 uppercase -mt-1">HOTEL & SUITES</span>
              </div>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed font-sans">
              No. 2 Sunrise Street, Off Rumuekini/Aluu Road, Port Harcourt, Rivers State, Nigeria. 5-star boutique residency merging international luxury with native comfort.
            </p>

            <div className="flex items-center space-x-2 pt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
              ))}
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest pl-1">certified</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-3 font-sans">
            <h4 className="font-serif text-sm font-semibold tracking-wide text-white uppercase border-b border-white/5 pb-1 max-w-max">
              Explore Spaces
            </h4>
            <div className="flex flex-col space-y-2 text-xs text-gray-400 font-sans">
              <button onClick={() => handleNavFooterClick('home')} className="hover:text-gold-400 transition text-left cursor-pointer">Main Concierge Home</button>
              <button onClick={() => handleNavFooterClick('rooms')} className="hover:text-gold-400 transition text-left cursor-pointer">Bespoke Rooms & Suites</button>
              <button onClick={() => handleNavFooterClick('dining')} className="hover:text-gold-400 transition text-left cursor-pointer">Fine Dining Salon & Takeaway</button>
              <button onClick={() => handleNavFooterClick('gallery')} className="hover:text-gold-400 transition text-left cursor-pointer">The Golden Mosaic Gallery</button>
              <button onClick={() => handleNavFooterClick('about')} className="hover:text-gold-400 transition text-left cursor-pointer">Our Elite Heritage story</button>
              <button onClick={() => handleNavFooterClick('contact')} className="hover:text-gold-400 transition text-left cursor-pointer">Coordinate With Concierge</button>
            </div>
          </div>

          {/* Column 3: Contact Coordinates */}
          <div className="flex flex-col space-y-3 font-sans">
            <h4 className="font-serif text-sm font-semibold tracking-wide text-white uppercase border-b border-white/5 pb-1 max-w-max">
              Direct Contact
            </h4>
            <div className="flex flex-col space-y-2 text-xs text-gray-400 font-mono">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 text-gold-400 mr-2 shrink-0" />
                <span>No. 2 Sunrise Street, Off Rumuekini/Aluu Rd, Port Harcourt, Rivers State.</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-gold-400 mr-2 shrink-0" />
                <a href="tel:08082652863" className="hover:text-white">0808 265 2863</a>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-gold-400 mr-2 shrink-0" />
                <a href="tel:+2348082652863" className="hover:text-white">+234 808 265 2863</a>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-gold-400 mr-2 shrink-0" />
                <a href="mailto:Info@lavidahotel.com.ng" className="hover:text-white break-all">Info@lavidahotel.com.ng</a>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-gold-400 mr-2 shrink-0" />
                <span className="uppercase text-[9px] tracking-widest text-gold-400 font-bold bg-gold-400/10 px-1.5 py-0.5 rounded">Always Open 24/7</span>
              </div>
            </div>
          </div>

          {/* Column 4: Mini Gallery Preview */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wide text-white uppercase border-b border-white/5 pb-1 max-w-max">
              Mosaic Snippet
            </h4>
            <div className="grid grid-cols-3 gap-1.5 pt-1" id="footer-mini-grid">
              {GALLERY_ITEMS.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNavFooterClick('gallery')}
                  className="aspect-square bg-luxury-gray rounded overflow-hidden border border-white/5 hover:border-gold-500/25 transition cursor-pointer"
                  title={item.title}
                >
                  <img src={item.image} alt="Mini-gallery" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Lower copyright bar with legal references */}
        <div className="border-t border-white/10 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 font-mono tracking-wider text-center gap-y-3">
          <div>
            <span>© {new Date().getFullYear()} Lavida Hotel & Suites. All Sovereign Rights Reserved.</span>
          </div>

          <div className="flex space-x-4">
            <a href="https://instagram.com/lavida.hotel" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition">Instagram</a>
            <span>•</span>
            <a href="https://tiktok.com/@lavidahotel" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition">TikTok</a>
            <span>•</span>
            <span>Security Approved Grid</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
