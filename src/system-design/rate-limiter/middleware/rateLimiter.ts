import { NextFunction, Request, RequestHandler, Response } from "express";

// Stocke les timestamps des requêtes par IP
// Map<IP, Array<Timestamp>>
const requests: Map<string, number[]> = new Map();

// maxRequests: nombre maximum de requêtes autorisées dans la fenêtre de temps
// windowMs: taille de la fenêtre de temps en millisecondes
export function rateLimiter(
  maxRequests: number,
  windowMs: number
): RequestHandler {
  // Middleware Express
  return (req: Request, res: Response, next: NextFunction) => {
    // Récupère l'IP du client (x-forwarded-for pour les proxies)
    const userIP = String(
      req.headers["x-forwarded-for"] || req.ip || "unknown"
    );

    const now = Date.now();
    // Récupère les timestamps existants ou tableau vide
    const timestamps = requests.get(userIP) || [];

    // Garde uniquement les timestamps dans la fenêtre de temps
    // Exemple: si windowMs = 10000, garde les timestamps < 10s
    const validTimestamps = timestamps.filter((ts) => now - ts < windowMs);

    // Si trop de requêtes dans la fenêtre, rejette la requête
    if (validTimestamps.length >= maxRequests) {
      res
        .status(429)
        .json({ message: "Too many requests, please try again later." });
      return; // return sans valeur
    }

    // Ajoute le timestamp actuel et met à jour la Map
    validTimestamps.push(now);
    requests.set(userIP, validTimestamps);

    // Passe au prochain middleware
    next();
  };
}
