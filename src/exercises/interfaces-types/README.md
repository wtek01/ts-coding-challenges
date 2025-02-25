# Interfaces & Types

1. Les fondements de `type` et `interface`.
2. Les possibilités d’extension, de fusion et d’union.
3. Des exemples d’utilisation plus avancés (types utilitaires, intersection, union, etc.).
4. Un exemple de code concret illustrant tous ces points.

---

## 1. Fondements : `type` vs `interface`

### 1.1 `type` (Alias de type)

- **But** : un `type` permet de créer un alias pour n’importe quelle définition de type.
  - On peut “renommer” un type existant (`string`, `number`, etc.).
  - On peut créer un alias pour des objets, unions, intersections, tuples…
- **Syntaxe** :
  ```ts
  type NomType = définition;
  ```
- **Exemples** :
  ```ts
  type StringOrNumber = string | number;
  type Point2D = { x: number; y: number };
  type Handler = (e: MouseEvent) => void;
  ```

#### Caractéristiques marquantes

1. **Plus flexible** : `type` gère les unions et intersections de façon plus “littérale”.
2. **Pas de “merge” implicite** : si on redéfinit le même nom de type, TypeScript renverra une erreur (_Duplicate identifier_). On ne peut pas “fusionner” deux définitions pour un même alias.

### 1.2 `interface`

- **But** : définir la structure d’un objet (typages de propriétés, méthodes, etc.).
- **Syntaxe** :
  ```ts
  interface NomInterface {
    propriété1: Type;
    propriété2?: Type;
    methode(): TypeRetour;
  }
  ```
- **Exemples** :
  ```ts
  interface User {
    id: number;
    username: string;
    isAdmin?: boolean;
    greet(): string;
  }
  ```
- **Extension** :
  ```ts
  interface Employee extends User {
    salary: number;
  }
  ```

#### Caractéristiques marquantes

1. **Possibilité de fusionner (declaration merging)** : si on redéclare la même interface `User` ailleurs, TypeScript merge les propriétés.
2. **Utilisé pour la POO** : on peut implémenter une interface dans une classe (`class Foo implements Bar {}`).

---

## 2. Possibilités d’extension, de fusion et d’union

### 2.1 Extension

- **Avec `interface`**

  ```ts
  interface Person {
    name: string;
    age: number;
  }

  interface Employee extends Person {
    jobTitle: string;
  }
  ```

  On peut aussi imbriquer des interfaces pour modéliser des hiérarchies.

- **Avec `type` (intersection)**

  ```ts
  type Person = {
    name: string;
    age: number;
  };

  type Employee = Person & {
    jobTitle: string;
  };
  ```

  On obtient le même résultat via l’opérateur `&`.

### 2.2 Union de types

- **Impossible directement avec `interface`** (on ne peut pas faire `interface A = B | C`).
- **Possible avec `type`**
  ```ts
  type LoginResponse =
    | { success: true; token: string }
    | { success: false; errorMsg: string };
  ```
  Ici, `LoginResponse` peut être l’un ou l’autre objet.

### 2.3 Fusion (declaration merging)

- **Uniquement avec `interface`** :

  ```ts
  interface Window {
    customProp?: string;
  }

  // Dans un autre fichier :
  interface Window {
    anotherProp: number;
  }

  // TypeScript fusionne => Window aura customProp et anotherProp
  ```

- **`type`** n’autorise pas le merging : on aurait une erreur “Duplicate identifier”.

---

## 3. Exemples d’utilisation avancée

### 3.1 Propriétés optionnelles, readonly, etc.

Avec `type` ou `interface`, on peut marquer des propriétés comme `readonly` ou `?` :

```ts
type Person = {
  readonly id: number;
  name: string;
  age?: number;
};
```

```ts
interface Employee {
  readonly id: number;
  jobTitle: string;
  salary?: number; // optionnel
}
```

### 3.2 Types utilitaires intégrés

- **Pick, Omit, Partial, Required, Readonly** :

  ```ts
  interface User {
    id: number;
    username: string;
    email: string;
  }

  type PartialUser = Partial<User>; // rend toutes les propriétés optionnelles
  type ReadonlyUser = Readonly<User>; // rend toutes les propriétés en readonly
  type UserWithoutEmail = Omit<User, "email">; // supprime la prop email
  ```

- Fonctionnent avec `interface` comme avec `type`.

### 3.3 Implémentation dans une classe

Avec `interface`, on peut faire :

```ts
interface Flyable {
  fly(): void;
}

class Bird implements Flyable {
  fly() {
    console.log("Bird is flying!");
  }
}
```

_(On pourrait aussi le faire avec `type`, mais c’est moins idiomatique.)_

---

## 4. Exemple de code concret (détaillé)

Supposons qu’on veuille modéliser des **personnes** et des **employés** avec la possibilité de gérer des utilisateurs “admins” ou “standard”.

```ts
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
```

### Lecture du code

1. **`type Person`**

   - On a mis `readonly id`, `name`, `age?`.
   - `id` ne peut plus être modifié après initialisation.

2. **`interface Employee`**

   - `extends Person`, ajout de `jobTitle` et d’une méthode `getDescription()`.

3. **Classe `Dev`**

   - Implémente `Employee`, donc on doit fournir toutes les propriétés de `Person` + `Employee`.
   - La méthode `getDescription()` est obligatoire (sinon erreur TS).

4. **`type UserPermission`** (union)

   - Deux formes possibles : `isAdmin: true` ou `isAdmin: false`.
   - TypeScript fait du narrowing (au runtime, si `permission.isAdmin` est vrai, tu peux accéder à `permission.superAccess`; sinon c’est `restrictedAreas`).

5. **`setPermissions(employee, permission)`**

   - Démo : on check `if (permission.isAdmin)` → TS sait qu’on est dans la branche admin.

6. **Tests locaux**
   - On crée un `Dev` (classe).
   - On crée un `Employee` en objet littéral (version “plain object”).
   - On assigne des permissions selon l’un des deux “volets” de l’union.

---

## 5. Conclusion et bonnes pratiques

1. **`interface` pour objets “extensibles”** :
   - Avantage si on veut fusionner via “declaration merging” ou implémenter dans une classe.
2. **`type` pour de la flexibilité** :
   - Gérer unions, intersections, alias de fonctions, tuples, etc.
3. **Ne pas abuser** :
   - On peut tout faire avec l’un ou l’autre, mais on privilégie souvent `interface` pour décrire la forme d’un objet “classique”.
   - On réserve `type` pour les besoins plus complexes (unions, intersections, etc.).
4. **Histoire de style et d’équipe** :
   - Dans certains projets, on utilise quasi exclusivement `interface`. Dans d’autres, c’est plutôt `type`.
   - L’important est la cohérence globale.

**Bref**, cette version détaillée te montre :

- Les similitudes (on peut créer des objets complexes dans les deux cas).
- Les différences (union de types, déclaration merging, extends vs intersection).
- Un exemple pratique où on combine `type` et `interface` au sein d’un même projet.

N’hésite pas à modifier, renommer, ou expérimenter pour consolider ta compréhension.
