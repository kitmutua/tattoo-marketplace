import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Film } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface PortfolioUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => Promise<void>;
}

export default function PortfolioUpload({ isOpen, onClose, onUpload }: PortfolioUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.mov']
    },
    maxSize: 10485760, // 10MB
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    try {
      await onUpload(files);
      onClose();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Upload Portfolio Work</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-electric-blue bg-electric-blue bg-opacity-5'
              : 'border-gray-300 hover:border-electric-blue'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-2">
            Drag & drop files here, or click to select files
          </p>
          <p className="text-sm text-gray-500">
            Supports: JPG, PNG, GIF, MP4, MOV (max 10MB)
          </p>
        </div>

        {files.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium mb-3">Selected Files</h4>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {file.type.startsWith('image/') ? (
                      <ImageIcon className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Film className="w-5 h-5 text-gray-500" />
                    )}
                    <span className="text-sm truncate">{file.name}</span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={files.length === 0 || uploading}
            className="btn btn-primary"
          >
            {uploading ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>
      </div>
    </div>
  );
}