export function firstUniqueChar(s: string): number {
  const charCount = new Map<string, number>();

  // Count occurrences of each character
  for (const char of s) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }

  // Find first character with count 1
  for (let i = 0; i < s.length; i++) {
    if (charCount.get(s[i]) === 1) {
      return i;
    }
  }

  return -1;
}
