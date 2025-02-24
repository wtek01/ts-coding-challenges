import Queue from "bull";
import { config } from "../../../config/environments";

/**
 * Gère une file d'attente de jobs persistante avec Redis/Bull
 * Permet l'exécution de jobs en parallèle avec gestion des priorités
 */
export class PersistentRedisJobQueue {
  /** Instance de la queue Bull connectée à Redis */
  private queue!: Queue.Queue;

  /**
   * Initialise la queue Redis et configure le worker
   * @param maxRetries Nombre maximum de tentatives en cas d'échec
   */
  constructor(private maxRetries = config.jobQueue.maxRetries) {
    this.initializeQueue();
    this.setupWorker();
    this.setupEventListeners();
  }

  /**
   * Initialise la connexion à Redis et crée la queue
   * @throws Error si la connexion à Redis échoue
   */
  private initializeQueue() {
    try {
      this.queue = new Queue("job-queue", {
        redis: config.redis,
      });
    } catch (error) {
      console.error("❌ Failed to initialize Redis queue:", error);
      throw error;
    }
  }

  /**
   * Configure le worker qui traite les jobs
   * Définit la logique de traitement avec gestion de la concurrence
   */
  private setupWorker() {
    this.queue.process(config.jobQueue.concurrency, async (job) => {
      try {
        console.log(`🚀 Processing ${job.id}: ${job.data.description}`);

        // Simule un traitement asynchrone
        await new Promise((resolve) =>
          setTimeout(() => {
            console.log(
              `⚙️ ${job.data.description} executing... (Duration: ${job.data.duration}ms)`
            );
            resolve(null);
          }, job.data.duration)
        );

        console.log(`✅ Job ${job.id} completed successfully`);
      } catch (error) {
        console.error(`❌ Error processing job ${job.id}:`, error);
        throw error; // Propage l'erreur pour la gestion des retries
      }
    });
  }

  /**
   * Configure les listeners pour suivre l'état des jobs
   * Gère les événements completed, failed et error
   */
  private setupEventListeners() {
    // Job terminé avec succès
    this.queue.on("completed", (job) => {
      console.log(`📊 Job ${job.id} completed successfully`);
    });

    // Job échoué - gestion des retries
    this.queue.on("failed", async (job, err) => {
      console.log(`❌ Job ${job.id} failed: ${err.message}`);
      if (job.attemptsMade < this.maxRetries) {
        console.log(`🔄 Retrying ${job.id} (Attempt ${job.attemptsMade + 1})`);
        await job.retry();
      } else {
        console.log(`🚨 Job ${job.id} permanently failed`);
      }
    });

    // Erreur au niveau de la queue
    this.queue.on("error", (error) => {
      console.error("🚨 Queue error:", error);
    });
  }

  /**
   * Ajoute un nouveau job à la queue
   * @param duration Durée d'exécution simulée en ms
   * @param priority Priorité du job (plus petit nombre = plus prioritaire)
   * @returns Le job créé
   * @throws Error si l'ajout échoue
   */
  async addJob(duration: number, priority: number = 0) {
    try {
      const job = await this.queue.add(
        {
          description: `Job with priority ${priority}`,
          duration: duration,
        },
        {
          priority,
          attempts: this.maxRetries,
          removeOnComplete: true,
        }
      );

      // Attendre que le job soit terminé
      await job.finished();

      return job;
    } catch (error) {
      console.error("❌ Error adding job:", error);
      throw error;
    }
  }

  /**
   * Ferme proprement la connexion à Redis
   * Important d'appeler cette méthode avant de terminer le programme
   * @throws Error si la fermeture échoue
   */
  async close() {
    try {
      await this.queue.close();
      console.log("👋 Queue closed properly");
    } catch (error) {
      console.error("❌ Error closing queue:", error);
      throw error;
    }
  }
}
