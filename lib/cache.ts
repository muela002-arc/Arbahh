type CacheEntry<T> = {
  expiresAt: number;
  value: T;
};

const globalCache = globalThis as typeof globalThis & {
  __arbahCache?: Map<string, CacheEntry<unknown>>;
};

const cache = globalCache.__arbahCache ?? new Map<string, CacheEntry<unknown>>();
globalCache.__arbahCache = cache;

export function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (entry.expiresAt < Date.now()) {
    cache.delete(key);
    return null;
  }
  return entry.value as T;
}

export function setCached<T>(key: string, value: T, ttlMs: number) {
  cache.set(key, {
    expiresAt: Date.now() + ttlMs,
    value
  });
}
