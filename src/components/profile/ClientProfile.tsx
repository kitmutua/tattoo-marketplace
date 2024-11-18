import React from 'react';
import { Calendar, Star, Clock, Camera, MapPin } from 'lucide-react';
import ReviewCard from './ReviewCard';

interface Booking {
  id: string;
  artistName: string;
  artistImage: string;
  date: string;
  status: 'completed' | 'upcoming' | 'cancelled';
  style?: string;
  review?: {
    rating: number;
    comment: string;
    date: string;
  };
}

interface ClientProfileProps {
  client: {
    name: string;
    email: string;
    joinDate: string;
    location?: string;
    profileImage?: string;
    bookings: Booking[];
  };
  isOwnProfile?: boolean;
}

export default function ClientProfile({ client, isOwnProfile = false }: ClientProfileProps) {
  const upcomingBookings = client.bookings.filter(b => b.status === 'upcoming');
  const pastBookings = client.bookings.filter(b => b.status === 'completed');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img
                src={client.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80'}
                alt={client.name}
                className="w-full h-full object-cover"
              />
            </div>
            {isOwnProfile && (
              <button className="absolute bottom-0 right-0 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-all">
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">{client.name}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <span>Member since {client.joinDate}</span>
              {client.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{client.location}</span>
                </div>
              )}
            </div>
            {isOwnProfile && (
              <button className="mt-4 text-electric-blue hover:underline">
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      {upcomingBookings.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-electric-blue" />
            Upcoming Appointments
          </h2>
          <div className="space-y-4">
            {upcomingBookings.map(booking => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={booking.artistImage}
                    alt={booking.artistName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{booking.artistName}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{booking.date}</span>
                      {booking.style && (
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                          {booking.style}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button className="text-red-500 hover:text-red-600 text-sm font-medium">
                  Cancel
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking History & Reviews */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-electric-blue" />
          Past Appointments & Reviews
        </h2>
        
        {pastBookings.length > 0 ? (
          <div className="space-y-6">
            {pastBookings.map(booking => (
              <div key={booking.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={booking.artistImage}
                      alt={booking.artistName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{booking.artistName}</h3>
                      <p className="text-sm text-gray-600">{booking.date}</p>
                    </div>
                  </div>
                  {!booking.review && isOwnProfile && (
                    <button className="text-electric-blue hover:underline text-sm font-medium">
                      Leave a Review
                    </button>
                  )}
                </div>
                
                {booking.review && (
                  <ReviewCard review={booking.review} />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">
            No past appointments yet
          </p>
        )}
      </div>
    </div>
  );
}