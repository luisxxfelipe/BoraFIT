import { createContext, useContext, useState, type ReactNode } from 'react';

export interface User {
  id: number;
  nome: string;
  email: string;
  senha: string;
  altura: number;
  peso: number;
  objetivo: string;
  diasSemana: number;
  tipo: string;
  fotoPerfil: string | null;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!token;
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };
  return (
    <AuthContext.Provider value={{ token, setToken, isAuthenticated, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
}
