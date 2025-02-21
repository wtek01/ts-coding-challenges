import { firstUniqueChar } from "../../challenges/firstUniqueChar";

describe("firstUniqueChar", () => {
  test("should find first non-repeating character", () => {
    expect(firstUniqueChar("leetcode")).toBe(0); // 'l' is the first unique char
    expect(firstUniqueChar("loveleetcode")).toBe(2); // 'v' is the first unique char
  });

  test("should return -1 when no unique character exists", () => {
    expect(firstUniqueChar("aabb")).toBe(-1);
  });

  test("should handle empty string", () => {
    expect(firstUniqueChar("")).toBe(-1);
  });

  test("should handle single character", () => {
    expect(firstUniqueChar("a")).toBe(0);
  });

  test("should handle all repeating characters", () => {
    expect(firstUniqueChar("aaaaaa")).toBe(-1);
  });

  test("should handle case sensitivity", () => {
    expect(firstUniqueChar("aA")).toBe(0);
  });

  test("should handle complex strings", () => {
    expect(firstUniqueChar("dddccdbba")).toBe(8); // 'a' is the first unique
  });
});
