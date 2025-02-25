import { formatValue, greet, joinStrings, sum } from "./typingBasicsEx";

describe("Exo 2 : Typing de base", () => {
  test("sum() calcule correctement la somme d'un tableau de nombres", () => {
    expect(sum([1, 2, 3, 4])).toBe(10);
    expect(sum([])).toBe(0);
  });

  test("greet() avec ou sans âge", () => {
    expect(greet("Alice", 30)).toBe("Bonjour Alice, tu as 30 ans.");
    expect(greet("Bob")).toBe("Bonjour Bob, je ne connais pas ton âge.");
  });

  test("joinStrings() concatène les chaînes avec un espace", () => {
    expect(joinStrings("Hello", "World", "TS")).toBe("Hello World TS");
    expect(joinStrings()).toBe("");
  });

  test("formatValue() surcharge pour number et string", () => {
    expect(formatValue(123)).toBe("Valeur numérique : 123");
    expect(formatValue("abc")).toBe("Valeur textuelle : abc");
  });
});
