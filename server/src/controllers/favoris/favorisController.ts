import { type Request, type Response, type NextFunction } from "express";
import { Prisma } from "../../../generated/prisma/client.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { buildMeta, parsePagination } from "../../utils/paginate.js";
import * as favorisService from "../../services/favorisService.js";

// La fonction pour ajouter un favori en étant authentifié

export async function creerFavori(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user?.id;

    const resourceId = req.params.id as string;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Assurez-vous d'être bien connecté !" });
    }
    if (!resourceId) {
      return res.status(400).json({
        message: "Oups!  Un ID valide de ressource n'a pas été fourni.",
      });
    }

    const newFavori = await favorisService.createFavori(userId, resourceId);

    return res
      .status(201)
      .json({ data: newFavori, message: "Favori ajouté avec succès !" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(409).json({
          erreur: "Le favori a déjà été ajouté dans ce profil.",
        });
      }
    }
    next(error);
  }
}

// La fonction pour supprimer un de ses favoris en étant authentifié

export async function deleteFavori(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user?.id;

    const resourceId = req.params.id as string;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Assurez-vous d'être bien connecté !" });
    }
    if (!resourceId) {
      return res.status(400).json({
        message: "Oups!  Un ID valide de ressource n'a pas été fourni.",
      });
    }

    const favoriDeleted = await favorisService.deleteFavori(userId, resourceId);

    return res.status(200).json({
      message: "Favori supprimé avec succès.",
      data: favoriDeleted,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(404).json({
          erreur: "Le favori à supprimer n'a pas été trouvé.",
        });
      }
    }
    next(error);
  }
}

// La fonction pour obtenir ses favoris en étant authentifié

export async function getFavorites(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Assurez-vous d'être connecté !" });
  }

  try {
    const { page, limit, skip, take } = parsePagination(req.query);

    const { total, favoris } = await favorisService.getFavoris(
      userId,
      skip,
      take,
    );

    const meta = buildMeta(page, limit, total);

    return res.status(200).json({
      data: favoris,
      meta,
    });
  } catch (error) {
    next(error);
  }
}

// La fonction pour aller chercher des suggestions de favoris pour aider l'anxiété

export async function getSuggestions(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Assurez-vous d'être connecté !" });
  }

  try {
    const suggestions = await favorisService.getSuggestions(userId);

    return res.status(200).json({ data: suggestions });
  } catch (error) {
    next(error);
  }
}
