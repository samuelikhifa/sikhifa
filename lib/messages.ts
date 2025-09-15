import { PersistentStorage } from './storage';

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
  repliedAt?: string;
  replyMessage?: string;
}

// Persistent storage instance
const storage = new PersistentStorage<Message>('messages', []);

export const messageStore = {
  // Create a new message
  create: (message: Omit<Message, 'id' | 'createdAt' | 'status'>) => {
    const newMessage: Omit<Message, 'id'> = {
      ...message,
      status: 'unread',
      createdAt: new Date().toISOString()
    };
    return storage.create(newMessage);
  },

  // Get all messages
  getAll: () => {
    return storage.getAll().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  // Get message by ID
  getById: (id: string) => {
    return storage.getById(id);
  },

  // Update message status
  updateStatus: (id: string, status: Message['status']) => {
    const updates: Partial<Message> = { status };
    if (status === 'replied') {
      updates.repliedAt = new Date().toISOString();
    }
    return storage.update(id, updates);
  },

  // Reply to a message
  reply: (id: string, replyMessage: string) => {
    const updates: Partial<Message> = {
      status: 'replied',
      replyMessage,
      repliedAt: new Date().toISOString()
    };
    return storage.update(id, updates);
  },

  // Delete message
  delete: (id: string) => {
    return storage.delete(id);
  },

  // Get unread count
  getUnreadCount: () => {
    return storage.getAll().filter(m => m.status === 'unread').length;
  }
}; 