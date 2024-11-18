import React from 'react';
import { Shield, ShieldCheck } from 'lucide-react';

interface VerificationBadgeProps {
  status: 'verified' | 'pending' | 'unverified';
  showTooltip?: boolean;
}

export default function VerificationBadge({ 
  status, 
  showTooltip = true 
}: VerificationBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'verified':
        return {
          icon: ShieldCheck,
          color: 'text-green-500',
          text: 'Verified Artist',
          description: 'This artist has completed our verification process'
        };
      case 'pending':
        return {
          icon: Shield,
          color: 'text-yellow-500',
          text: 'Verification Pending',
          description: 'Verification in progress'
        };
      default:
        return {
          icon: Shield,
          color: 'text-gray-400',
          text: 'Unverified',
          description: 'This artist has not started verification'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className="relative group">
      <div className={`${config.color} inline-flex items-center gap-1`}>
        <Icon className="w-5 h-5" />
        <span className="text-sm font-medium">{config.text}</span>
      </div>
      
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {config.description}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
}