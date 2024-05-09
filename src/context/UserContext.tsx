import React, { createContext, useContext, useState, useEffect, ReactNode, FunctionComponent } from 'react';
import { getToken, storeToken, signOut as removeToken } from '../auth/authentication';

interface User {
  memberId: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const defaultContextValue: UserContextType = {
  user: null,
  setUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {}
};

const UserContext = createContext<UserContextType>(defaultContextValue);

export const UserProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const checkToken = () => {
            const token = getToken();
            const loggedIn = token !== null;
            setIsLoggedIn(loggedIn);
            if (loggedIn && !user) {
                // Optionally fetch user details here if needed
            } else if (!loggedIn && user) {
                setUser(null);
            }
        };

        checkToken(); // Initial check
        const interval = setInterval(checkToken, 1000); // Check every second

        return () => clearInterval(interval); // Cleanup on unmount
    }, [user]);

    const handleSignOut = () => {
        removeToken(); // Remove the token from storage
        setIsLoggedIn(false); // Update isLoggedIn state
        setUser(null); // Clear the user state
    };

    return (
        <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
