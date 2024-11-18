import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import type { Artist } from '../../types';

interface ArtistMapProps {
  artists: Artist[];
  onArtistSelect: (artist: Artist) => void;
}

export default function ArtistMap({ artists, onArtistSelect }: ArtistMapProps) {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [viewState, setViewState] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
    zoom: 11
  });

  return (
    <div className="h-[500px] rounded-xl overflow-hidden">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      >
        {artists.map(artist => (
          <Marker
            key={artist.id}
            latitude={parseFloat(artist.latitude)}
            longitude={parseFloat(artist.longitude)}
          >
            <button
              onClick={() => {
                setSelectedArtist(artist);
                onArtistSelect(artist);
              }}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <MapPin className="w-6 h-6" />
            </button>
          </Marker>
        ))}

        {selectedArtist && (
          <Popup
            latitude={parseFloat(selectedArtist.latitude)}
            longitude={parseFloat(selectedArtist.longitude)}
            onClose={() => setSelectedArtist(null)}
            closeButton={true}
            closeOnClick={false}
            anchor="bottom"
          >
            <div className="p-2">
              <h3 className="font-semibold">{selectedArtist.name}</h3>
              <p className="text-sm text-gray-600">{selectedArtist.location}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}