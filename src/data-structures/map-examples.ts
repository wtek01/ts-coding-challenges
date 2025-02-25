/**
 * Démonstration de la structure de données Map en TypeScript
 */

export function demonstrateMaps() {
  console.log("🗺️ Map");
  console.log("------");

  // Création
  const userMap = new Map<string, { name: string; age: number }>();

  // Ajout
  userMap.set("user1", { name: "Alice", age: 30 });
  userMap.set("user2", { name: "Bob", age: 25 });
  userMap.set("user3", { name: "Charlie", age: 35 });

  console.log("Map de base:", userMap); // Map(3)

  // Accès et vérification
  console.log('get("user1"):', userMap.get("user1")); // { name: 'Alice', age: 30 }
  console.log('has("user4"):', userMap.has("user4")); // false
  console.log("size:", userMap.size); // 3

  // Suppression
  userMap.delete("user2");
  console.log("Après delete:", userMap); // Map(2) { 'user1' => {...}, 'user3' => {...} }

  // Itération
  console.log("Itération des clés:");
  for (const key of userMap.keys()) {
    console.log(`  ${key}`);
  }

  console.log("Itération des valeurs:");
  for (const value of userMap.values()) {
    console.log(`  ${value.name}, ${value.age} ans`);
  }

  console.log("Itération des entrées:");
  for (const [key, value] of userMap.entries()) {
    console.log(`  ${key}: ${value.name}, ${value.age} ans`);
  }

  console.log("Itération avec forEach:");
  userMap.forEach((value, key) => {
    console.log(`  ${key}: ${value.name}, ${value.age} ans`);
  });

  // Conversion
  console.log("Map to Array:", Array.from(userMap)); // [['user1', {...}], ['user3', {...}]]
  console.log("Map keys to Array:", Array.from(userMap.keys())); // ['user1', 'user3']
  console.log("Map values to Array:", Array.from(userMap.values())); // [{...}, {...}]

  // Initialisation avec des valeurs
  const prefilled = new Map([
    ["key1", "value1"],
    ["key2", "value2"],
  ]);
  console.log("Map préinitialisée:", prefilled); // Map(2)

  // Vider une Map
  userMap.clear();
  console.log("Après clear():", userMap); // Map(0)
}

// Si ce module est exécuté directement
if (require.main === module) {
  demonstrateMaps();
}
