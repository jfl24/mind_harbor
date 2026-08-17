import prisma from "../lib/prisma.js";

// La fonction prisma pour créer un favori

export async function createFavori(userId: string, resourceId: string) {
  const favoriAdded = await prisma.favorite.create({
    data: {
      userId,
      resourceId,
    },
  });

  return favoriAdded;
}

// La fonction Prisma pour supprimer un favori
export async function deleteFavori(userId: string, resourceId: string) {
  const favoriDeleted = await prisma.favorite.delete({
    where: {
      userId_resourceId: {
        userId,
        resourceId,
      },
    },
  });

  return favoriDeleted;
}

// La fonction Prisma pour trouver les favoris d'un user

export async function getFavoris(
  userId: string,
  skip: number = 0,
  take: number = 10,
) {
  const [total, favoris] = await Promise.all([
    prisma.favorite.count({
      where: { userId },
    }),
    prisma.favorite.findMany({
      where: { userId },
      skip,
      take,
      include: { resource: true },
      orderBy: {
        resource: { createdAt: "desc" },
      },
    }),
  ]);

  return { total, favoris };
}

// La fonction Prisma pour aller chercher des suggestions
export async function getSuggestions(userId: string) {
  const suggestions = await prisma.$transaction(async (tx) => {
    const entreeJournal = await tx.journalEntry.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    if (entreeJournal && entreeJournal.anxiete >= 4) {
      return await tx.favorite.findMany({
        where: {
          userId,
          resource: { titre: { contains: "anxiété", mode: "insensitive" } },
        },
        include: { resource: true },
        take: 2,
      });
    }
    return []; // On retourne un tableau vide si aucune entrée ne correspond au niveau d'anxiété recherché
  });
  return suggestions;
}
