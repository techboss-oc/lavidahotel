export interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
}

export interface Room {
  id: string;
  name: string;
  type: 'Standard' | 'Deluxe' | 'Executive' | 'Presidential Suite';
  description: string;
  pricePerNight: number;
  capacity: number;
  image: string;
  images: string[];
  sqft: number;
  views: string;
  highlights: string[];
  amenities: string[];
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    rules: string[];
  };
  reviews: Review[];
}

export interface Booking {
  id: string;
  refNo: string;
  room: Room;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  status: 'Confirmed' | 'Checked Out' | 'Canceled';
  totalAmount: number;
  createdAt: string;
  nights: number;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Starters' | 'African Delicacies' | 'Continental' | 'Desserts' | 'Fine Cocktails & Wines';
  image: string;
  isPopular?: boolean;
  isSpicy?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  avatar: string;
  origin: string;
}

export interface GalleryItem {
  id: string;
  category: 'All' | 'Rooms' | 'Dining' | 'Exterior' | 'Lounge' | 'Events' | 'Wellness';
  image: string;
  title: string;
}

export interface Attraction {
  name: string;
  distance: string;
  category: string;
  description: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
}
