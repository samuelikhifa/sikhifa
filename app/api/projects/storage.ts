interface StorageItem<T> {
  data: T;
  timestamp: number;
}

export class PersistentStorage<T> {
  private key: string;
  private ttl?: number; // Time to live in milliseconds

  constructor(key: string, ttlInMinutes: number = 60 * 24) {
    this.key = `portfolio_${key}`;
    this.ttl = ttlInMinutes * 60 * 1000; // Convert minutes to milliseconds
  }

  get(): T | null {
    try {
      const item = localStorage.getItem(this.key);
      if (!item) return null;

      const { data, timestamp }: StorageItem<T> = JSON.parse(item);
      
      // Check if the item has expired
      if (this.ttl && Date.now() - timestamp > this.ttl) {
        this.clear();
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error getting data from localStorage', error);
      return null;
    }
  }

  set(data: T): void {
    try {
      const item: StorageItem<T> = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(this.key, JSON.stringify(item));
    } catch (error) {
      console.error('Error saving data to localStorage', error);
    }
  }

  clear(): void {
    try {
      localStorage.removeItem(this.key);
    } catch (error) {
      console.error('Error clearing data from localStorage', error);
    }
  }
}
