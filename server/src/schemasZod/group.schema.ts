import { z } from "zod";
import { GroupVisibility } from "../../generated/prisma/enums.js";

// POST /groups
export const createGroupSchema = z.object({
    nom: z
        .string()
        .min(1, "Le nom du groupe est obligatoire."),

    description: z
        .string()
        .min(1, "La description du groupe est obligatoire."),

    thematique: z
        .string()
        .optional(),

    regles: z
        .string()
        .optional(),

    groupVisibility: z
        .enum(GroupVisibility)
        .default("PUBLIC"),
});

export type CreateGroupType = z.infer<typeof createGroupSchema>;


// PATCH /groups/:id/requests/:requestId
export const traiterDemandeSchema = z.object({
    decision: z.enum(
        ["ACCEPTEE", "REFUSEE"],
        "La décision doit être ACCEPTEE ou REFUSEE."
    ),
});

export type TraiterDemandeType = z.infer<
    typeof traiterDemandeSchema
>;


// POST /groups/:id/posts
export const createPostSchema = z.object({
    content: z
        .string()
        .min(1, "Le contenu de la publication est obligatoire."),
});

export type CreatePostType = z.infer<typeof createPostSchema>;