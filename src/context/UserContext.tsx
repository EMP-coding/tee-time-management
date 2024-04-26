// UserContext.ts

import React, { createContext, useContext, useState, ReactNode, FunctionComponent } from 'react';

interface User {
  memberId: number;
  // You can add more user properties here
}

interface UserContextType {
  user: User | null; // Adding user object to the context
  setUser: (user: User | null) => void; // Method to update the user object
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

// Update default values to include user and setUser
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

    const updateUser = (newUser: User | null) => {
        setUser(prevUser => {
            if (newUser === null) {
                return null; // If newUser is null, return null directly
            }
            return {
                ...prevUser,
                memberId: newUser.memberId // Update memberId property
            };
        });
    };

    return (
        <UserContext.Provider value={{ user, setUser: updateUser, isLoggedIn, setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);

// src/auth/authentication.ts

// Define the type for the token, it should be a string when storing to localStorage
type TokenType = string;

// Function to save the JWT token to localStorage. The token must be a string.
export const storeToken = (token: TokenType): void => {
  localStorage.setItem('access_token', token);
};

// Function to get the JWT token from localStorage. This can return null if the token isn't present.
export const getToken = (): string | null => {
  return localStorage.getItem('access_token');
};

// Function to check if the user is signed in. If getToken() returns a string, the user is considered signed in.
export const isUserSignedIn = (): boolean => {
  return getToken() !== null;
};

// Function to remove the token and handle the user sign out
export const signOut = (): void => {
  localStorage.removeItem('access_token');
};
