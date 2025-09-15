// Shared user store for development
// In production, this should be replaced with a proper database

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

// In-memory store (will reset on server restart)
const users: User[] = [];

export const userStore = {
  // Add a new user
  create: (user: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    return newUser;
  },

  // Find user by email
  findByEmail: (email: string) => {
    return users.find(user => user.email === email);
  },

  // Find user by ID
  findById: (id: string) => {
    return users.find(user => user.id === id);
  },

  // Get all users (for debugging)
  getAll: () => {
    return users.map(user => ({ ...user, password: '[HIDDEN]' }));
  },

  // Check if user exists
  exists: (email: string) => {
    return users.some(user => user.email === email);
  }
}; 