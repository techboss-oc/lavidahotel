import React, { useState, useEffect } from 'react';
import { Calendar, Users, Award, ShieldCheck, Printer, FileDown, CheckCircle2, AlertTriangle, User, Mail, Phone, Plane, ClipboardList, RefreshCw, Star, ArrowLeft } from 'lucide-react';
import { Room, Booking } from '../types';
import { ROOMS_DATA } from '../data';

interface BookingDashboardProps {
  activePendingRoom: Room | null;
  activePendingDates?: { checkIn: string; checkOut: string; guests: number } | null;
  onClearPendingTransaction: () => void;
  onUpdateBookingCount: (count: number) => void;
  onTabChange: (tabId: string) => void;
}

export default function BookingDashboard({
  activePendingRoom,
  activePendingDates,
  onClearPendingTransaction,
  onUpdateBookingCount,
  onTabChange
}: BookingDashboardProps) {
  const [localBookings, setLocalBookings] = useState<Booking[]>([]);
  const [step, setStep] = useState<'list' | 'checkout' | 'success'>('list');
  const [activeBookingRef, setActiveBookingRef] = useState<string | null>(null);

  // Form states
  const [targetRoom, setTargetRoom] = useState<Room>(activePendingRoom || ROOMS_DATA[0]);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [airportEscort, setAirportEscort] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load existing bookings from localStorage on initialization
  useEffect(() => {
    const saved = localStorage.getItem('lavida_reservations');
    if (saved) {
      const parsed = JSON.parse(saved);
      setLocalBookings(parsed);
      onUpdateBookingCount(parsed.length);
    }
  }, []);

  // Sync if room was passed from Rooms list
  useEffect(() => {
    if (activePendingRoom) {
      setTargetRoom(activePendingRoom);
      setStep('checkout');
      if (activePendingDates) {
        setCheckIn(activePendingDates.checkIn);
        setCheckOut(activePendingDates.checkOut);
        setGuests(activePendingDates.guests);
      } else {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 2);
        setCheckIn(today.toISOString().split('T')[0]);
        setCheckOut(tomorrow.toISOString().split('T')[0]);
      }
    }
  }, [activePendingRoom, activePendingDates]);

  // Form helpers
  const getDaysDiff = (startStr: string, endStr: string): number => {
    if (!startStr || !endStr) return 1;
    const start = new Date(startStr);
    const end = new Date(endStr);
    const diff = end.getTime() - start.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 1;
  };

  const calculateRates = () => {
    const nights = getDaysDiff(checkIn, checkOut);
    const subtotal = targetRoom.pricePerNight * nights;
    const taxes = subtotal * 0.075; // 7.5% standard VAT
    const escortFee = airportEscort ? 25000 : 0; // Armored escort flat fee 25k NGN
    const total = subtotal + taxes + escortFee;
    return { nights, subtotal, taxes, escortFee, total };
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const rates = calculateRates();
    const refCode = `LVD-${checkIn.replace(/-/g, '').slice(2, 6)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      refNo: refCode,
      room: targetRoom,
      checkIn,
      checkOut,
      guests,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests: `${specialRequests}${airportEscort ? ' | REQUESTED ARMORED AIRPORT ESCORT' : ''}`,
      status: 'Confirmed',
      totalAmount: rates.total,
      createdAt: new Date().toLocaleDateString(),
      nights: rates.nights
    };

    setTimeout(() => {
      const updated = [newBooking, ...localBookings];
      setLocalBookings(updated);
      localStorage.setItem('lavida_reservations', JSON.stringify(updated));
      onUpdateBookingCount(updated.length);
      setActiveBookingRef(refCode);
      setIsProcessing(false);
      setStep('success');
      onClearPendingTransaction();

      // Clear forms
      setGuestName('');
      setGuestEmail('');
      setGuestPhone('');
      setSpecialRequests('');
      setAirportEscort(false);
    }, 2000); // Luxury simulated delay to authenticate connection
  };

  const handleCancelBooking = (id: string) => {
    if (confirm("Are you sure you would like to cancel this prestigious reservation? Room allocations will be immediately returned to availability pools.")) {
      const updated = localBookings.filter(b => b.id !== id);
      setLocalBookings(updated);
      localStorage.setItem('lavida_reservations', JSON.stringify(updated));
      onUpdateBookingCount(updated.length);
    }
  };

  const handleOpenCheckoutRaw = () => {
    setStep('checkout');
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 2);
    setCheckIn(today.toISOString().split('T')[0]);
    setCheckOut(tomorrow.toISOString().split('T')[0]);
  };

  const activeVoucher = localBookings.find(b => b.refNo === activeBookingRef);

  // WhatsApp helper
  const handleVoucherWhatsAppSend = (bk: Booking) => {
    const text = encodeURIComponent(`Hello Lavida Hotel Concierge, here is my confirmed modern staying voucher reference:\n\n• Reference Code: ${bk.refNo}\n• Chamber: ${bk.room.name}\n• Guest Name: ${bk.guestName}\n• Schedule: ${bk.checkIn} to ${bk.checkOut} (${bk.nights} Nights)\n• Rate: ₦${bk.totalAmount.toLocaleString()}\n\nPlease verify airport coordinates or escort logistics accordingly!`);
    window.open(`https://wa.me/2348082652863?text=${text}`, '_blank');
  };

  const ratesSummary = calculateRates();

  return (
    <section className="py-24 bg-luxury-charcoal text-white relative min-h-screen" id="dashboard-booking-section">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* LIST STEP */}
        {step === 'list' && (
          <div className="space-y-12 animate-fade-in text-left">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end border-b border-white/5 pb-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-mono text-gold-400 font-semibold mb-2 block">
                  CLIENT PORTAL
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
                  My Reservations
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  Securely view, download, or authenticate your active boutique chamber allocations.
                </p>
              </div>

              <div className="mt-4 sm:mt-0 flex space-x-3 shrink-0">
                <button
                  id="dash-browse-rooms-btn"
                  onClick={() => onTabChange('rooms')}
                  className="border border-white/20 hover:border-gold-400 text-white hover:text-gold-400 text-xs font-mono font-bold tracking-wider uppercase px-4 py-2.5 rounded hover:bg-white/5 cursor-pointer"
                >
                  Browse Chambers
                </button>
                <button
                  id="dash-book-now-btn"
                  onClick={handleOpenCheckoutRaw}
                  className="bg-gradient-to-r from-gold-600 to-gold-400 text-luxury-black text-xs font-bold font-mono tracking-wider uppercase px-5 py-2.5 rounded hover:from-gold-500 active:scale-95 transition cursor-pointer shadow shadow-gold-500/10"
                >
                  Book Instant Chamber
                </button>
              </div>
            </div>

            {localBookings.length === 0 ? (
              <div className="text-center py-20 bg-luxury-black/40 rounded-xl border border-white/5 max-w-2xl mx-auto flex flex-col items-center">
                <Calendar className="w-12 h-12 text-gray-600 mb-4 animate-float" />
                <h3 className="font-serif text-xl font-semibold mb-2 text-white">No Chambers Allocated</h3>
                <p className="text-gray-400 text-xs max-w-sm mb-8 leading-relaxed font-sans">
                  You have no pending staying histories recorded in your browser local cache. Launch booking queries to lock down suites instantly!
                </p>
                <button
                  id="dash-empty-query-btn"
                  onClick={() => onTabChange('rooms')}
                  className="bg-gold-500 text-luxury-black text-xs font-bold tracking-widest uppercase px-6 py-3 rounded hover:bg-gold-400 active:scale-95 cursor-pointer"
                >
                  Query Suitability Pools
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {localBookings.map((bk) => (
                  <div
                    key={bk.id}
                    id={`reservations-card-${bk.refNo}`}
                    className="bg-luxury-black/90 p-6 sm:p-8 rounded-xl border border-white/5 hover:border-gold-500/20 transition duration-300 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                  >
                    
                    {/* Visual Thumb thumb */}
                    <div className="md:col-span-3 h-36 rounded-lg overflow-hidden border border-white/5 relative">
                      <img
                        src={bk.room.image}
                        alt="Booked chamber"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-luxury-black/90 text-gold-400 font-mono text-[8px] tracking-widest uppercase px-2 py-0.5 rounded">
                        {bk.room.type}
                      </div>
                    </div>

                    {/* Content text */}
                    <div className="md:col-span-6 flex flex-col justify-center space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[10px] tracking-widest text-gold-400 font-bold bg-gold-400/10 border border-gold-500/20 py-0.5 px-2 rounded">
                          {bk.refNo}
                        </span>
                        <span className="text-[10px] font-mono text-gray-500">• Created: {bk.createdAt}</span>
                      </div>

                      <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-1">
                        {bk.room.name}
                      </h3>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 pt-2 text-xs text-gray-300">
                        <span className="flex items-center">
                          📅 Check-In: <strong className="text-white ml-1 font-mono">{bk.checkIn}</strong>
                        </span>
                        <span className="flex items-center">
                          📅 Check-Out: <strong className="text-white ml-1 font-mono">{bk.checkOut}</strong>
                        </span>
                        <span>👥 Guests: <strong className="text-white">{bk.guests} Ambassador{bk.guests > 1 ? 's' : ''}</strong></span>
                        <span>🌙 Nights Stay: <strong className="text-white">{bk.nights} Night{bk.nights > 1 ? 's' : ''}</strong></span>
                      </div>
                      
                      {bk.specialRequests && (
                        <p className="text-[11px] font-mono italic text-gold-300/80 mt-2 truncate max-w-md">
                          📋 Memo: {bk.specialRequests}
                        </p>
                      )}
                    </div>

                    {/* Rates and Vouchers panel */}
                    <div className="md:col-span-3 flex flex-col justify-between items-stretch text-left sm:text-right border-t sm:border-t-0 md:border-l border-white/5 pt-4 sm:pt-0 md:pl-6 space-y-3.5">
                      <div>
                        <span className="text-[9px] font-mono text-gray-500 uppercase block">Total Settled</span>
                        <span className="font-mono text-lg sm:text-xl font-extrabold text-gold-400 block">
                          ₦{bk.totalAmount.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex flex-wrap md:flex-col gap-2 justify-end">
                        <button
                          id={`print-voucher-top-${bk.refNo}`}
                          onClick={() => {
                            setActiveBookingRef(bk.refNo);
                            setStep('success');
                          }}
                          className="bg-gold-500 hover:bg-gold-400 text-luxury-black font-semibold text-[10px] uppercase font-mono tracking-wider py-2 px-3 rounded flex items-center justify-center shrink-0 cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5 mr-1" /> View VIP Voucher
                        </button>
                        <button
                          id={`cancel-voucher-top-${bk.refNo}`}
                          onClick={() => handleCancelBooking(bk.id)}
                          className="text-red-400 hover:text-red-500 border border-red-500/10 hover:border-red-500/30 font-semibold text-[10px] uppercase font-mono tracking-wider py-2 px-3 rounded shrink-0 cursor-pointer text-center"
                        >
                          Cancel Stay
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CHECKOUT STEP */}
        {step === 'checkout' && (
          <div className="space-y-12 animate-fade-in text-left">
            <div className="border-b border-white/5 pb-6 flex items-center">
              <button
                id="back-list-btn"
                onClick={() => {
                  setStep('list');
                  onClearPendingTransaction();
                }}
                className="mr-4 p-2 bg-luxury-black/80 hover:bg-gold-500 hover:text-luxury-black border border-white/10 rounded-full transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-mono text-gold-400 font-semibold mb-1 block">
                  RESERVATION SCREEN
                </span>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-white">
                  Executive Suite Reservation
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form Input parameters (8 columns) */}
              <div className="lg:col-span-8 bg-luxury-black/95 rounded-xl p-6 sm:p-10 border border-white/5">
                <form onSubmit={handleCheckoutSubmit} className="space-y-6" id="checkout-form">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white mb-2">1. Ambassador Coordinates</h3>
                    <p className="text-gray-400 text-xs">Establish stays mapping credentials, enabling discrete confirmation alerts.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[9px] font-mono tracking-widest text-gold-300 uppercase flex items-center">
                        <User className="w-3.5 h-3.5 mr-1 text-gold-400" /> Full Name
                      </label>
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="E.g. Chief Onyeka Ndu"
                        className="bg-luxury-gray border border-white/5 focus:border-gold-500 rounded p-3 text-xs focus:outline-none text-white font-sans"
                        required
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[9px] font-mono tracking-widest text-gold-300 uppercase flex items-center">
                        <Mail className="w-3.5 h-3.5 mr-1 text-gold-400" /> Private Email
                      </label>
                      <input
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="E.g. chief@lavidahotel.com"
                        className="bg-luxury-gray border border-white/5 focus:border-gold-500 rounded p-3 text-xs focus:outline-none text-white font-sans"
                        required
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[9px] font-mono tracking-widest text-gold-300 uppercase flex items-center">
                        <Phone className="w-3.5 h-3.5 mr-1 text-gold-400" /> Phone Number
                      </label>
                      <input
                        type="tel"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="E.g. 0808 265 2863"
                        className="bg-luxury-gray border border-white/5 focus:border-gold-500 rounded p-3 text-xs focus:outline-none text-white font-sans"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <h3 className="font-serif text-xl font-bold text-white mb-2">2. Timelines</h3>
                    <p className="text-gray-400 text-xs mb-4">Validate arrival schedules to trigger automatic butler allocations.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[9px] font-mono tracking-widest text-gold-300 uppercase">Check-In</label>
                        <input
                          type="date"
                          value={checkIn}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="bg-luxury-gray border border-white/5 focus:border-gold-500 rounded p-3 text-xs text-white focus:outline-none font-sans"
                          required
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[9px] font-mono tracking-widest text-gold-300 uppercase">Check-Out</label>
                        <input
                          type="date"
                          value={checkOut}
                          min={checkIn || new Date().toISOString().split('T')[0]}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="bg-luxury-gray border border-white/5 focus:border-gold-500 rounded p-3 text-xs text-white focus:outline-none font-sans"
                          required
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[9px] font-mono tracking-widest text-gold-300 uppercase">Ambassadors Count</label>
                        <select
                          value={guests}
                          onChange={(e) => setGuests(Number(e.target.value))}
                          className="bg-luxury-gray border border-white/5 focus:border-gold-500 rounded p-3 text-xs text-white focus:outline-none cursor-pointer"
                        >
                          {[...Array(targetRoom.capacity)].map((_, i) => (
                            <option key={i} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>

                    </div>
                  </div>

                  {/* Chamber swap picker */}
                  <div className="pt-4 border-t border-white/5 flex flex-col space-y-1.5">
                    <label className="text-[9px] font-mono tracking-widest text-gold-300 uppercase">Select Chamber Tier Swap</label>
                    <select
                      value={targetRoom.id}
                      onChange={(e) => {
                        const match = ROOMS_DATA.find(r => r.id === e.target.value);
                        if (match) setTargetRoom(match);
                      }}
                      className="bg-luxury-gray border border-white/5 focus:border-gold-500 rounded p-3 text-xs text-white focus:outline-none cursor-pointer"
                    >
                      {ROOMS_DATA.map(r => (
                        <option key={r.id} value={r.id}>{r.name} - ₦{r.pricePerNight.toLocaleString()}/Night</option>
                      ))}
                    </select>
                  </div>

                  {/* Airport VIP escort coordinate selection option */}
                  <div className="pt-4 border-t border-white/5 flex items-start space-x-3 bg-gold-400/[0.02] p-4 rounded border border-gold-500/10">
                    <input
                      type="checkbox"
                      id="airport-transfer-cb"
                      checked={airportEscort}
                      onChange={(e) => setAirportEscort(e.target.checked)}
                      className="h-4.5 w-4.5 shrink-0 accent-gold-500 rounded border-white/10 text-luxury-black mt-0.5 cursor-pointer"
                    />
                    <div className="text-xs">
                      <label htmlFor="airport-transfer-cb" className="font-serif font-semibold text-white cursor-pointer hover:text-gold-400 block">
                        🚕 Request Armed Airport Escort Transfer (⚡ Recommended)
                      </label>
                      <p className="text-gray-400 leading-normal mt-1">
                        Secure armored executive transit coordinates with professional safety drivers directly from Port Harcourt Airport (OMR). A flat diplomatic surcharge of ₦25,000 applies.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[8px] font-mono text-gold-300 tracking-widest uppercase">Special Stay Directives / dietary Requests</label>
                    <textarea
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="E.g. Scent leaves excluded, feather pillowed menu, late night wine coordinates, corporate invoice details..."
                      className="bg-luxury-gray border border-white/5 focus:border-gold-500 rounded p-3 text-xs h-20 text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div className="border-t border-white/5 pt-6 flex justify-between items-center flex-wrap gap-y-3">
                    <p className="text-[10px] font-mono text-gray-500 flex items-center">
                      <ShieldCheck className="w-4 h-4 text-gold-500 mr-1.5" /> Direct currency settlements processed in NGN values.
                    </p>

                    <button
                      type="submit"
                      id="checkout-confirm-btn"
                      disabled={isProcessing}
                      className="bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-luxury-black font-semibold text-xs uppercase tracking-widest py-3 px-8 rounded shadow flex items-center justify-center space-x-1.5 active:scale-95 transition cursor-pointer"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Connecting Host...</span>
                        </>
                      ) : (
                        <span>Verify staying allocation</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Rates Checkout side-preview (4 columns) */}
              <div className="lg:col-span-4 bg-luxury-black border border-gold-500/15 rounded-xl p-5 sm:p-6 shadow-2xl space-y-5 sticky top-24">
                <div className="border-b border-white/5 pb-4">
                  <span className="text-[9px] font-mono text-gold-400 uppercase tracking-widest block mb-1">Chamber Preview</span>
                  <h4 className="font-serif text-lg font-bold text-white">{targetRoom.name}</h4>
                  <p className="text-[10px] font-mono text-gray-500 mt-1 uppercase">{targetRoom.type} Standard Tier</p>
                </div>

                <div className="aspect-video rounded overflow-hidden border border-white/5">
                  <img src={targetRoom.image} alt="Target" className="w-full h-full object-cover" />
                </div>

                <div className="space-y-2 text-xs border-t border-b border-white/5 py-4">
                  <div className="flex justify-between text-gray-400">
                    <span>Base Fare (₦/Night)</span>
                    <span className="font-mono text-white">₦{targetRoom.pricePerNight.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Selected Duration</span>
                    <span className="font-mono text-white">{ratesSummary.nights} Night{ratesSummary.nights > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 border-b border-dashed border-white/5 pb-2">
                    <span>Accommodation Subtotal</span>
                    <span className="font-mono text-white">₦{ratesSummary.subtotal.toLocaleString()}</span>
                  </div>

                  {airportEscort && (
                    <div className="flex justify-between text-gray-400">
                      <span>🚕 Armored Escort service</span>
                      <span className="font-mono text-white">₦{ratesSummary.escortFee.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gold-400/80">
                    <span>VAT Surcharge (7.5%)</span>
                    <span className="font-mono text-gold-400">₦{ratesSummary.taxes.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs uppercase font-mono tracking-wider text-gray-400">Total rate:</span>
                  <span className="font-mono text-lg sm:text-xl font-bold text-gold-400">₦{ratesSummary.total.toLocaleString()}</span>
                </div>

                <div className="p-3.5 bg-luxury-gray/40 rounded border border-white/5 text-[10px] font-sans text-gray-400 leading-relaxed text-center">
                  ⚠️ <strong className="text-white">Refund terms active:</strong> Cancellations up to 48h prior enjoy full direct refunds.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SUCCESS INVOICE STEP */}
        {step === 'success' && activeVoucher && (
          <div className="space-y-12 animate-fade-in text-center flex flex-col items-center">
            
            <div className="max-w-max p-3 bg-gold-500 text-luxury-black rounded-full mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white max-w-lg leading-tight -mt-4">
              Your Lavida Sanctuary has <br />been Secured!
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm max-w-md leading-relaxed">
              We have loaded your credentials. Print out or save the prestigious stay voucher below to exhibit to our safety gates upon arrival.
            </p>

            {/* HIGH FIDELITY LUXURY DIGITAL INVOICE VOUCHER BADGE */}
            <div
              id="vip-boarding-voucher"
              className="w-full max-w-2xl bg-luxury-black border-2 border-gold-500 rounded-2xl overflow-hidden p-[1px] shadow-3xl text-left bg-gradient-to-b from-luxury-gray via-luxury-black to-luxury-black relative"
            >
              {/* Subtle Gold Watermark Seal */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-gold-400/5 h-80 w-80 rounded-full flex items-center justify-center pointer-events-none select-none z-0">
                <div className="border border-gold-400/5 h-72 w-72 rounded-full flex items-center justify-center">
                  <span className="font-serif text-lg tracking-[0.2em] font-extrabold text-gold-400/[0.015]">LAVIDA HOTEL</span>
                </div>
              </div>

              {/* Header block with Logo */}
              <div className="p-6 border-b border-gold-500/35 relative z-10 bg-luxury-gray/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-3">
                <div className="flex items-center space-x-2">
                  <Award className="w-7 h-7 text-gold-400" />
                  <div className="flex flex-col">
                    <span className="font-serif text-lg font-bold tracking-wider text-white">LAVIDA HOTEL</span>
                    <span className="text-[8px] font-mono tracking-widest text-gold-400 uppercase -mt-1">PORT HARCOURT</span>
                  </div>
                </div>

                <div className="text-left sm:text-right font-mono">
                  <span className="text-[8px] text-gray-500 uppercase block">Boarding Ref</span>
                  <span className="text-gold-400 font-extrabold text-lg tracking-wider">{activeVoucher.refNo}</span>
                </div>
              </div>

              {/* Main specifications grid */}
              <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-dashed border-gold-500/20 relative z-10 font-sans">
                
                {/* Guest specs */}
                <div className="space-y-3 text-xs text-gray-300">
                  <h4 className="font-serif text-gold-400 font-semibold tracking-wide uppercase text-[10px] border-b border-white/5 pb-1">Ambassador</h4>
                  <div>
                    <span className="text-gray-500 text-[8px] uppercase tracking-wider block font-mono">Name</span>
                    <strong className="text-white text-sm">{activeVoucher.guestName}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[8px] uppercase tracking-wider block font-mono">Contact Coordinates</span>
                    <span className="font-mono text-gray-400 break-all">{activeVoucher.guestEmail}</span> <br />
                    <span className="font-mono text-gray-400">{activeVoucher.guestPhone}</span>
                  </div>
                  {activeVoucher.specialRequests && (
                    <div>
                      <span className="text-gray-500 text-[8px] uppercase tracking-wider block font-mono">Stay instructions</span>
                      <p className="text-[11px] text-gray-400 italic max-h-16 overflow-y-auto">{activeVoucher.specialRequests}</p>
                    </div>
                  )}
                </div>

                {/* Booking stats */}
                <div className="space-y-3 text-xs text-gray-300 border-t sm:border-t-0 sm:border-l border-white/5 sm:pl-6">
                  <h4 className="font-serif text-gold-400 font-semibold tracking-wide uppercase text-[10px] border-b border-white/5 pb-1">Stay schedule</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-500 text-[8px] uppercase tracking-wider block font-mono">Check-In</span>
                      <span className="font-mono text-white font-bold">{activeVoucher.checkIn}</span>
                      <span className="text-[9px] text-gray-500 block">From 14:00 Hrs</span>
                    </div>
                    <div>
                      <span className="text-gray-500 text-[8px] uppercase tracking-wider block font-mono">Check-Out</span>
                      <span className="font-mono text-white font-bold">{activeVoucher.checkOut}</span>
                      <span className="text-[9px] text-gray-500 block">Until 12:00 Hrs</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div>
                      <span className="text-gray-500 text-[8px] uppercase tracking-wider block font-mono">Chamber</span>
                      <span className="text-white truncate block max-w-[150px]" title={activeVoucher.room.name}>{activeVoucher.room.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 text-[8px] uppercase tracking-wider block font-mono">Guests scaling</span>
                      <span className="text-white">{activeVoucher.guests} Ambassador{activeVoucher.guests > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Rates check details and Barcode / Security element */}
              <div className="p-6 bg-luxury-gray/15 relative z-10 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div>
                  <span className="text-gray-500 text-[8px] uppercase tracking-widest block font-mono">Total direct rates Settled</span>
                  <span className="font-mono text-xl sm:text-2xl font-extrabold text-gold-400">
                    ₦{activeVoucher.totalAmount.toLocaleString()}
                  </span>
                  <div className="text-[9px] text-gray-500 font-mono mt-1 flex items-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-500 mr-1" /> Verified 5-star Lodging Authorization
                  </div>
                </div>

                {/* Visually stunning native CSS Barcode */}
                <div className="flex flex-col items-center">
                  <div className="h-10 w-44 bg-transparent flex items-stretch space-x-[2px] opacity-75">
                    {/* Random beautiful barcodes lines using custom styled margins */}
                    {[1, 3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 1, 2, 3, 2, 1, 4, 2, 1, 3, 1, 4].map((width, i) => (
                      <div
                        key={i}
                        className="bg-white"
                        style={{ width: `${width}px` }}
                      ></div>
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-gray-500 tracking-[0.25em] uppercase mt-1">LV-{activeVoucher.refNo}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                id="invoice-print-btn"
                onClick={() => window.print()}
                className="bg-luxury-gray border border-white/10 hover:border-gold-400 text-white hover:text-gold-400 font-semibold font-mono text-xs uppercase tracking-widest px-6 py-3 rounded hover:bg-white/5 cursor-pointer flex items-center shrink-0"
              >
                <Printer className="w-4 h-4 mr-1.5" /> Print VIP Staying pass
              </button>
              
              <button
                id="invoice-whatsapp-btn"
                onClick={() => handleVoucherWhatsAppSend(activeVoucher)}
                className="bg-green-600 hover:bg-green-500 text-white font-semibold font-mono text-xs uppercase tracking-widest px-6 py-3 rounded cursor-pointer flex items-center shrink-0"
              >
                <Plane className="w-4 h-4 mr-1.5 shrink-0" /> Share to WhatsApp Manager
              </button>

              <button
                id="invoice-return-list-btn"
                onClick={() => {
                  setStep('list');
                  setActiveBookingRef(null);
                }}
                className="text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-white uppercase relative py-1 my-auto cursor-pointer"
              >
                Go to Dashboards List
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-400"></span>
              </button>
            </div>
            
          </div>
        )}

      </div>
    </section>
  );
}
