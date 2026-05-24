import React from 'react';
import { Award, Compass, Users, MapPin, Eye, Star, Compass as Shield } from 'lucide-react';
import { IN_PH_ATTRACTIONS } from '../data';

interface AboutSectionProps {
  onLearnMore?: () => void;
  onViewRooms?: () => void;
}

export default function AboutSection({ onViewRooms }: AboutSectionProps) {
  const USP_CARDS = [
    {
      icon: <Award className="w-6 h-6 text-gold-400" />,
      title: '5-Star Boutique Craftsmanship',
      desc: 'Instead of dense over-crowding, we curate high-end bespoke chambers offering private rest configurations, rich velvet furnishings, and complete personalized butler parameters.'
    },
    {
      icon: <Users className="w-6 h-6 text-gold-400" />,
      title: 'Discreet Elite Staffing',
      desc: 'Our hospitality personnel are certified in top-tier service standards, assuring dedicated confidentiality, immediate attention, and intuitive care 24 hours a day.'
    },
    {
      icon: <Shield className="w-6 h-6 text-gold-400" />,
      title: 'Impenetrable Security Matrix',
      desc: 'Equipped with perimeter fencing, double-gate access control, and 24-hour armed patrol details matching diplomatic and oil field logistical safety criteria.'
    }
  ];

  return (
    <section className="py-20 bg-luxury-charcoal text-white" id="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Layout Grid: Hotel story and philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Visual Canvas Block: Editorial Stack of Luxury Pictures */}
          <div className="relative group flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-square">
              {/* Outer Golden Border frame */}
              <div className="absolute inset-4 border border-gold-500/30 -translate-x-4 -translate-y-4 rounded-lg z-0"></div>
              
              {/* Main Image */}
              <div id="about-image-frame" className="absolute inset-0 rounded-lg overflow-hidden border border-gold-500/10 shadow-2xl z-10">
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800"
                  alt="Lavida Exterior Entry"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Float Glassmorphic badge */}
              <div className="absolute bottom-6 right-6 bg-luxury-black/90 backdrop-blur-md border border-gold-500/20 p-5 rounded-lg shadow-xl z-20 max-w-[220px]">
                <h4 className="font-serif text-lg text-gold-400 font-semibold mb-1">Port Harcourt</h4>
                <p className="text-gray-400 text-xs font-mono tracking-widest uppercase">The Sovereign of Luxury accommodation</p>
                <div className="mt-2.5 flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Typography Content Block */}
          <div className="flex flex-col text-left">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-gold-400 font-semibold mb-2">
              DISCOVER LAVIDA HOTEL
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              A Sovereign Retreat of <br />
              <span className="text-gold-400 italic">Prestige and Comfort</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
              Nestled beautifully at No. 2 Sunrise Street, Off Rumuekini/Aluu Road, Lavida Hotel was conceptualized to transcend the borders of average lodging. We represent a seamless blend of five-star boutique elegance and the deep cultural, culinary, and social legacy of Port Harcourt.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Whether you are an energy industry diplomat setting down for major oilfield operations, or a couple exploring absolute peaceful weekend rest, our custom rooms, security protocol, high-speed fiber setups, and champion-level Fisherman soups provide the quintessential Niger Delta hospitality.
            </p>

            {/* Vision and Mission badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-6">
              <div className="flex space-x-3">
                <div className="p-2 h-10 w-10 rounded bg-gold-400/10 flex items-center justify-center shrink-0 border border-gold-400/20">
                  <Eye className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wide uppercase text-white font-serif">Our Vision</h4>
                  <p className="text-xs text-gray-400 font-sans mt-1">To stand as the absolute master brand of serene boutique luxury across the West African coast.</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <div className="p-2 h-10 w-10 rounded bg-gold-400/10 flex items-center justify-center shrink-0 border border-gold-400/20">
                  <Award className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wide uppercase text-white font-serif">Our Philosophy</h4>
                  <p className="text-xs text-gray-400 font-sans mt-1">To construct consistent, peaceful luxury modules while protecting native heritage, safety, and comfort.</p>
                </div>
              </div>
            </div>
            
            {onViewRooms && (
              <div className="mt-8">
                <button
                  id="about-view-rooms-btn"
                  onClick={onViewRooms}
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-gold-400 hover:text-gold-300 cursor-pointer"
                >
                  <span>Browse Executive Accommodations</span>
                  <Compass className="w-4 h-4 text-gold-400 animate-spin" style={{ animationDuration: '6s' }} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Why Choose Lavida Hotel (USP Grid) */}
        <div className="mt-24 pt-16 border-t border-white/5 text-center">
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-gold-400 font-semibold">
            UNRIVALED CHARACTERISTICS
          </span>
          <h3 className="font-serif text-3xl font-bold mt-2 mb-12">
            Why Discerning Guests Choose Lavida
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {USP_CARDS.map((card, idx) => (
              <div
                key={idx}
                className="bg-luxury-black/55 hover:bg-luxury-black border border-white/5 hover:border-gold-500/30 p-8 rounded-xl transition-all duration-300 ease-out flex flex-col group hover:-translate-y-1 shadow-lg shadow-black/40"
              >
                <div className="p-3 bg-gold-600/10 border border-gold-500/20 rounded-lg max-w-max mb-6 group-hover:bg-gold-500 group-hover:text-luxury-black transition-all duration-500 text-gold-400">
                  {card.icon}
                </div>
                <h4 className="font-serif text-xl font-semibold mb-3 group-hover:text-gold-300 transition-colors">
                  {card.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Local SEO Segment: Surrounding Attractions */}
        <div id="local-seo-attractions" className="mt-28 py-12 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="flex flex-col text-left justify-center lg:col-span-1">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-gold-400 font-semibold mb-2 flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1" /> LOCATION INTEGRITY
              </span>
              <h3 className="font-serif text-3xl font-bold mb-4">
                Explore Port Harcourt
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Rivers State offers stunning historic sights, networking points, and family-friendly recreations. Lavida Hotel is perfectly anchored for secure commutes.
              </p>
              <div className="p-4 bg-luxury-gray rounded-lg border border-white/5 text-[11px] font-mono whitespace-normal text-gray-400 leading-normal">
                📍 <strong className="text-white">No. 2 Sunrise Street, Off Rumuekini/Aluu Rd</strong><br/>
                Perfect distance from Port Harcourt International Airport (OMR).
              </div>
            </div>

            {/* Attractions scrollable list */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {IN_PH_ATTRACTIONS.map((att, idx) => (
                <div
                  key={idx}
                  className="bg-luxury-black flex flex-col rounded-lg overflow-hidden border border-white/5 hover:border-gold-500/20 group hover:shadow-lg transition-all"
                >
                  <div className="h-44 relative overflow-hidden">
                    <img
                      src={att.image}
                      alt={att.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-2.5 left-2.5 bg-luxury-black/90 text-gold-400 font-mono text-[9px] tracking-widest uppercase px-2 py-1 rounded">
                      {att.distance}
                    </div>
                  </div>
                  <div className="p-4 text-left flex flex-col flex-grow">
                    <span className="text-[10px] font-mono uppercase text-gold-500 font-semibold">
                      {att.category}
                    </span>
                    <h4 className="font-serif text-base font-semibold mt-1 mb-2 text-white group-hover:text-gold-300">
                      {att.name}
                    </h4>
                    <p className="text-gray-400 text-xs leading-relaxed flex-grow">
                      {att.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
