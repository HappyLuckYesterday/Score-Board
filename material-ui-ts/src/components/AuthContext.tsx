import React, { createContext, useContext, useState, ReactNode } from 'react';
import jwtDecode from 'jwt-decode';

interface AuthContextProps {
  isAuthenticated: boolean;
  userRole: string; // 'admin' or 'user'
  token: string | null;
  login: (role: string) => void;
  logout: () => void;
}

interface JwtPayload {
  sub: string; // Subject (user ID)
  name: string; // User's name
  iat: number; // Issued at
  exp: number; // Expiration time
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('user');

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null; // Load token from localStorage
  });

    const login = (newToken: string) => {
      setToken(newToken);

      let decoded: JwtPayload | null = null;

      localStorage.setItem('token', newToken); // Save token to localStorage
      setIsAuthenticated(true);
    };
    const logout = () => {
      setToken(null);
      localStorage.removeItem('token'); // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
