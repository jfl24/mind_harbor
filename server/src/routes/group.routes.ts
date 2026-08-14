import { Router } from "express";
import * as groupControlleur from "../controllers/groups/groupController.js";

const groupRouter = Router();

// --------------------------------------------------------
// GROUPES DE SOUTIEN
// --------------------------------------------------------

// --------------------------------------------------------
// Lister / rechercher les groupes
// Accès : Public
// GET /groups
// --------------------------------------------------------

groupRouter.get(
    "/",
    groupControlleur.listerGroupes
);

// --------------------------------------------------------
// Créer un groupe
// Accès : Authentifié
// POST /groups
// --------------------------------------------------------

groupRouter.post(
    "/",
    groupControlleur.creerGroupe
);

// --------------------------------------------------------
// Voir un groupe
// Accès : Public ou membre
// GET /groups/:id
// --------------------------------------------------------

groupRouter.get(
    "/:id",
    groupControlleur.groupeParId
);

// --------------------------------------------------------
// Rejoindre un groupe
// Accès : Authentifié
// POST /groups/:id/join
// --------------------------------------------------------

groupRouter.post(
    "/:id/join",
    groupControlleur.rejoindreGroupe
);

// --------------------------------------------------------
// Voir les demandes d'adhésion
// Accès : Modérateur
// GET /groups/:id/requests
// --------------------------------------------------------

groupRouter.get(
    "/:id/requests",
    groupControlleur.listerDemandes
);

// --------------------------------------------------------
// Accepter / refuser une demande
// Accès : Modérateur
// PATCH /groups/:id/requests/:requestId
// --------------------------------------------------------

groupRouter.patch(
    "/:id/requests/:requestId",
    groupControlleur.traiterDemande
);

// --------------------------------------------------------
// Retirer un membre
// Accès : Modérateur
// DELETE /groups/:id/members/:userId
// --------------------------------------------------------

groupRouter.delete(
    "/:id/members/:userId",
    groupControlleur.retirerMembre
);

// --------------------------------------------------------
// Lister les publications d'un groupe
// Accès : Membre
// GET /groups/:id/posts
// --------------------------------------------------------

groupRouter.get(
    "/:id/posts",
    groupControlleur.listerPosts
);

// --------------------------------------------------------
// Créer une publication dans un groupe
// Accès : Membre
// POST /groups/:id/posts
// --------------------------------------------------------

groupRouter.post(
    "/:id/posts",
    groupControlleur.creerPost
);

export default groupRouter;

