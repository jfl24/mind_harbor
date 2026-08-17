# MindHarbor

MindHarbor est une plateforme web dédiée au bien-être et au soutien entre utilisateurs. L'objectif est de proposer un espace où chacun peut suivre son bien-être au quotidien, conserver ses réflexions personnelles, accéder à des ressources liées à la santé mentale et échanger avec une communauté, dans un environnement pensé pour le soutien et le partage.

Ce projet est réalisé dans le cadre d'une formation en développement logiciel.

## Table des matières

- [Fonctionnalités](#fonctionnalités-de-lapplication)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation-du-projet)
- [API REST](#api-rest)
- [Authentification](#authentification)
- [Validation des données](#validation-des-données)
- [Sécurité et confidentialité](#sécurité-et-confidentialité)
- [État du projet](#état-du-projet)
- [Résumé des commandes](#résumé-des-commandes)
- [Objectif du projet](#objectif-du-projet)
- [Équipe](#équipe)

---

## Fonctionnalités de l'application

### 1. Authentification et gestion du compte

MindHarbor permet à l'utilisateur de créer un compte, de se connecter, de se déconnecter et de rafraîchir sa session. Une fois connecté, il peut gérer son profil, modifier ses informations personnelles, choisir la visibilité de son profil, configurer ses paramètres de confidentialité, décider qui peut le contacter, et supprimer son compte à tout moment.

L'accès aux fonctionnalités privées est protégé par un système d'authentification.

### 2. Journal de bien-être

L'utilisateur tient un journal personnel pour suivre son bien-être au jour le jour. Chaque entrée peut contenir :

- l'humeur, sur une échelle de 1 à 5 ;
- le niveau d'énergie, sur une échelle de 1 à 5 ;
- la qualité du sommeil, sur une échelle de 1 à 5 ;
- le niveau d'anxiété ou de stress, sur une échelle de 1 à 5 ;
- les activités réalisées dans la journée ;
- les événements marquants ;
- une gratitude du jour.

L'application permet de consulter l'historique et de suivre l'évolution de ces données. Une seule entrée peut être enregistrée par utilisateur et par jour, et ces données restent strictement personnelles et privées.

### 3. Analyse et tendances

Les données du journal alimentent une section dédiée à l'analyse, pour aider l'utilisateur à mieux comprendre son évolution. On y retrouve :

- l'évolution de l'humeur, de l'énergie, du sommeil et de l'anxiété ;
- des tendances calculées sur 7, 30 ou 90 jours ;
- des observations générées automatiquement à partir des données enregistrées ;
- des liens possibles entre certaines activités et l'évolution du bien-être.

### 4. Ressources et exercices

MindHarbor propose une bibliothèque de ressources liées au bien-être : articles, exercices, fiches pratiques, contenus audio et vidéo. L'utilisateur peut rechercher une ressource, la filtrer, la consulter, l'ajouter à ses favoris et retrouver ses favoris à tout moment. Des suggestions adaptées à sa situation peuvent également lui être proposées.

Des ressources d'aide d'urgence restent accessibles depuis l'ensemble de l'application.

### 5. Groupes de soutien

Les utilisateurs peuvent rejoindre des groupes de soutien correspondant à leurs intérêts ou à leurs besoins. Ils peuvent consulter les groupes disponibles, en rechercher un, voir ses informations, en créer un nouveau, rejoindre un groupe public directement ou demander à rejoindre un groupe privé.

Les groupes privés fonctionnent avec un système de demandes d'adhésion, et certains utilisateurs peuvent être désignés modérateurs pour assurer la gestion du groupe.

### 6. Publications, commentaires et signalements

Au sein d'un groupe, les membres échangent à travers des publications et des commentaires : créer une publication, la consulter, la supprimer si on en est l'auteur, commenter et lire les commentaires.

Un contenu jugé problématique peut être signalé comme inapproprié, spam ou inquiétant. Ces signalements sont ensuite traités par les utilisateurs disposant des permissions nécessaires.

### 7. Messagerie privée et confidentialité

Les utilisateurs peuvent échanger en privé : consulter leurs conversations, envoyer et recevoir des messages, retrouver l'historique de leurs échanges. Les paramètres de confidentialité permettent à chacun de décider qui a le droit de le contacter.

### 8. Profils et visibilité

Chaque profil comprend un pseudonyme, un nom, un prénom, un avatar et une biographie. L'utilisateur choisit le niveau de visibilité de son profil : visible par tous, visible seulement par les membres de ses groupes, ou entièrement privé. Il définit également qui peut entrer en contact avec lui.

### 9. Tableau de bord personnel

Après connexion, l'utilisateur accède à un espace personnel qui regroupe l'essentiel de la plateforme : journal, tendances, ressources, favoris, groupes, conversations et profil, accessibles rapidement depuis un seul endroit. Un résumé de l'activité récente y est également présenté.

### 10. Administration

Les administrateurs disposent d'un espace dédié pour consulter des statistiques anonymisées, traiter les signalements, gérer les ressources officielles et administrer certains comptes.

Les données personnelles du journal restent protégées : elles ne sont jamais accessibles simplement parce qu'un compte a le rôle administrateur.

### 11. Export des données

L'utilisateur peut exporter ses données personnelles à tout moment — ses entrées de journal, ses informations de profil et les données liées à son suivi du bien-être — pour en conserver une copie.

---

## Technologies utilisées

### Frontend

React · TypeScript · Vite · React Router · Axios · Recharts · CSS

### Backend

Node.js · Express · TypeScript · Prisma · PostgreSQL / Neon · Zod · JWT · bcryptjs · Helmet · CORS · Morgan

### Outils

Git · GitHub · Visual Studio Code · Postman

---

## Installation du projet

### 1. Prérequis

- Node.js
- npm
- Git
- Une base PostgreSQL / Neon accessible

Vérifier les installations :

```bash
node --version
npm --version
git --version
```

Les dépendances React, Vite et le reste des dépendances frontend sont installées automatiquement avec `npm install`.

### 2. Cloner le projet

```bash
git clone https://github.com/jfl24/mind_harbor.git
cd mind_harbor
```

### 3. Installer les dépendances du backend

```bash
cd server
npm install
```

### 4. Configurer les variables d'environnement

Créer un fichier `.env` dans le dossier `server` :

```env
DATABASE_URL="votre_chaine_de_connexion"
JWT_SECRET="votre_secret"
PORT=3000
```

Les valeurs doivent être adaptées à l'environnement utilisé. Le fichier `.env` contient des informations sensibles et ne doit jamais être commité dans Git — un fichier `server/.env.example`, listant les noms de variables sans leurs valeurs, est fourni à cet effet.

### 5. Générer le client Prisma

Depuis `server` :

```bash
npx prisma generate
```

### 6. Configurer la base de données

**En développement**, pour créer ou appliquer les migrations :

```bash
npm run migrate
```

Cette commande exécute `prisma migrate dev`.

**En déploiement**, pour appliquer les migrations existantes :

```bash
npx prisma migrate deploy
```

### 7. Insérer les données de démonstration

```bash
npm run seed
```

Cette commande exécute `tsx prisma/seed.ts` et fournit les données nécessaires aux démonstrations et aux tests.

### 8. Vérifier et compiler le backend

```bash
npm run typecheck   # vérification TypeScript
npm run build       # compilation
npm run dev          # lancement en développement
npm start            # lancement de la version compilée
```

### 9. Installer les dépendances du frontend

Depuis la racine du projet :

```bash
cd client
npm install
```

### 10. Configurer l'URL de l'API

Créer un fichier `.env` dans le dossier `client` :

```env
VITE_API_URL=http://localhost:3000/api/v1
```

Cette variable permet au frontend de communiquer avec l'API backend.

### 11. Vérifier le frontend

```bash
npm run lint    # vérification ESLint
npm run build   # build TypeScript + Vite
```

### Lancer l'application en développement

Le frontend et le backend doivent tourner dans deux terminaux distincts.

**Terminal 1 — Backend**

```bash
cd server
npm run dev
```

Accessible en général sur `http://localhost:3000`.

**Terminal 2 — Frontend**

```bash
cd client
npm run dev
```

Vite affiche l'adresse du frontend dans le terminal, généralement `http://localhost:5173`.

### Lancer le frontend après un build

Après `npm run build`, utiliser `npm run preview` pour prévisualiser le résultat.

### Vérification du projet

Une fois le backend et le frontend lancés :

1. Ouvrir le frontend dans un navigateur.
2. Créer un compte ou utiliser un compte de démonstration.
3. Se connecter.
4. Accéder à l'accueil utilisateur.
5. Tester le journal.
6. Tester la section des groupes.
7. Rechercher un groupe.
8. Créer un groupe.
9. Vérifier que le groupe créé apparaît dans la liste.
10. Tester les appels API nécessaires avec Postman.

---

## API REST

Toutes les routes de l'application sont préfixées par `/api/v1`.

La documentation détaillée des points d'accès se trouve dans [`docs/api.md`](docs/api.md), qui précise pour chaque route la méthode HTTP, le chemin, le niveau d'accès, une description, ainsi que les paramètres ou le corps attendu lorsque nécessaire.

### Routes prévues par le projet

Les routes suivantes couvrent les principales fonctionnalités prévues pour MindHarbor. **Une route n'est considérée comme développée que si elle existe réellement dans le code du projet.**

**Authentification**

```
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
GET  /api/v1/auth/me
```

**Journal et tendances**

```
GET   /api/v1/journal
POST  /api/v1/journal
GET   /api/v1/journal/:date
PATCH /api/v1/journal/:date
GET   /api/v1/journal/stats?range=30d
GET   /api/v1/journal/insights
```

**Activités, ressources et favoris**

```
GET    /api/v1/activities
GET    /api/v1/resources
GET    /api/v1/resources/:id
POST   /api/v1/resources
POST   /api/v1/resources/:id/favorite
DELETE /api/v1/resources/:id/favorite
GET    /api/v1/me/favorites
GET    /api/v1/me/suggestions
```

**Groupes**

```
GET    /api/v1/groups
POST   /api/v1/groups
GET    /api/v1/groups/:id
POST   /api/v1/groups/:id/join
GET    /api/v1/groups/:id/requests
PATCH  /api/v1/groups/:id/requests/:requestId
DELETE /api/v1/groups/:id/members/:userId
GET    /api/v1/groups/:id/posts
POST   /api/v1/groups/:id/posts
```

**Publications et commentaires**

```
DELETE /api/v1/posts/:id
POST   /api/v1/posts/:id/comments
```

**Messagerie**

```
GET  /api/v1/messages
GET  /api/v1/messages/:userId
POST /api/v1/messages/:userId
POST /api/v1/users/:id/block
```

**Profil et confidentialité**

```
GET    /api/v1/users/:id
PATCH  /api/v1/me
PATCH  /api/v1/me/privacy
GET    /api/v1/me/export
DELETE /api/v1/me
```

**Signalements et administration**

```
POST  /api/v1/reports
GET   /api/v1/admin/reports
PATCH /api/v1/admin/reports/:id
GET   /api/v1/admin/stats
PATCH /api/v1/admin/users/:id/suspend
```

### Routes présentes dans le backend

Les routeurs actuellement présents dans le projet sont notamment :

- `activites.routes.ts`
- `auth.routes.ts`
- `group.routes.ts`
- `journal.routes.ts`
- `me.routes.ts`
- `message.routes.ts`
- `post.routes.ts`
- `resources.routes.ts`

Cette organisation sépare les différentes ressources de l'API et garde une structure claire entre routes, contrôleurs, services, middlewares et validations.

---

## Authentification

L'application utilise des tokens JWT pour gérer l'authentification, avec :

- un token d'accès ;
- un token de rafraîchissement ;
- le rafraîchissement automatique du token côté frontend ;
- la protection des routes via `requireAuth` ;
- la gestion des permissions selon le rôle ;
- la révocation ou l'invalidation des sessions lorsque nécessaire.

Pour les requêtes nécessitant une authentification, Axios ajoute automatiquement le token dans l'en-tête :

```
Authorization: Bearer <token>
```

Le backend vérifie ensuite l'authentification avant d'autoriser l'accès aux routes protégées.

---

## Validation des données

Les données reçues par l'API sont validées côté serveur avec Zod. Exemple, lors de la création d'un groupe :

```json
{
  "nom": "Gestion du stress",
  "description": "Groupe de discussion autour de la gestion du stress",
  "groupVisibility": "PUBLIC"
}
```

Cette validation garantit que les données reçues par le serveur respectent les règles définies par l'application, avant même d'atteindre la base de données.

---

## Sécurité et confidentialité

MindHarbor manipule des données personnelles, en particulier celles du journal de bien-être. La sécurité du projet repose sur :

- l'authentification par JWT ;
- la protection des routes privées ;
- la validation des données avec Zod ;
- le contrôle des permissions côté backend ;
- la vérification de la propriété des ressources avant modification ou suppression ;
- la gestion fine de la confidentialité (visibilité de profil, niveau de contact) ;
- l'usage de variables d'environnement pour les informations sensibles ;
- le hachage des mots de passe avec bcrypt.

Les données personnelles du journal restent accessibles uniquement à leur propriétaire. Les secrets JWT, les identifiants de base de données et toute autre information sensible ne doivent jamais se retrouver dans le dépôt Git.

---

## État du projet

Le projet est développé progressivement dans le cadre du hackathon.

**Déjà intégré au frontend :**

- page d'accueil publique ;
- inscription et connexion ;
- déconnexion et gestion du token d'accès ;
- espace utilisateur ;
- journal de bien-être ;
- affichage et recherche de groupes ;
- création d'un groupe ;
- communication réelle entre le frontend et le backend.

**Reste à compléter ou à intégrer à l'interface :**

- analyse et tendances complètes ;
- ressources et favoris ;
- messagerie privée ;
- gestion complète des profils ;
- modération complète des groupes ;
- publications et commentaires complets dans l'interface ;
- signalements ;
- administration ;
- export des données ;
- suppression complète du compte.

Ces éléments seront développés dans les prochaines étapes du projet.

### Exemple de communication frontend / backend

Lors de la création d'un groupe, le frontend envoie une requête `POST /api/v1/groups` avec le corps suivant :

```json
{
  "nom": "Gestion du stress",
  "description": "Groupe de discussion autour de la gestion du stress",
  "groupVisibility": "PUBLIC"
}
```

Le backend valide les données avec Zod, puis utilise Prisma pour enregistrer le groupe en base. La création du groupe passe donc par une requête réelle au backend, et non par des données statiques côté frontend.

---

## Résumé des commandes

### Backend

```bash
cd server
npm install               # installation
npx prisma generate       # génération du client Prisma
npm run migrate            # migration (développement)
npx prisma migrate deploy  # migration (déploiement)
npm run seed               # données de démonstration
npm run typecheck          # vérification TypeScript
npm run build               # compilation
npm run dev                 # développement
npm start                   # production
```

### Frontend

```bash
cd client
npm install       # installation
npm run lint       # vérification ESLint
npm run build       # build
npm run dev          # développement
npm run preview      # prévisualisation
```

---

## Objectif du projet

MindHarbor vise à offrir une plateforme permettant aux utilisateurs de suivre leur bien-être personnel tout en bénéficiant d'un espace communautaire favorisant le partage et le soutien entre pairs.

Le projet met en pratique plusieurs notions clés du développement logiciel : développement frontend et backend, conception d'une API REST, authentification, gestion d'une base de données, validation des données, architecture client-serveur, routage frontend, gestion des erreurs, communication entre frontend et backend, ainsi que le travail collaboratif avec Git et GitHub.

---

## Équipe

Projet réalisé en équipe dans le cadre de la formation en développement logiciel.

**Membres :**

- AMMOUR Nadjib
- Pierre Jean-François
- Chandel Amit
