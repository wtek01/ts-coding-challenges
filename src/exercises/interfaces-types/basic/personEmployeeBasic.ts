// 1. Type Person
export type Person = {
  name: string;
  age: number;
  // Propriété optionnelle
  department?: string;
};

// 2. Interface Employee (étend Person)
export interface Employee extends Person {
  jobTitle: string;
  // Propriété en lecture seule
  readonly id: number;
}

// 3. Fonction describeEmployee
export const describeEmployee = (employee: Employee): string => {
  const baseInfo = `${employee.name}, âgé de ${employee.age} ans, travaille comme ${employee.jobTitle}`;
  // Vérifie s’il y a un department
  const departmentInfo = employee.department
    ? ` dans le département ${employee.department}`
    : "";
  return `${baseInfo}${departmentInfo}. (ID: ${employee.id})`;
};

// 5. Petit test local (optionnel)
if (require.main === module) {
  const e: Employee = {
    id: 101, // readonly
    name: "Alice",
    age: 30,
    jobTitle: "Engineer",
    department: "R&D",
  };

  // La ligne suivante génèrerait une erreur de compilation (readonly) :
  // e.id = 999; // ❌ Erreur

  console.log(describeEmployee(e));
}
