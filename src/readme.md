# TS Coding Challenges

## 🎯 Vue d'ensemble

Collection de défis de programmation et patterns système implémentés en TypeScript, avec focus sur les files d'attente de jobs (in-memory et Redis).

## 🚀 Challenges

### System Design

1. **Job Queue**

   - In-Memory Implementation (`InMemoryJobQueue`)
   - Redis Implementation (`PersistentRedisJobQueue`)
   - Gestion des priorités
   - Traitement concurrent
   - Retry automatique

2. **Event Emitter**

   - Gestion d'événements personnalisée
   - Pattern Observer

3. **Rate Limiter**
   - Limitation de requêtes par IP
   - Fenêtre glissante

### Algorithmes

- First Unique Character
- Merge Sort
- Sliding Window Maximum
- LRU Cache

## 💻 Installation

```bash
# Installation des dépendances
npm install

# Pour la version Redis
docker run -d -p 6379:6379 redis
```

## 🏃‍♂️ Exécution

```bash
# Lancer un challenge spécifique
npm start <challenge-name>

# Exemples
npm start inMemoryJobQueue
npm start persistentRedisJobQueue
```

## 🔧 Architecture

### Job Queue System

#### InMemoryJobQueue

```typescript
class InMemoryJobQueue {
  private queue: Array<{
    id: string;
    job: () => Promise<void>;
    priority: number;
    retries: number;
  }>;

  constructor(private maxConcurrency = 2, private maxRetries = 3) {}
}
```

#### PersistentRedisJobQueue

```typescript
class PersistentRedisJobQueue {
  private queue!: Queue.Queue;

  constructor(private maxRetries = config.jobQueue.maxRetries) {
    this.initializeQueue();
    this.setupWorker();
    this.setupEventListeners();
  }
}
```

## ⚙️ Configuration

Configuration par environnement (`src/config/environments.ts`):

```typescript
const environments = {
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
```

## 🐳 Docker

### Structure

```
docker/
├── Dockerfile          # Configuration de l'image Node.js
└── docker-compose.yml  # Configuration des services
```

### Développement

```bash
# Démarrer Redis seul
docker run -d -p 6379:6379 redis

# Lancer l'application
NODE_ENV=development npm start persistentRedisJobQueue
```

### Production

```bash
# Démarrer l'ensemble du système
docker-compose up --build
```

## 🧪 Tests

```bash
# Lancer les tests
npm test

# Mode watch
npm run test:watch
```

## 📝 Logs et Monitoring

### Job Queue Events

```
➕ Job added       # Nouveau job
🚀 Processing     # Début du traitement
⚙️ Executing      # En cours d'exécution
✅ Completed      # Terminé avec succès
❌ Failed         # Échec
🔄 Retrying      # Nouvelle tentative
```

## 🔍 Points Techniques Clés

### TypeScript Features

- Generics
- Type Guards
- Interfaces & Types
- Access Modifiers
- Async/Await
- Decorators

### Design Patterns

- Observer (EventEmitter)
- Strategy (Queue Implementations)
- Factory (Queue Creation)
- Singleton (Configuration)

### Node.js Features

- Event Loop
- Promises
- Worker Queues
- Error Handling
- Middleware Pattern

## 🤝 Contribution

1. Fork
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Pull Request

## 📚 Documentation Associée

- [Bull Queue Documentation](https://github.com/OptimalBits/bull)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Redis Documentation](https://redis.io/documentation)

## 📜 License

MIT
