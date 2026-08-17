import { Router } from "express";

import { requireAuth, requireRole } from "../middlewares/auth.js";

import * as activitesControlleurs from "../controllers/activites/activitesController.js";

const activitiesRoutes = Router();

// Pour obtenir toutes les activités en mode public //
activitiesRoutes.get("/", activitesControlleurs.getActivities);

// Pour supprimer une activité en mode Admin //
activitiesRoutes.delete(
  "/:id",
  requireAuth,
  requireRole("ADMINISTRATEUR"),
  activitesControlleurs.deleteActivity,
);

export default activitiesRoutes;
