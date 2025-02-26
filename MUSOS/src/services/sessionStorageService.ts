import * as CryptoJS from 'crypto-js';

class SessionStorageService {
  private secretKey: string;

  constructor(token: string) {
    this.secretKey = token;
  }

  private encrypt(value: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(value), this.secretKey).toString();
  }

  private decrypt(value: string): any {
    const bytes = CryptoJS.AES.decrypt(value, this.secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  setItem(key: string, value: any): void {
    const encryptedValue = this.encrypt(value);
    sessionStorage.setItem(key, encryptedValue);
  }

  getItem<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    if (item) {
      return this.decrypt(item) as T;
    }
    return null;
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}

export const sessionStorageService = new SessionStorageService('your-token');
