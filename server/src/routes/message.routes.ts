import { Router } from "express";

import * as messageController from "../controllers/messages/messageController.js";

import { requireAuth } from "../middlewares/auth.js";
import { validateBody } from "../middlewares/validate.js";

import * as messageZodSchemas from "../schemasZod/message.schema.js";

const messageRouter = Router();


// --------------------------------------------------------
// Lister les conversations
// GET /api/v1/messages
// Accès : Authentifié
// --------------------------------------------------------

messageRouter.get(
    "/",
    requireAuth,
    messageController.listerConversations
);


// --------------------------------------------------------
// Voir les messages avec un utilisateur
// GET /api/v1/messages/:userId
// Accès : Authentifié
// --------------------------------------------------------

messageRouter.get(
    "/:userId",
    requireAuth,
    messageController.listerMessages
);


// --------------------------------------------------------
// Envoyer un message
// POST /api/v1/messages/:userId
// Accès : Selon le niveau de contact
// --------------------------------------------------------

messageRouter.post(
    "/:userId",
    requireAuth,
    validateBody(messageZodSchemas.createMessageSchema),
    messageController.envoyerMessage
);

export default messageRouter;