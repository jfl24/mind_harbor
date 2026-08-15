import { z } from "zod";

// POST /messages/:userId
export const createMessageSchema = z.object({
    content: z
        .string()
        .min(1, "Le message ne peut pas être vide."),
});

export type CreateMessageType = z.infer<
    typeof createMessageSchema
>;