import React, { useState, useEffect } from 'react';
import { Wifi, Tv, Wind, Check, Star, RefreshCw, X, ChevronRight, Sparkles, MessageCircle, Heart, Users, Map } from 'lucide-react';
import { Room } from '../types';
import { ROOMS_DATA } from '../data';

interface RoomsSectionProps {
  onInitiateBooking: (room: Room, checkIn?: string, checkOut?: string, guests?: number) => void;
  searchFilter?: {
    checkIn: string;
    checkOut: string;
    guests: number;
    roomType: string;
  } | null;
}

export default function RoomsSection({ onInitiateBooking, searchFilter }: RoomsSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [activeSubImage, setActiveSubImage] = useState<number>(0);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  // Modal Booking form state
  const [modalCheckIn, setModalCheckIn] = useState('');
  const [modalCheckOut, setModalCheckOut] = useState('');
  const [modalGuests, setModalGuests] = useState(2);

  // Synchronize modal booking dates
  useEffect(() => {
    if (searchFilter) {
      setModalCheckIn(searchFilter.checkIn);
      setModalCheckOut(searchFilter.checkOut);
      setModalGuests(searchFilter.guests);
      if (searchFilter.roomType !== 'All') {
        setSelectedFilter(searchFilter.roomType);
      }
    } else {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 2);
      setModalCheckIn(today.toISOString().split('T')[0]);
      setModalCheckOut(tomorrow.toISOString().split('T')[0]);
    }
  }, [searchFilter]);

  const handleToggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  const handleOpenRoomModal = (room: Room) => {
    setSelectedRoom(room);
    setActiveSubImage(0);
  };

  const handleCloseRoomModal = () => {
    setSelectedRoom(null);
  };

  const handleModalBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) return;
    onInitiateBooking(selectedRoom, modalCheckIn, modalCheckOut, modalGuests);
    setSelectedRoom(null);
  };

  const filteredRooms = selectedFilter === 'All'
    ? ROOMS_DATA
    : ROOMS_DATA.filter((room) => room.type === selectedFilter);

  return (
    <section className="py-24 bg-luxury-black text-white relative" id="rooms-section">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-gold-400 font-semibold mb-2 block">
            SACRED ACCOMMODATIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Bespoke Rooms & Suites
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto font-sans leading-relaxed">
            Every chamber at Lavida Hotel is an architectural homage to premium comfort, featuring customized climate zones, robust safety elements, and deep serene aesthetics.
          </p>

          {/* Filter Bar Tab Controllers */}
          <div className="mt-10 flex flex-wrap justify-center gap-2" id="rooms-filter-tabs">
            {['All', 'Standard', 'Deluxe', 'Executive', 'Presidential Suite'].map((tab) => (
              <button
                key={tab}
                id={`filter-tab-${tab.toLowerCase().replace(' ', '-')}`}
                onClick={() => setSelectedFilter(tab)}
                className={`text-xs uppercase tracking-widest font-mono py-2.5 px-6 rounded-full border transition-all duration-300 cursor-pointer ${
                  selectedFilter === tab
                    ? 'bg-gold-500 text-luxury-black font-semibold border-gold-400 shadow shadow-gold-500/10'
                    : 'bg-luxury-gray/40 border-white/5 hover:border-gold-500/40 text-gray-300 hover:text-white'
                }`}
              >
                {tab === 'Deluxe' ? 'Signature Deluxe' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Rooms Card Display list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8" id="rooms-grid-container">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              id={`room-card-${room.id}`}
              onClick={() => handleOpenRoomModal(room)}
              className="bg-luxury-charcoal/80 rounded-xl overflow-hidden border border-white/5 hover:border-gold-500/20 transition-all duration-500 flex flex-col group cursor-pointer hover:shadow-2xl hover:shadow-gold-500/5 relative"
            >
              {/* Card visual banner */}
              <div className="h-72 sm:h-80 relative overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Gradient shadows inside card top */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-luxury-black/30 to-transparent"></div>
                
                {/* Wishlist Heart action button */}
                <button
                  id={`wishlist-btn-${room.id}`}
                  onClick={(e) => handleToggleWishlist(room.id, e)}
                  className="absolute top-4 right-4 p-2 rounded-full backdrop-blur-md bg-luxury-black/40 hover:bg-luxury-black/80 border border-white/10 text-white hover:text-red-500 transition cursor-pointer"
                >
                  <Heart className={`w-4 h-4 ${wishlist.includes(room.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>

                {/* Left labels */}
                {room.type === 'Presidential Suite' && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-gold-600 to-gold-400 text-luxury-black font-mono text-[9px] font-bold tracking-[0.2em] uppercase py-1 px-3 rounded shadow">
                    VIP Bestow
                  </div>
                )}
                
                {/* Inline specs */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 text-[10px] font-mono tracking-wider text-gray-200">
                  <span className="bg-luxury-black/70 py-1 px-2.5 rounded border border-white/5 flex items-center">
                    <Users className="w-3.5 h-3.5 mr-1 text-gold-400" /> Max {room.capacity}
                  </span>
                  <span className="bg-luxury-black/70 py-1 px-2.5 rounded border border-white/5 flex items-center">
                    <Sparkles className="w-3.5 h-3.5 mr-1 text-gold-400" /> {room.sqft} SQFT
                  </span>
                </div>
              </div>

              {/* Card Content parameters */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between text-left">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold tracking-wide text-white group-hover:text-gold-400 transition-colors">
                      {room.name}
                    </h3>
                    <div className="flex items-center text-gold-400 text-xs">
                      <Star className="w-3.5 h-3.5 fill-gold-400 mr-1 shrink-0" />
                      <span className="font-mono font-semibold">5.0</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed mb-6 line-clamp-2">
                    {room.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="flex flex-wrap gap-y-2 mb-6">
                    {room.highlights.slice(0, 3).map((high, i) => (
                      <span key={i} className="text-[11px] text-gray-300 w-1/2 flex items-center pr-2 font-sans truncate">
                        <Check className="w-3.5 h-3.5 text-gold-500 mr-1.5 shrink-0" />
                        {high}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer of Card with price and instant button */}
                <div className="border-t border-white/5 pt-5 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono tracking-wider text-gray-500 uppercase block">rate per night</span>
                    <span className="font-mono text-lg sm:text-xl font-bold text-gold-400">
                      ₦{room.pricePerNight.toLocaleString()}
                    </span>
                  </div>

                  <span className="text-xs uppercase tracking-widest font-bold text-white group-hover:text-gold-400 transition-all flex items-center space-x-1">
                    <span>View & Book</span>
                    <ChevronRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* FULLSCREEN PRESTIGE OVERLAY ROOM MODAL DETAIL & INTEGRATED CHECKOUT */}
      {selectedRoom && (
        <div id="room-detail-modal" className="fixed inset-0 z-50 overflow-y-auto bg-luxury-black/95 backdrop-blur-md flex justify-center p-2 sm:p-4 md:p-8 animate-fade-in">
          <div className="bg-luxury-charcoal max-w-5xl w-full rounded-2xl border border-gold-500/25 overflow-hidden flex flex-col shadow-2xl relative max-h-[90vh] md:max-h-none md:overflow-visible">
            
            {/* Modal Exit handle */}
            <button
              id="close-room-modal-btn"
              onClick={handleCloseRoomModal}
              className="absolute top-4 right-4 z-55 bg-luxury-black/80 hover:bg-gold-500 hover:text-luxury-black border border-white/10 rounded-full p-2.5 text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-grow max-h-full">
              
              {/* Left Column: Visual Carousel Panel (5 Columns) */}
              <div className="lg:col-span-5 p-4 sm:p-6 bg-luxury-black flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-gold-400 tracking-[0.2em] font-semibold">{selectedRoom.type} Selection</span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1 mb-4">{selectedRoom.name}</h3>
                  
                  {/* Photo Display */}
                  <div className="aspect-video sm:aspect-square bg-luxury-gray rounded-xl overflow-hidden border border-white/5 relative">
                    <img
                      src={selectedRoom.images[activeSubImage]}
                      alt="Room showcase perspective"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-luxury-black/80 px-2 py-1 rounded font-mono text-[9px] text-gray-400">
                      View {activeSubImage + 1} of {selectedRoom.images.length}
                    </div>
                  </div>

                  {/* Thumbnail Selector Grid */}
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {selectedRoom.images.map((img, idx) => (
                      <button
                        key={idx}
                        id={`modal-thumb-btn-${idx}`}
                        onClick={() => setActiveSubImage(idx)}
                        className={`aspect-video rounded overflow-hidden border transition-all ${
                          idx === activeSubImage ? 'border-gold-400 ring-1 ring-gold-400/30' : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <img src={img} alt="Thumb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub features stats list */}
                <div className="border-t border-white/5 pt-6 mt-6 grid grid-cols-3 gap-2 text-center text-gray-300">
                  <div className="p-2 bg-luxury-gray/40 rounded border border-white/5">
                    <span className="block text-[8px] font-mono tracking-widest text-gold-400 uppercase">Space Scale</span>
                    <span className="text-xs font-semibold">{selectedRoom.sqft} SQFT</span>
                  </div>
                  <div className="p-2 bg-luxury-gray/40 rounded border border-white/5">
                    <span className="block text-[8px] font-mono tracking-widest text-gold-400 uppercase">View Scenic</span>
                    <span className="text-[10px] font-semibold truncate block" title={selectedRoom.views}>{selectedRoom.views}</span>
                  </div>
                  <div className="p-2 bg-luxury-gray/40 rounded border border-white/5">
                    <span className="block text-[8px] font-mono tracking-widest text-gold-400 uppercase">Max Count</span>
                    <span className="text-xs font-semibold">{selectedRoom.capacity} Elites</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Descriptions & Direct Booking Form (7 Columns) */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-luxury-charcoal">
                <div>
                  
                  {/* Tabs info */}
                  <h4 className="text-xs font-mono tracking-widest uppercase text-gold-400 mb-2">Chamber Specifications</h4>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                    {selectedRoom.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    
                    {/* Active Amenities Checklist */}
                    <div>
                      <h5 className="font-serif text-sm font-semibold text-white mb-2.5 border-b border-white/5 pb-1">Included Credentials</h5>
                      <ul className="space-y-1.5 pb-2">
                        {selectedRoom.amenities.map((item, i) => (
                          <li key={i} className="text-xs text-gray-400 flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-gold-400 mr-2 shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Stay Rules & Schedules */}
                    <div>
                      <h5 className="font-serif text-sm font-semibold text-white mb-2.5 border-b border-white/5 pb-1">Stay Policies</h5>
                      <ul className="space-y-1.5 text-xs text-gray-400">
                        <li>🕒 <strong className="text-gray-200">Checkin:</strong> {selectedRoom.policies.checkIn}</li>
                        <li>🕒 <strong className="text-gray-200">Checkout:</strong> {selectedRoom.policies.checkOut}</li>
                        <li>🛡️ <strong className="text-gray-200">Cancellation:</strong> {selectedRoom.policies.cancellation}</li>
                        {selectedRoom.policies.rules.map((rule, idx) => (
                          <li key={idx} className="italic text-[11px] text-gold-300/80">⚠️ {rule}</li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Historical Guest Reviews inside modal */}
                  <div className="mb-6 pt-4 border-t border-white/5 text-left">
                    <h5 className="font-serif text-sm font-semibold text-white mb-2 flex items-center">
                      <MessageCircle className="w-4 h-4 text-gold-400 mr-1.5" /> Recent Certified Guest Testimonials
                    </h5>
                    <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                      {selectedRoom.reviews.map((rev) => (
                        <div key={rev.id} className="bg-luxury-black/40 p-2.5 rounded border border-white/5">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[11px] font-semibold text-gray-200">{rev.name}</span>
                            <span className="text-[9px] font-mono text-gray-500">{rev.date}</span>
                          </div>
                          <div className="flex items-center text-gold-400 text-[10px] mb-1">
                            {[...Array(5)].map((_, idx) => (
                              <Star key={idx} className={`w-3 h-3 ${idx < rev.rating ? 'fill-gold-400 text-gold-400' : 'text-gray-600'}`} />
                            ))}
                          </div>
                          <p className="text-gray-400 text-[11px] italic leading-normal">
                            "{rev.comment}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* MODAL INTEGRATED CHECKOUT DISPATCH BUTTON CONTAINER */}
                <div className="bg-luxury-black p-4 rounded-xl border border-gold-500/10 mt-8">
                  <form onSubmit={handleModalBookingSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                    
                    <div className="sm:col-span-4 flex flex-col space-y-1 text-left">
                      <label className="text-[8px] font-mono tracking-widest text-gold-400 uppercase">Check-In</label>
                      <input
                        type="date"
                        value={modalCheckIn}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setModalCheckIn(e.target.value)}
                        className="bg-luxury-gray/80 border border-white/10 text-[11px] text-white rounded p-1.5 w-full focus:outline-none focus:border-gold-400 font-sans"
                        required
                      />
                    </div>

                    <div className="sm:col-span-4 flex flex-col space-y-1 text-left">
                      <label className="text-[8px] font-mono tracking-widest text-gold-400 uppercase">Check-Out</label>
                      <input
                        type="date"
                        value={modalCheckOut}
                        min={modalCheckIn || new Date().toISOString().split('T')[0]}
                        onChange={(e) => setModalCheckOut(e.target.value)}
                        className="bg-luxury-gray/80 border border-white/10 text-[11px] text-white rounded p-1.5 w-full focus:outline-none focus:border-gold-400 font-sans"
                        required
                      />
                    </div>

                    <div className="sm:col-span-4 text-left">
                      <span className="block text-[8px] font-mono tracking-widest text-gold-400 uppercase mb-1">Rate Summary</span>
                      <div className="text-right sm:text-left">
                        <span className="font-mono text-base font-bold text-gold-400 block sm:inline">₦{selectedRoom.pricePerNight.toLocaleString()}</span>
                        <span className="text-[9px] text-gray-500 font-mono"> / night</span>
                      </div>
                    </div>

                    <div className="sm:col-span-12 mt-3 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono uppercase text-gray-400">Ambassadors Count:</span>
                        <select
                          value={modalGuests}
                          onChange={(e) => setModalGuests(Number(e.target.value))}
                          className="bg-luxury-gray/80 border border-white/10 text-xs text-white rounded px-2 py-1 focus:outline-none cursor-pointer"
                        >
                          {[...Array(selectedRoom.capacity)].map((_, i) => (
                            <option key={i} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="submit"
                        id="modal-request-booking-cta"
                        className="bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-luxury-black font-semibold text-xs uppercase tracking-wider py-2.5 px-6 rounded shadow shadow-gold-500/20 active:scale-95 transition-all cursor-pointer"
                      >
                        Initiate Booking Check
                      </button>
                    </div>

                  </form>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
}
