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
  user: { memberId: 3 }, // Set default memberId to 3
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
