import React from 'react';
import { Camera, Award, Star, Instagram, Globe } from 'lucide-react';
import PortfolioGrid from './PortfolioGrid';
import VerificationBadge from '../safety/VerificationBadge';

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

interface ArtistProfileProps {
  artist: {
    id: string;
    name: string;
    bio: string;
    location: string;
    rating: number;
    specialty: string[];
    experience: string;
    verificationStatus: 'verified' | 'pending' | 'unverified';
    socialLinks: {
      instagram?: string;
      website?: string;
    };
    certificates: Certificate[];
    profileImage: string;
  };
  isOwnProfile?: boolean;
}

export default function ArtistProfile({ artist, isOwnProfile = false }: ArtistProfileProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="relative mb-6">
              <div className="aspect-square w-full rounded-xl overflow-hidden">
                <img
                  src={artist.profileImage}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {isOwnProfile && (
                <button className="absolute bottom-4 right-4 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-all">
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">{artist.name}</h1>
              <p className="text-gray-600 mb-4">{artist.bio}</p>
              <div className="flex items-center gap-2 mb-2">
                <VerificationBadge status={artist.verificationStatus} />
              </div>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-medium">{artist.rating}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {artist.specialty.map((style) => (
                    <span
                      key={style}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Experience</h3>
                <p className="text-gray-600">{artist.experience}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Certifications</h3>
                <div className="space-y-2">
                  {artist.certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg"
                    >
                      <Award className="w-5 h-5 text-electric-blue flex-shrink-0" />
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm text-gray-600">
                          {cert.issuer} • {cert.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Connect</h3>
                <div className="space-y-2">
                  {artist.socialLinks.instagram && (
                    <a
                      href={artist.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-black"
                    >
                      <Instagram className="w-5 h-5" />
                      <span>Instagram</span>
                    </a>
                  )}
                  {artist.socialLinks.website && (
                    <a
                      href={artist.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-black"
                    >
                      <Globe className="w-5 h-5" />
                      <span>Website</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Section */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Portfolio</h2>
              {isOwnProfile && (
                <button className="btn btn-primary">
                  Upload New Work
                </button>
              )}
            </div>
            <PortfolioGrid isOwnProfile={isOwnProfile} />
          </div>
        </div>
      </div>
    </div>
  );
}