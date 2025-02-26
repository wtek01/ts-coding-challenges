import axios from "axios";

// Define interface for the API response item
interface Appliance {
  id: number;
  uid: string;
  brand: string;
  equipment: string;
}

// Interface for the count result using Record utility type
type BrandCount = Record<string, number>;

/**
 * Fetches appliance data from the API
 * @returns Promise that resolves to appliance data
 */
async function fetchApplianceData(): Promise<Appliance[]> {
  try {
    const response = await axios.get<Appliance[]>(
      "https://random-data-api.com/api/v2/appliances?size=30"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching appliance data:", error);
    throw error;
  }
}

/**
 * Method 1: Using reduce with object accumulator
 *
 * PROS:
 * - Concise and functional programming style
 * - Single pass through the data (O(n) complexity)
 * - Expressive and readable for developers familiar with functional programming
 * - Elegant solution that avoids mutable state outside the reducer
 *
 * CONS:
 * - May be less intuitive for beginners or those unfamiliar with reduce
 * - Requires understanding of how accumulator works in reduce
 * - Slightly steeper learning curve than imperative approaches
 */
export async function countWithReduce(): Promise<BrandCount> {
  const data = await fetchApplianceData();

  return data.reduce((acc: BrandCount, item: Appliance) => {
    const { brand } = item;
    acc[brand] = (acc[brand] || 0) + 1;
    return acc;
  }, {});
}

/**
 * Method 2: Using forEach with object
 *
 * PROS:
 * - More explicit and easier to understand for most developers
 * - Good for those familiar with imperative programming style
 * - Single pass through the data (O(n) complexity)
 * - Clear step-by-step logic that's easy to follow
 *
 * CONS:
 * - Slightly more verbose than the reduce approach
 * - Less functional in style
 * - Relies on mutating an external object
 */
export async function countWithForEach(): Promise<BrandCount> {
  const data = await fetchApplianceData();
  const brandCounts: BrandCount = {};

  data.forEach((item) => {
    const { brand } = item;
    if (!brandCounts[brand]) {
      brandCounts[brand] = 1;
    } else {
      brandCounts[brand]++;
    }
  });

  return brandCounts;
}

/**
 * Method 3: Using Map data structure
 *
 * PROS:
 * - Map preserves insertion order (objects didn't guarantee this before ES2015)
 * - Better for key iteration and has built-in size property
 * - Slightly better performance for large datasets
 * - Can use any type as keys (not just strings)
 * - More memory efficient for large datasets
 *
 * CONS:
 * - Requires conversion to object if JSON serialization is needed
 * - Less familiar syntax for some developers
 * - Not as widely used in JavaScript/TypeScript codebases
 * - Extra step needed to convert to plain object for some operations
 */
export async function countWithMap(): Promise<Map<string, number>> {
  const data = await fetchApplianceData();
  const brandCounts = new Map<string, number>();

  for (const item of data) {
    const { brand } = item;
    brandCounts.set(brand, (brandCounts.get(brand) || 0) + 1);
  }

  return brandCounts;
}

/**
 * Method 4: Using filter and array methods
 *
 * PROS:
 * - Very explicit approach that clearly shows what's happening
 * - Easy to understand the logic, even for beginners
 * - Uses modern JavaScript features (Set, spread operator)
 * - Good for educational purposes to understand the problem
 *
 * CONS:
 * - Least efficient method - O(n²) complexity as it iterates through data multiple times
 * - Creates unnecessary intermediate arrays
 * - Not suitable for large datasets
 * - Significantly worse performance compared to other methods
 */
export async function countWithFilter(): Promise<BrandCount> {
  const data = await fetchApplianceData();
  const uniqueBrands = [...new Set(data.map((item) => item.brand))];

  const brandCounts: BrandCount = {};
  uniqueBrands.forEach((brand) => {
    brandCounts[brand] = data.filter((item) => item.brand === brand).length;
  });

  return brandCounts;
}

/**
 * Method 5: Using for...of loop with conditional
 *
 * PROS:
 * - Traditional loop approach that's very explicit
 * - Straightforward and easy to understand
 * - Single pass through data (O(n) complexity)
 * - Good performance similar to forEach and reduce
 * - Familiar syntax for developers from many language backgrounds
 *
 * CONS:
 * - Less functional style
 * - Slightly more verbose than reduce
 * - Relies on mutating an external object
 * - Not as declarative as functional approaches
 */
export async function countWithForOf(): Promise<BrandCount> {
  const data = await fetchApplianceData();
  const brandCounts: BrandCount = {};

  for (const item of data) {
    const { brand } = item;
    brandCounts[brand] = brandCounts[brand] ? brandCounts[brand] + 1 : 1;
  }

  return brandCounts;
}

// Execute if this file is run directly
if (require.main === module) {
  // Just run the reduce method by default when file is executed directly
  console.log("🔍 Running brand counting with reduce method:");
  countWithReduce().then((result) => {
    console.log(result);
  });
}
