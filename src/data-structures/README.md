# Structures de données natives en TypeScript

Ce dossier contient des exemples d'utilisation des structures de données natives disponibles en TypeScript/JavaScript.

## Array (Tableau)

### Avantages

- Accès indexé rapide (O(1))
- Ordre d'insertion préservé
- Méthodes puissantes intégrées (map, filter, reduce, etc.)
- Compatibilité avec les boucles for et autres itérateurs

### Cas d'utilisation

- **Listes ordonnées** : Lorsque l'ordre des éléments importe
- **Files d'attente (queues)** et **piles (stacks)** : Avec push/pop/shift/unshift
- **Manipulation de données** : Transformer des données avec map/filter/reduce
- **Opérations par lots** : Traiter des collections d'éléments dans un ordre spécifique

## Set

### Avantages

- Valeurs uniques garanties (dédoublonnage)
- Opérations d'ajout et de recherche rapides (O(1) en moyenne)
- Opérations ensemblistes (union, intersection, différence)
- Intégration avec les itérateurs

### Cas d'utilisation

- **Ensembles uniques** : Stocker des valeurs sans doublons
- **Vérification d'appartenance** : Tester rapidement si un élément existe
- **Élimination des doublons** : Filtrer les valeurs en double d'un Array
- **Opérations d'ensemble** : Union, intersection, différence

## Map

### Avantages

- Paires clé-valeur avec clés de n'importe quel type (pas seulement des chaînes)
- Ordre d'insertion préservé
- Performances supérieures pour les opérations fréquentes d'ajout/suppression
- API dédiée et facile à utiliser

### Cas d'utilisation

- **Cache** : Mémorisation rapide avec des clés complexes
- **Dictionnaires** : Associer des valeurs à des clés
- **Gestion d'état** : Suivi des objets par identifiant
- **Comptage ou regroupement** : Suivre des occurrences ou regrouper par critère

## Object

### Avantages

- Syntaxe familière et concise
- Sérialisation/désérialisation JSON native
- Support des prototypes et méthodes
- Accès aux propriétés par notation pointée (obj.prop)

### Cas d'utilisation

- **Structures de données** : Regrouper des informations liées
- **Transfert de données** : Format JSON pour API
- **Configuration** : Stockage des paramètres
- **Dictionnaires simples** : Quand les clés sont des chaînes

## Comparaison et choix

| Structure | Avantage clé      | Meilleur pour                          |
| --------- | ----------------- | -------------------------------------- |
| Array     | Ordre et méthodes | Collections ordonnées, transformations |
| Set       | Valeurs uniques   | Dédoublonnage, appartenance rapide     |
| Map       | Clés flexibles    | Relations, caches, comptages           |
| Object    | Simplicité        | DTO, configuration, JSON               |
