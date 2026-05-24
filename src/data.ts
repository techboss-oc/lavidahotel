import { Room, MenuItem, Testimonial, GalleryItem, FAQItem, Attraction, BlogPost } from './types';

export const ROOMS_DATA: Room[] = [
  {
    id: 'standard-room',
    name: 'Lavida Classic Standard',
    type: 'Standard',
    description: 'Designed for the modern professional, our Classic Standard rooms merge absolute functionality with luxury comfort. Featuring a premium orthopedic queen bed, high-speed fiber-optic workspace, and an elegant marble-trimmed rain shower.',
    pricePerNight: 65000,
    capacity: 2,
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800'
    ],
    sqft: 320,
    views: 'Meticulously manicured internal gardens',
    highlights: ['Complimentary Continental Breakfast', 'Ultra High Speed Smart Workspace', 'Soft Linen Collection'],
    amenities: ['High-speed WiFi', '43" UHD Smart TV (DSTV & Netflix)', 'Whisper-Quiet Air Conditioning', 'Curated Premium Minibar', 'Digital In-room Safe', 'Plush Robes & Velvet Slippers', 'Bespoke Bath Accessories'],
    policies: {
      checkIn: '2:00 PM',
      checkOut: '12:00 PM',
      cancellation: 'Flexible structure: Free cancellation up to 24 hours prior to arrival dates.',
      rules: ['No smoking indoors (designated smoking areas apply)', 'Identification required upon registration', 'No pets allowed in general chambers']
    },
    reviews: [
      { id: '1', name: 'Amaka Chidi', date: 'May 10, 2026', rating: 5, comment: 'Exceeded expectation. Exceptionally quiet and super fast internet for my remote calls.' },
      { id: '2', name: 'Daniel Ademola', date: 'April 28, 2026', rating: 5, comment: 'Impeccable housekeeping. The linens smell of luxury.' }
    ]
  },
  {
    id: 'deluxe-suite',
    name: 'Lavida Signature Deluxe',
    type: 'Deluxe',
    description: 'Step into an oasis of expansive peace. The Signature Deluxe room contains custom handcrafted furnishings, a plush king-size velvet headboard bed, an extended dressing vanity, and curated African aesthetic details that speak of world-class indulgence.',
    pricePerNight: 110000,
    capacity: 2,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800'
    ],
    sqft: 450,
    views: 'Panoramic Port Harcourt residential sunrises',
    highlights: ['In-room Premium Coffee Station', 'Double Vanity Sinks', 'Plush Living Corner Sofa'],
    amenities: ['High-speed WiFi', '55" OLED Smart TV with Soundbar', 'Digital Dual-Zone Climate Controls', 'Fully Stocked Premium Minibar', 'Generous In-room Safe', 'Premium Toiletries', 'Plush Robes & Toiletry Kits'],
    policies: {
      checkIn: '2:00 PM',
      checkOut: '12:00 PM',
      cancellation: 'Standard structure: Cancel free of charge 48 hours prior to arrival.',
      rules: ['No smoking indoors', 'Maximum occupancy is 2 adults', 'Quiet hours observed between 11 PM - 7 AM']
    },
    reviews: [
      { id: 'd1', name: 'Kabiru Yusuf', date: 'May 18, 2026', rating: 5, comment: 'The lighting controls are pristine. The staff handled my late checkin exceptionally well.' },
      { id: 'd2', name: 'Evelyn Briggs', date: 'May 04, 2026', rating: 4.8, comment: 'Great bed, lovely view of the sunrise, and the breakfast buffet was wonderful.' }
    ]
  },
  {
    id: 'executive-suite',
    name: 'Lavida Ambassador Executive',
    type: 'Executive',
    description: 'The Ambassador Executive suite is tailored for high-profile business leaders and dignitaries requiring supreme spacing. It comprises a private separate living salon, dedicated dining-for-two cabinetry, automated drapes, and an exquisite marble bathroom with deep soaking tub.',
    pricePerNight: 180000,
    capacity: 3,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1507038772120-7bef736b477c?auto=format&fit=crop&q=80&w=800'
    ],
    sqft: 680,
    views: 'Serene rumuekini tropical garden pool lines',
    highlights: ['VIP Airport Reception & Transfers', 'Complimentary Gourmet Fruit Platters', 'Access to Executive Boardroom'],
    amenities: ['High-speed WiFi', '65" UHD Smart TV in Master & Living', 'Private Nespresso® Coffee Machine', 'Daily Fresh Flowers', 'Freestanding Deep Soaking Tub & Steam Shower', 'Luxury Salvatore Ferragamo® Bath Line', 'Evening Turn-Down Gifts'],
    policies: {
      checkIn: '2:00 PM',
      checkOut: '12:00 PM',
      cancellation: 'Premium structure: Cancel free up to 3 days prior. Late cancellations incur a 1-night fee.',
      rules: ['No smoking indoors', 'Maximum 3 guests', 'Parties or unapproved gatherings are prohibited']
    },
    reviews: [
      { id: 'e1', name: 'Chief Tari Douglas', date: 'May 20, 2026', rating: 5, comment: 'Stunning luxury. Port Harcourt finally has a hotel that genuinely understands 5-star operations.' },
      { id: 'e2', name: 'Dr. Sarah Lawson', date: 'May 14, 2026', rating: 5, comment: 'The executive study desk is phenomenal. Extremely secure property with top-tier security.' }
    ]
  },
  {
    id: 'presidential-suite',
    name: 'Lavida Imperial Presidential Suite',
    type: 'Presidential Suite',
    description: 'The crowning achievement of modern Niger Delta luxury. Unmatched in scale and prestige, the Imperial Presidential Suite hosts an colossal penthouse-style double living rotunda, a private bar with a sommelier cabinet, state-of-the-art dining room, an elite study, and a luxurious master spa lounge. Complete with a 24-hour dedicated premium butler.',
    pricePerNight: 350000,
    capacity: 4,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4db85b?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4db85b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800'
    ],
    sqft: 1450,
    views: 'Panoramic 360-degree majestic view of the Garden City horizon',
    highlights: ['24/7 Dedicated Private Butler', 'Private Chef Custom Curated Dining', 'Helipad Coordination & Bulletproof Chauffeur Service'],
    amenities: ['Military-Grade Encryption WiFi', '85" Neo-QLED Cinematic Screens', 'Custom Bang & Olufsen® Audio System', 'Private Wine Cellar & Elite Whiskey Bar', 'In-Suite Private Therapy Room', 'Oversized Marble Jacuzzi', 'Pillow Menu (Silk, Goose Down, Hypoallergenic)'],
    policies: {
      checkIn: 'Flexible (Coordinates directly with butler)',
      checkOut: 'Late Check-out allowed until 4:00 PM',
      cancellation: 'Inquire with Butler: Full refunds with 7-day notice.',
      rules: ['No smoking indoors', 'Full registration of state guests', 'Strict discretion and NDAs active if requested']
    },
    reviews: [
      { id: 'p1', name: 'Senator O. Nnamdi', date: 'May 19, 2026', rating: 5, comment: 'Unbelievably rich aesthetic. The private butler, Kelvin, was elite. Highly secured property and maximum privacy.' },
      { id: 'p2', name: 'Elena Rostova', date: 'April 02, 2026', rating: 5, comment: 'The finest room I have rented in West Africa. Absolute culinary masterpiece from the private chef.' }
    ]
  }
];

export const MENU_DATA: MenuItem[] = [
  {
    id: 'm1',
    name: 'Spiced Goat Meat Pepper Soup',
    price: 9500,
    description: 'An authentic Niger Delta staple. Potent, aromatic broth made of locally sourced premium goat meat slowly simmered with native spices, chili, scent leaves, and sweet utazi.',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400',
    isPopular: true,
    isSpicy: true
  },
  {
    id: 'm2',
    name: 'Crispy Calamari with Pepper Jelly',
    price: 11000,
    description: 'Tender ocean calamari dusted in seasoned tapioca flour, fried to golden excellence, served with an aromatic gold-chili jelly and fresh lime wedges.',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'm3',
    name: 'Lavida Grand Fisherman Soup',
    price: 24500,
    description: 'The Pride of Rivers State. A luxurious seafood melody containing freshly caught red snapper, jumbo tiger prawns, soft mud crabs, periwinkles, and fresh calamari in a rich cocoyam-thickened yellow pepper broth.',
    category: 'African Delicacies',
    image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&q=80&w=400',
    isPopular: true,
    isSpicy: true
  },
  {
    id: 'm4',
    name: 'Smoked Native Soup with Fresh Prawns',
    price: 18500,
    description: 'Freshly harvested sea snails, giant oysters, and prawns, simmered in a rich palm oil broth infused with premium crayfish, local native spices, and fresh uziza.',
    category: 'African Delicacies',
    image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&q=80&w=400',
    isSpicy: true
  },
  {
    id: 'm5',
    name: 'Grilled Ribeye with Truffle Herb Butter',
    price: 28000,
    description: 'Premium choice Ribeye steak aged 28 days, seared under a custom cast iron glaze, topped with rich black-truffle infused butter, served alongside rosemary-roasted fingerling potatoes.',
    category: 'Continental',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400',
    isPopular: true
  },
  {
    id: 'm6',
    name: 'Pan-Seared Scottish Salmon',
    price: 26000,
    description: 'Wild salmon fillet crisped on skin-side, paired with cream-whipped sweet parsnip puree, buttered asparagus spears, and a vibrant gold saffron burr-blanc sauce.',
    category: 'Continental',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'm7',
    name: 'Szechuan King Prawn Pasta',
    price: 19500,
    description: 'Handcrafted linguine tossed in a wok-charred sweet chili garlic sauce with jumbo tiger prawns, bell peppers, fresh bok choy, and garnished with toasted black sesame.',
    category: 'Continental',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'm8',
    name: 'Lavida Gold-Leaf Chocolate Sphere',
    price: 8500,
    description: 'An architectural dessert. A dark Belgian chocolate sphere covered in edible 24K gold leaf flakes. Tableside flambéed with hot wild-berry reduction to melt and reveal soft cognac ice cream.',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400',
    isPopular: true
  },
  {
    id: 'm9',
    name: 'Madagascar Vanilla Crème Brûlée',
    price: 7000,
    description: 'Perfectly baked rich egg yolk cream heavily flecked with raw vanilla bean seeds, finished under cane sugar blowtorch caramelization, served with physical raspberry beads.',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'm10',
    name: 'Sunset Rumuekini Fashioned',
    price: 9000,
    description: 'An elite hotel classic. High-rye bourbon aged and infused with toasted local cocoa nibs, bitters, a drop of Angostura, and expressed orange oils over an hand-carved ice sphere.',
    category: 'Fine Cocktails & Wines',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400',
    isPopular: true
  },
  {
    id: 'm11',
    name: 'The Golden Oasis Fizz',
    price: 8500,
    description: 'Our signature mocktail/cocktail. Premium prosecco, macerated golden pineapple purée, Nigerian garden key-lime juice, and finished with a delicate mist of organic jasmine essence.',
    category: 'Fine Cocktails & Wines',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g1', category: 'Exterior', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800', title: 'Grand Exterior Entrance' },
  { id: 'g2', category: 'Rooms', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4db85b?auto=format&fit=crop&q=80&w=800', title: 'Presidential Penthouse Living' },
  { id: 'g3', category: 'Dining', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800', title: 'Bespoke Private Fine Dining Room' },
  { id: 'g4', category: 'Lounge', image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80&w=800', title: 'Lavida Sanctuary Cigar & Cognac Lounge' },
  { id: 'g5', category: 'Wellness', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800', title: 'Therapeutic Massage Suites' },
  { id: 'g6', category: 'Events', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800', title: 'Lavida Grand Ballroom Banquet' },
  { id: 'g7', category: 'Rooms', image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800', title: 'The Deluxe Sunset View Suite' },
  { id: 'g8', category: 'Wellness', image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800', title: 'Championship Overflow Pool' },
  { id: 'g9', category: 'Dining', image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&q=80&w=800', title: 'Custom Fisherman Gourmet Presentation' }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    name: 'Engr. Nelson Weli',
    role: 'MD, Elixir Oil & Gas Ltd',
    review: 'Lavida Hotel is a sparkling gem in Port Harcourt. The extreme security, discrete hospitality, and outstanding local Fisherman Soup make every stay memorable. It feels like high-tier hotels in Geneva or Chelsea.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    origin: 'Port Harcourt, Nigeria'
  },
  {
    id: 't2',
    name: 'Dr. (Mrs) Cynthia Alali',
    role: 'Humanitarian Coordinator',
    review: 'Our non-profit held an elite three-day summit in the Lavida Grand Lounge. From state-of-the-art audiovisual setups to customized lunch courses, the professionalism was absolute. Stunning rooms with true comfort.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    origin: 'Abuja, Nigeria'
  },
  {
    id: 't3',
    name: 'Marcus Sterling',
    role: 'Head of Security & Logistics, Shell SPDC',
    review: 'Safety and fast connectivity are my top requirements when traveling through the Niger Delta. Lavida provides armed security, military-grade in-house WiFi, high-speed power back-ups, and luxury room styling. 10/10.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    origin: 'Houston, USA'
  },
  {
    id: 't4',
    name: 'Nneka Okoro-Ndu',
    role: 'Luxury Fashion Curator',
    review: 'Elegant. Immersive. Lavida Hotel masterfully honors architectural simplicity with premium rich gold accents. Highly recommend their Spa and standard massage treatments!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    origin: 'Lagos, Nigeria'
  }
];

export const IN_PH_ATTRACTIONS: Attraction[] = [
  {
    name: 'Port Harcourt Pleasure Park',
    distance: '7.8 km (approx. 12 mins)',
    category: 'Family Recreation & Nature',
    description: 'An architectural marvel of leisure featuring peaceful pedal boat lakes, scenic tropical flora walks, extreme climbing structures, and child play regions.',
    image: 'https://images.unsplash.com/photo-1513553404607-988bf2703777?auto=format&fit=crop&q=80&w=400'
  }   ,
  {
    name: 'Port Harcourt Golf Club',
    distance: '10.5 km (approx. 15 mins)',
    category: 'Elite Sports & Networking',
    description: 'A historic 18-hole championship gold course designed for diplomatic interactions, premier hospitality, and active relaxation in the heart of Rivers capital.',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'Bonny Island Ferry Jetty',
    distance: '14 mins',
    category: 'Water Travel & Logistics',
    description: 'Secure, dedicated modern wharf offering direct executive connections, water speed-taxis, and armored transit to Bonny Islands oil terminals.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=400'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Where exactly is Lavida Hotel located in Port Harcourt?',
    answer: 'Lavida Hotel is situated at No. 2 Sunrise Street, Off Rumuekini/Aluu Road, Port Harcourt, Rivers State, Nigeria. We are placed in a secure, serene environment away from heavy freeway noises, yet perfectly situated for quick access to the Port Harcourt airport and standard metropolitan business districts.',
    category: 'General Location'
  },
  {
    question: 'How do I coordinate airport pickups and dropoffs?',
    answer: 'Committed to complete hospitality, airport pickups inside armored vehicles with professional security personnel can be seamlessly booked during our Checkout flow, or direct coordinates can be fast-tracked by emailing Info@lavidahotel.com.ng or dialing 0808 265 2863.',
    category: 'Transport & VIP'
  },
  {
    question: 'Is power supply and high-speed internet truly 24/7?',
    answer: 'Absolutely. True luxury requires complete consistency. Lavida Hotel runs a synchronized high-capacity soundproof generator system grid backed by state-of-the-art hybrid industrial solar storage units. Fiber-optic internet arrays run on multiple independent ISPs to ensure seamless connection redundant fallback.',
    category: 'Services & Amenities'
  },
  {
    question: 'What are your Check-in and Check-out schedules and rules?',
    answer: 'Standard check-in begins at 2:00 PM and check-out is strictly until 12:00 PM. Early check-in or late checkout schedules are subject to availability and can be unlocked, particularly for Executive Room and Presidential Suite guests.',
    category: 'Policies'
  },
  {
    question: 'Does the hotel accept payment options like international credit cards or bank transfers?',
    answer: 'Yes. We cater to an elite international and local client list. We support all major Nigerian bank transfers, Nigerian debit cards, Visa/Mastercard processing, and direct checkout validation. Foreign exchange settlements can also be coordinated directly with the reception desk.',
    category: 'Payments'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post1',
    title: 'The Art of Nigerian High-End Hospitality: Inside Lavida Design',
    summary: 'A look into how Lavida Hotel merges international luxury standards with deep Rivers State roots to craft an unparalleled guest experience.',
    content: 'Luxury hospitality is not merely about importing Italian marble; it is about local warmth, safety, consistency, and culinary mastery. At Lavida Hotel, our design philosophy honors simplicity, natural lighting, and elite African craftsmanship. Here is the story behind our spaces.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=500',
    date: 'May 15, 2026',
    category: 'Design & Culture',
    readTime: '4 min read'
  },
  {
    id: 'post2',
    title: 'Gourmet Travel: The Secret to the Perfect Rivers Fisherman Soup',
    summary: 'Executive Chef of Lavida, Chef Tonye, shares standard guidelines that make our Fisherman soup the most prestigious dish in the Niger Delta.',
    content: 'Rivers State Fisherman Soup has evolved from a rich delta boatman meal to an internationally acclaimed fine-dining masterpiece. The secret lies in fresh yellow yellow-peppers, cocoyam starch, native scent leaves, and cooking sea-bugs slowly over exact thermal points. Taste the authentic plate at our Restaurant & bar.',
    image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&q=80&w=500',
    date: 'April 20, 2026',
    category: 'Gastronomy',
    readTime: '6 min read'
  }
];
