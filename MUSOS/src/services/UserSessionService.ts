import { IUser } from '../types/user.type';
import Cookies from 'js-cookie';

const SESSION_COOKIE_NAME = 'session_token';

class UserSessionService {
  private readonly SESSION_KEY = 'userSession';

  saveSession(user: IUser): void {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
    Cookies.set(SESSION_COOKIE_NAME, user.token, { secure: true, sameSite: 'Strict' });
  }

  getSession(): IUser | null {
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
}

export const userSessionService = new UserSessionService();