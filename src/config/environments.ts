type Environment = {
  redis: {
    host: string;
    port: number;
  };
  jobQueue: {
    concurrency: number;
    maxRetries: number;
  };
};

const environments: Record<string, Environment> = {
  development: {
    redis: {
      host: "localhost",
      port: 6379,
    },
    jobQueue: {
      concurrency: 2,
      maxRetries: 3,
    },
  },
  production: {
    redis: {
      host: "redis",
      port: 6379,
    },
    jobQueue: {
      concurrency: 4,
      maxRetries: 5,
    },
  },
};

export const config = environments[process.env.NODE_ENV || "development"];
