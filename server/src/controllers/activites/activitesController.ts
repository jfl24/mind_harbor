import { type Request, type Response, type NextFunction } from "express";
import { Prisma } from "../../../generated/prisma/client.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { buildMeta, parsePagination } from "../../utils/paginate.js";
import * as activitesService from "../../services/activitesService.js";

// La fonction pour obtenir toutes les acitivités disponibles

export async function getActivities(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { page, limit, skip, take } = parsePagination(req.query);

    const [total, activities] = await activitesService.getActivities(
      skip,
      take,
    );

    const meta = buildMeta(page, limit, total);

    return res.status(200).json({
      data: activities,
      meta,
    });
  } catch (error) {
    next(error);
  }
}

// La fonction pour supprime une activité en tant qu'admin

export async function deleteActivity(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json({ erreur: "L'ID de l'activité fourni est invalide." });
  }

  try {
    const activityDeleted = await activitesService.deleteActivity(id);

    return res.status(200).json({
      message: "Activité supprimée avec succès.",
      data: activityDeleted,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(404).json({
          erreur: "L'activité à modifier n'a pas été trouvée.",
        });
      }
    }
    next(error);
  }
}
