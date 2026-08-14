import { Router } from "express";

import * as groupController from "../controllers/groups/groupController.js";

import { requireAuth } from "../middlewares/auth.js";
import { validateBody } from "../middlewares/validate.js";

import * as groupZodSchemas from "../schemasZod/group.schema.js";

const groupRouter = Router();


// --------------------------------------------------------
// Lister / rechercher les groupes
// Accès : Public
// GET /groups
// --------------------------------------------------------

groupRouter.get(
    "/",
    groupController.listerGroupes
);


// --------------------------------------------------------
// Créer un groupe
// Accès : Authentifié
// POST /groups
// --------------------------------------------------------

groupRouter.post(
    "/",
    requireAuth,
    validateBody(groupZodSchemas.createGroupSchema),
    groupController.creerGroupe
);


// --------------------------------------------------------
// Voir un groupe
// Accès : Public ou membre
// GET /groups/:id
// --------------------------------------------------------

groupRouter.get(
    "/:id",
    groupController.groupeParId
);


// --------------------------------------------------------
// Rejoindre un groupe
// Accès : Authentifié
// POST /groups/:id/join
// --------------------------------------------------------

groupRouter.post(
    "/:id/join",
    requireAuth,
    groupController.rejoindreGroupe
);


// --------------------------------------------------------
// Voir les demandes d'adhésion
// Accès : Modérateur
// GET /groups/:id/requests
// --------------------------------------------------------

groupRouter.get(
    "/:id/requests",
    requireAuth,
    groupController.listerDemandes
);


// --------------------------------------------------------
// Accepter / refuser une demande
// Accès : Modérateur
// PATCH /groups/:id/requests/:requestId
// --------------------------------------------------------

groupRouter.patch(
    "/:id/requests/:requestId",
    requireAuth,
    validateBody(groupZodSchemas.traiterDemandeSchema),
    groupController.traiterDemande
);


// --------------------------------------------------------
// Retirer un membre
// Accès : Modérateur
// DELETE /groups/:id/members/:userId
// --------------------------------------------------------

groupRouter.delete(
    "/:id/members/:userId",
    requireAuth,
    groupController.retirerMembre
);


// --------------------------------------------------------
// Lister les publications d'un groupe
// Accès : Membre
// GET /groups/:id/posts
// --------------------------------------------------------

groupRouter.get(
    "/:id/posts",
    requireAuth,
    groupController.listerPosts
);


// --------------------------------------------------------
// Créer une publication dans un groupe
// Accès : Membre
// POST /groups/:id/posts
// --------------------------------------------------------

groupRouter.post(
    "/:id/posts",
    requireAuth,
    validateBody(groupZodSchemas.createPostSchema),
    groupController.creerPost
);


export default groupRouter;