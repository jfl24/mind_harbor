import { type Request, type Response, type NextFunction } from "express";
import { Prisma } from "../../../generated/prisma/client.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { buildMeta, parsePagination } from "../../utils/paginate.js";
import * as resourcesService from "../../services/resourcesService.js";

// La fonction pour obtenir toutes les ressources, sans recherche ou filtre

export async function getResources(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { page, limit, skip, take } = parsePagination(req.query);

    const { total, resources } = await resourcesService.getResources(
      skip,
      take,
    );

    const meta = buildMeta(page, limit, total);

    return res.status(200).json({
      data: resources,
      meta,
    });
  } catch (error) {
    next(error);
  }
}

// La fonction pour rechercher des ressources avec mot-clé et filtres

export async function getResourcesWithFilters(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { q, categorie, type, duree } = req.body;

  try {
    const { page, limit, skip, take } = parsePagination(req.query);

    const parsedDuree = duree ? Number(duree) : undefined;

    const { total, resourcesTrouvees } =
      await resourcesService.getResourcesWithSearch(
        q,
        categorie,
        type,
        parsedDuree,
        skip,
        take,
      );

    const meta = buildMeta(page, limit, total);

    return res.status(200).json({ data: resourcesTrouvees, meta });
  } catch (error) {
    next(error);
  }
}

// La fonction pour chercher une ressource par ID

export async function getResourcesWithId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id = req.params.id as string;

  if (!id) {
    return res.status(400).json({ erreur: "Veuillez fournir un ID valide." });
  }

  try {
    const resource = await resourcesService.getResourceWithId(id);

    if (!resource) {
      return res
        .status(404)
        .json({ message: "Aucune ressource trouvée avec cet ID." });
    }

    return res.status(200).json({ data: resource });
  } catch (error) {
    next(error);
  }
}

// La fonction pour créer une ressource en tant que Admin

export async function createResource(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { titre, description, type, categorie, url, duree } = req.body;

  if (
    !titre ||
    !description ||
    !type ||
    !categorie ||
    !url ||
    duree === undefined
  ) {
    return res.status(400).json({
      erreur:
        "Oups!  Vous devez fournir tous les champs obligatoires (titre, description, type, categorie, url, duree)",
    });
  }

  const parsedDuree = Number(duree);

  if (isNaN(parsedDuree) || parsedDuree < 0) {
    return res
      .status(400)
      .json({ erreur: "Vous devez entrer une durée positive valide." });
  }

  try {
    const createdResource = await resourcesService.createResource(
      titre,
      description,
      type,
      categorie,
      url,
      parsedDuree,
    );

    return res.status(201).json({
      data: createdResource,
      message: "Ressource créée avec succès !",
    });
  } catch (error) {
    next(error);
  }
}

// La fonction pour supprimer une ressource en mode Admin

export async function deleteResource(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id = req.params.id as string;

  if (!id) {
    return res.status(400).json({ erreur: "Veuillez fournir un ID valide." });
  }

  try {
    const resourceDeleted = await resourcesService.deleteResource(id);

    return res.status(200).json({
      message: "Ressource supprimée avec succès.",
      data: resourceDeleted,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(404).json({
          erreur: "La ressource à supprimer n'a pas été trouvée.",
        });
      }
    }
    next(error);
  }
}
