# MindHarbor

MindHarbor est une plateforme web dédiée au bien-être et au soutien entre utilisateurs.

L'objectif de l'application est de proposer un espace permettant aux utilisateurs de suivre leur bien-être au quotidien, de conserver leurs réflexions personnelles, d'accéder à des ressources liées au bien-être et d'échanger avec une communauté dans un environnement adapté au soutien et au partage.

Ce projet est réalisé dans le cadre d'une formation en développement logiciel.

---

## Fonctionnalités de l'application

### 1. Authentification et gestion du compte

MindHarbor permettra aux utilisateurs de :

- Créer un compte
- Se connecter
- Se déconnecter
- Rafraîchir leur session
- Gérer leur profil
- Modifier leurs informations personnelles
- Choisir la visibilité de leur profil
- Configurer leurs paramètres de confidentialité
- Configurer qui peut les contacter
- Supprimer leur compte

L'accès aux fonctionnalités privées est protégé par un système d'authentification.

---

### 2. Journal de bien-être

L'utilisateur pourra tenir un journal personnel afin de suivre son bien-être au quotidien.

Chaque entrée pourra notamment contenir :

- Humeur sur une échelle de 1 à 5
- Niveau d'énergie sur une échelle de 1 à 5
- Qualité du sommeil sur une échelle de 1 à 5
- Niveau d'anxiété ou de stress sur une échelle de 1 à 5
- Activités réalisées
- Événements particuliers
- Gratitude du jour

L'application permettra à l'utilisateur de consulter son historique et de suivre l'évolution de ses données personnelles.

Une seule entrée pourra être enregistrée par utilisateur et par jour.

Les données du journal sont personnelles et doivent rester privées.

---

### 3. Analyse et tendances

Les données enregistrées dans le journal pourront être utilisées afin de permettre à l'utilisateur de mieux comprendre son évolution.

L'application pourra notamment présenter :

- L'évolution de l'humeur
- L'évolution du niveau d'énergie
- L'évolution du sommeil
- L'évolution de l'anxiété ou du stress
- Des tendances sur différentes périodes
- Des observations calculées à partir des données enregistrées
- Des liens possibles entre certaines activités et l'évolution du bien-être

Les tendances pourront être consultées sur différentes périodes, notamment 7, 30 ou 90 jours.

---

### 4. Ressources et exercices

MindHarbor pourra proposer une bibliothèque de ressources liées au bien-être.

Les ressources pourront notamment prendre la forme de :

- Articles
- Exercices
- Fiches pratiques
- Contenus audio
- Contenus vidéo

Les utilisateurs pourront :

- Rechercher une ressource
- Filtrer les ressources
- Consulter une ressource
- Ajouter une ressource à leurs favoris
- Consulter leurs ressources favorites
- Recevoir des suggestions adaptées à leur situation

Des ressources d'aide d'urgence pourront également être accessibles depuis l'application.

---

### 5. Groupes de soutien

Les utilisateurs pourront participer à des groupes de soutien correspondant à leurs intérêts ou à leurs besoins.

Ils pourront notamment :

- Consulter les groupes disponibles
- Rechercher un groupe
- Consulter les informations d'un groupe
- Créer un groupe
- Rejoindre un groupe public
- Demander à rejoindre un groupe privé
- Consulter les publications d'un groupe
- Publier dans un groupe
- Commenter les publications

Les groupes privés pourront utiliser un système de demandes d'adhésion.

Les utilisateurs autorisés pourront également assurer la modération des groupes.

---

### 6. Publications, commentaires et signalements

Les membres d'un groupe pourront participer aux discussions à travers des publications et des commentaires.

Ils pourront :

- Créer une publication
- Consulter les publications
- Supprimer leurs propres publications
- Ajouter des commentaires
- Consulter les commentaires

Les utilisateurs pourront également signaler une publication ou un commentaire lorsqu'un contenu est considéré comme :

- Inapproprié
- Du spam
- Inquiétant

Les signalements pourront ensuite être traités par les utilisateurs disposant des permissions nécessaires.

---

### 7. Messagerie privée et confidentialité

La plateforme pourra proposer un système de messagerie privée permettant aux utilisateurs de communiquer entre eux.

Les utilisateurs pourront :

- Consulter leurs conversations
- Envoyer des messages
- Recevoir des messages
- Consulter l'historique de leurs échanges

Les paramètres de confidentialité permettront à chaque utilisateur de contrôler les personnes pouvant le contacter.

---

### 8. Profils et visibilité

Chaque utilisateur pourra disposer d'un profil contenant notamment :

- Pseudonyme
- Nom
- Prénom
- Avatar
- Biographie

L'utilisateur pourra choisir le niveau de visibilité de son profil.

La visibilité pourra notamment être configurée afin de limiter l'accès :

- À tous les utilisateurs
- Aux membres de ses groupes
- À lui-même

L'utilisateur pourra également définir son niveau de contact.

---

### 9. Tableau de bord personnel

Après sa connexion, l'utilisateur pourra accéder à un espace personnel regroupant les principales fonctionnalités de la plateforme.

Le tableau de bord permettra notamment d'accéder rapidement :

- Au journal
- Aux tendances
- Aux ressources
- Aux favoris
- Aux groupes
- Aux conversations
- Au profil

Il pourra également présenter un résumé de l'activité récente et des informations liées au suivi du bien-être.

---

### 10. Administration

Les administrateurs pourront disposer d'un espace permettant de gérer certains aspects de la plateforme.

Ils pourront notamment :

- Consulter des statistiques anonymisées
- Consulter et traiter les signalements
- Gérer les ressources officielles
- Administrer certains comptes
- Effectuer les actions nécessaires à la modération globale de la plateforme

Les données personnelles du journal doivent rester protégées et ne doivent pas être accessibles simplement en raison du rôle d'administrateur.

---

### 11. Export des données

L'utilisateur pourra exporter ses données personnelles.

L'export pourra notamment contenir :

- Ses données de journal
- Ses informations personnelles
- Les informations associées à son suivi du bien-être

Cette fonctionnalité permettra à l'utilisateur de conserver une copie de ses données.

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