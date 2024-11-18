import React, { useState } from 'react';
import { Calendar, AlertCircle, ShieldCheck } from 'lucide-react';

interface AgeVerificationProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (data: VerificationData) => Promise<void>;
  minimumAge: number;
}

interface VerificationData {
  idType: string;
  idNumber: string;
  dateOfBirth: string;
}

export default function AgeVerification({
  isOpen,
  onClose,
  onVerify,
  minimumAge = 18,
}: AgeVerificationProps) {
  const [formData, setFormData] = useState<VerificationData>({
    idType: '',
    idNumber: '',
    dateOfBirth: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onVerify(formData);
      onClose();
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-electric-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-electric-blue" />
          </div>
          <h2 className="text-xl font-bold mb-2">Age Verification Required</h2>
          <p className="text-gray-600">
            You must be {minimumAge} or older to proceed. Please provide your identification details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID Type
            </label>
            <select
              value={formData.idType}
              onChange={(e) => setFormData(prev => ({ ...prev, idType: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent"
              required
            >
              <option value="">Select ID Type</option>
              <option value="drivers_license">Driver's License</option>
              <option value="passport">Passport</option>
              <option value="state_id">State ID</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID Number
            </label>
            <input
              type="text"
              value={formData.idNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, idNumber: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent"
              placeholder="Enter ID number"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              <div className="text-sm text-yellow-600">
                <p className="font-medium">Important Notice</p>
                <p>You will need to present this ID in person before your appointment. False information may result in appointment cancellation.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
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
              {isSubmitting ? 'Verifying...' : 'Verify Age'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}