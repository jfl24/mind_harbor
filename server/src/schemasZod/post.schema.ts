import { z } from "zod";

export const createCommentSchema = z.object({
    content: z
        .string()
        .min(1, "Le commentaire ne peut pas être vide."),
});

export type CreateCommentType = z.infer<
    typeof createCommentSchema
>;