import React from 'react';
import { Grid, Image as ImageIcon } from 'lucide-react';
import type { TattooDesign } from '../../types';

// Mock data for frontend-only deployment
const mockDesigns: TattooDesign[] = [
  {
    id: '1',
    title: 'Japanese Dragon',
    imageUrl: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366',
    price: 450,
    artist: { name: 'Alex Rivers' },
    style: 'Japanese',
    likes: 124
  },
  {
    id: '2',
    title: 'Minimalist Wave',
    imageUrl: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6',
    price: 280,
    artist: { name: 'Sarah Chen' },
    style: 'Minimalist',
    likes: 89
  },
  {
    id: '3',
    title: 'Geometric Wolf',
    imageUrl: 'https://images.unsplash.com/photo-1590246814883-57767a2e08de',
    price: 350,
    artist: { name: 'Marcus Black' },
    style: 'Geometric',
    likes: 156
  }
];

export default function Gallery() {
  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Trending Designs</h2>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Grid className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <ImageIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockDesigns.map((design: TattooDesign) => (
          <div key={design.id} className="group relative">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={design.imageUrl}
                alt={design.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="mt-2">
              <h3 className="font-medium text-sm">{design.title}</h3>
              <p className="text-gray-600 text-sm">by {design.artist.name}</p>
              <div className="flex justify-between items-center mt-1">
                <span className="font-semibold">${design.price}</span>
                <span className="text-sm text-gray-500">{design.likes} likes</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}