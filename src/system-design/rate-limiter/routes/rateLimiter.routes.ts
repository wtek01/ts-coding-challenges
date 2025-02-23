import { Router } from "express";
import { rateLimiter } from "../middleware/rateLimiter";

export function setupRateLimiterRoutes(router: Router) {
  router.get("/", rateLimiter(3, 5000), (req, res) => {
    res.send("Welcome! You are within the rate limit.");
  });

  router.get("/test", rateLimiter(3, 5000), (req, res) => {
    res.json({ message: "Success!" });
  });

  return router;
}
