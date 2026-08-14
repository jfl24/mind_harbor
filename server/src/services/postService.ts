import prisma from "../lib/prisma.js";
import { AppError } from "../middlewares/error.js";


// ========================================================
// Créer un commentaire
// ========================================================

export async function creerCommentaire(
    postId: number,
    userId: string,
    content: string
) {

    // Vérifier que la publication existe
    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
    });

    if (!post) {
        throw new AppError(
            404,
            "NOT_FOUND",
            "Publication introuvable."
        );
    }

    // Vérifier que l'utilisateur est membre du groupe
    const membre =
        await prisma.groupMembership.findFirst({
            where: {
                groupId: post.groupId,
                userId,
                membershipStatus: "ACCEPTEE",
            },
        });

    if (!membre) {
        throw new AppError(
            403,
            "NOT_MEMBER",
            "Vous devez être membre du groupe pour commenter."
        );
    }

    // Créer le commentaire
    const commentaire =
        await prisma.comment.create({
            data: {
                postId,
                userId,
                content,
            },

            include: {
                user: {
                    select: {
                        id: true,
                        pseudonyme: true,
                        prenom: true,
                        nom: true,
                        avatar: true,
                    },
                },
            },
        });

    return commentaire;
}


// ========================================================
// Supprimer une publication
// ========================================================

export async function supprimerPost(
    postId: number,
    userId: string
) {

    // Vérifier que la publication existe
    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
    });

    if (!post) {
        throw new AppError(
            404,
            "NOT_FOUND",
            "Publication introuvable."
        );
    }

    // Vérifier que l'utilisateur est l'auteur
    if (post.userId !== userId) {
        throw new AppError(
            403,
            "FORBIDDEN",
            "Vous n'êtes pas autorisé à supprimer cette publication."
        );
    }

    // Supprimer la publication
    await prisma.post.delete({
        where: {
            id: postId,
        },
    });

    return post;
}