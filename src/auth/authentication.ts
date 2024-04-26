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
    return getMemberId() !== null;
  };

// Function to remove the token and handle the user sign out
export const signOut = (): void => {
  localStorage.removeItem('access_token');
};

export const getMemberId = (): number | null => {
    const memberId = localStorage.getItem('memberId');
    return memberId ? parseInt(memberId) : null;
};