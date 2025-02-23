import express from "express";
import { setupRateLimiterRoutes } from "./routes/rateLimiter.routes";
// import { setupJobQueueRoutes } from './routes/jobQueue.routes';

const app = express();
const PORT = 3000;

// Routes
app.use("/rate-limiter", setupRateLimiterRoutes(express.Router()));
// app.use('/job-queue', setupJobQueueRoutes(express.Router()));

export function startServer() {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log("Available endpoints:");
    console.log("- GET /rate-limiter");
    console.log("- GET /rate-limiter/test");
  });
}
