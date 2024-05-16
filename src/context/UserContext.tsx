import React, { createContext, useContext, useState, useEffect, ReactNode, FunctionComponent } from 'react';
import { getToken, storeToken, signOut as removeToken } from '../auth/authentication';

interface User {
  memberId?: number;
  isStaff: boolean;
  staffId?: number;
  clubId?: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isStaff: boolean;
  handleLogin: (credentials: any, isStaffLogin: boolean) => Promise<void>;
  handleSignOut: () => void;
  setLoginState: (userData: { accessToken: string, staffId: number, clubId: number, isStaff: boolean }) => void; // New method
}

const defaultContextValue: UserContextType = {
  user: null,
  setUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  isStaff: false,
  handleLogin: async () => {},
  handleSignOut: () => {},
  setLoginState: () => {} // Provide a default noop function
};

const UserContext = createContext<UserContextType>(defaultContextValue);

export const UserProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isStaff, setIsStaff] = useState<boolean>(false);

  const handleSignOut = () => {
    removeToken();
    setIsLoggedIn(false);
    setUser(null);
    setIsStaff(false);
  };

  const setLoginState = ({ accessToken, staffId, clubId, isStaff }: { accessToken: string, staffId: number, clubId: number, isStaff: boolean }) => {
    storeToken(accessToken);
    setUser({
      memberId: isStaff ? undefined : staffId,
      isStaff,
      staffId: isStaff ? staffId : undefined,
      clubId,
    });
    setIsLoggedIn(true);
    setIsStaff(isStaff);
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, isStaff, handleLogin: async () => {}, handleSignOut, setLoginState }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
