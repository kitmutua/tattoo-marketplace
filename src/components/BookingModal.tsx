import React, { useState } from 'react';
import { X, Calendar, Clock, Video } from 'lucide-react';
import type { TimeSlot } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  artistName: string;
  availableSlots: TimeSlot[];
}

export default function BookingModal({
  isOpen,
  onClose,
  artistName,
  availableSlots,
}: BookingModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [consultationType, setConsultationType] = useState<'virtual' | 'inPerson'>('virtual');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Book with {artistName}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <button
              className={`flex-1 p-3 rounded-lg border ${
                consultationType === 'virtual'
                  ? 'border-black bg-black text-white'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setConsultationType('virtual')}
            >
              <Video className="w-5 h-5 mx-auto mb-2" />
              <span className="block text-sm">Virtual</span>
            </button>
            <button
              className={`flex-1 p-3 rounded-lg border ${
                consultationType === 'inPerson'
                  ? 'border-black bg-black text-white'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setConsultationType('inPerson')}
            >
              <Calendar className="w-5 h-5 mx-auto mb-2" />
              <span className="block text-sm">In Person</span>
            </button>
          </div>

          <div className="space-y-3">
            {availableSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => setSelectedSlot(slot.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border ${
                  selectedSlot === slot.id
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5" />
                  <span>{slot.time}</span>
                </div>
                <span>{slot.date}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          disabled={!selectedSlot}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}