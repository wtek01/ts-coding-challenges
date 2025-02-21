import { slidingWindowMax } from "../../challenges/slidingWindowMax";

describe("slidingWindowMax", () => {
  test("should handle empty array", () => {
    expect(slidingWindowMax([], 1)).toEqual([]);
  });

  test("should handle window size 1", () => {
    expect(slidingWindowMax([1, 2, 3, 4], 1)).toEqual([1, 2, 3, 4]);
  });

  test("should find maximum in each window", () => {
    expect(slidingWindowMax([1, 3, -1, -3, 5, 3, 6, 7], 3)).toEqual([
      3, 3, 5, 5, 6, 7,
    ]);
  });

  test("should handle window size equal to array length", () => {
    expect(slidingWindowMax([1, 2, 3], 3)).toEqual([3]);
  });

  test("should handle negative numbers", () => {
    expect(slidingWindowMax([-7, -8, 7, 5, 7, 1, 6, 0], 4)).toEqual([
      7, 7, 7, 7, 7,
    ]);
  });

  test("should handle array with same numbers", () => {
    expect(slidingWindowMax([1, 1, 1, 1], 2)).toEqual([1, 1, 1]);
  });

  test("should handle decreasing sequence", () => {
    expect(slidingWindowMax([5, 4, 3, 2, 1], 3)).toEqual([5, 4, 3]);
  });

  test("should handle increasing sequence", () => {
    expect(slidingWindowMax([1, 2, 3, 4, 5], 3)).toEqual([3, 4, 5]);
  });
});
