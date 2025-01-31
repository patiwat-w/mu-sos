import { IUser } from '../types/user.type';

class UserSessionService {
  private readonly SESSION_KEY = 'userSession';

  saveSession(user: IUser): void {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
  }

  getSession(): IUser | null {
    const session = localStorage.getItem(this.SESSION_KEY);
    return session ? JSON.parse(session) : null;
  }

  clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getSession();
  }
}

export const userSessionService = new UserSessionService();