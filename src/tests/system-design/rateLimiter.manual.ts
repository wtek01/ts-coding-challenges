import axios from "axios";

export async function testRateLimiter() {
  console.log("🚀 Testing Rate Limiter...");

  for (let i = 1; i <= 5; i++) {
    try {
      const response = await axios.get(
        "http://localhost:3000/rate-limiter/test"
      );
      console.log(`Request ${i}: ✅ Success:`, response.data);
    } catch (error: any) {
      console.log(`Request ${i}: ❌ Error:`, error.response.data);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
