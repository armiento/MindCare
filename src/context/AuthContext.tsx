import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (username: string, password: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulated user storage (in a real app, this would be in a backend)
const users = new Map<string, { password: string; createdAt: Date }>();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    const userInfo = users.get(username);
    if (userInfo && userInfo.password === password) {
      setUser({ username, createdAt: userInfo.createdAt });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = (username: string, password: string): boolean => {
    if (users.has(username)) {
      return false;
    }
    users.set(username, { password, createdAt: new Date() });
    setUser({ username, createdAt: new Date() });
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}