# S14 - Projet Pokédex

Bienvenue sur ce projet Pokédex 👋

Ta mission de cette semaine consiste à mettre en place un **pokédex** 🎯

*Un Pokékoi ?* Un Pokédex ! C'est une encyclopédie virtuelle recensant tous les pokémons du jeu du même nom.

Mais ça ne s'arrête pas là 😅 Tu devras également mettre en place un système d'équipe de pokémons.

> Les utilisateurs pourront créer des équipes, y ajouter des pokémons, en retirer, etc. 😁

Tu auras aussi quelques bonus à ta disposition si tu souhaites continuer à te challenger 💪

Le but de cette semaine est de **PRATIQUER** :

- la création d'une API REST,
- la consommation de cette API depuis un front en Vanilla JS (i.e. du JavaScript pur),
- l'affichage dynamique de templates HTML directement depuis JavaScript,
- en GET et en POST !

Maintenant que le contexte est posé, attention de bien lire toutes les consignes ci-dessous et de prendre des notes de ton côté si tu l'estimes nécessaire 📝

## Organisation

On te donne **3 jours** pour réaliser ce projet et on t'a rédigé une [feuille de route dans le dossier docs](./docs/feuille-de-route.md) pour t'aider à t'organiser 🧭

On te conseille de te concentrer sur **UNE SEULE** fonctionnalité à la fois de bout en bout.

> Par exemple afficher tous les pokémons ou afficher tous les types de pokémons. Toujours dans le but de ce qu'on a mis plus haut ⬆️

Au 4ème jour, on te fournira notre correction pour que tu puisses comparer avec ta réalisation et modifier/continuer ton projet si tu le souhaites 🚀

Tu pourras aussi te concentrer sur des **révisions**, **le parkour O'Todo**, ou bien avancer sur le **Dossier Professionnel**.

N'hésite pas à nous contacter si tu as besoin de quoi que ce soit 🤗

## Conception *(facultative)*

On te fournit déjà une base de données et une intégration, mais si tu souhaites faire tes propres [MCD](https://kourou.oclock.io/ressources/fiche-recap/mcd-modele-conceptuel-de-donnees/), [MLD](https://kourou.oclock.io/ressources/fiche-recap/mld/) et [wireframes](https://kourou.oclock.io/ressources/fiche-recap/wireframes-mode-demploi/), alors on ne peut que t'encourager dans ce sens 👍

Cela te sera certainement très utile pour le Titre Professionnel et pour sûr dans ton futur métier de développeur. C'est quand même mieux de savoir concevoir une base de données 🤓

### Conseils de conception

Pour le [**MCD**](https://kourou.oclock.io/ressources/fiche-recap/mcd-modele-conceptuel-de-donnees/), fais bien attention :

- au sens des cardinalités,
- à ne pas faire apparaître les `ids`,
- à avoir des verbes qui ont du sens, qui ne se répètent pas, conjugués à la 3ème personne du singulier.

Pour le **MLD**, tu as les [règles ici](https://kourou.oclock.io/ressources/fiche-recap/mld/).

Pour les **wireframes** tu as [la doc Kourou](https://kourou.oclock.io/ressources/fiche-recap/wireframes-mode-demploi/) à ta disposition, mais en vrac :

- pas de design, juste de la structure,
- on légende tout ce qui est sujet à interprétation,
- on en fait un desktop et un mobile.

Pour information, avant le wireframe on peut avoir le **zoning**, sorte de brouillon ultra simpliste qui permet d'identifier les différents blocs de la page.

Et après... ce sont les **maquettes** 🎨

## Infos et aides pour le projet

Tu trouveras dans ce repo un dossier `docs` contenant des informations sur le projet.

- [feuille-de-route.md](./docs/feuille-de-route.md) qui contient les attendus du projet sous forme de user-stories
- [endpoints.md](./docs/endpoints.md) qui contient la liste des routes qui devront être mises en place côté API
- [installation.md](./docs/installation.md) qui contient une courte série d'instructions pour lancer le projet

On a également ajouté un dossier `integration` contenant des assets et fichiers html pour t'aider. Tu n'es pas obligé.e de les utiliser si tu as envie de toi-même bosser l'intégration, mais ça ne doit pas te prendre deux jours, ce n'est pas du tout le but de cette semaine 🎨

On t'invite à lancer dès maintenant un **Live Server** sur ce projet pour voir le rendu de ces fichiers html.

C'est bon ? Si oui, alors tu peux accéder au premier fichier [components.html](http://localhost:5500/docs/integration/components.html) qui, si tu le visualises dans le navigateur, peut te permettre de copier très facilement le code des composants HTML dont tu as besoin et voir à quoi ils ressemblent. Pour chacun, tu retrouves :

- le nom du composant,
- l'aperçu du composant,
- le code HTML du composant.

Le fichier [samplePage.html](http://localhost:5500/docs/integration/samplePage.html) te permet de voir, aussi dans le navigateur, à quoi peut ressembler une page en utilisant les composants HTML. Tu peux aussi aller voir le code du fichier ici : [samplePage.html](./docs/integration/samplePage.html).

Le dernier fichier qui s'appelle [starterPage.html](./docs/integration/starterPage.html) contient le code de base pour commencer à intégrer le projet. On te conseille de créer le fichier `index.html` de ton front à partir de ce fichier starterPage 😉

## Structure du projet

### Back

On t'a déjà créé un dossier back. Tu y trouveras :

- Un dossier data qui contient les fichiers sql :
  - [create_tables.sql](./back/data/create_tables.sql) permet de créer les tables de la bases de données
  - [seeding_tables.sql](./back/data/seeding_tables.sql) permet de remplir les tables avec des données
- [.env.example](./back/.env.example) contient nos variables d'environnement
- [package.json](./back/package.json) contient nos dépendances & les scripts (que vous devrez faire évoluer en vous inspirant des projets précédents)

Pour le reste ... **à toi de jouer** !

### Front

Tu as le droit à un joli `index.html` vide et c'est tout 😅

Tu devras mettre dans ce dossier ton code HTML, CSS et JS, à récupérer depuis le dossier `integration` 🎨 ou à faire toi-même si tu te sens !

> Tu peux aussi très bien te limiter à une interface en noir et blanc avec juste des blocs tout simples.

## Besoin d'aide technique ?

Je n'ai qu'une seule chose à te dire : [**ISSUE**](https://github.com/O-clock-Raclette/Soutien-ateliers/issues) 🚨

## Le mot de la fin

Voilà, je crois que tu as tout ce qu'il faut pour te lancer 🚀

Amuse-toi bien et n'oublie pas de faire des commits et de pusher régulièrement... sinon tu risques de faire comme le concepteur de ce projet qui a la fâcheuse tendance de ne pas pusher assez souvent ou alors au milieu d'une fonctionnalité... et c'est dommage parce que la dernière fois, il a oublié de commiter les numéros du loto de la semaine prochaine justement, qui sont

*[TODO finir ce readme]*
