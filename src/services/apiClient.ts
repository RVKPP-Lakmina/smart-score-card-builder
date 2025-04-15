import CacheManager from "./CacheStorage";

const cache = CacheManager.getInstance();

export async function fetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  useCache = true,
  persistent = false
): Promise<T> {
  if (useCache && cache.has(key)) {
    const cached = cache.get(key);
    if (cached) return cached as T;
  }

  const data = await fetcher();
  cache.set(key, data, persistent);
  return data;
}
