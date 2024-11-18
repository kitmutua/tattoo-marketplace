import React, { useState } from 'react';
import { Play, Heart, Trash2, Edit3 } from 'lucide-react';

interface PortfolioItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
  likes: number;
  style: string;
  date: string;
}

// Mock data for demonstration
const mockPortfolio: PortfolioItem[] = [
  {
    id: '1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366',
    title: 'Japanese Dragon',
    likes: 124,
    style: 'Japanese',
    date: '2024-03-15'
  },
  {
    id: '2',
    type: 'video',
    url: 'https://example.com/video1.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6',
    title: 'Minimalist Line Work',
    likes: 89,
    style: 'Minimalist',
    date: '2024-03-10'
  },
  {
    id: '3',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1590246814883-57767a2e08de',
    title: 'Geometric Wolf',
    likes: 156,
    style: 'Geometric',
    date: '2024-03-05'
  }
];

interface PortfolioGridProps {
  isOwnProfile?: boolean;
}

export default function PortfolioGrid({ isOwnProfile = false }: PortfolioGridProps) {
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const styles = ['all', ...new Set(mockPortfolio.map(item => item.style))];

  const filteredItems = mockPortfolio.filter(
    item => selectedStyle === 'all' || item.style === selectedStyle
  );

  return (
    <div>
      {/* Style Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {styles.map(style => (
          <button
            key={style}
            onClick={() => setSelectedStyle(style)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              selectedStyle === style
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {style.charAt(0).toUpperCase() + style.slice(1)}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <div key={item.id} className="group relative">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              {item.type === 'video' ? (
                <div className="relative">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
              ) : (
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="text-white text-center p-4">
                <h3 className="font-medium mb-2">{item.title}</h3>
                <div className="flex items-center justify-center gap-4">
                  <button className="p-2 hover:text-coral-pink transition-colors">
                    <Heart className="w-6 h-6" />
                  </button>
                  {isOwnProfile && (
                    <>
                      <button className="p-2 hover:text-electric-blue transition-colors">
                        <Edit3 className="w-6 h-6" />
                      </button>
                      <button className="p-2 hover:text-red-500 transition-colors">
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Info Bar */}
            <div className="mt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{item.title}</span>
                <div className="flex items-center gap-1 text-gray-600">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{item.likes}</span>
                </div>
              </div>
              <span className="text-sm text-gray-500">{item.style}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}