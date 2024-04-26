type TokenType = string;

// Function to save the JWT token to localStorage. 
export const storeToken = (token: TokenType): void => {
  localStorage.setItem('access_token', token);
};

// Function to get the JWT token from localStorage. 
export const getToken = (): string | null => {
  return localStorage.getItem('access_token');
};

// Function to check if the user is signed in.
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