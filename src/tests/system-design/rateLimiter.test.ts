import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { rateLimiter } from "../../system-design/rate-limiter/middleware/rateLimiter";

async function testRateLimiter() {
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
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Attendre 1s
  }
}

describe("Rate Limiter", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {
      ip: "127.0.0.1",
      headers: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("should allow requests within limit", () => {
    const limiter = rateLimiter(3, 5000);

    // Première requête
    limiter(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(nextFunction).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  test("should block requests over limit", () => {
    const limiter = rateLimiter(2, 5000);

    // 3 requêtes rapides
    for (let i = 0; i < 3; i++) {
      limiter(mockRequest as Request, mockResponse as Response, nextFunction);
    }

    expect(mockResponse.status).toHaveBeenCalledWith(429);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Too many requests, please try again later.",
    });
  });
});

export { testRateLimiter };
