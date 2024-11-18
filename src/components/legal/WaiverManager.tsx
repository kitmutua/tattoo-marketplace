import React, { useState } from 'react';
import { FileText, Plus, Download, Trash2 } from 'lucide-react';

interface Waiver {
  id: string;
  title: string;
  content: string;
  lastUpdated: string;
  required: boolean;
}

interface WaiverManagerProps {
  waivers: Waiver[];
  onAdd: () => void;
  onEdit: (waiver: Waiver) => void;
  onDelete: (waiverId: string) => void;
}

export default function WaiverManager({
  waivers,
  onAdd,
  onEdit,
  onDelete,
}: WaiverManagerProps) {
  const [selectedWaiver, setSelectedWaiver] = useState<Waiver | null>(null);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Liability Waivers</h2>
        <button
          onClick={onAdd}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Waiver
        </button>
      </div>

      <div className="space-y-4">
        {waivers.map((waiver) => (
          <div
            key={waiver.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-electric-blue transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-electric-blue flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">{waiver.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Last updated: {waiver.lastUpdated}
                  </p>
                  {waiver.required && (
                    <span className="inline-block px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                      Required
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedWaiver(waiver)}
                  className="p-2 text-gray-500 hover:text-electric-blue rounded-lg"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onEdit(waiver)}
                  className="p-2 text-gray-500 hover:text-electric-blue rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(waiver.id)}
                  className="p-2 text-gray-500 hover:text-red-500 rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {waivers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>No waivers added yet</p>
            <button
              onClick={onAdd}
              className="text-electric-blue hover:underline mt-2"
            >
              Add your first waiver
            </button>
          </div>
        )}
      </div>
    </div>
  );
}