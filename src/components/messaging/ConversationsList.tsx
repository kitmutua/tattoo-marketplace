import React from 'react';
import { Search, MessageCircle } from 'lucide-react';

interface Conversation {
  id: string;
  recipientId: string;
  recipientName: string;
  recipientImage: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

interface ConversationsListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (conversationId: string) => void;
}

export default function ConversationsList({
  conversations,
  selectedId,
  onSelect,
}: ConversationsListProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm">
      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="divide-y divide-gray-200">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelect(conversation.id)}
            className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors ${
              selectedId === conversation.id ? 'bg-gray-50' : ''
            }`}
          >
            <img
              src={conversation.recipientImage}
              alt={conversation.recipientName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium truncate">
                  {conversation.recipientName}
                </h3>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                  {conversation.timestamp}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                {conversation.lastMessage}
              </p>
            </div>
            {conversation.unreadCount > 0 && (
              <span className="bg-electric-blue text-white text-xs font-medium px-2 py-1 rounded-full">
                {conversation.unreadCount}
              </span>
            )}
          </button>
        ))}

        {conversations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>No conversations yet</p>
          </div>
        )}
      </div>
    </div>
  );
}