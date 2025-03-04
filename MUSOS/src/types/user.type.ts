export interface IUser {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    localUserMappingId: number;
    phone?: string;
    role?: string;
    token?: string;
    address?: string;
    birthDate?: string;
    age?: string;
  }