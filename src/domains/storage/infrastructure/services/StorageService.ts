import { storageRepository, unwrap } from "@umituz/react-native-storage";
import { IStorageService } from "../../application/ports/IStorageService";

export class StorageService implements IStorageService {
  async getItem<T>(
    key: string,
    defaultValue: T | null = null,
  ): Promise<T | null> {
    try {
      const result = await storageRepository.getItem(key, defaultValue);
      return unwrap(result, defaultValue);
    } catch (error) {
      /* eslint-disable-next-line no-console */
      if (__DEV__) console.error(`Error reading storage key "${key}":`, error);
      return defaultValue;
    }
  }

  async setItem<T>(key: string, value: T): Promise<boolean> {
    try {
      const result = await storageRepository.setItem(key, value);
      return result.success;
    } catch (error) {
      /* eslint-disable-next-line no-console */
      if (__DEV__) console.error(`Error setting storage key "${key}":`, error);
      return false;
    }
  }

  async removeItem(key: string): Promise<boolean> {
    try {
      const result = await storageRepository.removeItem(key);
      return result.success;
    } catch (error) {
      /* eslint-disable-next-line no-console */
      if (__DEV__) console.error(`Error removing storage key "${key}":`, error);
      return false;
    }
  }

  async clear(): Promise<boolean> {
    try {
      const result = await storageRepository.clearAll();
      return result.success;
    } catch (error) {
      /* eslint-disable-next-line no-console */
      if (__DEV__) console.error("Error clearing storage:", error);
      return false;
    }
  }
}

export const storageService = new StorageService();
