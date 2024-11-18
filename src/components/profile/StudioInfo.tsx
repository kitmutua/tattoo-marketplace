import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import type { StudioLocation, BusinessHours } from '../../types';
import Map from 'react-map-gl';

interface StudioInfoProps {
  location: StudioLocation;
  hours: BusinessHours;
}

export default function StudioInfo({ location, hours }: StudioInfoProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Location Info */}
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-coral-pink" />
            Studio Location
          </h3>
          <div className="mb-4">
            <p className="text-gray-800">{location.address}</p>
            <p className="text-gray-800">{location.city}, {location.state} {location.zip}</p>
          </div>
          <div className="h-48 rounded-lg overflow-hidden">
            <Map
              initialViewState={{
                longitude: location.coordinates.lng,
                latitude: location.coordinates.lat,
                zoom: 14
              }}
              style={{ width: '100%', height: '100%' }}
              mapStyle="mapbox://styles/mapbox/light-v11"
              mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
            />
          </div>
        </div>

        {/* Hours */}
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-electric-blue" />
            Studio Hours
          </h3>
          <div className="space-y-2">
            {Object.entries(hours).map(([day, time]) => (
              <div
                key={day}
                className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
              >
                <span className="capitalize text-gray-700">
                  {day}
                </span>
                <span className={`font-medium ${
                  time === 'Closed' ? 'text-coral-pink' : 'text-gray-900'
                }`}>
                  {time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}