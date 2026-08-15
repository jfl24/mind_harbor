import {
    type Request,
    type Response,
    type NextFunction
} from "express";

import * as groupService from "../../services/groupService.js";

import { AppError } from "../../middlewares/error.js";


//----------------- Lister les groupes---------------------------//

export async function listerGroupes(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const recherche =
            req.query.q as string | undefined;

        const groupes =
            await groupService.listerGroupes(recherche);

        return res.status(200).json(groupes);

    } catch (error) {
        next(error);
    }
}

// ----------------- Créer un groupe ----------------------------- //
export async function creerGroupe(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {

        const userId = req.user!.id;

        const {
            nom,
            description,
            thematique,
            regles,
            groupVisibility,
        } = req.body;

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
        next(error);
    }
}

//------------ Obtenir un groupe par son ID ---------------//

export async function groupeParId(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {

        const id = Number(req.params.id);

        if (isNaN(id)) {
            return next(
                new AppError(
                    400,
                    "INVALID_ID",
                    "Identifiant du groupe invalide."
                )
            );
        }

        const groupe =
            await groupService.groupeParId(id);

        if (!groupe) {
            return next(
                new AppError(
                    404,
                    "NOT_FOUND",
                    "Groupe introuvable."
                )
            );
        }

        return res.status(200).json(groupe);

    } catch (error) {
        next(error);
    }
}

// ========================================================
// Rejoindre un groupe
// POST /groups/:id/join
// ========================================================

export async function rejoindreGroupe(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {

        const groupId = Number(req.params.id);

        if (isNaN(groupId)) {
            return next(
                new AppError(
                    400,
                    "INVALID_ID",
                    "Identifiant du groupe invalide."
                )
            );
        }

        const userId = req.user!.id;

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
        next(error);
    }
}
// ========================================================
// Lister les demandes d'adhésion
// GET /groups/:id/requests
// ========================================================

export async function listerDemandes(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {

        const groupId = Number(req.params.id);

        if (isNaN(groupId)) {
            return next(
                new AppError(
                    400,
                    "INVALID_ID",
                    "Identifiant du groupe invalide."
                )
            );
        }

        const userId = req.user!.id;

        const demandes =
            await groupService.listerDemandes(
                groupId,
                userId
            );

        return res.status(200).json(demandes);

    } catch (error) {
        next(error);
    }
}

// ========================================================
// Traiter une demande d'adhésion
// PATCH /groups/:id/requests/:requestId
// ========================================================

export async function traiterDemande(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {

        const groupId = Number(req.params.id);
        const requestId = Number(req.params.requestId);

        if (isNaN(groupId) || isNaN(requestId)) {
            return next(
                new AppError(
                    400,
                    "INVALID_ID",
                    "Identifiant invalide."
                )
            );
        }

        const { decision } = req.body;

        const userId = req.user!.id;

        const demande =
            await groupService.traiterDemande(
                groupId,
                requestId,
                decision,
                userId
            );

        return res.status(200).json({
            message: "Demande traitée avec succès.",
            demande,
        });

    } catch (error) {
        next(error);
    }
}

// ========================================================
// Retirer un membre
// DELETE /groups/:id/members/:userId
// ========================================================

export async function retirerMembre(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {

        const groupId = Number(req.params.id);
        const userId = req.params.userId as string;

        if (isNaN(groupId) || !userId) {
            return next(
                new AppError(
                    400,
                    "INVALID_ID",
                    "Identifiant invalide."
                )
            );
        }

        const moderatorId = req.user!.id;

        await groupService.retirerMembre(
            groupId,
            userId,
            moderatorId
        );

        return res.status(200).json({
            message: "Membre retiré du groupe.",
        });

    } catch (error) {
        next(error);
    }
}

// ========================================================
// Lister les publications d'un groupe
// GET /groups/:id/posts
// ========================================================

export async function listerPosts(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {

        const groupId = Number(req.params.id);

        if (isNaN(groupId)) {
            return next(
                new AppError(
                    400,
                    "INVALID_ID",
                    "Identifiant du groupe invalide."
                )
            );
        }

        const posts =
            await groupService.listerPosts(groupId);

        return res.status(200).json(posts);

    } catch (error) {
        next(error);
    }
}

// ========================================================
// Créer une publication
// POST /groups/:id/posts
// ========================================================

export async function creerPost(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {

        const groupId = Number(req.params.id);

        if (isNaN(groupId)) {
            return next(
                new AppError(
                    400,
                    "INVALID_ID",
                    "Identifiant du groupe invalide."
                )
            );
        }

        const userId = req.user!.id;
        const { content } = req.body;

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
        next(error);
    }
}

