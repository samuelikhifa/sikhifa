import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export class PersistentStorage<T> {
  private filePath: string;
  private data: T[];

  constructor(filename: string, defaultData: T[] = []) {
    this.filePath = path.join(DATA_DIR, `${filename}.json`);
    this.data = this.loadData(defaultData);
  }

  private loadData(defaultData: T[]): T[] {
    try {
      if (fs.existsSync(this.filePath)) {
        const fileContent = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(fileContent);
      }
    } catch (error) {
      console.error(`Error loading data from ${this.filePath}:`, error);
    }
    
    // If file doesn't exist or there's an error, save default data
    this.saveData(defaultData);
    return defaultData;
  }

  private saveData(data: T[]): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Error saving data to ${this.filePath}:`, error);
    }
  }

  getAll(): T[] {
    return [...this.data];
  }

  getById(id: any): T | undefined {
    return this.data.find((item: any) => item.id === id);
  }

  create(item: Omit<T, 'id'> & { id?: any }): T {
    const newItem = {
      ...item,
      id: item.id || this.generateId()
    } as T;
    
    this.data.push(newItem);
    this.saveData(this.data);
    return newItem;
  }

  update(id: any, updates: Partial<T>): T | null {
    const index = this.data.findIndex((item: any) => item.id === id);
    if (index === -1) return null;
    
    this.data[index] = { ...this.data[index], ...updates };
    this.saveData(this.data);
    return this.data[index];
  }

  delete(id: any): boolean {
    const index = this.data.findIndex((item: any) => item.id === id);
    if (index === -1) return false;
    
    this.data.splice(index, 1);
    this.saveData(this.data);
    return true;
  }

  private generateId(): number | string {
    const ids = this.data.map((item: any) => item.id);
    
    // If we have string IDs, generate a timestamp-based string ID
    if (ids.length > 0 && typeof ids[0] === 'string') {
      return Date.now().toString();
    }
    
    // Otherwise generate numeric ID
    const numericIds = ids.filter(id => typeof id === 'number');
    return numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1;
  }

  // Custom methods for specific data types
  filter(predicate: (item: T) => boolean): T[] {
    return this.data.filter(predicate);
  }

  sort(compareFn: (a: T, b: T) => number): T[] {
    return [...this.data].sort(compareFn);
  }
} 