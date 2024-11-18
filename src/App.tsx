import React, { useState } from 'react';
import { Search, Palette, Zap, Sparkles, Calendar } from 'lucide-react';
import ArtistCard from './components/ArtistCard';
import BookingModal from './components/BookingModal';
import ArtistProfile from './components/profile/ArtistProfile';
import { mockArtists, mockTimeSlots } from './data/mockData';
import type { Artist } from './types';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  const filteredArtists = React.useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return mockArtists;

    return mockArtists.filter(artist => 
      artist.name.toLowerCase().includes(query) ||
      artist.location.toLowerCase().includes(query) ||
      artist.specialty.some(style => style.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const handleBooking = (artistId: string) => {
    const artist = mockArtists.find(a => a.id === artistId);
    if (artist) {
      setSelectedArtist(artist);
      setIsModalOpen(true);
    }
  };

  const handleArtistClick = (artist: Artist) => {
    setSelectedArtist(artist);
    setShowProfile(true);
  };

  if (showProfile && selectedArtist) {
    return (
      <div>
        <button 
          onClick={() => setShowProfile(false)}
          className="fixed top-4 left-4 z-50 bg-deep-purple text-white px-6 py-3 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-x-1"
        >
          ✧ Explore More Artists
        </button>
        <ArtistProfile 
          artist={{
            ...selectedArtist,
            experience: '8+ years',
            socialLinks: {
              instagram: 'https://instagram.com/artist',
              website: 'https://artist-portfolio.com'
            },
            certificates: [
              {
                id: '1',
                name: 'Bloodborne Pathogens',
                issuer: 'Health & Safety Institute',
                date: '2023'
              },
              {
                id: '2',
                name: 'Advanced Color Theory',
                issuer: 'Tattoo Academy',
                date: '2022'
              }
            ],
            profileImage: selectedArtist.imageUrl,
            studioLocation: {
              address: '123 Ink Street, Suite 4B',
              city: 'New York',
              state: 'NY',
              zip: '10001',
              coordinates: {
                lat: 40.7128,
                lng: -74.0060
              }
            },
            hours: {
              monday: '10:00 AM - 6:00 PM',
              tuesday: '10:00 AM - 6:00 PM',
              wednesday: '10:00 AM - 6:00 PM',
              thursday: '12:00 PM - 8:00 PM',
              friday: '12:00 PM - 8:00 PM',
              saturday: '11:00 AM - 5:00 PM',
              sunday: 'Closed'
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <header className="bg-deep-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-coral-pink" />
              <span className="text-2xl font-display">InkMatch</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="hover:text-coral-pink transition-colors">Artists</a>
              <a href="#" className="hover:text-coral-pink transition-colors">Styles</a>
              <a href="#" className="hover:text-coral-pink transition-colors">How it Works</a>
              <button className="btn btn-secondary">
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-deep-purple text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-electric-blue to-coral-pink opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 gradient-text animate-float">
              Find Your Perfect Tattoo Artist
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Connect with top-rated artists, book consultations, and bring your vision to life
            </p>
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by style, location, or artist name..."
                className="w-full px-6 py-4 rounded-full text-deep-purple focus:outline-none focus:ring-2 focus:ring-electric-blue transition-all duration-300"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-deep-purple w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-8 rounded-2xl bg-off-white hover:shadow-xl transition-all duration-300">
              <Palette className="w-12 h-12 mx-auto mb-4 text-electric-blue" />
              <h3 className="text-xl font-display font-semibold mb-2">Curated Artists</h3>
              <p className="text-gray-600">Browse through our handpicked selection of talented tattoo artists</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-off-white hover:shadow-xl transition-all duration-300">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-coral-pink" />
              <h3 className="text-xl font-display font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Schedule consultations and appointments with just a few clicks</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-off-white hover:shadow-xl transition-all duration-300">
              <Zap className="w-12 h-12 mx-auto mb-4 text-electric-blue" />
              <h3 className="text-xl font-display font-semibold mb-2">Secure Platform</h3>
              <p className="text-gray-600">Safe and secure payments with buyer protection</p>
            </div>
          </div>
        </div>
      </div>

      {/* Artist Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-display font-bold mb-12 gradient-text">Featured Artists</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtists.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              onBooking={handleBooking}
              onClick={() => handleArtistClick(artist)}
            />
          ))}
          {filteredArtists.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No artists found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedArtist && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          artistName={selectedArtist.name}
          availableSlots={mockTimeSlots.filter(slot => slot.artistId === selectedArtist.id)}
        />
      )}
    </div>
  );
}

export default App;