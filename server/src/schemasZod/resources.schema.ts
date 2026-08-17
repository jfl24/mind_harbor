import { z } from "zod";
import {
  ResourceType,
  ResourceCategory,
} from "../../generated/prisma/enums.js";

// POST pour créer un ressource par l'administrateur
export const createResourceSchema = z.object({
  titre: z
    .string()
    .min(1, { message: "Vous devez fournir un titre obligatoirement." }),

  description: z
    .string()
    .min(1, { message: "Vous devez fournir une description obligatoirement." }),

  type: z.nativeEnum(ResourceType, {
    message: "Le type de ressource est invalide.",
  }),

  categorie: z.nativeEnum(ResourceCategory, {
    message: "La catégorie de ressource est invalide.",
  }),

  url: z
    .string()
    .min(1, { message: "Vous devez fournir un URL obligatoirement." }),

  duree: z
    .number({ message: "La durée doit être un nombre." })
    .int({ message: "La durée doit être un nombre entier." }),
});

export type CreateResourceType = z.infer<typeof createResourceSchema>;

// POST pour faire une recherche dans les ressources avec le body d'une requête
export const searchResourceSchema = z.object({
  q: z.string().optional(),

  categorie: z.nativeEnum(ResourceCategory).optional(),

  type: z.nativeEnum(ResourceType).optional(),

  duree: z.coerce
    .number()
    .int({ message: "La durée doit être un nombre entier." })
    .optional(),
});

export type CreateResourceSearchType = z.infer<typeof searchResourceSchema>;
