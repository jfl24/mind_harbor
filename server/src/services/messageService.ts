import prisma from "../lib/prisma.js";
import { AppError } from "../middlewares/error.js";


// ========================================================
// Lister les conversations
// GET /messages
// ========================================================

export async function listerConversations(
    userId: string
) {

    const messages = await prisma.message.findMany({
        where: {
            OR: [
                {
                    senderId: userId,
                },
                {
                    recipientId: userId,
                },
            ],
        },

        include: {
            sender: {
                select: {
                    id: true,
                    pseudonyme: true,
                    prenom: true,
                    nom: true,
                    avatar: true,
                },
            },

            recipient: {
                select: {
                    id: true,
                    pseudonyme: true,
                    prenom: true,
                    nom: true,
                    avatar: true,
                },
            },
        },

        orderBy: {
            createdAt: "desc",
        },
    });

    return messages;
}


// ========================================================
// Lister les messages avec un utilisateur
// GET /messages/:userId
// ========================================================

export async function listerMessages(
    userId: string,
    autreUserId: string
) {

    const messages = await prisma.message.findMany({
        where: {
            OR: [
                {
                    senderId: userId,
                    recipientId: autreUserId,
                },
                {
                    senderId: autreUserId,
                    recipientId: userId,
                },
            ],
        },

        include: {
            sender: {
                select: {
                    id: true,
                    pseudonyme: true,
                    prenom: true,
                    nom: true,
                    avatar: true,
                },
            },

            recipient: {
                select: {
                    id: true,
                    pseudonyme: true,
                    prenom: true,
                    nom: true,
                    avatar: true,
                },
            },
        },

        orderBy: {
            createdAt: "asc",
        },
    });

    return messages;
}


// ========================================================
// Envoyer un message
// POST /messages/:userId
// ========================================================

export async function envoyerMessage(
    senderId: string,
    recipientId: string,
    content: string
) {

    // Vérifier que le destinataire existe
    const destinataire = await prisma.user.findUnique({
        where: {
            id: recipientId,
        },
    });

    if (!destinataire) {
        throw new AppError(
            404,
            "NOT_FOUND",
            "Destinataire introuvable."
        );
    }

    // Empêcher l'envoi d'un message à soi-même
    if (senderId === recipientId) {
        throw new AppError(
            400,
            "INVALID_RECIPIENT",
            "Vous ne pouvez pas vous envoyer un message."
        );
    }

    const message = await prisma.message.create({
        data: {
            senderId,
            recipientId,
            content,
        },

        include: {
            sender: {
                select: {
                    id: true,
                    pseudonyme: true,
                    prenom: true,
                    nom: true,
                    avatar: true,
                },
            },

            recipient: {
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

    return message;
}