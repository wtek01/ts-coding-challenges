import { firstUniqueChar } from "./challenges/firstUniqueChar";
import lruCache from "./challenges/lruCache";
import { slidingWindowMax } from "./challenges/slidingWindowMax";

// Select the challenge to run
const challengeToRun = process.argv[2];

switch (challengeToRun) {
  case "firstUniqueChar":
    console.log(firstUniqueChar("javascript")); // Expected: "j"
    console.log(firstUniqueChar("aabbcc")); // Expected: null
    console.log(firstUniqueChar("developer")); // Expected: "d"
    console.log(firstUniqueChar("abacabad")); // Expected: "c"
    console.log(firstUniqueChar("abcdef")); // Expected: "a"
    break;
  case "slidingWindowMax":
    console.log(slidingWindowMax([1, 3, -1, -3, 5, 3, 6, 7], 3)); // Expected: [3, 3, 5, 5, 6, 7]
    /*console.log(slidingWindowMax([9, 11, 8, 5, 7, 10], 2)); // Expected: [11, 11, 11, 10]
    console.log(slidingWindowMax([4, 3, 2, 1], 2)); // Expected: [4, 3, 2]
    console.log(slidingWindowMax([10], 1)); // Expected: [10]
    console.log(slidingWindowMax([], 3)); // Expected: []*/
    break;
  case "cacheTest":
    testCache();
    break;
  default:
    console.log("❌ Please specify a valid challenge to run.");
}

function testCache() {
  const cache = new lruCache(3);
  console.log("🛠️ Cache initialized with max size = 3");

  cache.set("user:1", { name: "Alice" }, 3000);
  console.log("✅ Stored user:1 in cache");

  setTimeout(() => {
    console.log("🔍 Fetching before expiration:", cache.get("user:1")); // Should return { name: "Alice" }
  }, 2000);

  setTimeout(() => {
    console.log("🚨 Fetching after expiration:", cache.get("user:1")); // Should return null
  }, 4000);

  cache.set("A", 1, 10000);
  cache.set("B", 2, 10000);
  cache.set("C", 3, 10000);
  console.log("✅ Initial Cache:", Array.from(cache["storage"].keys())); // ["A", "B", "C"]

  cache.set("D", 4, 10000);
  console.log("🚀 After adding 'D':", Array.from(cache["storage"].keys())); // ["B", "C", "D"]

  cache.set("tempKey", "temporaryData", 5000);
  console.log("⏳ 'tempKey' stored in cache for 5s");
  setTimeout(() => {
    cache.delete("tempKey");
    console.log("🗑️ Manually deleted 'tempKey'");
  }, 2000);

  setTimeout(() => {
    console.log(
      "🔍 Fetching 'tempKey' after manual deletion:",
      cache.get("tempKey")
    ); // Should return null
  }, 6000);
}
