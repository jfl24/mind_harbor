# MindHarbor

MindHarbor est une plateforme web dédiée au bien-être et au soutien entre utilisateurs.

L'objectif de l'application est de proposer un espace dans lequel les utilisateurs pourront suivre leur bien-être au quotidien, conserver leurs réflexions personnelles et échanger avec une communauté dans un environnement adapté au soutien et au partage.

Ce projet est réalisé dans le cadre d'une formation en développement logiciel.

---

## Fonctionnalités de l'application

### Authentification et compte utilisateur

MindHarbor permettra aux utilisateurs de :

- Créer un compte
- Se connecter et se déconnecter
- Gérer leur profil utilisateur
- Modifier leurs informations personnelles
- Sécuriser l'accès aux fonctionnalités privées

### Journal personnel

L'utilisateur pourra tenir un journal personnel afin de suivre son bien-être au quotidien.

Il pourra notamment enregistrer :

- Son humeur
- Son niveau d'énergie
- La qualité de son sommeil
- Son niveau d'anxiété
- Les activités réalisées
- Les événements importants de sa journée
- Les éléments pour lesquels il ressent de la gratitude

L'utilisateur pourra consulter son historique afin de suivre l'évolution de son bien-être dans le temps.

### Groupes de soutien

Les utilisateurs pourront participer à des groupes de soutien correspondant à leurs intérêts ou à leurs besoins.

Ils pourront notamment :

- Consulter les groupes disponibles
- Rechercher un groupe
- Créer un groupe
- Rejoindre un groupe
- Consulter les informations d'un groupe
- Participer aux échanges au sein d'un groupe

### Publications et commentaires

Les utilisateurs pourront partager des publications au sein des groupes auxquels ils appartiennent.

Ils pourront :

- Créer une publication
- Consulter les publications
- Supprimer leurs propres publications
- Ajouter des commentaires
- Consulter les commentaires des autres utilisateurs

### Messagerie

La plateforme pourra permettre aux utilisateurs de communiquer entre eux grâce à un système de messagerie.

Les utilisateurs pourront :

- Consulter leurs conversations
- Envoyer des messages
- Recevoir des messages
- Consulter l'historique de leurs échanges

### Suivi du bien-être

Les données enregistrées dans le journal pourront être utilisées afin de permettre à l'utilisateur de mieux comprendre son évolution personnelle.

L'application pourra notamment présenter des informations ou des statistiques concernant :

- L'évolution de l'humeur
- Le niveau d'énergie
- Le sommeil
- L'anxiété
- Les habitudes et activités

---

## Architecture du projet

Le projet est organisé en trois parties principales :

```text
mind_harbor/
│
├── client/       # Application frontend
├── server/       # API backend
├── shared/       # Types partagés
└── README.md