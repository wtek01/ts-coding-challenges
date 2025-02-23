import { mergeSort } from "../../algorithms/mergeSort";

describe("mergeSort", () => {
  test("should sort an unsorted array", () => {
    expect(mergeSort([5, 3, 8, 4, 2])).toEqual([2, 3, 4, 5, 8]);
  });

  test("should handle already sorted array", () => {
    expect(mergeSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  test("should handle reverse sorted array", () => {
    expect(mergeSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  test("should handle array with duplicates", () => {
    expect(mergeSort([3, 1, 4, 1, 5, 9, 2, 6, 5, 3])).toEqual([
      1, 1, 2, 3, 3, 4, 5, 5, 6, 9,
    ]);
  });

  test("should handle empty array", () => {
    expect(mergeSort([])).toEqual([]);
  });

  test("should handle single element array", () => {
    expect(mergeSort([1])).toEqual([1]);
  });

  test("should handle negative numbers", () => {
    expect(mergeSort([-3, 1, -5, 2, -4])).toEqual([-5, -4, -3, 1, 2]);
  });
});
