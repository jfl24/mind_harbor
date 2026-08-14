import { type Request, type Response, type NextFunction } from "express";
import prisma from "../../lib/prisma.js";
import { Prisma } from "../../../generated/prisma/client.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { buildMeta, parsePagination } from "../../utils/paginate.js";

// La fonction pour poster un entreée dans son propre journal
export async function creerJournalEntry(
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
export async function getJournalEntry(
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
export async function getJournalEntryByDate(
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
export async function modifyJournalEntry(
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
export async function getJournalEntryWithRange(
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

// La fonction pour calculer les statistiques par jour de la semaine
export async function getAveragesByDay(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const day = req.query.day;
  const userId = req.user?.id;

  const DAYS_MAP: Record<string, number> = {
    dimanche: 0,
    sunday: 0,
    lundi: 1,
    monday: 1,
    mardi: 2,
    tuesday: 2,
    mercredi: 3,
    wednesday: 3,
    jeudi: 4,
    thursday: 4,
    vendredi: 5,
    friday: 5,
    samedi: 6,
    saturday: 6,
  };

  const dayClean = (req.query.day as string)?.toLowerCase().trim();

  if (!userId) {
    return res.status(401).json({ message: "Assurez-vous d'être connecté !" });
  }

  if (!day) {
    return res
      .status(400)
      .json({ erreur: "La journée de la  n'a pas été donnée." });
  }

  if (dayClean && !(dayClean in DAYS_MAP)) {
    return res.status(400).json({
      message: "Ce jour n'est pas un jour de la semaine valide.",
    });
  }

  const dayNumber = DAYS_MAP[dayClean];

  // Pour trouver les entrées du user avec la date
  const userEntries = await prisma.journalEntry.findMany({
    where: { userId },
    select: { id: true, date: true },
  });

  // Pour trouver les id des entrées qui sont de la bonne journée
  const matchingIds = userEntries
    .filter((entry) => entry.date.getUTCDay() === dayNumber)
    .map((entry) => entry.id);
  // Pour filtrer à partir d'une journée
  try {
    const moyennes = await prisma.journalEntry.aggregate({
      where: { id: { in: matchingIds } },
      _avg: {
        humeur: true,
        energie: true,
        sommeil: true,
        anxiete: true,
      },
    });

    // Pour formater les données envoyées par Prisma
    const averages = {
      humeur: moyennes._avg.humeur
        ? Number(moyennes._avg.humeur.toFixed(2))
        : 0,
      energie: moyennes._avg.energie
        ? Number(moyennes._avg.energie.toFixed(2))
        : 0,
      sommeil: moyennes._avg.sommeil
        ? Number(moyennes._avg.sommeil.toFixed(2))
        : 0,
      anxiete: moyennes._avg.anxiete
        ? Number(moyennes._avg.anxiete.toFixed(2))
        : 0,
    };

    if (!moyennes) {
      return res
        .status(404)
        .json({ erreur: "Aucune moyenne trouvée avec cette journée." });
    }

    return res.status(200).json(averages);
  } catch (error) {
    next(error);
  }
}

// La fonction pour voir la corrélation entre une activité et l'anxiété
export async function getInsights(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { activite } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Assurez-vous d'être connecté !" });
  }

  if (!activite) {
    return res
      .status(400)
      .json({ erreur: "La requête a des éléments manquants." });
  }

  try {
    const activiteId = await prisma.activity.findFirst({
      where: { name: String(activite) },
      select: { id: true },
    });

    if (!activiteId) {
      return res.status(404).json({ message: "Oups! Activité introuvable." });
    }

    const moyenneAvecActivite = await prisma.journalEntry.aggregate({
      where: {
        userId,
        activities: {
          some: {
            activityId: activiteId.id,
          },
        },
      },
      _avg: {
        anxiete: true,
      },
      _count: {
        _all: true,
      },
    });

    const moyenneSansActivite = await prisma.journalEntry.aggregate({
      where: {
        userId,
        activities: {
          none: {
            activityId: activiteId.id,
          },
        },
      },
      _avg: {
        anxiete: true,
      },
      _count: {
        _all: true,
      },
    });

    if (
      moyenneSansActivite._count._all < 5 ||
      moyenneAvecActivite._count._all < 5
    ) {
      return res.status(400).json({
        message:
          "Le nombre d'entrées est trop petit pour dégager une tendance.",
      });
    }

    const avecActivite = moyenneAvecActivite._avg.anxiete ?? 0;
    const sansActivite = moyenneSansActivite._avg.anxiete ?? 0;

    if (avecActivite === 0 || sansActivite === 0) {
      return res
        .status(400)
        .json({ message: "On ne peut pas diviser par zéro." });
    }

    if (avecActivite > sansActivite) {
      const augmentation = ((avecActivite - sansActivite) / sansActivite) * 100;
      return res.status(200).json({
        message: `Les jours où vous ne notez pas l'activité ${activite}, votre anxiété est en moyenne ${augmentation.toFixed(1)} % plus basse`,
      });
    } else {
      const augmentation = ((sansActivite - avecActivite) / avecActivite) * 100;
      return res.status(200).json({
        message: `Les jours où vous notez l'activité ${activite}, votre anxiété est en moyenne ${augmentation.toFixed(1)} % plus basse`,
      });
    }
  } catch (error) {
    next(error);
  }
}
