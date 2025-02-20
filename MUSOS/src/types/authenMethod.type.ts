
export interface UserAuthenticationMethodModel {
  id: number;
  userId: number;
  provider: AuthenticationProvider;
  providerKey: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  user: AuthenticationUserModel;
}

export enum AuthenticationProvider {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  GITHUB = 'GITHUB',
  MICROSOFT = 'MICROSOFT',
  APPLE = 'APPLE',
  EMAIL = 'EMAIL',
}

export interface  AuthenticationUserModel {
  id: number;
  email: string;
  displayName: string;
  photoURL?: string;
}
