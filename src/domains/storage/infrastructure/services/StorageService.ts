import { storageRepository, unwrap } from '@umituz/react-native-storage';

export class StorageService {
  async getItem<T>(key: string, defaultValue: T | null = null): Promise<T | null> {
    try {
      const result = await storageRepository.getItem(key, defaultValue);
      return unwrap(result, defaultValue);
    } catch (error) {
      /* eslint-disable-next-line no-console */
      if (__DEV__) console.error(`Error reading storage key "${key}":`, error);
      return defaultValue;
    }
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const result = await storageRepository.setItem(key, value);
      if (!result.success) {
        throw new Error(result.error?.message || 'Failed to set item');
      }
    } catch (error) {
      /* eslint-disable-next-line no-console */
      if (__DEV__) console.error(`Error setting storage key "${key}":`, error);
      throw error;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      const result = await storageRepository.removeItem(key);
      if (!result.success) {
        throw new Error(result.error?.message || 'Failed to remove item');
      }
    } catch (error) {
      /* eslint-disable-next-line no-console */
      if (__DEV__) console.error(`Error removing storage key "${key}":`, error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      const result = await storageRepository.clearAll();
      if (!result.success) {
        throw new Error(result.error?.message || 'Failed to clear storage');
      }
    } catch (error) {
      /* eslint-disable-next-line no-console */
      if (__DEV__) console.error('Error clearing storage:', error);
      throw error;
    }
  }
}

export const storageService = new StorageService();

