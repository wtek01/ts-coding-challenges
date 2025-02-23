export class EventEmitter {
  // Map stockant les événements et leurs listeners
  // - clé : nom de l'événement (string)
  // - valeur : Set de fonctions (listeners) pour cet événement
  private events: Map<string, Set<(...args: any[]) => void>>;

  constructor() {
    this.events = new Map();
  }

  // Ajoute un listener pour un événement
  // event: nom de l'événement
  // listener: fonction à exécuter quand l'événement est émis
  on(event: string, listener: (...args: any[]) => void): void {
    // Crée un nouveau Set si l'événement n'existe pas
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    // Ajoute le listener au Set de cet événement
    this.events.get(event)?.add(listener);
  }

  // Émet un événement avec des arguments
  // event: nom de l'événement à émettre
  // args: arguments à passer aux listeners
  emit(event: string, ...args: any[]): void {
    if (this.events.has(event)) {
      // Exécute chaque listener avec les arguments fournis
      this.events.get(event)?.forEach((listener) => listener(...args));
    }
  }

  // Supprime un listener spécifique d'un événement
  off(event: string, listener: (...args: any[]) => void): void {
    if (this.events.has(event)) {
      // Supprime le listener du Set
      this.events.get(event)?.delete(listener);
      // Si plus aucun listener, supprime l'événement
      if (this.events.get(event)?.size === 0) {
        this.events.delete(event);
      }
    }
  }

  // Ajoute un listener qui ne s'exécute qu'une seule fois
  once(event: string, listener: (...args: any[]) => void): void {
    // Crée un wrapper qui :
    // 1. Exécute le listener
    // 2. Se supprime lui-même après exécution
    const onceWrapper = (...args: any[]) => {
      listener(...args);
      this.off(event, onceWrapper);
    };
    this.on(event, onceWrapper);
  }
}
