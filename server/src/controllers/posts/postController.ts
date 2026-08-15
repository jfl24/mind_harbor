import {
    type Request,
    type Response,
    type NextFunction
} from "express";

import * as postService from "../../services/postService.js";
import { AppError } from "../../middlewares/error.js";


// ========================================================
// Créer un commentaire
// POST /posts/:id/comments
// ========================================================

export async function creerCommentaire(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {

        const postId = Number(req.params.id);

        if (isNaN(postId)) {
            return next(
                new AppError(
                    400,
                    "INVALID_ID",
                    "Identifiant de publication invalide."
                )
            );
        }

        const userId = req.user!.id;

        const { content } = req.body;

        const commentaire =
            await postService.creerCommentaire(
                postId,
                userId,
                content
            );

        return res.status(201).json({
            message: "Commentaire créé avec succès.",
            commentaire,
        });

    } catch (error) {
        next(error);
    }
}


// ========================================================
// Supprimer une publication
// DELETE /posts/:id
// ========================================================

export async function supprimerPost(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {

        const postId = Number(req.params.id);

        if (isNaN(postId)) {
            return next(
                new AppError(
                    400,
                    "INVALID_ID",
                    "Identifiant de publication invalide."
                )
            );
        }

        const userId = req.user!.id;

        await postService.supprimerPost(
            postId,
            userId
        );

        return res.status(200).json({
            message: "Publication supprimée avec succès.",
        });

    } catch (error) {
        next(error);
    }
}