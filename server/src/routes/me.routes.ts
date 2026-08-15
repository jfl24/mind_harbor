import { Router } from "express";

import { requireAuth } from "../middlewares/auth.js";

import * as favorisControlleurs from "../controllers/favoris/favorisController.js";

const meRoutes = Router();

meRoutes.use(requireAuth); // Toutes les routes me nécessitent d'être authentifié

// Pour obtenir touts les favoris du User //
meRoutes.get("/favorites", favorisControlleurs.getFavorites);

// Pour obtenir des suggestions si le niveau d'anxiété est élevé
meRoutes.get("/suggestions", favorisControlleurs.getSuggestions);

export default meRoutes;
