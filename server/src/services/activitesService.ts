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

// La fonction Prisma pour supprimer une activité en tant qu'admin

export async function deleteActivity(id: number) {
  const activityDeleted = await prisma.activity.delete({
    where: { id },
  });

  return activityDeleted;
}
