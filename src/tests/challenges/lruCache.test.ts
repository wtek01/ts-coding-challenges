import lruCache from "../../challenges/lruCache";

describe("LRUCache", () => {
  test("should handle basic get and set operations", () => {
    const cache = new lruCache(2);
    cache.set("1", 1, 1000);
    cache.set("2", 2, 1000);
    expect(cache.get("1")).toBe(1);
    cache.set("3", 3, 1000);
    expect(cache.get("2")).toBe(null);
    cache.set("4", 4, 1000);
    expect(cache.get("1")).toBe(null);
    expect(cache.get("3")).toBe(3);
    expect(cache.get("4")).toBe(4);
  });

  test("should handle updating existing keys", () => {
    const cache = new lruCache(2);
    cache.set("1", 1, 1000);
    cache.set("1", 2, 1000);
    expect(cache.get("1")).toBe(2);
  });

  test("should handle capacity of 1", () => {
    const cache = new lruCache(1);
    cache.set("1", 1, 1000);
    cache.set("2", 2, 1000);
    expect(cache.get("1")).toBe(null);
    expect(cache.get("2")).toBe(2);
  });

  test("should handle getting non-existent keys", () => {
    const cache = new lruCache(2);
    expect(cache.get("1")).toBe(null);
  });

  test("should update access order on get", () => {
    const cache = new lruCache(2);
    cache.set("1", 1, 1000);
    cache.set("2", 2, 1000);
    cache.get("1");
    cache.set("3", 3, 1000);
    expect(cache.get("2")).toBe(null);
    expect(cache.get("1")).toBe(1);
  });
});
