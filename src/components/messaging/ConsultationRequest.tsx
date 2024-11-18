import React, { useState } from 'react';
import { Calendar, Clock, Video, Users, X } from 'lucide-react';

interface ConsultationRequestProps {
  isOpen: boolean;
  onClose: () => void;
  artistName: string;
  onSubmit: (data: ConsultationData) => Promise<void>;
}

interface ConsultationData {
  type: 'virtual' | 'inPerson';
  date: string;
  time: string;
  description: string;
  referenceImages?: File[];
}

export default function ConsultationRequest({
  isOpen,
  onClose,
  artistName,
  onSubmit,
}: ConsultationRequestProps) {
  const [formData, setFormData] = useState<ConsultationData>({
    type: 'virtual',
    date: '',
    time: '',
    description: '',
    referenceImages: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Failed to submit consultation request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Request Consultation with {artistName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Consultation Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consultation Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'virtual' }))}
                className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${
                  formData.type === 'virtual'
                    ? 'border-electric-blue bg-electric-blue text-white'
                    : 'border-gray-200 hover:border-electric-blue'
                }`}
              >
                <Video className="w-5 h-5" />
                Virtual
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'inPerson' }))}
                className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${
                  formData.type === 'inPerson'
                    ? 'border-electric-blue bg-electric-blue text-white'
                    : 'border-gray-200 hover:border-electric-blue'
                }`}
              >
                <Users className="w-5 h-5" />
                In Person
              </button>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tell us about your tattoo idea
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent resize-none"
              rows={4}
              placeholder="Describe your tattoo idea, size, placement, and any specific questions you have..."
              required
            />
          </div>

          {/* Reference Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reference Images (Optional)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setFormData(prev => ({ ...prev, referenceImages: files }));
              }}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-electric-blue file:text-white hover:file:bg-opacity-90"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? 'Submitting...' : 'Request Consultation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}