/**
 * Démonstration de la structure de données Array en TypeScript
 */

export function demonstrateArrays() {
  console.log("📋 Array (Tableau)");
  console.log("----------------");

  // Création
  const numbers = [1, 2, 3, 4, 5];
  const fruits = ["apple", "banana", "orange"];
  const mixed = [1, "hello", true, { id: 1 }];

  // Accès
  console.log("Premier élément:", numbers[0]); // 1
  console.log("Dernier élément:", fruits[fruits.length - 1]); // orange

  // Méthodes de base
  console.log("length:", numbers.length); // 5

  // Ajout/Suppression
  numbers.push(6); // Ajoute à la fin
  console.log("Après push:", numbers); // [1, 2, 3, 4, 5, 6]

  const popped = numbers.pop(); // Retire de la fin
  console.log("pop retourne:", popped); // 6
  console.log("Après pop:", numbers); // [1, 2, 3, 4, 5]

  numbers.unshift(0); // Ajoute au début
  console.log("Après unshift:", numbers); // [0, 1, 2, 3, 4, 5]

  const shifted = numbers.shift(); // Retire du début
  console.log("shift retourne:", shifted); // 0
  console.log("Après shift:", numbers); // [1, 2, 3, 4, 5]

  // Manipulation
  const spliced = numbers.splice(2, 2, 10, 11); // Remplace 2 éléments à partir de l'indice 2
  console.log("splice retourne:", spliced); // [3, 4]
  console.log("Après splice:", numbers); // [1, 2, 10, 11, 5]

  // Itération
  console.log("Itération foreach:");
  numbers.forEach((num, index) => {
    console.log(`  numbers[${index}] = ${num}`);
  });

  // Ajout d'une variable index dans la boucle for...of
  console.log("Itération for...of:");
  let i = 0;
  for (const num of numbers) {
    console.log(`  numbers[${i}] = ${num}`);
    i++;
  }

  // Transformations
  const doubled = numbers.map((n) => n * 2);
  console.log("map:", doubled); // [2, 4, 20, 22, 10]

  const filtered = numbers.filter((n) => n > 5);
  console.log("filter:", filtered); // [10, 11]

  const reduced = numbers.reduce((sum, n) => sum + n, 0);
  console.log("reduce:", reduced); // 29

  // Recherche
  const found = numbers.find((n) => n > 5);
  console.log("find:", found); // 10

  const some = numbers.some((n) => n % 2 === 0);
  console.log("some:", some); // true

  const every = numbers.every((n) => n > 0);
  console.log("every:", every); // true
  console.log("includes:", numbers.includes(11)); // true
  console.log("indexOf:", numbers.indexOf(5)); // 4

  // Tri
  const unsorted = [5, 2, 8, 1, 4];
  console.log(
    "sort:",
    [...unsorted].sort((a, b) => a - b)
  ); // [1, 2, 4, 5, 8]

  // Conversion
  console.log("join:", numbers.join(", ")); // "1, 2, 10, 11, 5"

  // Opérations avancées
  const arr1 = [1, 2];
  const arr2 = [3, 4];
  console.log("concat:", arr1.concat(arr2)); // [1, 2, 3, 4]
  console.log("spread:", [...arr1, ...arr2]); // [1, 2, 3, 4]
  console.log("slice:", numbers.slice(1, 3)); // [2, 10]
}

// Si ce module est exécuté directement
if (require.main === module) {
  demonstrateArrays();
}
