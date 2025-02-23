export function mergeSort(arr: number[]): number[] {
  console.log("\nAppel mergeSort avec:", arr);

  if (arr.length <= 1) {
    console.log("Cas de base, retourne:", arr);
    return arr; // Base case: already sorted
  }

  const mid = Math.floor(arr.length / 2);
  console.log(`Division à mid=${mid}:`);
  console.log("Gauche:", arr.slice(0, mid));
  console.log("Droite:", arr.slice(mid));
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  console.log("Fusion de", left, "et", right);
  return merge(left, right);
}

// Helper function to merge two sorted arrays
function merge(left: number[], right: number[]): number[] {
  console.log("Fusion en cours:", left, right);
  let result: number[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}

/*
function mergeSort(arr: number[]): number[] {  // [8, 4, 2]
  if (arr.length <= 1) return arr;
  
  const mid = 1;
  const left = mergeSort([8]);               // ⬅️ Retourne [8]
  const right = mergeSort([4, 2]) {         // ⬅️ Cette ligne attend le résultat
    // Traitement récursif de [4, 2]
    const mid = 1;
    const left = mergeSort([4]);            // Retourne [4]
    const right = mergeSort([2]);           // Retourne [2]
    return merge([4], [2]);                 // ➡️ Retourne [2, 4]
  }
  
  return merge([8], [2, 4]);                // Utilise le résultat retourné
}*/

// lacomplexité est de O(n log n)
/*
La complexité temporelle de l'algorithme de tri fusion (Merge Sort) est O(n log n) :

- La partie "diviser" (splitting) divise récursivement le tableau en deux à chaque étape, 
  créant un arbre binaire de profondeur log n. C'est le "log n" dans la complexité.
  Pour n = 8 éléments :
  Niveau 1: [1,2,3,4,5,6,7,8]     → 1 tableau de 8
  Niveau 2: [1,2,3,4] [5,6,7,8]   → 2 tableaux de 4
  Niveau 3: [1,2] [3,4] [5,6] [7,8] → 4 tableaux de 2
  Niveau 4: [1] [2] [3] [4] [5] [6] [7] [8] → 8 tableaux de 1

- La partie "fusion" (merging) à chaque niveau nécessite de parcourir tous les éléments 
  pour les fusionner dans le bon ordre. C'est le "n" dans la complexité.
Fusion (n)
function merge(left, right) {
  // Compare et fusionne n éléments au total
  while (i < left.length && j < right.length) {
    // ...
  }
}

- Comme on effectue n opérations à chaque niveau et qu'il y a log n niveaux, 
  la complexité totale est O(n log n).

La complexité spatiale est O(n) car on a besoin d'espace supplémentaire pour stocker 
les tableaux temporaires lors des fusions.

Coût de n comparaisons par niveau
Complexité totale = (log n niveaux) × (n opérations par niveau) = O(n log n)

*/
