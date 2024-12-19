# Modèle Logique de Données (MLD)

Etape de traduction d'un MCD dans une représentation plus proche d'une implémentation dans un système de gestion de bases de données.

C'est un exercice moins académique et formalisé, plusieurs formes de représentation sont acceptées.

## Etapes de réalisation

- Traduire les noms d'entité en nom de tables
- Traduire les attributs en nom de champs/colonnes.
- Traduire les associations sous forme :
- de clés primaires / étrangères
- tables de liaison le cas échéant

## Version textuelle

pokemon (
  id          -- identifiant entier généré automatiquement
  name        -- chaîne de caractères (nom du Pokémon)
  hp          -- entier (points de vie)
  atk         -- entier (attaque)
  def         -- entier (défense)
  atk_spe     -- entier (attaque spéciale)
  def_spe     -- entier (défense spéciale)
  speed       -- entier (vitesse)
)

type (
  id          -- identifiant entier généré automatiquement
  name        -- chaîne de caractères (nom du type)
  color       -- chaîne de caractères (couleur au format hexadécimal, ex : #ff0000)
)

team (
  id          -- identifiant entier généré automatiquement
  name        -- chaîne de caractères (nom de l'équipe)
  description -- chaîne de caractères (description de l'équipe)
)

## Table de liaison pokemon_type like pokemon_has_type

pokemon_type (
  id            -- identifiant entier généré automatiquement
  pokemon_id  #FK->pokemon.id   -- entier clé etrangère
  type_id  #FK->type.id         -- entier clé etrangère
)

## Table de liaison team_pokemon like team_has_pokemon

team_pokemon (
    id          -- identifiant entier généré automatiquement
    pokemon_id  #FK->pokemon.id        -- entier clé etrangère
    team_id     #FK->team.id   -- entier clé etrangère
)
