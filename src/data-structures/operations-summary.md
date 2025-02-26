# Opérations sur Array et Map

## Array

### 🟢 Ajout d'éléments

- `push(item1, item2, ...)` : Ajoute un ou plusieurs éléments à la fin du tableau, retourne la nouvelle longueur
- `unshift(item1, item2, ...)` : Ajoute un ou plusieurs éléments au début du tableau, retourne la nouvelle longueur
- `splice(index, 0, item1, item2, ...)` : Insère un ou plusieurs éléments à une position spécifique

### 🔴 Suppression d'éléments

- `pop()` : Supprime et retourne le dernier élément du tableau
- `shift()` : Supprime et retourne le premier élément du tableau
- `splice(index, count)` : Supprime des éléments à partir d'un index, retourne les éléments supprimés
- `filter(predicate)` : Crée un nouveau tableau sans les éléments filtrés

### 🔄 Modifications

- `splice(index, count, ...newItems)` : Remplace des éléments
- `arr[index] = value` : Modifie un élément à un index spécifique
- `fill(value, start, end)` : Remplit une portion avec une valeur

### 🔍 Accès et recherche

- `arr[index]` : Accès direct par index
- `find(predicate)` : Trouve le premier élément qui satisfait un prédicat
- `findIndex(predicate)` : Trouve l'index du premier élément qui satisfait un prédicat
- `indexOf(item)` : Trouve l'index d'un élément
- `includes(item)` : Vérifie si un élément existe
- `some(predicate)` : Vérifie si au moins un élément satisfait un prédicat
- `every(predicate)` : Vérifie si tous les éléments satisfont un prédicat

### 🔄 Transformation

- `map(callback)` : Transforme chaque élément
- `reduce(callback, initialValue)` : Réduit à une seule valeur
- `flat()` : Aplatit un tableau imbriqué
- `sort(compareFn)` : Trie les éléments
- `reverse()` : Inverse l'ordre des éléments

### 🔀 Autres

- `slice(start, end)` : Extrait une portion sans modifier l'original
- `concat(arr2)` : Fusionne des tableaux
- `join(separator)` : Convertit en chaîne
- `length` : Propriété pour obtenir ou modifier la taille

## Map

### 🟢 Ajout / Modification

- `set(key, value)` : Ajoute ou remplace une paire clé-valeur

### 🔴 Suppression

- `delete(key)` : Supprime une entrée par sa clé
- `clear()` : Supprime toutes les entrées

### 🔍 Accès et recherche

- `get(key)` : Récupère la valeur associée à une clé
- `has(key)` : Vérifie si une clé existe

### 🧮 Informations

- `size` : Propriété retournant le nombre d'entrées

### 🔄 Itération

- `keys()` : Itérateur sur les clés
- `values()` : Itérateur sur les valeurs
- `entries()` : Itérateur sur les paires [clé, valeur]
- `forEach(callback)` : Exécute une fonction sur chaque entrée

### 🔄 Conversion

- `Array.from(map)` : Convertit en tableau de paires [clé, valeur]
- `Array.from(map.keys())` : Convertit les clés en tableau
- `Array.from(map.values())` : Convertit les valeurs en tableau
- `new Map(array)` : Crée une Map à partir d'un tableau de paires [clé, valeur]

## Différences clés pour les opérations similaires

| Opération    | Array                     | Map                        |
| ------------ | ------------------------- | -------------------------- |
| Ajout        | `push(item)`              | `set(key, value)`          |
| Suppression  | `splice(index, 1)`        | `delete(key)`              |
| Vider        | `length = 0`              | `clear()`                  |
| Accès        | `arr[index]`              | `get(key)`                 |
| Vérification | `includes(item)`          | `has(key)`                 |
| Taille       | `length` (propriété)      | `size` (propriété)         |
| Itération    | `for (const item of arr)` | `for (const [k,v] of map)` |
