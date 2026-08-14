import { type Request, type Response, type NextFunction } from "express";
import prisma from "../../lib/prisma.js";
import { Prisma } from "../../../generated/prisma/client.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

// La fonction pour poster un entreée dans son propre journal
async function creerJournalEntry(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user?.id;

    const {
      date,
      humeur,
      energie,
      sommeil,
      anxiete,
      activities,
      evenements,
      gratitude,
    } = req.body;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Assurez-vous d'être bien connecté !" });
    }
    if (!date || !humeur || !energie || !sommeil || !anxiete || !activities) {
      return res
        .status(400)
        .json({ message: "Oups!  Des champs requis n'ont pas été remplis" });
    }

    const newJournalEntry = await prisma.journalEntry.create({
      data: {
        userId,
        date: new Date(date),
        humeur,
        energie,
        sommeil,
        anxiete,
        evenements,
        gratitude,
        activities: {
          create: activities.map((activityId: number) => ({
            activityId: activityId,
          })),
        },
      },
      include: {
        activities: {
          include: { activity: true },
        },
      },
    });
    return res.status(201).json(newJournalEntry);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(409).json({
          erreur: "Une entrée de journal a déjà été enregistrée aujourd'huié",
        });
      }
    }
    next(error);
  }
}
