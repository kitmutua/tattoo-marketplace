import type { Artist, TimeSlot } from '../types';

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'Alex Rivers',
    specialty: ['Traditional', 'Japanese'],
    location: 'New York, NY',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80',
    bio: 'Specializing in Japanese and traditional tattoo styles with over 10 years of experience.',
    available: true,
    latitude: '40.7128',
    longitude: '-74.0060',
    verificationStatus: 'verified'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    specialty: ['Minimalist', 'Fine Line'],
    location: 'Los Angeles, CA',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80',
    bio: 'Known for delicate fine line work and minimalist designs. Creating meaningful pieces since 2015.',
    available: true,
    latitude: '34.0522',
    longitude: '-118.2437',
    verificationStatus: 'verified'
  },
  {
    id: '3',
    name: 'Marcus Black',
    specialty: ['Black Work', 'Geometric'],
    location: 'Miami, FL',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1590246814883-57767a2e08de?auto=format&fit=crop&q=80',
    bio: 'Pushing boundaries with bold geometric designs and intricate black work patterns.',
    available: true,
    latitude: '25.7617',
    longitude: '-80.1918',
    verificationStatus: 'verified'
  },
  {
    id: '4',
    name: 'Luna Ramirez',
    specialty: ['Watercolor', 'Neo-Traditional'],
    location: 'Austin, TX',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80',
    bio: 'Bringing vibrant watercolor tattoos to life with a modern twist on traditional styles.',
    available: false,
    latitude: '30.2672',
    longitude: '-97.7431',
    verificationStatus: 'verified'
  },
  {
    id: '5',
    name: 'Kai Yoshida',
    specialty: ['Irezumi', 'Contemporary'],
    location: 'Seattle, WA',
    rating: 4.95,
    imageUrl: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&q=80',
    bio: 'Master of traditional Japanese Irezumi with a contemporary approach. 15+ years of experience.',
    available: true,
    latitude: '47.6062',
    longitude: '-122.3321',
    verificationStatus: 'verified'
  },
  {
    id: "6",
    name: "Ava Ramirez",
    specialty: ["Blackwork", "Geometric"],
    location: "Austin, TX",
    rating: 4.87,
    imageUrl: "https://images.unsplash.com/photo-1556742400-b5dd97451582?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDd8fHRhdHRvb3xlbnwwfHx8fDE2ODExMTk4ODU&ixlib=rb-4.0.3&q=80&w=400",
    bio: "Creative artist specializing in minimalist blackwork and geometric patterns. 8+ years in the industry.",
    available: true,
    latitude: "30.2672",
    longitude: "-97.7431",
    verificationStatus: "verified"
  },
  {
    id: "7",
    name: "Liam Chen",
    specialty: ["Traditional", "New School"],
    location: "Los Angeles, CA",
    rating: 4.92,
    imageUrl: "https://images.unsplash.com/photo-1533199985052-6bda08cc3a42?auto=format&fit=crop&q=80",
    bio: "Expert in traditional Americana and vibrant New School designs. Known for bold lines and colors.",
    available: false,
    latitude: "34.0522",
    longitude: "-118.2437",
    verificationStatus: "pending"
  }
];

export const mockTimeSlots: TimeSlot[] = [
  { id: '1', artistId: '1', date: 'Mon, Mar 25', time: '10:00 AM', available: true },
  { id: '2', artistId: '1', date: 'Mon, Mar 25', time: '2:00 PM', available: true },
  { id: '3', artistId: '1', date: 'Tue, Mar 26', time: '11:00 AM', available: true },
  { id: '4', artistId: '2', date: 'Wed, Mar 27', time: '1:00 PM', available: true },
  { id: '5', artistId: '3', date: 'Thu, Mar 28', time: '3:00 PM', available: true },
  { id: '6', artistId: '5', date: 'Fri, Mar 29', time: '11:00 AM', available: true }
];