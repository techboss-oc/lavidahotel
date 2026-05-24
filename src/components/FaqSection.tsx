import React, { useState } from 'react';
import { Star, MessageSquare, ChevronDown, ChevronUp, HelpCircle, ShieldCheck, Mail, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { FAQ_ITEMS, TESTIMONIALS_DATA } from '../data';

export default function FaqSection() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Testimonial slider state
  const [testIdx, setTestIdx] = useState(0);

  const faqCategories = ['All', 'General Location', 'Transport & VIP', 'Services & Amenities', 'Policies', 'Payments'];

  const filteredFaqs = activeCategory === 'All'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter(faq => faq.category === activeCategory);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const handleNextTest = () => {
    setTestIdx((prev) => (prev < TESTIMONIALS_DATA.length - 1 ? prev + 1 : 0));
  };

  const handlePrevTest = () => {
    setTestIdx((prev) => (prev > 0 ? prev - 1 : TESTIMONIALS_DATA.length - 1));
  };

  return (
    <section className="py-24 bg-luxury-black text-white relative" id="faq-reviews-section">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* REVIEWS CAROUSEL SECTION */}
        <div className="mb-24 text-center">
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-gold-400 font-semibold mb-2 block">
            CERTIFIED ELITE OPINIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-12">
            What Our Distinguished Guests Say
          </h2>

          <div id="testimonial-carousel-card" className="max-w-4xl mx-auto bg-luxury-charcoal/40 p-8 sm:p-12 rounded-2xl border border-gold-500/15 shadow-2xl relative">
            <div className="absolute top-6 left-6 text-gold-500/10 text-9xl font-serif select-none pointer-events-none line-height-none">
              “
            </div>

            <div className="relative z-10 flex flex-col items-center">
              {/* Stars review */}
              <div className="flex space-x-1 mb-6 text-gold-400">
                {[...Array(TESTIMONIALS_DATA[testIdx].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400 shrink-0" />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-base sm:text-lg md:text-xl text-gray-200 italic leading-relaxed font-sans max-w-2xl">
                "{TESTIMONIALS_DATA[testIdx].review}"
              </blockquote>

              {/* Guest Profile information */}
              <div className="mt-8 flex items-center space-x-4">
                <div className="h-14 w-14 rounded-full overflow-hidden border border-gold-400/30 shadow p-[1px]">
                  <img
                    src={TESTIMONIALS_DATA[testIdx].avatar}
                    alt={TESTIMONIALS_DATA[testIdx].name}
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-serif text-base sm:text-lg font-bold text-white">
                    {TESTIMONIALS_DATA[testIdx].name}
                  </h4>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-xs text-gold-400 font-mono tracking-wider">
                    <span>{TESTIMONIALS_DATA[testIdx].role}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="text-gray-500">{TESTIMONIALS_DATA[testIdx].origin}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel navigation slide controls */}
            <div className="absolute bottom-6 right-6 flex items-center space-x-2 z-10" id="testimonial-nav">
              <button
                id="testimonial-prev-btn"
                onClick={handlePrevTest}
                className="p-2 bg-luxury-black hover:bg-gold-500 border border-white/5 hover:text-luxury-black text-gray-400 rounded-full transition cursor-pointer"
                title="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                id="testimonial-next-btn"
                onClick={handleNextTest}
                className="p-2 bg-luxury-black hover:bg-gold-500 border border-white/5 hover:text-luxury-black text-gray-400 rounded-full transition cursor-pointer"
                title="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* INTERACTIVE FAQ ACCORDION */}
        <div className="mt-28 border-t border-white/5 pt-20">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-gold-400 font-semibold mb-2 block">
              HAVE PREPARATORY INQUIRIES?
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold">
              Frequently Asked Questions
            </h3>

            {/* Faq tabs */}
            <div className="mt-8 flex flex-wrap justify-center gap-1.5" id="faq-tabs">
              {faqCategories.map(cat => (
                <button
                  key={cat}
                  id={`faq-tab-${cat.toLowerCase().replace(' ', '-')}`}
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveFaq(null);
                  }}
                  className={`text-[10px] sm:text-xs tracking-widest font-mono py-2 px-4 border rounded transition cursor-pointer ${
                    activeCategory === cat
                      ? 'border-gold-400 text-gold-400 bg-gold-400/[0.04]'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  {cat === 'General Location' ? 'Location' : cat === 'Transport & VIP' ? 'Airport & Security' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion List */}
          <div className="max-w-3xl mx-auto space-y-4" id="faq-accordion-list">
            {filteredFaqs.map((faq, idx) => (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className="bg-luxury-charcoal/60 rounded-xl overflow-hidden border border-white/5"
              >
                <button
                  id={`faq-toggle-btn-${idx}`}
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-5 px-6 text-left flex justify-between items-center hover:bg-white/[0.02] transition cursor-pointer"
                >
                  <span className="font-serif text-sm sm:text-base font-semibold text-white tracking-wide pr-4">
                    {faq.question}
                  </span>
                  {activeFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-gold-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                </button>

                {activeFaq === idx && (
                  <div id={`faq-answer-${idx}`} className="px-6 pb-6 text-left text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-4 bg-luxury-black/30 animate-fade-in font-sans">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription Card Grid */}
        <div id="newsletter-card" className="mt-28 bg-gradient-to-r from-luxury-black to-luxury-charcoal p-8 sm:p-12 rounded-xl border border-gold-500/10 text-center relative overflow-hidden shadow-xl max-w-4xl mx-auto">
          <div className="absolute -top-12 -left-12 w-44 h-44 bg-gold-500/5 blur-3xl rounded-full"></div>
          
          <span className="text-[9px] font-mono tracking-widest text-gold-400 uppercase font-semibold">LAVIDA LIFESTYLE JOURNALS</span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-2 mb-4">Subscribe to Private Portfolios</h3>
          <p className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-8 font-sans">
            Recieve discrete notifications about penthouse seasonal allocations, exclusive restaurant dinner slots, and local holiday directories in Rivers State.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); alert("Welcome! Your private correspondence is authenticated."); }} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 max-w-lg mx-auto" id="newsletter-form">
            <input
              type="email"
              placeholder="Your Ambassador Email (E.g. chief@oilfield.com)"
              className="bg-luxury-gray/80 border border-white/10 hover:border-white/20 p-3 rounded-l text-xs focus:outline-none focus:border-gold-400 text-white flex-grow font-sans"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-luxury-black font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-r transition-all duration-300 shrink-0 cursor-pointer"
            >
              Authenticate Mail
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
