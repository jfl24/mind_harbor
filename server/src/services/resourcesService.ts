import type {
  ResourceCategory,
  ResourceType,
} from "../../generated/prisma/enums.js";
import prisma from "../lib/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";

// La fonction Prisma pour obtenir toutes les ressources

export async function getResources(skip: number, take: number) {
  const [total, resources] = await Promise.all([
    prisma.resource.count(),
    prisma.resource.findMany({
      orderBy: { updatedAt: "desc" },
      skip,
      take,
    }),
  ]);

  return { total, resources };
}

// La fonction pour obtenir les ressources avec recherche par mot-clé et filtre

export async function getResourcesWithSearch(
  q?: string,
  categorie?: ResourceCategory,
  type?: ResourceType,
  duree?: number,
  skip: number = 0,
  take: number = 10,
) {
  // Je mets des valeurs par défaut à skip et take pour éviter la query de planter

  const filters: Prisma.ResourceWhereInput = {};

  if (q?.trim()) {
    filters.titre = { contains: q.trim(), mode: "insensitive" };
  }

  if (categorie) {
    filters.categorie = categorie;
  }

  if (type) {
    filters.type = type;
  }

  if (duree) {
    filters.duree = { lte: duree };
  }

  const [total, resourcesTrouvees] = await Promise.all([
    prisma.resource.count({
      where: filters,
    }),
    prisma.resource.findMany({
      where: filters,
      skip,
      take,
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  return { total, resourcesTrouvees };
}

// La fonction Prisma pour chercher une ressource par ID
export async function getResourceWithId(id: string) {
  const resource = await prisma.resource.findUnique({
    where: { id },
  });

  return resource;
}

// La fonction Prisma pour créer une ressource
export async function createResource(
  titre: string,
  description: string,
  type: ResourceType,
  categorie: ResourceCategory,
  url: string,
  duree: number,
) {
  const createdResource = await prisma.resource.create({
    data: {
      titre: titre,
      description: description,
      type: type,
      categorie: categorie,
      url: url,
      duree: duree,
    },
  });

  return createdResource;
}

// La fonction Prisma pour supprimer une ressource en tant qu'admin

export async function deleteResource(id: string) {
  const resourceDeleted = await prisma.resource.delete({
    where: { id },
  });

  return resourceDeleted;
}
