import { Router } from "express";

import { requireAuth, requireRole } from "../middlewares/auth.ts";

import * as resourcesControlleurs from "../controllers/ressources/resourcesController.js";
import * as favorisControlleurs from "../controllers/favoris/favorisController.js";

const resourcesRoutes = Router();

// Pour obtenir toutes les ressources en mode public //
resourcesRoutes.get("/", resourcesControlleurs.getResources);

// Pour faire une recherche dans les ressources //
resourcesRoutes.post("/search", resourcesControlleurs.getResourcesWithFilters);
// J'utilise POST pour la recherche afin que les termes de la recherche soient dans le req.body pour éviter qu'ils soient visibles dans le req.query //

// Pour trouver une ressource avec l'ID
resourcesRoutes.get("/:id", resourcesControlleurs.getResourcesWithId);

// Pour créer une nouvelle ressource en mode Admin
resourcesRoutes.post(
  "/",
  requireAuth,
  requireRole("ADMINISTRATEUR"),
  resourcesControlleurs.createResource,
);

// Pour supprimer une ressource en mode Admin //
resourcesRoutes.delete(
  "/:id",
  requireAuth,
  requireRole("ADMINISTRATEUR"),
  resourcesControlleurs.deleteResource,
);

// Pour ajouter une ressource aux favoris //
resourcesRoutes.post(
  "/:id/favorite",
  requireAuth,
  favorisControlleurs.creerFavori,
);

// Pour enlever une ressource des favoris //
resourcesRoutes.delete(
  "/:id/favorite",
  requireAuth,
  favorisControlleurs.deleteFavori,
);

export default resourcesRoutes;
