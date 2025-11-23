export interface IStorageService {
  getItem<T>(key: string, defaultValue?: T | null): Promise<T | null>;
  setItem<T>(key: string, value: T): Promise<boolean>;
  removeItem(key: string): Promise<boolean>;
  clear(): Promise<boolean>;
}
