import prisma from "../lib/prisma.js";
import { AppError } from "../middlewares/error.js";

//-----------------------------------------------------
// Lister les groupes
//-----------------------------------------------------

export async function listerGroupes(recherche?: string) {

    const groupes = await prisma.group.findMany({

        ...(recherche
            ? {
                where: {
                    OR: [
                        {
                            nom: {
                                contains: recherche,
                                mode: "insensitive",
                            },
                        },
                        {
                            description: {
                                contains: recherche,
                                mode: "insensitive",
                            },
                        },
                        {
                            thematique: {
                                contains: recherche,
                                mode: "insensitive",
                            },
                        },
                    ],
                },
            }
            : {}),

        include: {

            moderateur: {
                select: {
                    id: true,
                    pseudonyme: true,
                    prenom: true,
                    nom: true,
                    avatar: true,
                },
            },

            _count: {
                select: {
                    groupMemberships: true,
                    posts: true,
                },
            },
        },

        orderBy: {
            createdAt: "desc",
        },
    });

    return groupes;
}

//---------------------------------------------
//Créer un groupe
//---------------------------------------------
export async function creerGroupe(
    userId: string,
    data: {
        nom: string;
        description: string;
        thematique?: string;
        regles?: string;
        groupVisibility?: "PUBLIC" | "PRIVE";
    }
) {

    const donnees = {
        nom: data.nom,
        description: data.description,
        groupVisibility: data.groupVisibility ?? "PUBLIC",
        moderateurId: userId,
        ...(data.thematique
            ? { thematique: data.thematique }
            : {}),
        ...(data.regles
            ? { regles: data.regles }
            : {}),
    };

    const groupe = await prisma.group.create({
        data: donnees,
    });

    return groupe;
}

// ========================================================
// Obtenir un groupe par son ID
// ========================================================

export async function groupeParId(id: number) {

    const groupe = await prisma.group.findUnique({

        where: {
            id,
        },

        include: {

            moderateur: {
                select: {
                    id: true,
                    pseudonyme: true,
                    prenom: true,
                    nom: true,
                    avatar: true,
                },
            },

            _count: {
                select: {
                    groupMemberships: true,
                    posts: true,
                },
            },
        },
    });

    return groupe;
}

// ========================================================
// Rejoindre un groupe
// ========================================================

export async function rejoindreGroupe(
    groupId: number,
    userId: string
) {
    const groupe = await prisma.group.findUnique({
        where: {
            id: groupId,
        },
    });

    if (!groupe) {
        throw new AppError(
            404,
            "NOT_FOUND",
            "Groupe introuvable."
        );
    }

    const demandeExistante =
        await prisma.groupMembership.findFirst({
            where: {
                groupId,
                userId,
            },
        });

    if (demandeExistante) {
        throw new AppError(
            409,
            "ALREADY_MEMBER",
            "Vous avez déjà demandé à rejoindre ce groupe."
        );
    }

    const statut =
        groupe.groupVisibility === "PUBLIC"
            ? "ACCEPTEE"
            : "EN_ATTENTE";

    const membership =
        await prisma.groupMembership.create({
            data: {
                groupId,
                userId,
                groupMemberStatus: "MEMBRE",
                membershipStatus: statut,
            },
        });

    return membership;
}

// --------- Vérifier modérateur -----------//

async function verifierModerateur(
    groupId: number,
    userId: string
) {
    const groupe = await prisma.group.findUnique({
        where: {
            id: groupId,
        },
        select: {
            id: true,
            moderateurId: true,
        },
    });

    if (!groupe) {
        throw new AppError(
            404,
            "NOT_FOUND",
            "Groupe introuvable."
        );
    }

    if (groupe.moderateurId !== userId) {
        throw new AppError(
            403,
            "FORBIDDEN",
            "Vous n'êtes pas le modérateur de ce groupe."
        );
    }
}

// ========================================================
// Lister les demandes d'adhésion
// ========================================================

export async function listerDemandes(
    groupId: number,
    userId: string
) {
    await verifierModerateur(groupId, userId);

    const demandes =
        await prisma.groupMembership.findMany({
            where: {
                groupId,
                membershipStatus: "EN_ATTENTE",
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

            orderBy: {
                joinedAt: "asc",
            },
        });

    return demandes;
}

// ========================================================
// Traiter une demande d'adhésion
// ========================================================

export async function traiterDemande(
    groupId: number,
    requestId: number,
    decision: "ACCEPTEE" | "REFUSEE",
    userId: string
) {
    await verifierModerateur(groupId, userId);

    const demande =
        await prisma.groupMembership.findFirst({
            where: {
                id: requestId,
                groupId,
                membershipStatus: "EN_ATTENTE",
            },
        });

    if (!demande) {
        throw new AppError(
            404,
            "NOT_FOUND",
            "Demande introuvable."
        );
    }

    const demandeModifiee =
        await prisma.groupMembership.update({
            where: {
                id: requestId,
            },
            data: {
                membershipStatus: decision,
            },
        });

    return demandeModifiee;
}

// ========================================================
// Retirer un membre du groupe
// ========================================================

export async function retirerMembre(
    groupId: number,
    userId: string,
    moderatorId: string
) {
    await verifierModerateur(groupId, moderatorId);

    const membre =
        await prisma.groupMembership.findFirst({
            where: {
                groupId,
                userId,
                membershipStatus: "ACCEPTEE",
            },
        });

    if (!membre) {
        throw new AppError(
            404,
            "NOT_FOUND",
            "Membre introuvable dans ce groupe."
        );
    }

    await prisma.groupMembership.delete({
        where: {
            id: membre.id,
        },
    });

    return membre;
}

// ========================================================
// Lister les publications d'un groupe
// ========================================================

export async function listerPosts(
    groupId: number
) {

    const posts = await prisma.post.findMany({

        where: {
            groupId,
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

            _count: {
                select: {
                    comments: true,
                    report: true,
                },
            },
        },

        orderBy: {
            createdAt: "desc",
        },
    });

    return posts;
}

// ========================================================
// Créer une publication dans un groupe
// ========================================================

export async function creerPost(
    groupId: number,
    userId: string,
    content: string
) {
    const membre =
        await prisma.groupMembership.findFirst({
            where: {
                groupId,
                userId,
                membershipStatus: "ACCEPTEE",
            },
        });

    if (!membre) {
        throw new AppError(
            403,
            "NOT_MEMBER",
            "L'utilisateur n'est pas membre de ce groupe."
        );
    }

    const post = await prisma.post.create({
        data: {
            groupId,
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

    return post;
}