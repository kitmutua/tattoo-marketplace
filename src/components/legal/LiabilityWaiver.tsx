import React, { useState } from 'react';
import { FileText, CheckSquare, AlertCircle, Download } from 'lucide-react';

interface WaiverProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => Promise<void>;
  artistName: string;
  studioName: string;
  waiverText: string;
}

export default function LiabilityWaiver({
  isOpen,
  onClose,
  onAccept,
  artistName,
  studioName,
  waiverText,
}: WaiverProps) {
  const [hasRead, setHasRead] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signature, setSignature] = useState('');

  const handleAccept = async () => {
    if (!signature.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onAccept();
      onClose();
    } catch (error) {
      console.error('Failed to submit waiver:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FileText className="w-6 h-6 text-electric-blue" />
              Liability Waiver
            </h2>
            <button
              onClick={() => onClose()}
              className="text-gray-500 hover:text-gray-700"
            >
              Download PDF
              <Download className="w-5 h-5 ml-1 inline" />
            </button>
          </div>
        </div>

        {/* Waiver Content */}
        <div className="p-6 overflow-y-auto flex-grow">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <AlertCircle className="w-5 h-5 text-electric-blue" />
              <span>Please read this document carefully before signing</span>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-bold mb-4">TATTOO SERVICE AGREEMENT AND LIABILITY WAIVER</h3>
              <p className="mb-4">
                This agreement is between {artistName} at {studioName} ("Artist") and the undersigned client ("Client").
              </p>
              <div className="prose prose-sm max-w-none text-gray-600">
                {waiverText}
              </div>
            </div>
          </div>

          {/* Age Verification */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold mb-2">Age Verification Required</h4>
            <p className="text-sm text-gray-600">
              By signing this waiver, you confirm that you are 18 years or older and will provide valid government-issued photo ID before the procedure.
            </p>
          </div>

          {/* Acknowledgment Checkbox */}
          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="flex-shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={hasRead}
                  onChange={(e) => setHasRead(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-electric-blue focus:ring-electric-blue"
                />
              </div>
              <span className="text-sm text-gray-600">
                I have read, understand, and agree to the terms outlined in this waiver. I confirm that I am 18 years or older and will provide valid ID verification.
              </span>
            </label>
          </div>

          {/* Digital Signature */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Digital Signature
            </label>
            <input
              type="text"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="Type your full legal name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleAccept}
              disabled={!hasRead || !signature.trim() || isSubmitting}
              className="btn btn-primary flex items-center gap-2"
            >
              <CheckSquare className="w-5 h-5" />
              {isSubmitting ? 'Submitting...' : 'Accept & Sign'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}