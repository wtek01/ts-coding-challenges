/**********************************************
 * 1) Fonction sum
 **********************************************/
export function sum(numbers: number[]): number {
  let total = 0;
  for (const num of numbers) {
    total += num;
  }
  return total;
}

/**********************************************
 * 2) Fonction greet (paramètre optionnel age?)
 **********************************************/
export function greet(name: string, age?: number): string {
  if (age !== undefined) {
    return `Bonjour ${name}, tu as ${age} ans.`;
  } else {
    return `Bonjour ${name}, je ne connais pas ton âge.`;
  }
}

/**********************************************
 * 3) Fonction joinStrings (rest parameters)
 **********************************************/
export function joinStrings(...items: string[]): string {
  return items.join(" ");
}

/**********************************************
 * 4) Bonus : surcharge (overload) formatValue
 **********************************************/
// Signatures :
export function formatValue(value: number): string;
export function formatValue(value: string): string;

// Implémentation commune :
export function formatValue(value: number | string): string {
  if (typeof value === "number") {
    return `Valeur numérique : ${value}`;
  } else {
    return `Valeur textuelle : ${value}`;
  }
}
