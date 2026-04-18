import { create } from 'zustand';
import { User, MOCK_USERS } from '../services/mockData';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  register: (name: string, email: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  login: async (email: string) => {
    set({ isLoading: true });
    // Simulate API delay
    await new Promise((res) => setTimeout(res, 800));
    const user = MOCK_USERS.find((u) => u.email === email);
    if (user) {
      set({ user, isLoading: false });
    } else {
      set({ isLoading: false });
      throw new Error('User not found');
    }
  },
  register: async (name: string, email: string) => {
    set({ isLoading: true });
    await new Promise((res) => setTimeout(res, 800));
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      name,
      email,
    };
    // Normally we'd add it to a DB, but for mock we just log them in
    set({ user: newUser, isLoading: false });
  },
  logout: () => {
    set({ user: null });
  },
}));
