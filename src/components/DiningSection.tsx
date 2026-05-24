import React, { useState } from 'react';
import { ChefHat, ShoppingBag, Send, CreditCard, ChevronRight, Check, Plus, Minus, Trash2, ShieldCheck, GlassWater, Flame } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_DATA } from '../data';

interface DiningSectionProps {
  onNotifyMessage?: (msg: string) => void;
}

export default function DiningSection({ onNotifyMessage }: DiningSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Custom Takeaway Cart state
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');

  // Table reservation form state
  const [resName, setResName] = useState('');
  const [resGuests, setResGuests] = useState(2);
  const [resDate, setResDate] = useState('');
  const [resTime, setResTime] = useState('19:00');
  const [resNotes, setResNotes] = useState('');
  const [resConfirmedCode, setResConfirmedCode] = useState<string | null>(null);

  const categories = ['All', 'Starters', 'African Delicacies', 'Continental', 'Desserts', 'Fine Cocktails & Wines'];

  const filteredMenu = activeCategory === 'All'
    ? MENU_DATA
    : MENU_DATA.filter(item => item.category === activeCategory);

  // Cart operations
  const handleAddToCart = (item: MenuItem) => {
    const existing = cart.find(cartItem => cartItem.item.id === item.id);
    if (existing) {
      setCart(cart.map(cartItem => 
        cartItem.item.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { item, quantity: 1 }]);
    }
    setCartOpen(true);
    if (onNotifyMessage) {
      onNotifyMessage(`Added ${item.name} to takeaway wishlist!`);
    }
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(cart.map(cartItem => {
      if (cartItem.item.id === id) {
        const qty = cartItem.quantity + delta;
        return qty > 0 ? { ...cartItem, quantity: qty } : null;
      }
      return cartItem;
    }).filter(Boolean) as { item: MenuItem; quantity: number }[]);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter(cartItem => cartItem.item.id !== id));
  };

  const cartTotal = cart.reduce((acc, curr) => acc + (curr.item.price * curr.quantity), 0);

  // WhatsApp Takeaway order builder
  const handleCheckoutViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    // Format text
    let orderLines = cart.map(cartItem => 
      `• ${cartItem.quantity} x ${cartItem.item.name} (₦${(cartItem.item.price * cartItem.quantity).toLocaleString()})`
    ).join('\n');

    const message = `Hello Lavida Hotel Restaurant & Takeaway, I would like to place a luxury food takeaway order:\n\n${orderLines}\n\n🏷️ Total Subtotal: ₦${cartTotal.toLocaleString()}\n📍 Client Name: ${buyerName || 'Valued Guest'}\n📝 Special Preparation Notes: ${deliveryNote || 'None'}\n\nPlease prepare and confirm collection time window!`;
    
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/2348082652863?text=${encoded}`;
    
    window.open(whatsappUrl, '_blank');
  };

  // Table reservation engine
  const handleTableReserve = (e: React.FormEvent) => {
    e.preventDefault();
    const mockRef = `LVD-TBL-${Math.floor(10000 + Math.random() * 90000)}`;
    setResConfirmedCode(mockRef);
  };

  const resetTableForm = () => {
    setResName('');
    setResGuests(2);
    setResDate('');
    setResTime('19:00');
    setResNotes('');
    setResConfirmedCode(null);
  };

  return (
    <section className="py-24 bg-luxury-charcoal text-white relative" id="dining-section">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Visual Introduction and Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-left">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-gold-400 font-semibold mb-2 block animate-pulse">
              GASTRONOMIC HEAVEN
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-6">
              The Fine Dining & Lounge Experience
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
              Lavidas culinary ecosystem is curated by highly decorated master chefs, showcasing a dramatic synergy of fresh Rivers State seafood bounty and five-star continental steakhouse presentations.
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
              Indulge in our dining salon, coordinate private lounge cocktail pairings, or order custom delicacies right to your penthouse chamber or Port Harcourt workstation.
            </p>
          </div>

          <div className="h-64 sm:h-80 rounded-xl overflow-hidden border border-gold-500/10 shadow-2xl relative group">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200"
              alt="Lavida Dining Atmosphere"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-left">
              <span className="text-[9px] font-mono tracking-widest text-gold-400 uppercase">CULINARY STYLING</span>
              <h4 className="font-serif text-lg font-semibold text-white">The Ornate Grand Dining Salon</h4>
            </div>
          </div>
        </div>

        {/* Categories Tab Controllers */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-12 border-b border-white/5 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`menu-cat-${cat.toLowerCase().replace(' ', '-')}`}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs uppercase tracking-widest font-mono py-2 px-4 border rounded transition cursor-pointer ${
                activeCategory === cat
                  ? 'border-gold-400 text-gold-400 bg-gold-400/[0.04]'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dual Layout: Menu grid and Takeaway sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Menu Grid Area (8 Columns or 12 if cart minimized) */}
          <div className={`${cart.length > 0 || cartOpen ? 'lg:col-span-8' : 'lg:col-span-12'} transition-all duration-300 grid grid-cols-1 sm:grid-cols-2 gap-6`} id="menu-items-grid">
            {filteredMenu.map((item) => (
              <div
                key={item.id}
                id={`menu-item-${item.id}`}
                className="bg-luxury-black/60 rounded-xl overflow-hidden border border-white/5 hover:border-gold-500/20 transition-all duration-300 flex flex-col group relative"
              >
                {/* Thumb preview */}
                <div className="h-44 sm:h-48 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* spicy/popular badges overlay */}
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {item.isPopular && (
                      <span className="bg-gold-500 text-luxury-black text-[8px] font-bold tracking-widest uppercase py-0.5 px-2 rounded-full font-mono">
                        Chef Bestow
                      </span>
                    )}
                    {item.isSpicy && (
                      <span className="bg-red-600 text-white text-[8px] font-bold tracking-widest uppercase py-0.5 px-2 rounded-full font-mono flex items-center">
                        <Flame className="w-2.5 h-2.5 mr-0.5 fill-white" /> Spicy Accents
                      </span>
                    )}
                  </div>
                </div>

                {/* Content specifications */}
                <div className="p-5 flex-grow flex flex-col justify-between text-left">
                  <div>
                    <span className="text-[8px] font-mono tracking-widest uppercase text-gray-500 block mb-1">{item.category}</span>
                    <h3 className="font-serif text-base sm:text-lg font-semibold text-white group-hover:text-gold-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed mt-2 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-3.5 mt-2 flex items-center justify-between">
                    <span className="font-mono text-sm sm:text-base font-bold text-gold-400">
                      ₦{item.price.toLocaleString()}
                    </span>
                    <button
                      id={`add-cart-btn-${item.id}`}
                      onClick={() => handleAddToCart(item)}
                      className="bg-luxury-gray/80 hover:bg-gold-500 border border-gold-500/10 hover:text-luxury-black text-gold-400 font-mono text-[9px] font-semibold tracking-widest uppercase py-2 px-4 rounded transition active:scale-95 cursor-pointer"
                    >
                      Bespoke Takeaway
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Interactive Takeaway Cart Sidebar (4 Columns when active) */}
          {(cart.length > 0 || cartOpen) && (
            <div id="takeaway-cart-panel" className="lg:col-span-4 bg-luxury-black border border-gold-500/20 rounded-xl p-5 sm:p-6 shadow-2xl h-fit sticky top-24 max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <h3 className="font-serif text-lg font-semibold flex items-center text-white">
                  <ShoppingBag className="w-5 h-5 text-gold-400 mr-2" /> Takeaway Wishlist
                </h3>
                <button
                  id="close-cart-btn"
                  onClick={() => setCart([])}
                  className="text-gray-400 hover:text-white text-xs font-mono cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="py-12 text-center">
                  <ChefHat className="w-10 h-10 text-gray-600 mx-auto mb-3 animate-pulse" />
                  <p className="text-gray-400 text-xs">Select custom recipes or drinks to construct your luxury checkout details.</p>
                </div>
              ) : (
                <div className="mt-4 flex flex-col justify-between">
                  {/* List of items */}
                  <div className="space-y-4 pr-1 max-h-56 overflow-y-auto scrollbar-thin">
                    {cart.map((cartItem) => (
                      <div key={cartItem.item.id} className="flex justify-between items-start text-left text-xs text-gray-300">
                        <div className="flex-grow max-w-xs pr-2">
                          <h4 className="font-semibold text-white">{cartItem.item.name}</h4>
                          <span className="text-gold-400/90 font-mono text-[11px]">₦{cartItem.item.price.toLocaleString()}</span>
                        </div>

                        {/* quantity adjustments */}
                        <div className="flex items-center space-x-1 border border-white/5 rounded p-1 shrink-0 bg-luxury-gray/20">
                          <button
                            id={`decrease-item-${cartItem.item.id}`}
                            onClick={() => handleUpdateQuantity(cartItem.item.id, -1)}
                            className="p-1 hover:text-gold-400 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono px-1 font-bold text-xs text-white">{cartItem.quantity}</span>
                          <button
                            id={`increase-item-${cartItem.item.id}`}
                            onClick={() => handleUpdateQuantity(cartItem.item.id, 1)}
                            className="p-1 hover:text-gold-400 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            id={`remove-item-${cartItem.item.id}`}
                            onClick={() => handleRemoveFromCart(cartItem.item.id)}
                            className="p-1 hover:text-red-500 pl-1 ml-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Subtotal */}
                  <div className="border-t border-white/5 pt-4 mt-4 text-left">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs uppercase font-mono tracking-wider text-gray-400">Order Subtotal:</span>
                      <span className="font-mono text-base font-bold text-gold-400">₦{cartTotal.toLocaleString()}</span>
                    </div>

                    {/* Form details to bind to checkout text */}
                    <form onSubmit={handleCheckoutViaWhatsApp} className="space-y-3" id="takeaway-client-form">
                      <div>
                        <input
                          type="text"
                          placeholder="Your Name (E.g. Chief Aliyu)"
                          value={buyerName}
                          onChange={(e) => setBuyerName(e.target.value)}
                          className="w-full bg-luxury-gray/40 border border-white/10 rounded p-2 text-xs focus:outline-none focus:border-gold-400"
                          required
                        />
                      </div>
                      <div>
                        <textarea
                          placeholder="Preparation notes (e.g. Extra spicy Fisherman bowl, scent leaves separate...)"
                          value={deliveryNote}
                          onChange={(e) => setDeliveryNote(e.target.value)}
                          className="w-full bg-luxury-gray/40 border border-white/10 rounded p-2 text-xs h-16 focus:outline-none focus:border-gold-400"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white font-bold text-xs uppercase tracking-widest py-3 rounded shadow transition-all duration-300 flex items-center justify-center space-x-1.5 active:scale-95 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5 fill-white" />
                        <span>Order via WhatsApp Direct</span>
                      </button>
                      <span className="block text-[8px] font-mono text-center text-gray-500 tracking-wider">Fast takeaway delivery or pickup coordination</span>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* ELEGANT TABLE RESERVATION FORM MODULE */}
        <div className="mt-28 bg-luxury-black p-8 sm:p-12 rounded-xl border border-gold-500/20 max-w-4xl mx-auto text-left shadow-2xl relative overflow-hidden" id="table-reservation-container">
          
          {/* Subtle design element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 blur-3xl rounded-full"></div>

          {resConfirmedCode ? (
            <div id="table-success-card" className="text-center py-6 animate-fade-in">
              <div className="p-3 bg-gold-500 text-luxury-black rounded-full max-w-max mx-auto mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-2 text-white">Fine Table Confirmed</h3>
              <p className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-6">
                Your luxury dining parameters are recorded. Your master host is standing by under appointment reference code:
              </p>
              <div className="inline-flex items-center space-x-2 bg-luxury-gray border border-gold-500/30 font-mono text-gold-400 text-lg font-bold px-6 py-2.5 rounded mb-8">
                <span>{resConfirmedCode}</span>
              </div>
              <div>
                <button
                  id="reset-table-form-btn"
                  onClick={resetTableForm}
                  className="text-xs tracking-widest font-mono text-gray-400 hover:text-white uppercase relative py-1 cursor-pointer"
                >
                  Book Another Table
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-400"></span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleTableReserve} className="space-y-6" id="table-reserve-form">
              <div className="text-center md:text-left mb-6 border-b border-white/5 pb-4">
                <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-gold-400 font-semibold mb-1 block">SELECT PRIVATE TABLES</span>
                <h3 className="font-serif text-2xl font-bold text-white">Indulge in Tableside Gastronomy</h3>
                <p className="text-gray-400 text-xs mt-1">Book fine-dining appointments inside our Private Salon, Wine Deck, or Cigar Bar.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Host name */}
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] tracking-widest uppercase text-gold-300 font-mono">Diner Name</label>
                  <input
                    type="text"
                    value={resName}
                    onChange={(e) => setResName(e.target.value)}
                    placeholder="E.g. Senator Chidi"
                    className="bg-luxury-gray border border-white/10 rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold-400"
                    required
                  />
                </div>

                {/* Counts */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] tracking-widest uppercase text-gold-300 font-mono">Guests Count</label>
                    <select
                      value={resGuests}
                      onChange={(e) => setResGuests(Number(e.target.value))}
                      className="bg-luxury-gray border border-white/10 rounded px-2 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
                    >
                      {[2, 4, 6, 8].map(cnt => (
                        <option key={cnt} value={cnt}>{cnt} Diners</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] tracking-widest uppercase text-gold-300 font-mono">Wine Selection</label>
                    <select className="bg-luxury-gray border border-white/10 rounded px-2 py-2.5 text-xs text-white focus:outline-none cursor-pointer">
                      <option className="bg-luxury-gray">No Wine pairing</option>
                      <option className="bg-luxury-gray">Red Cabernet</option>
                      <option className="bg-luxury-gray">Champagne Flambé</option>
                      <option className="bg-luxury-gray">Single Malt Scotch</option>
                    </select>
                  </div>
                </div>

                {/* Date/Time picker */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] tracking-widest uppercase text-gold-300 font-mono">Dinner Date</label>
                    <input
                      type="date"
                      value={resDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setResDate(e.target.value)}
                      className="bg-luxury-gray border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-gold-400 font-sans"
                      required
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] tracking-widest uppercase text-gold-300 font-mono">Arrival Time</label>
                    <select
                      value={resTime}
                      onChange={(e) => setResTime(e.target.value)}
                      className="bg-luxury-gray border border-white/10 rounded px-2 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
                    >
                      {['12:00', '14:00', '18:00', '19:30', '21:00'].map(t => (
                        <option key={t} value={t}>{t} Hours</option>
                      ))}
                    </select>
                  </div>
                </div>

              </div>

              {/* Special instructions */}
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] tracking-widest uppercase text-gold-300 font-mono">Special Seating Request</label>
                <textarea
                  value={resNotes}
                  onChange={(e) => setResNotes(e.target.value)}
                  placeholder="E.g. Glass patio seating, champagne upon arrival, allergen attention..."
                  className="bg-luxury-gray border border-white/10 rounded p-3 h-20 text-xs text-white focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-white/5 flex-wrap gap-y-3">
                <span className="flex items-center text-[10px] font-mono text-gray-500 tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-500 mr-1.5" /> Appointments held valid for up to 20 minutes delay
                </span>
                <button
                  type="submit"
                  id="table-reserve-submit-cta"
                  className="bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-luxury-black font-semibold text-xs uppercase tracking-widest py-3 px-8 rounded shadow transition-all cursor-pointer"
                >
                  Reserve Royal Table
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </section>
  );
}
