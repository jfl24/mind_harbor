import type { ActivityCategory } from "../../generated/prisma/enums.js";
import prisma from "../lib/prisma.js";

// La fonction Prisma pour obtenir toutes les activités

export async function getActivities(skip: number, take: number) {
  const [total, activities] = await Promise.all([
    prisma.activity.count(),
    prisma.activity.findMany({
      skip,
      take,
    }),
  ]);

  return [total, activities] as const;
}

// La fonction Prisma pour créer une Activité //

export async function createActivity(
  name: string,
  categorie?: ActivityCategory,
  description?: string,
) {
  const activityCreated = await prisma.activity.create({
    data: {
      name,
      ...(categorie && { categorie }),
      ...(description && { description }),
    },
  });

  return activityCreated;
}

// La fonction Prisma pour supprimer une activité en tant qu'admin

export async function deleteActivity(id: number) {
  const activityDeleted = await prisma.activity.delete({
    where: { id },
  });

  return activityDeleted;
}
