import { type Request, type Response } from "express";
import * as groupService from "../../services/groupService.js";


//----------------- Lister les groupes---------------------------//

export async function listerGroupes(req: Request,res: Response) {

    try {

        const recherche =
            req.query.q as string | undefined;

        const groupes =
            await groupService.listerGroupes(recherche);

        return res.status(200).json(groupes);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur interne du serveur.",
        });
    }
}

// ----------------- Créer un groupe ----------------------------- //

export async function creerGroupe(req: Request,res: Response) {

    try {

        const {
            nom,
            description,
            thematique,
            regles,
            groupVisibility,
            userId,
        } = req.body;

        if (!nom || !description || !userId) {

            return res.status(400).json({
                message:
                    "Le nom, la description et l'utilisateur sont obligatoires.",
            });
        }

        const groupe =
            await groupService.creerGroupe(
                userId,
                {
                    nom,
                    description,
                    thematique,
                    regles,
                    groupVisibility,
                }
            );

        return res.status(201).json({
            message: "Groupe créé avec succès.",
            groupe,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur interne du serveur.",
        });
    }
}

//------------ Obtenir un groupe par son ID ---------------//

export async function groupeParId(req: Request,res: Response) {

    try {

        const id = Number(req.params.id);

        if (isNaN(id)) {

            return res.status(400).json({
                message: "Identifiant du groupe invalide.",
            });
        }

        const groupe =
            await groupService.groupeParId(id);

        if (!groupe) {

            return res.status(404).json({
                message: "Groupe introuvable.",
            });
        }

        return res.status(200).json(groupe);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur interne du serveur.",
        });
    }
}

// ========================================================
// Rejoindre un groupe
// POST /groups/:id/join
// ========================================================

export async function rejoindreGroupe(req: Request,res: Response) {

    try {

        const groupId = Number(req.params.id);

        if (isNaN(groupId)) {

            return res.status(400).json({
                message: "Identifiant du groupe invalide.",
            });
        }

        // TEMPORAIRE :
        // sera remplacé par req.user.id avec le JWT.
        const userId = req.body.userId;

        if (!userId) {

            return res.status(400).json({
                message: "Utilisateur obligatoire.",
            });
        }

        const membership =
            await groupService.rejoindreGroupe(
                groupId,
                userId
            );

        return res.status(201).json({
            message: "Demande d'adhésion créée.",
            membership,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur interne du serveur.",
        });
    }
}

// ========================================================
// Lister les demandes d'adhésion
// GET /groups/:id/requests
// ========================================================

export async function listerDemandes(req: Request,res: Response) {

    try {

        const groupId = Number(req.params.id);

        if (isNaN(groupId)) {

            return res.status(400).json({
                message: "Identifiant du groupe invalide.",
            });
        }

        const demandes =
            await groupService.listerDemandes(groupId);

        return res.status(200).json(demandes);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur interne du serveur.",
        });
    }
}

// ========================================================
// Traiter une demande d'adhésion
// PATCH /groups/:id/requests/:requestId
// ========================================================

export async function traiterDemande(req: Request,res: Response) {

    try {

        const groupId = Number(req.params.id);
        const requestId = Number(req.params.requestId);

        const { decision } = req.body;

        if (isNaN(groupId) || isNaN(requestId)) {

            return res.status(400).json({
                message: "Identifiant invalide.",
            });
        }

        if (
            decision !== "ACCEPTEE" &&
            decision !== "REFUSEE"
        ) {

            return res.status(400).json({
                message:
                    "La décision doit être ACCEPTEE ou REFUSEE.",
            });
        }

        const demande =
            await groupService.traiterDemande(
                groupId,
                requestId,
                decision
            );

        return res.status(200).json({
            message: "Demande traitée avec succès.",
            demande,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur interne du serveur.",
        });
    }
}

// ========================================================
// Retirer un membre
// DELETE /groups/:id/members/:userId
// ========================================================

export async function retirerMembre(
    req: Request,
    res: Response
) {

    try {

        const groupId = Number(req.params.id);
        const userId = req.params.userId as string;
        if (isNaN(groupId) || !userId) {

            return res.status(400).json({
                message: "Identifiant invalide.",
            });
        }

        await groupService.retirerMembre(
            groupId,
            userId
        );

        return res.status(200).json({
            message: "Membre retiré du groupe.",
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur interne du serveur.",
        });
    }
}

// ========================================================
// Lister les publications d'un groupe
// GET /groups/:id/posts
// ========================================================

export async function listerPosts(
    req: Request,
    res: Response
) {

    try {

        const groupId = Number(req.params.id);

        if (isNaN(groupId)) {

            return res.status(400).json({
                message: "Identifiant du groupe invalide.",
            });
        }

        const posts =
            await groupService.listerPosts(groupId);

        return res.status(200).json(posts);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur interne du serveur.",
        });
    }
}

// ========================================================
// Créer une publication
// POST /groups/:id/posts
// ========================================================

export async function creerPost(
    req: Request,
    res: Response
) {

    try {

        const groupId = Number(req.params.id);

        // TEMPORAIRE :
        // sera remplacé par req.user.id avec le JWT.
        const userId = req.body.userId;

        const { content } = req.body;

        if (isNaN(groupId)) {

            return res.status(400).json({
                message: "Identifiant du groupe invalide.",
            });
        }

        if (!userId || !content) {

            return res.status(400).json({
                message:
                    "L'utilisateur et le contenu sont obligatoires.",
            });
        }

        const post =
            await groupService.creerPost(
                groupId,
                userId,
                content
            );

        return res.status(201).json({
            message: "Publication créée avec succès.",
            post,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erreur interne du serveur.",
        });
    }
}




