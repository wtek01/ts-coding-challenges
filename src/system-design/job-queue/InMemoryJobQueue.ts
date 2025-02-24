export class InMemoryJobQueue {
  private queue: Array<{
    id: string;
    job: () => Promise<void>;
    priority: number;
    retries: number;
  }> = [];
  private activeJobs: number = 0;
  private isProcessing: boolean = false;

  constructor(private maxConcurrency = 2, private maxRetries = 3) {}

  // Add a new job with priority
  addJob(job: () => Promise<void>, priority: number = 0): void {
    const jobId = `Job-P${priority}`;
    this.queue.push({ id: jobId, job, priority, retries: 0 });
    this.queue.sort((a, b) => b.priority - a.priority);

    console.log(
      `➕ ${jobId} added with priority ${priority}. Queue size: ${this.queue.length}`
    );
    // Ne pas démarrer immédiatement
  }

  // Nouvelle méthode pour démarrer le traitement
  start(): void {
    console.log("🎬 Starting job processing...");
    this.processQueue();
  }

  private getDuration(start: string, end: string): number {
    return new Date(end).getTime() - new Date(start).getTime();
  }

  // Process jobs in parallel based on concurrency limit and priority
  private async processQueue(): Promise<void> {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.queue.length > 0 && this.activeJobs < this.maxConcurrency) {
      const { id, job, priority, retries } = this.queue.shift()!;
      this.activeJobs++;
      const startTime = new Date().toISOString();

      console.log(
        `🚀 ${id} starting execution at ${startTime}. Active jobs: ${this.activeJobs}`
      );

      job()
        .then(() => {
          const endTime = new Date().toISOString();
          const duration = this.getDuration(startTime, endTime);
          console.log(`✅ ${id} completed. Duration: ${duration}ms`);
        })
        .catch((error) => {
          console.log(
            `❌ ${id} failed. Retry ${retries + 1}/${this.maxRetries}`
          );
          if (retries < this.maxRetries) {
            this.queue.push({ id, job, priority, retries: retries + 1 });
            this.queue.sort((a, b) => b.priority - a.priority);
          } else {
            console.log(`🚨 ${id} permanently failed.`);
          }
        })
        .finally(() => {
          this.activeJobs--;
          console.log(
            `📊 Active jobs: ${this.activeJobs}, Queue size: ${this.queue.length}`
          );
          this.processQueue();
        });
    }

    this.isProcessing = false;
  }
}
