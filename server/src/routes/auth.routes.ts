import { Router } from "express"

import * as authControllers from '../controllers/auth/authentification.js'

const authRouter = Router()

authRouter.post("/register", authControllers.authInscription);

authRouter.post("/login", authControllers.authConnexion);

authRouter.post("/refresh", authControllers.authRafraichir);

authRouter.post("/logout", authControllers.authDeconnexion);

authRouter.get("/me", authControllers.authProfileUtilisateur);

export default authRouter