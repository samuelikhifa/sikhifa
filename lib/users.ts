

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

const users: User[] = [];

export const userStore = {

  create: (user: Omit<User, "id" | "createdAt">) => {
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    return newUser;
  },


  findByEmail: (email: string) => {
    return users.find((user) => user.email === email);
  },


  findById: (id: string) => {
    return users.find((user) => user.id === id);
  },

  getAll: () => {
    return users.map((user) => ({ ...user, password: "[HIDDEN]" }));
  },


  exists: (email: string) => {
    return users.some((user) => user.email === email);
  },
};
