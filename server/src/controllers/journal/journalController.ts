import { type Request, type Response, type NextFunction } from "express";
import prisma from "../../lib/prisma.js";
import { Prisma } from "../../../generated/prisma/client.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { buildMeta, parsePagination } from "../../utils/paginate.js";

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
          erreur: "Une entrée de journal a déjà été enregistrée aujourd'hui.",
        });
      }
    }
    next(error);
  }
}

// La fonction pour qu'un utilisateur GET ses entrées de journal
async function getJournalEntry(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const order = req.query.order === "asc" ? "asc" : "desc";
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Assurez-vous d'être connecté !" });
  }

  try {
    const { page, limit, skip, take } = parsePagination(req.query);

    const [total, journalEntries] = await Promise.all([
      prisma.journalEntry.count({ where: { userId } }),
      prisma.journalEntry.findMany({
        where: { userId },
        orderBy: { date: order },
        skip,
        take,
        include: {
          activities: {
            include: { activity: true },
          },
        },
      }),
    ]);

    const meta = buildMeta(page, limit, total);

    return res.status(200).json({
      data: journalEntries,
      meta,
    });
  } catch (error) {
    next(error);
  }
}

// La fonction pour chercher une entrée de journal par date
async function getJournalEntryByDate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const date = req.params.date;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Assurez-vous d'être connecté !" });
  }

  if (!date) {
    return res.status(400).json({ erreur: "La date n'a pas été donnée." });
  }

  try {
    const journalEntry = await prisma.journalEntry.findUnique({
      where: {
        userId_date: {
          userId: userId,
          date: new Date(String(date)),
        },
      },
    });

    if (!journalEntry) {
      return res
        .status(404)
        .json({ erreur: "Aucune entrée trouvée pour cette date." });
    }

    return res.status(200).json(journalEntry);
  } catch (error) {
    next(error);
  }
}

// La fonction pour modifier une entrée dans le journal
async function modifyJournalEntry(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const dateParam = req.params.date;
  const userId = req.user?.id;
  const {
    humeur,
    energie,
    sommeil,
    anxiete,
    evenements,
    gratitude,
    activities,
  } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Assurez-vous d'être connecté !" });
  }

  if (!dateParam) {
    return res.status(400).json({ erreur: "La date n'a pas été donnée." });
  }

  try {
    const entryDate = new Date(String(dateParam));

    const existingEntry = await prisma.journalEntry.findUnique({
      where: {
        userId_date: {
          userId: userId,
          date: entryDate,
        },
      },
    });

    if (!existingEntry) {
      return res.status(404).json({
        message: "Oups!  Aucune entrée de journal trouvée pour cette date. ",
      });
    }

    const now = new Date();

    // Une fonction pour vérifier si la date de l'entrée de journal est égale à la date d'aujourd'hui
    const isToday =
      entryDate.getUTCFullYear() === now.getUTCFullYear() &&
      entryDate.getUTCMonth() === now.getUTCMonth() &&
      entryDate.getUTCDate() === now.getUTCDate();

    if (!isToday) {
      return res.status(403).json({
        message: "Oups!  Les modifications doivent être faites avant minuit.",
      });
    }

    const updatedEntry = await prisma.journalEntry.update({
      where: { id: existingEntry.id },
      data: {
        humeur,
        energie,
        sommeil,
        anxiete,
        evenements,
        gratitude,
        ...(activities &&
          Array.isArray(activities) && {
            activities: {
              create: activities.map((activityId: number) => ({
                activityId,
              })),
            },
          }),
      },
      include: {
        // pour obtenir le détail des activités présentes dans le journal Entry
        activities: {
          include: { activity: true },
        },
      },
    });
    return res.status(200).json(updatedEntry);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(404).json({
          erreur: "L'entrée à modifier n'a pas été trouvée.",
        });
      }
    }
    next(error);
  }
}

// La fonction pour chercher les statistiques sur les entrées de journal
async function getJournalEntryWithRange(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const range = req.query.range;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Assurez-vous d'être connecté !" });
  }

  if (!range) {
    return res.status(400).json({ erreur: "La période n'a pas été donnée." });
  }

  const rangeClean = parseInt(String(range), 10); // Pour obtenir seulement le chiffre dans le query

  const now = new Date();

  const dateDebut = new Date(now);

  dateDebut.setUTCDate(dateDebut.getUTCDate() - rangeClean); // Pour filtrer à partir d'une date

  try {
    const [journalEntries, aggregates] = await Promise.all([
      prisma.journalEntry.findMany({
        where: { userId, date: { gte: dateDebut } },
        orderBy: { date: "asc" },
      }),
      prisma.journalEntry.aggregate({
        where: { userId, date: { gte: dateDebut } },
        _avg: {
          humeur: true,
          energie: true,
          sommeil: true,
          anxiete: true,
        },
      }),
    ]);

    // Pour formater les données envoyées par Prisma
    const averages = {
      humeur: aggregates._avg.humeur
        ? Number(aggregates._avg.humeur.toFixed(2))
        : 0,
      energie: aggregates._avg.energie
        ? Number(aggregates._avg.energie.toFixed(2))
        : 0,
      sommeil: aggregates._avg.sommeil
        ? Number(aggregates._avg.sommeil.toFixed(2))
        : 0,
      anxiete: aggregates._avg.anxiete
        ? Number(aggregates._avg.anxiete.toFixed(2))
        : 0,
    };

    if (!journalEntries) {
      return res
        .status(404)
        .json({ erreur: "Aucune entrée trouvée dans cette plage." });
    }

    return res.status(200).json({ averages, entrees: journalEntries });
  } catch (error) {
    next(error);
  }
}
