// personEmployeeDetailed.ts

/**********************
 * 1) TYPE PERSON
 **********************/
// On choisit "type" pour la flexibilité (union, intersections éventuelles).
export type Person = {
  readonly id: number; // immuable
  name: string;
  age?: number; // optionnel
};

/**********************
 * 2) INTERFACE EMPLOYEE
 **********************/
// On choisit "interface" parce qu'on veut potentiellement faire extends plus tard
export interface Employee extends Person {
  jobTitle: string;
  // On peut définir des méthodes (optionnel)
  getDescription(): string;
}

/**********************
 * 3) CLASSE "DEV" QUI IMPLEMENTE L'INTERFACE
 **********************/
export class Dev implements Employee {
  // Hérite des props de Person + Employee
  public readonly id: number;
  public name: string;
  public jobTitle: string;
  public age?: number;

  constructor(id: number, name: string, jobTitle: string, age?: number) {
    this.id = id;
    this.name = name;
    this.jobTitle = jobTitle;
    if (age !== undefined) {
      this.age = age;
    }
  }

  getDescription(): string {
    return `${this.name} (${this.id}) est ${this.jobTitle} ${
      this.age ? `et a ${this.age} ans.` : ""
    }`;
  }
}

/**********************
 * 4) UNION DE TYPES (POUR ADMIN VS STANDARD)
 **********************/
// On définit un type qui gère deux formats de "permissions" possibles
export type UserPermission =
  | { isAdmin: true; superAccess: boolean }
  | { isAdmin: false; restrictedAreas: string[] };

/**********************
 * 5) FONCTION QUI PREND UN EMPLOYEE + PERMISSION
 **********************/
export const setPermissions = (
  employee: Employee,
  permission: UserPermission
): string => {
  if (permission.isAdmin) {
    // TypeScript comprend que isAdmin = true
    return `${employee.name} a des droits d'ADMIN (SuperAccess = ${permission.superAccess})`;
  } else {
    // Ici isAdmin = false
    return `${
      employee.name
    } est un utilisateur standard, accès restreint : ${permission.restrictedAreas.join(
      ", "
    )}`;
  }
};

/**********************
 * 6) TEST LOCAL
 **********************/
if (require.main === module) {
  const devAlice = new Dev(101, "Alice", "Software Engineer", 25);
  console.log(devAlice.getDescription());

  // On lui assigne des droits d'admin
  const adminPermission: UserPermission = { isAdmin: true, superAccess: true };
  console.log(setPermissions(devAlice, adminPermission));

  // On crée un autre employee "Bob"
  const bob: Employee = {
    id: 102,
    name: "Bob",
    jobTitle: "QA Tester",
    getDescription: function () {
      return `Employee: ${this.name} (ID: ${this.id})`;
    },
  };

  // On lui donne des droits restreints
  const standardPermission: UserPermission = {
    isAdmin: false,
    restrictedAreas: ["AdminPanel", "Payments"],
  };
  console.log(setPermissions(bob, standardPermission));
}
