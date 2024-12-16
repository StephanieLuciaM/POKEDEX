# Routes API

Ne les mettez pas toutes en place en même temps mais seulement celle ou celles qui sont intéressantes pour la fonctionnalité en cours de développement 😉

## Pokémons

| Method | URL           | Request Body | Response Body          | Status Code |
| ------ | ------------- | ------------ | ---------------------- | ----------- |
| GET    | /pokemons     |              | un tableau de pokémons | 200         |
| GET    | /pokemons/:id |              | un pokémon             | 200         |

## Types

| Method | URL        | Request Body | Response Body       | Status Code |
| ------ | ---------- | ------------ | ------------------- | ----------- |
| GET    | /types     |              | un tableau de types | 200         |
| GET    | /types/:id |              | un type             | 200         |

## Équipes

| Method | URL        | Request Body             | Response Body        | Status Code |
| ------ | ---------- | ------------------------ | -------------------- | ----------- |
| GET    | /teams     |                          | un tableau d'équipes | 200         |
| GET    | /teams/:id |                          | une équipe           | 200         |
| POST   | /teams     | les données d'une équipe | l'équipe créée       | 201         |
| PATCH  | /teams/:id | les données à modifier   | l'équipe mise à jour | 200         |
| DELETE | /teams/:id |                          |                      | 204         |

| Method | URL                     | Request Body | Response Body        | Status Code |
| ------ | ----------------------- | ------------ | -------------------- | ----------- |
| PUT    | /teams/:id/pokemons/:id |              | l'équipe mise à jour | 200         |
| DELETE | /teams/:id/pokemons/:id |              | l'équipe mise à jour | 200         |

Notes :

- on ne doit pas pouvoir mettre deux fois le même pokémon dans une même équipe ;
- on ne doit pas pouvoir mettre plus de 6 pokémons dans une équipe.

## Votes

| Method | URL                   | Request Body | Response Body                                               | Status Code |
| ------ | --------------------- | ------------ | ----------------------------------------------------------- | ----------- |
| POST   | /pokemons/:id/votes   |              | le nombre actuel de votes pour un pokémon                   | 201         |
| GET    | /pokemons/leaderboard |              | les 10 pokémons les plus populaires et leur nombre de votes | 200         |

Notes :

- la route POST permet d'ajouter un vote supplémentaire à un pokémon ;
- dans un premier temps, les utilisateurs peuvent l'appeler autant de fois qu'ils le souhaitent ;
- dans un second temps, il faudrait :
  - limiter cette route à un appel par utilisateur ;
  - offrir la possibilité à un utilisateur de retirer son vote via une route additionnelle.
