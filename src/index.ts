import { firstUniqueChar } from "./algorithms/firstUniqueChar";
import lruCache from "./algorithms/lruCache";
import { mergeSort } from "./algorithms/mergeSort";
import { slidingWindowMax } from "./algorithms/slidingWindowMax";
import { EventEmitter } from "./system-design/event-emitter/eventEmitter";
import { startServer } from "./system-design/rate-limiter/server";
import { testRateLimiter } from "./tests/system-design/rateLimiter.test";
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
    console.log(slidingWindowMax([9, 11, 8, 5, 7, 10], 2)); // Expected: [11, 11, 11, 10]
    console.log(slidingWindowMax([4, 3, 2, 1], 2)); // Expected: [4, 3, 2]
    console.log(slidingWindowMax([10], 1)); // Expected: [10]
    console.log(slidingWindowMax([], 3)); // Expected: []
    break;
  case "cacheTest":
    testCache();
    break;
  case "mergeSort":
    console.log(mergeSort([5, 3, 8, 4, 2])); // Expected: [2, 3, 4, 5, 8]
    console.log(mergeSort([10, 1, 2, 3, 4, 5])); // Expected: [1, 2, 3, 4, 5, 10]
    console.log(mergeSort([7, 6, 5, 4, 3, 2, 1])); // Expected: [1, 2, 3, 4, 5, 6, 7]
    break;
  case "eventEmitter":
    testEventEmitter();
    break;
  case "rateLimiter":
    if (process.argv[3] === "test") {
      testRateLimiter();
    } else {
      console.log("🚀 Starting Rate Limiter Server...");
      startServer();
    }
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
  console.log("✅ Initial Cache:", cache.getKeys());

  cache.set("D", 4, 10000);
  console.log("🚀 After adding 'D':", cache.getKeys());

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

/**
 * Tests the EventEmitter class functionality
 * - Creates an EventEmitter instance
 * - Tests basic event subscription and emission
 * - Tests removing event listeners
 * - Tests one-time event listeners
 */
function testEventEmitter() {
  const emitter = new EventEmitter();

  // Multiple listeners pour le même événement 'userAction'
  emitter.on("userAction", (action: string) => console.log(`Log: ${action}`));
  emitter.on("userAction", (action: string) =>
    console.log(`Notify: ${action}`)
  );
  emitter.on("userAction", (action: string) =>
    console.log(`Analytics: ${action}`)
  );

  console.log("🟢 Testing multiple listeners:");
  emitter.emit("userAction", "login");
  // Sortie:
  // Log: login
  // Notify: login
  // Analytics: login

  // Define a simple greeting listener function
  const greet = (name: string) => console.log(`Hello, ${name}!`);

  // Subscribe the greet function to 'greet' event
  emitter.on("greet", greet);

  // Test basic event emission
  console.log("🟢 Emitting 'greet' event:");
  emitter.emit("greet", "Alice"); // Will print "Hello, Alice!"
  emitter.emit("greet", "Bob"); // Will print "Hello, Bob!"

  // Test removing an event listener
  console.log("🔴 Removing 'greet' listener");
  emitter.off("greet", greet);
  emitter.emit("greet", "Charlie"); // Nothing will happen as listener was removed

  // Test one-time event listener
  console.log("🟠 Registering 'farewell' event with once()");
  emitter.once("farewell", (name) => console.log(`Goodbye, ${name}!`));
  emitter.emit("farewell", "Alice"); // Will print "Goodbye, Alice!"
  emitter.emit("farewell", "Bob"); // Nothing happens - listener was removed after first use
}
