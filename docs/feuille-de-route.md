# Feuille de route

Vous implémentez les **fonctionnalités que vous souhaitez**, de la manière dont vous le souhaitez !

En cas d’ambiguïté sur un cas d'utilisation, la décision vous revient : choisissez ce qui vous semble pertinent.

Vous pouvez également ne pas implémenter certaines fonctionnalités listées ici, au profit d'autres fonctionnalités qui vous semblent intéressantes.

L'important est de pratiquer de bout en bout au moins une fonctionnalité en `GET` et une en `POST`, ce qui comprend :

- une route d'API,
- un `fetch` vers cette route,
- l'utilisation de templates HTML pour générer du contenu dynamique à partir des données reçues.

## Version 1

| En tant que | je souhaite pouvoir                        | afin de                               |
| ----------- | ------------------------------------------ | ------------------------------------- |
| visiteur    | consulter la page des pokémons             | voir la liste des pokémons existants  |
| visiteur    | consulter la page/modale d'un pokémon      | consulter ses caractéristiques        |
| visiteur    | consulter la page récapitulative des types | lister les différents types existants |
| visiteur    | consulter la page récapitulative d'un type | lister les pokémons de ce type        |
| visiteur    | consulter la page de mes équipes           | les administrer                       |
| visiteur    | consulter la page/modale d'une équipe      | l'administrer                         |

## Version 2

Version attendue d'ici la fin de semaine 🎯

| En tant que | je souhaite pouvoir             | afin de |
| ----------- | ------------------------------- | ------- |
| visiteur    | créer une équipe                |         |
| visiteur    | modifier le nom d'une équipe    |         |
| visiteur    | ajouter un pokémon à une équipe |         |
| visiteur    | retirer un pokémon d'une équipe |         |

## Version 3 - Bonus

| En tant que | je souhaite pouvoir                    | afin de                                            |
| ----------- | -------------------------------------- | -------------------------------------------------- |
| visiteur    | comparer deux pokémons                 | m'aider à faire mon choix                          |
| visiteur    | rechercher un pokémon par son nom      | le retrouver facilement via une barre de recherche |
| visiteur    | supprimer une équipe                   | supprimer le groupement de pokémons                |
| visiteur    | voter pour un pokémon                  | montrer mon intérêt pour ce pokémon                |
| visiteur    | voir le nombre de vote pour un pokémon | voir l'intérêt général de ce pokémon               |
| visiteur    | consulter le podium des pokémons       | voir les 10 pokémons les plus populaires           |

Notes :

- dans un premier temps, n'importe quel visiteur peut voter, y compris plusieurs fois, pour le même pokémon,
- dans un second temps (V4), un utilisateur ne pourra voter qu'une fois par pokémon.

En complément :

- limiter les équipes à 6 pokémons maximum,
- afficher une modale de confirmation lors de la suppression d'une équipe complète,
- afficher des bulles de notification ("toast") lorsqu'une opération est réalisée avec succès.

## Version 4 - Bonus authentification et Swagger

| En tant que | je souhaite pouvoir              | afin de                                         |
| ----------- | -------------------------------- | ----------------------------------------------- |
| visiteur    | accéder à une page d'inscription | me créer un compte                              |
| visiteur    | accéder à une page de connexion  | me connecter et profiter des droits des membres |

Droits d'un membre :

- administrer ses propres équipes : les équipes ne sont plus communes entre les visiteurs,
- droit de voter pour un pokémon et de retirer son vote.

Non droits d'un visiteur :

- accéder à l'administration d'une/des équipes : il faut à présent se connecter,
- assurer l'accessibilité de l'application, y compris sur mobile,
- assurer la sécurité de l'application face aux entrées utilisateurs.

### Swagger

Swagger est un outil de documentation d'API. Il permet de générer une documentation à partir des routes de l'API. Il ne fait pas tout automatiquement et il va avoir besoin de nous pour lui dire comment documenter les routes.

On pourra mettre à disposition des développeurs qui souhaitent utiliser notre API une documentation sur l'endpoint `/api/docs` par exemple.

Pas d'énoncé guidé ici, tu pars en exploration totale pour installer et configurer cette documentation. Pas d'inquiétude si tu n'y arrives pas, tu pourras voir dans la correction comment ça a été mis en place 😉

Direction la doc => [Documentation Swagger](https://swagger.io/docs/).

Bon chance 🍀

## Version 5 - Bonus complémentaires

- **Infinite scroll** : ne pas afficher tous les pokémons dès la première consultation de la page d'accueil, mais afficher les pokémons par groupe de 20 au fur et à mesure que l'utilisateur scroll vers le bas de la page.

- **Dynamic search bar** : à chaque `keyup` dans la barre de recherche de pokémon, les pokémons correspondant s'affichent, à la manière des moteurs de recherche.
