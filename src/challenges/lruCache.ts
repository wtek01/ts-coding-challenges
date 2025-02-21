export default class lruCache {
  private cache: Map<string, { value: any; expiresAt: number }>;
  private maxSize: number;

  constructor(maxSize = 5) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  set(key: string, value: any, ttl: number): void {
    const expiresAt = Date.now() + ttl;

    // Si la clé existe déjà, la supprimer d'abord pour la réinsérer à la fin
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    // Si le cache est plein, supprimer la première entrée (la plus ancienne)
    else if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(key, { value, expiresAt });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    // Mettre à jour l'ordre LRU en supprimant et réinsérant
    this.cache.delete(key);
    this.cache.set(key, item);

    return item.value;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}
