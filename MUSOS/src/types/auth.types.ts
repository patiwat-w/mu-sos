// src/types/auth.types.ts

export interface UserCredentials {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    user: {
      uid: string;
      email: string;
      displayName?: string;
      photoURL?: string;
    };
    additionalUserInfo?: {
      isNewUser: boolean;
    };
  }
  
  export interface GoogleAuthResponse {
    profile: {
      email: string;
      familyName: string;
      givenName: string;
      id: string;
      name: string;
      picture: string;
      locale: string;
    };
    token: string;
  }