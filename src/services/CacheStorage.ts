type CacheItem<T> = {
  data: T;
  lastAccess: number;
  persistent: boolean;
};

export default class CacheManager {
  private static instance: CacheManager;
  private cache: Map<string, CacheItem<unknown>>;
  private readonly timeout: number = 30 * 60 * 1000;

  private constructor() {
    this.cache = new Map();
    this.startGarbageCollector();
  }

  public static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  public set(key: string, value: unknown, persistent = false): void {
    this.cache.set(key, {
      data: value,
      lastAccess: Date.now(),
      persistent,
    });
  }

  public get(key: string): unknown | null {
    const item = this.cache.get(key);
    if (!item) return null;

    item.lastAccess = Date.now();
    return item.data;
  }

  public has(key: string): boolean {
    return this.cache.has(key);
  }

  public clear(key: string): void {
    this.cache.delete(key);
  }

  public clearAll(): void {
    this.cache.clear();
  }

  private startGarbageCollector(): void {
    setInterval(() => {
      const now = Date.now();
      for (const [key, item] of this.cache.entries()) {
        if (!item.persistent && now - item.lastAccess > this.timeout) {
          this.cache.delete(key);
        }
      }
    }, 5 * 60 * 1000);
  }
}
