import { NextFunction, Request, Response } from "express";
import { rateLimiter } from "../../system-design/rate-limiter/middleware/rateLimiter";

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
    limiter(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(nextFunction).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  test("should block requests over limit", () => {
    const limiter = rateLimiter(2, 5000);
    for (let i = 0; i < 3; i++) {
      limiter(mockRequest as Request, mockResponse as Response, nextFunction);
    }
    expect(mockResponse.status).toHaveBeenCalledWith(429);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Too many requests, please try again later.",
    });
  });
});
