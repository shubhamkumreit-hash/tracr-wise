import React, { createContext, useContext, useState, useEffect } from 'react';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import * as authService from '@/services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  session: CognitoUserSession | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<CognitoUserSession | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentSession = await authService.getSession();
      setSession(currentSession);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    const userSession = await authService.signIn({ email, password });
    setSession(userSession);
    setIsAuthenticated(true);
  };

  const signUp = async (email: string, password: string, name: string) => {
    await authService.signUp({ email, password, name });
  };

  const signOut = () => {
    authService.signOut();
    setSession(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, session, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
