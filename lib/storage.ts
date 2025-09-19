import fs from "fs";
import path from "path";

// Prefer writable temp directory in serverless/edge environments like Vercel
// Allows overriding via DATA_DIR env. Defaults to /tmp in production, cwd/data in dev.
const baseDir = process.env.DATA_DIR
  || (process.env.VERCEL || process.env.NODE_ENV === 'production' ? '/tmp' : process.cwd());
const DATA_DIR = path.join(baseDir, "data");

// Ensure data directory exists
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (e) {
  // In environments where the FS is not writable, we'll operate in-memory only
  console.warn(`storage: unable to ensure data directory at ${DATA_DIR}:`, e);
}

type IdType = number | string;

export class PersistentStorage<T extends { id: IdType }, K extends IdType = T["id"]> {
  private filePath: string;
  private data: T[];

  constructor(filename: string, defaultData: T[] = []) {
    this.filePath = path.join(DATA_DIR, `${filename}.json`);
    this.data = this.loadData(defaultData);
  }

  private loadData(defaultData: T[]): T[] {
    try {
      if (fs.existsSync(this.filePath)) {
        const fileContent = fs.readFileSync(this.filePath, "utf-8");
        return JSON.parse(fileContent) as T[];
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
      // Log but do not throw; allow in-memory usage without persistence
      console.error(`Error saving data to ${this.filePath}:`, error);
    }
  }

  getAll(): T[] {
    return [...this.data];
  }

  getById(id: K): T | undefined {
    return this.data.find((item) => item.id === id);
  }

  // Overloads allow passing a fully-typed T (with id) or an object missing id
  create(item: Omit<T, "id">): T;
  create(item: T): T;
  create(item: Omit<T, "id"> | T): T {
    let newItem: T;
    if ("id" in (item as T)) {
      newItem = item as T;
    } else {
      const withId = {
        ...(item as Omit<T, "id">),
        id: this.generateId() as K,
      } as unknown as T;
      newItem = withId;
    }

    this.data.push(newItem);
    this.saveData(this.data);
    return newItem;
  }

  update(id: K, updates: Partial<T>): T | null {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) return null;

    this.data[index] = { ...this.data[index], ...updates };
    this.saveData(this.data);
    return this.data[index];
  }

  delete(id: K): boolean {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) return false;

    this.data.splice(index, 1);
    this.saveData(this.data);
    return true;
  }

  private generateId(): K {
    const ids = this.data.map((item) => item.id);

    // If we have string IDs, generate a timestamp-based string ID
    if (ids.length > 0 && typeof ids[0] === "string") {
      return Date.now().toString() as K;
    }

    // Otherwise generate numeric ID
    const numericIds = ids.filter((id): id is number => typeof id === "number");
    const nextId = numericIds.length > 0 ? (Math.max(...numericIds) + 1) : 1;
    return nextId as K;
  }

  // Custom methods for specific data types
  filter(predicate: (item: T) => boolean): T[] {
    return this.data.filter(predicate);
  }

  sort(compareFn: (a: T, b: T) => number): T[] {
    return [...this.data].sort(compareFn);
  }
}
