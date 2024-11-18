import { createContext, useContext } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'artist' | 'admin';
  profileImage?: string;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
  role: 'client' | 'artist';
  profileImage?: File | null;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  isAuthenticated: false,
  isLoading: false,
  error: null,
});

export const useAuth = () => useContext(AuthContext);