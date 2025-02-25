import { describeEmployee, Employee } from "./personEmployeeBasic";

describe("Exo 3 : Interfaces & Types", () => {
  test("describeEmployee()", () => {
    const emp: Employee = {
      id: 2025,
      name: "Bob",
      age: 28,
      jobTitle: "Developer",
    };
    const result = describeEmployee(emp);
    // Vérifier le contenu
    expect(result).toContain("Bob");
    expect(result).toContain("28 ans");
    expect(result).toContain("Developer");
    expect(result).toContain("ID: 2025");
  });
});
