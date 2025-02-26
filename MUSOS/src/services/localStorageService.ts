import * as CryptoJS from 'crypto-js';

class LocalStorageService {
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
    localStorage.setItem(key, encryptedValue);
  }

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (item) {
      return this.decrypt(item) as T;
    }
    return null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}

export const localStorageService = new LocalStorageService('your-token');