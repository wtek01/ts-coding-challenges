export function slidingWindowMax(nums: number[], k: number): number[] {
  if (!nums.length) return [];

  const result: number[] = [];
  const deque: number[] = []; // Stores indices of useful elements

  for (let i = 0; i < nums.length; i++) {
    // Remove elements out of the current window
    if (deque.length && deque[0] < i - k + 1) {
      console.log("Removing element out of window 1:", deque);
      deque.shift();
      console.log("Removing element out of window 2:", deque);
    }

    // Remove smaller elements from the end
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      console.log("Removing smaller element from end i:", i);
      console.log("Removing smaller element from end 1:", deque);
      deque.pop();
      console.log("Removing smaller element from end 2:", deque);
    }

    // Add the current element index
    console.log("Adding current element to deque 1:", i);
    deque.push(i);
    console.log("Adding current element to deque 2:", deque);

    // Push the max value of the window into result
    if (i >= k - 1) {
      console.log("Pushing max value to result:", nums[deque[0]]);
      result.push(nums[deque[0]]);
      console.log("Pushing max value to result 2:", result);
    }
  }

  return result;
}
