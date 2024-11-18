import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, Clock, Check, CheckCheck } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image';
  imageUrl?: string;
}

interface ChatInterfaceProps {
  recipientId: string;
  recipientName: string;
  recipientImage: string;
  messages: Message[];
  onSendMessage: (content: string, type: 'text' | 'image') => Promise<void>;
  onRequestConsultation?: () => void;
}

export default function ChatInterface({
  recipientId,
  recipientName,
  recipientImage,
  messages,
  onSendMessage,
  onRequestConsultation,
}: ChatInterfaceProps) {
  const [newMessage, setNewMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    await onSendMessage(newMessage, 'text');
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // In a real app, you would upload the file to your server here
      const imageUrl = URL.createObjectURL(file);
      await onSendMessage(imageUrl, 'image');
    } catch (error) {
      console.error('Failed to upload image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const MessageStatus = ({ status }: { status: Message['status'] }) => {
    switch (status) {
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-electric-blue" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={recipientImage}
            alt={recipientName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium">{recipientName}</h3>
            <span className="text-sm text-gray-500">Online</span>
          </div>
        </div>
        {onRequestConsultation && (
          <button
            onClick={onRequestConsultation}
            className="btn btn-primary text-sm"
          >
            Request Consultation
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === 'currentUser' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] ${
                message.senderId === 'currentUser'
                  ? 'bg-electric-blue text-white rounded-l-xl rounded-tr-xl'
                  : 'bg-gray-100 text-gray-900 rounded-r-xl rounded-tl-xl'
              } p-3`}
            >
              {message.type === 'text' ? (
                <p className="whitespace-pre-wrap">{message.content}</p>
              ) : (
                <img
                  src={message.imageUrl}
                  alt="Shared image"
                  className="rounded-lg max-w-full"
                />
              )}
              <div
                className={`flex items-center gap-1 text-xs mt-1 ${
                  message.senderId === 'currentUser'
                    ? 'text-blue-100'
                    : 'text-gray-500'
                }`}
              >
                <Clock className="w-3 h-3" />
                <span>{message.timestamp}</span>
                {message.senderId === 'currentUser' && (
                  <MessageStatus status={message.status} />
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-end gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-500 hover:text-electric-blue rounded-lg"
            disabled={isUploading}
          >
            <ImageIcon className="w-6 h-6" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-electric-blue focus:border-transparent resize-none"
              rows={1}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="p-3 bg-electric-blue text-white rounded-xl hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}