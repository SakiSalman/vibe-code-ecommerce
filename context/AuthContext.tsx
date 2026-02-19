import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (mobile: string, password?: string) => boolean;
  register: (name: string, mobile: string, address?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (mobile: string, password?: string): boolean => {
    // Hardcoded Admin
    if (mobile === '01408971554' && password === '123456') {
      setUser({
        name: 'Admin User',
        mobile,
        role: 'ADMIN',
        email: 'admin@lumina.com'
      });
      return true;
    }
    
    // Hardcoded Customer
    if (mobile === '01408971555' && password === '123456') {
      setUser({
        name: 'Customer User',
        mobile,
        role: 'CUSTOMER',
        email: 'customer@example.com',
        address: '123 Customer St'
      });
      return true;
    }

    // Default fallback for registration flow or other numbers (simulating success for demo purposes if not strictly restricted)
    // For this specific request, let's allow other logins as customers for testing the register flow
    if (mobile && password) {
       setUser({
        name: 'New User',
        mobile,
        role: 'CUSTOMER'
       });
       return true;
    }

    return false;
  };

  const register = (name: string, mobile: string, address?: string) => {
    // In a real app, this would create a user in the backend
    // For demo, we just log them in immediately as a Customer
    setUser({ 
        mobile, 
        name, 
        address, 
        role: 'CUSTOMER' 
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};