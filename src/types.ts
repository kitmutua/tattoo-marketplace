export interface Artist {
  id: string;
  name: string;
  specialty: string[];
  location: string;
  rating: number;
  imageUrl: string;
  bio: string;
  available: boolean;
  latitude: string;
  longitude: string;
  verificationStatus: 'verified' | 'pending' | 'unverified';
  experience?: string;
  socialLinks?: {
    instagram?: string;
    website?: string;
  };
  certificates?: Certificate[];
  studioLocation?: StudioLocation;
  hours?: BusinessHours;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface StudioLocation {
  address: string;
  city: string;
  state: string;
  zip: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface TimeSlot {
  id: string;
  artistId: string;
  date: string;
  time: string;
  available: boolean;
}

export interface TattooDesign {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  artist: {
    name: string;
  };
  style: string;
  likes: number;
}

export interface SafetyArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  lastUpdated: string;
}