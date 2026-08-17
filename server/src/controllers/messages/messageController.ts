import {
    type Request,
    type Response,
    type NextFunction
} from "express";

import * as messageService from "../../services/messageService.js";

import { AppError } from "../../middlewares/error.js";


// ========================================================
// Lister les conversations
// GET /messages
// ========================================================

export async function listerConversations(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {

        const userId = req.user!.id;

        const conversations =
            await messageService.listerConversations(userId);

        return res.status(200).json(conversations);

    } catch (error) {
        next(error);
    }
}


// ========================================================
// Lister les messages avec un utilisateur
// GET /messages/:userId
// ========================================================

export async function listerMessages(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {

        const userId = req.user!.id;
        const autreUserId = req.params.userId as string;

        if (!autreUserId) {
            return next(
                new AppError(
                    400,
                    "INVALID_ID",
                    "Identifiant de l'utilisateur invalide."
                )
            );
        }

        const messages =
            await messageService.listerMessages(
                userId,
                autreUserId
            );

        return res.status(200).json(messages);

    } catch (error) {
        next(error);
    }
}


// ========================================================
// Envoyer un message
// POST /messages/:userId
// ========================================================

export async function envoyerMessage(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {

        const userId = req.user!.id;
        const destinataireId = req.params.userId as string;

        if (!destinataireId) {
            return next(
                new AppError(
                    400,
                    "INVALID_ID",
                    "Identifiant du destinataire invalide."
                )
            );
        }

        const { content } = req.body;

        const message =
            await messageService.envoyerMessage(
                userId,
                destinataireId,
                content
            );

        return res.status(201).json({
            message: "Message envoyé avec succès.",
            data: message,
        });

    } catch (error) {
        next(error);
    }
}