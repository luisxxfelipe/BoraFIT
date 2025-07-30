import { createContext, useContext, useState, type ReactNode } from 'react';

export interface User {
  id: number;
  name: string;
  email: string;
  height: number;
  type: string;
  weight: number;
  goal: string;
  daysPerWeek: number;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user] = useState<User | null>(null);
  const isAuthenticated = !!token;
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };
  return (
    <AuthContext.Provider value={{ token, setToken, isAuthenticated, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
}
