"use client";

import { useState, useEffect } from "react";
import {
  MessageCircle,
  Mail,
  Calendar,
  User,
  Trash2,
  CheckCircle,
  Eye,
} from "lucide-react";

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/messages");
      const data = await response.json();

      if (data.success) {
        setMessages(data.data || []);
      } else {
        setError("Failed to fetch messages");
      }
    } catch (error) {
      setError("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: number) => {
    // In a real app, this would make an API call
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, read: true } : msg))
    );
  };

  const deleteMessage = async (messageId: number) => {
    // In a real app, this would make an API call
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
  };

  const unreadCount = messages.filter((msg) => !msg.read).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-poppins text-3xl font-bold text-gray-900">
                Messages
              </h1>
              <p className="text-gray-600 mt-1">
                Manage client messages and inquiries
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-lime-100 text-lime-800 px-4 py-2 rounded-lg">
                <span className="font-semibold">{messages.length}</span> total
                messages
              </div>
              {unreadCount > 0 && (
                <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg">
                  <span className="font-semibold">{unreadCount}</span> unread
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="container mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {messages.length === 0 ? (
          <div className="text-center py-20">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No messages yet
            </h3>
            <p className="text-gray-600">
              Messages from your contact form will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`bg-white rounded-2xl shadow-sm border-l-4 ${
                  message.read ? "border-gray-200" : "border-lime-500"
                } p-6 hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex items-center space-x-2">
                        <User className="w-5 h-5 text-gray-400" />
                        <span className="font-semibold text-gray-900">
                          {message.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{message.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 text-sm">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {!message.read && (
                        <span className="bg-lime-100 text-lime-800 px-2 py-1 rounded-full text-xs font-medium">
                          New
                        </span>
                      )}
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-4">
                      {message.message}
                    </p>

                    <div className="flex items-center space-x-3">
                      {!message.read && (
                        <button
                          onClick={() => markAsRead(message.id)}
                          className="flex items-center space-x-2 text-lime-600 hover:text-lime-700 font-medium text-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Mark as read</span>
                        </button>
                      )}
                      <button
                        onClick={() => deleteMessage(message.id)}
                        className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
