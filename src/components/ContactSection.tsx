import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare, Clock, Globe, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubject, setFormSubject] = useState('Accommodation Rates Inquiry');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      // Clear forms
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormMessage('');
    }, 4000);
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent("Hello Lavida Hotel Concierge, I would like to make an elite room or services inquiry!");
    window.open(`https://wa.me/2348082652863?text=${text}`, '_blank');
  };

  return (
    <section className="py-24 bg-luxury-charcoal text-white relative" id="contact-section">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact Editorial Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-gold-400 font-semibold mb-2 block animate-pulse">
            24/7 DIPLOMATIC CONCIERGE RESORT
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Connect With Lavida
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto font-sans leading-relaxed">
            Our luxury consultants are active around the clock. Whether establishing custom corporate booking retainers, helipad transfers, or dining reservations.
          </p>
        </div>

        {/* Info Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-luxury-black/60 p-6 rounded-lg border border-white/5 text-left hover:border-gold-500/10 transition-all duration-300">
            <Phone className="w-5 h-5 text-gold-400 mb-4" />
            <h4 className="font-serif text-base font-semibold text-white mb-2">Speak Directly</h4>
            <p className="text-xs text-gray-400 mb-3">Dial our direct lines for instant chamber assignments.</p>
            <div className="space-y-1 text-xs font-mono font-bold text-gold-300">
              <a href="tel:08082652863" className="hover:text-white block">0808 265 2863</a>
              <a href="tel:+2348082652863" className="hover:text-white block">+234 808 265 2863</a>
            </div>
          </div>

          <div className="bg-luxury-black/60 p-6 rounded-lg border border-white/5 text-left hover:border-gold-500/10 transition-all duration-300">
            <Mail className="w-5 h-5 text-gold-400 mb-4" />
            <h4 className="font-serif text-base font-semibold text-white mb-2">Corporate Correspondence</h4>
            <p className="text-xs text-gray-400 mb-3">Email proposals, audits, and stay specifications.</p>
            <div className="text-xs font-mono font-bold text-gold-300">
              <a href="mailto:Info@lavidahotel.com.ng" className="hover:text-white break-all">Info@lavidahotel.com.ng</a>
            </div>
          </div>

          <div className="bg-luxury-black/60 p-6 rounded-lg border border-white/5 text-left hover:border-gold-500/10 transition-all duration-300">
            <MapPin className="w-5 h-5 text-gold-400 mb-4" />
            <h4 className="font-serif text-base font-semibold text-white mb-2">Location Coordinates</h4>
            <p className="text-xs text-gray-400 mb-3">Off Rumuekini-Aluu Road, Port Harcourt, Rivers State.</p>
            <span className="text-[11px] font-mono font-bold text-gold-300">No. 2 Sunrise Street</span>
          </div>

          <div className="bg-luxury-black/60 p-6 rounded-lg border border-white/5 text-left hover:border-gold-500/10 transition-all duration-300">
            <Clock className="w-5 h-5 text-gold-400 mb-4" />
            <h4 className="font-serif text-base font-semibold text-white mb-2">Staying Schedule</h4>
            <p className="text-xs text-gray-400 mb-3">Concierge, armed logistics gates, and table services.</p>
            <span className="text-[11px] font-mono font-bold text-gold-300 uppercase tracking-widest bg-gold-400/10 px-2.5 py-1 rounded border border-gold-500/25">Always Open 24/7</span>
          </div>
        </div>

        {/* Dual Form & Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left: Message form (7 columns) */}
          <div className="lg:col-span-7 bg-luxury-black/80 rounded-xl p-6 sm:p-10 border border-white/5 flex flex-col justify-between" id="contact-form-card">
            {isSubmitted ? (
              <div id="contact-success-panel" className="text-center py-16 animate-fade-in my-auto">
                <CheckCircle2 className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-bold mb-2 text-white">Message Dispatched</h3>
                <p className="text-gray-400 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                  Your luxury stay details or inquiry are forwarded to our Executive Host on duty. Expect complete responses within 15 minutes.
                </p>
                <button
                  id="reset-contact-btn"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-xs font-mono font-bold text-gold-400 hover:text-white uppercase tracking-wider relative py-1 cursor-pointer"
                >
                  Submit Another Memo
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-400"></span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitMessage} className="space-y-6 text-left" id="contact-memo-form">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-gold-400 font-semibold mb-2 block">MEMO DETAILS</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1">Send Private Enquiry</h3>
                  <p className="text-gray-400 text-xs">Fill out the fields to transmit secure queries directly to our general reception.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[8px] font-mono text-gold-300 tracking-widest uppercase">Full Name</label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="E.g. Alhaji Ibrahim"
                      className="bg-luxury-gray border border-white/5 focus:border-gold-500 rounded p-2.5 text-xs focus:outline-none text-white font-sans"
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[8px] font-mono text-gold-300 tracking-widest uppercase">Corporate Email</label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="E.g. name@firm.com"
                      className="bg-luxury-gray border border-white/5 focus:border-gold-500 rounded p-2.5 text-xs focus:outline-none text-white font-sans"
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[8px] font-mono text-gold-300 tracking-widest uppercase">Phone Number</label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="E.g. 0808 265 2863"
                      className="bg-luxury-gray border border-white/5 focus:border-gold-500 rounded p-2.5 text-xs focus:outline-none text-white font-sans"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[8px] font-mono text-gold-300 tracking-widest uppercase">Subject Matter</label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="bg-luxury-gray border border-white/5 focus:border-gold-500 rounded p-2.5 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Accommodation Rates Inquiry">Accommodation Rates Inquiry</option>
                    <option value="Executive Boardroom reservation">Executive Boardroom reservation</option>
                    <option value="Private Airport Escort Logistics">Private Airport Escort Logistics</option>
                    <option value="Bespoke Events or Catering services">Bespoke Events or Catering services</option>
                  </select>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[8px] font-mono text-gold-300 tracking-widest uppercase">Enquiry Description</label>
                  <textarea
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Provide details about your proposed dates, group scaling, catering necessities..."
                    className="bg-luxury-gray border border-white/5 focus:border-gold-500 rounded p-3 text-xs h-32 focus:outline-none text-white font-sans"
                    required
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 flex-wrap gap-y-3">
                  <button
                    type="button"
                    onClick={handleOpenWhatsApp}
                    className="inline-flex items-center space-x-1 py-2 px-4 rounded bg-green-500/15 border border-green-500/25 text-green-400 hover:text-white hover:bg-green-600 transition text-xs font-mono tracking-wider cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-green-400 hover:fill-white shrink-0" />
                    <span>WhatsApp Concierge Chat</span>
                  </button>

                  <button
                    type="submit"
                    id="submit-memo-btn"
                    className="bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-luxury-black font-semibold text-xs uppercase tracking-widest py-3 px-8 rounded shadow transition cursor-pointer"
                  >
                    Inquire Now
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: High-fidelity Map & Socials Frame (5 columns) */}
          <div className="lg:col-span-5 bg-luxury-black/95 rounded-xl border border-white/5 overflow-hidden flex flex-col justify-between" id="map-socials-card">
            
            {/* Visual Port Harcourt Map Mock Frame */}
            <div className="h-68 relative overflow-hidden bg-luxury-gray flex flex-col items-center justify-center p-4">
              {/* Complex visually structured high contrast luxury blueprint map styling */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-radial-to-br from-gold-500/20 via-transparent to-transparent"></div>
              
              <div className="relative z-10 text-center max-w-sm">
                <MapPin className="w-10 h-10 text-gold-400 mx-auto mb-3 animate-float" />
                <h4 className="font-serif text-white font-semibold text-base">Lavida Hotel Landmark</h4>
                <p className="text-gray-400 text-xs leading-normal mt-1 mb-4">
                 No. 2 Sunrise Street, Off Rumuekini/Aluu Rd, Port Harcourt, Rivers State.
                </p>
                <div className="text-[10px] text-gold-400 font-mono tracking-widest bg-luxury-charcoal border border-gold-500/20 py-1.5 px-3 rounded inline-block uppercase font-bold">
                  Latitude: 4.8872° N, Longitude: 6.9458° E
                </div>
              </div>

              {/* Subdued design vector grids representing streets */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10 pointer-events-none">
                {[...Array(36)].map((_, i) => (
                  <div key={i} className="border-[0.5px] border-white/30"></div>
                ))}
              </div>
            </div>

            {/* Social handles container */}
            <div className="p-6 sm:p-8 bg-luxury-charcoal/90 flex-grow text-left flex flex-col justify-between">
              <div>
                <h4 className="font-serif text-white font-semibold text-base mb-2">Connect Digitally</h4>
                <p className="text-gray-450 text-xs leading-relaxed mb-6">
                  Follow our prestigious accounts on Facebook, TikTok, Instagram, and Twitter/X for active tours of presidential upgrades, dining additions, and seasonal events.
                </p>
              </div>

              <div className="space-y-3.5 pt-4 border-t border-white/5 text-xs font-mono">
                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400 font-semibold flex items-center">
                    📸 Instagram:
                  </span>
                  <a href="https://instagram.com/lavida.hotel" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-white font-bold transition">@lavida.hotel</a>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400 font-semibold flex items-center">
                    🎵 TikTok:
                  </span>
                  <a href="https://tiktok.com/@lavidahotel" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-white font-bold transition">@lavidahotel</a>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400 font-semibold flex items-center">
                    👥 Facebook:
                  </span>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-white font-bold transition">Lavida Hotel</a>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400 font-semibold flex items-center">
                    🐦 Twitter/X:
                  </span>
                  <a href="https://twitter.com/lavida.hotel" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-white font-semibold transition">@lavida.hotel</a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
