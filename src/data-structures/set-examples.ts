/**
 * Démonstration de la structure de données Set en TypeScript
 */

export function demonstrateSets() {
  console.log("🔢 Set");
  console.log("------");

  // Création
  const uniqueNumbers = new Set([1, 2, 2, 3, 4, 4, 5]);
  console.log("Set de base:", uniqueNumbers); // Set(5) { 1, 2, 3, 4, 5 }

  // Méthodes de base
  console.log("size:", uniqueNumbers.size); // 5

  // Ajout/Suppression
  uniqueNumbers.add(6);
  console.log("Après add(6):", uniqueNumbers); // Set(6) { 1, 2, 3, 4, 5, 6 }

  uniqueNumbers.delete(3);
  console.log("Après delete(3):", uniqueNumbers); // Set(5) { 1, 2, 4, 5, 6 }

  // Vérification
  console.log("has(4):", uniqueNumbers.has(4)); // true
  console.log("has(10):", uniqueNumbers.has(10)); // false

  // Itération
  console.log("Set values:");
  for (const num of uniqueNumbers) {
    console.log(`  ${num}`);
  }

  // Conversion
  console.log("Set to Array:", Array.from(uniqueNumbers)); // [1, 2, 4, 5, 6]
  console.log("Set to Array (spread):", [...uniqueNumbers]); // [1, 2, 4, 5, 6]

  // Opérations sur les ensembles
  const setA = new Set([1, 2, 3, 4]);
  const setB = new Set([3, 4, 5, 6]);

  // Union (A ∪ B)
  const union = new Set([...setA, ...setB]);
  console.log("Union:", union); // Set(6) { 1, 2, 3, 4, 5, 6 }

  // Intersection (A ∩ B)
  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  console.log("Intersection:", intersection); // Set(2) { 3, 4 }

  // Différence (A - B)
  const difference = new Set([...setA].filter((x) => !setB.has(x)));
  console.log("Différence (A-B):", difference); // Set(2) { 1, 2 }

  // Vider un Set
  uniqueNumbers.clear();
  console.log("Après clear():", uniqueNumbers); // Set(0) {}
}

// Si ce module est exécuté directement
if (require.main === module) {
  demonstrateSets();
}
