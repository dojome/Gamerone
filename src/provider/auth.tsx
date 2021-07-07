import React, { createContext } from 'react';

interface Props {
  isAuthenticated: boolean;
  children?: React.ReactNode;
}
export const AuthContext = createContext({
  isAuthenticated: false,
});

export function AuthProvider({ isAuthenticated, children }: Props) {
  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
