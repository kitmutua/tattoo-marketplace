import React from 'react';
import { Star, MapPin, Calendar } from 'lucide-react';
import type { Artist } from '../types';
import VerificationBadge from './safety/VerificationBadge';

interface ArtistCardProps {
  artist: Artist;
  onBooking: (artistId: string) => void;
  onClick: () => void;
}

export default function ArtistCard({ artist, onBooking, onClick }: ArtistCardProps) {
  const handleBookingClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBooking(artist.id);
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer"
    >
      <div className="relative h-64">
        <img
          src={artist.imageUrl}
          alt={artist.name}
          className="w-full h-full object-cover"
        />
        {artist.available && (
          <span className="absolute top-4 right-4 bg-electric-blue text-white px-3 py-1 rounded-full text-sm">
            Available
          </span>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-display font-bold text-deep-purple">{artist.name}</h3>
            <div className="flex items-center mt-1">
              <MapPin className="w-4 h-4 text-coral-pink mr-1" />
              <span className="text-gray-600 text-sm">{artist.location}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="ml-1 font-semibold">{artist.rating}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {artist.specialty.map((spec) => (
              <span
                key={spec}
                className="bg-off-white text-deep-purple px-3 py-1 rounded-full text-sm font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <VerificationBadge status={artist.verificationStatus} />
        </div>
        
        <p className="text-gray-600 mb-6 line-clamp-2">{artist.bio}</p>
        
        <button
          onClick={handleBookingClick}
          className="btn btn-primary w-full flex items-center justify-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          Book Consultation
        </button>
      </div>
    </div>
  );
}