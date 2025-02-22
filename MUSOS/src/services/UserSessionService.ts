import { b } from 'vitest/dist/reporters-5f784f42';
import { IUser } from '../types/user.type';
import Cookies from 'js-cookie';

const SESSION_COOKIE_NAME = 'session_token';

class UserSessionService {
  private readonly SESSION_KEY = 'userSession';

  saveSession(user: IUser): void {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
    if (!user.token
      || user.token == ''
      || user.token == 'undefined'
      || user.token == 'null') {
        user.token = btoa(user.email + ':' + user.token);
      }else{
        window.location.href = '/login';
        // gologin

      }
    Cookies.set(SESSION_COOKIE_NAME, user.token, { secure: true, sameSite: 'Strict' });
  }

  async getSession(): Promise<IUser | null> {
    const session = localStorage.getItem(this.SESSION_KEY);
    return session ? JSON.parse(session) : null;
  }

  getToken(): string | null {
    return Cookies.get(SESSION_COOKIE_NAME) || null;
  }

  clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
    Cookies.remove(SESSION_COOKIE_NAME);
  }

  isAuthenticated(): boolean {
    try {
      const session = this.getSession();
      const token = this.getToken();
      return !!session && !!token; // returns true if session and token exist and are valid
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  async checkUserSession(): Promise<IUser> {
    const user = await this.getSession();
    if (!user) {
      window.location.href = '/login';
      throw new Error('Please login to continue');
    }
    return user;
  }
}

export const userSessionService = new UserSessionService();