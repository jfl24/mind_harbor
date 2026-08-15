import { Router } from "express";

import { requireAuth } from "../middlewares/auth.js";

import * as journalControlleurs from "../controllers/journal/journalController.js";
import { validateBody } from "../middlewares/validate.js";

import * as journalZodSchemas from "../schemasZod/journal.schema.js";

const journalRoutes = Router();

// Pour obtenir toutes les entrées du journal //
journalRoutes.get("/", requireAuth, journalControlleurs.getJournalEntry);

// Pour créer une nouvelle entrée //
journalRoutes.post(
  "/",
  requireAuth,
  validateBody(journalZodSchemas.createJournalSchema),
  journalControlleurs.creerJournalEntry,
);

// Pour obtenir un entrée selon la date //
journalRoutes.get(
  "/:date",
  requireAuth,
  journalControlleurs.getJournalEntryByDate,
);

// Pour modifier une entrée dans le journal //
journalRoutes.patch(
  "/:date",
  requireAuth,
  validateBody(journalZodSchemas.modifierJournalSchema),
  journalControlleurs.modifyJournalEntry,
);

// Pour obtenir des stats selon une dureé //
journalRoutes.get(
  "/stats",
  requireAuth,
  journalControlleurs.getJournalEntryWithRange,
);

// Pour obternir des moyennes selon le jour de la semaine //
journalRoutes.get("stats", requireAuth, journalControlleurs.getAveragesByDay);

// Pour obtenir les corrélations entre une activité et un indicateur //
journalRoutes.get("insights", requireAuth, journalControlleurs.getInsights);

export default journalRoutes;
