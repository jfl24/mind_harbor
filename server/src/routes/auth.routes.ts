import { Router } from "express"

import { validateBody } from "../middlewares/validate.js";
import * as authZodSchemas from "../schemasZod/auth.schema.js";

import * as authControllers from '../controllers/auth/authentification.js'

const authRouter = Router()

authRouter.post("/register", validateBody(authZodSchemas.regSchema), authControllers.authInscription);

authRouter.post("/login", validateBody(authZodSchemas.loginSchema), authControllers.authConnexion);

authRouter.post("/refresh", validateBody(authZodSchemas.tokenSchema), authControllers.authRafraichir);

authRouter.post("/logout", validateBody(authZodSchemas.tokenSchema), authControllers.authDeconnexion);

authRouter.get("/me", authControllers.authProfileUtilisateur);

export default authRouter