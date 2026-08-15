import prisma from "../lib/prisma.js";
import { AppError } from "../middlewares/error.js";

// La fonction prisma pour créer une nouvelle entrée de journal
export async function creerEntry(
  userId: string,
  data: {
    date: string;
    humeur: number;
    energie: number;
    sommeil: number;
    anxiete: number;
    activities: number[];
    evenements?: string;
    gratitude?: string;
  },
) {
  const {
    date,
    humeur,
    energie,
    sommeil,
    anxiete,
    activities,
    evenements,
    gratitude,
  } = data;

  const entry = await prisma.journalEntry.create({
    data: {
      user: { connect: { id: userId } },
      date: new Date(date),
      humeur,
      energie,
      sommeil,
      anxiete,
      ...(evenements !== undefined && { evenements }),
      ...(gratitude !== undefined && { gratitude }),
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

  return entry;
}

// La fonction Prisma pour qu'un user obtienne ses entrées de journal
export async function getEntries(
  userId: string,
  order: "asc" | "desc" = "desc",
  skip: number,
  take: number,
) {
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

  return [total, journalEntries] as const;
}

// La fonction Prisma pour obtenir une entrée de journal par date
export async function getEntryDate(userId: string, date: string) {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    throw new AppError(
      400,
      "BAD_REQUEST",
      "Le format de la date est invalide.",
    );
  }

  const journalEntry = await prisma.journalEntry.findUnique({
    where: {
      userId_date: {
        userId: userId,
        date: parsedDate,
      },
    },
  });

  return journalEntry;
}

// La fonction Prisma pour vérifier s'il y a une entrée de journal dans la date demandée
export async function findEntry(userId: string, entryDate: Date) {
  const existingEntry = await prisma.journalEntry.findUnique({
    where: {
      userId_date: {
        userId: userId,
        date: entryDate,
      },
    },
  });

  return existingEntry;
}

// La fonction Prisma pour modifier l'entrée de journal du jour
export async function modifyEntry(
  id: number,
  humeur: number,
  energie: number,
  sommeil: number,
  anxiete: number,
  activities: number[],
  evenements?: string,
  gratitude?: string,
) {
  const updatedEntry = await prisma.journalEntry.update({
    where: { id },
    data: {
      humeur,
      energie,
      sommeil,
      anxiete,
      ...(evenements !== undefined && { evenements }),
      ...(gratitude !== undefined && { gratitude }),
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

  return updatedEntry;
}

// La fonction Prisma pour obtenir les entrées de journal et les moyennes selon un nombre de jours
export async function getEntrieRange(userId: string, dateDebut: Date) {
  if (!(dateDebut instanceof Date) || isNaN(dateDebut.getTime())) {
    throw new Error("La date de début fournie à getEntrieRange est invalide.");
  }

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

  return { journalEntries, aggregates };
}

// La fonction Prisma pour obtenir les entrées par jour de la semaine
export async function getEnriesByDay(userId: string) {
  const userEntries = await prisma.journalEntry.findMany({
    where: { userId },
    select: { id: true, date: true },
  });

  return userEntries;
}

// La fonction Prisma pour obtenir les moyennes des indicateurs selon le jour de la semaine

export async function moyennesParJour(matchingIds: number[]) {
  const moyennes = await prisma.journalEntry.aggregate({
    where: { id: { in: matchingIds } },
    _avg: {
      humeur: true,
      energie: true,
      sommeil: true,
      anxiete: true,
    },
  });

  return moyennes;
}

// La fonction Prisma pour retrouver le ID d'une activité recherchée par nom

export async function getActivityId(activite: string) {
  const activiteId = await prisma.activity.findFirst({
    where: { name: String(activite) },
    select: { id: true },
  });

  return activiteId;
}

// La fonction Prisma pour avoir la moyenne d'un indicateur selon l'activité recherchée

export async function moyenneWithActivity(userId: string, IdActivity: number) {
  const moyenneAvecActivite = await prisma.journalEntry.aggregate({
    where: {
      userId,
      activities: {
        some: {
          activityId: IdActivity,
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

  return moyenneAvecActivite;
}

// La fonction Prisma pour avoir la moyenne d'un indicateur sans l'activité recherchée

export async function moyenneWithoutActivity(
  userId: string,
  IdActivity: number,
) {
  const moyenneSansActivite = await prisma.journalEntry.aggregate({
    where: {
      userId,
      activities: {
        none: {
          activityId: IdActivity,
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

  return moyenneSansActivite;
}
