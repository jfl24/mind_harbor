import { type Request, type Response } from "express";
import * as postService from "../../services/postService.js";



// ========================================================
// Créer un commentaire
// POST /posts/:id/comments
// ========================================================

export async function creerCommentaire(
    req: Request,
    res: Response
) {

    try {

        const postId = Number(req.params.id);

        // TEMPORAIRE :
        // sera remplacé par req.user.id avec le JWT.
        const userId = req.body.userId;

        const { content } = req.body;

        if (isNaN(postId)) {

            return res.status(400).json({
                message:
                    "Identifiant de publication invalide.",
            });
        }

        if (!userId || !content) {

            return res.status(400).json({
                message:
                    "L'utilisateur et le contenu sont obligatoires.",
            });
        }

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

        console.error(error);

        return res.status(500).json({
            message: "Erreur interne du serveur.",
        });
    }
}


// ========================================================
// Supprimer une publication
// DELETE /posts/:id
// ========================================================

export async function supprimerPost(
    req: Request,
    res: Response
) {

    try {

        const postId = Number(req.params.id);

        // TEMPORAIRE :
        // sera remplacé par req.user.id avec le JWT.
        const userId = req.body.userId;

        if (isNaN(postId)) {

            return res.status(400).json({
                message:
                    "Identifiant de publication invalide.",
            });
        }

        if (!userId) {

            return res.status(400).json({
                message: "Utilisateur obligatoire.",
            });
        }

        await postService.supprimerPost(
            postId,
            userId
        );

        return res.status(200).json({
            message: "Publication supprimée avec succès.",
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur interne du serveur.",
        });
    }
}