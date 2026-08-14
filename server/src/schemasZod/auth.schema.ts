import { z } from 'zod';
import { Role } from '../../generated/prisma/enums.js';

// Route POST /auth/register
export const regSchema = z.object({
    courriel: z.email("Format du courriel invalide."),
    motDePasse: z
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
        .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une lettre majuscule.")
        .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre."),
    pseudonyme: z.string().optional(),
    nom: z.string().optional(),
    prenom: z.string().optional(),
    avatar: z.string().optional(),
    bio: z.string().optional(),
})
export type RegisterType = z.infer<typeof regSchema>

// Route POST /auth/login
export const loginSchema = z.object({
    courriel: z.email("Format du courriel invalide."),
    motDePasse: z
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
        .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une lettre majuscule.")
        .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre."),
})
export type LoginType = z.infer<typeof loginSchema>

// Route POST /auth/refresh
// Route POST /auth/logout
export const tokenSchema = z.object({
    token: z.jwt("Veuillez vous connectez à votre compte.")
})
export type TokenType = z.infer<typeof tokenSchema>

// Route GET /auth/me
export const userSchema = z.object({
    id: z.uuid('Format ID invalide.'),
    courriel: z.email('Format du courriel invalide.'),
    nom: z.string('Format du nom invalide.').optional(),
    prenom: z.string('Format du nom invalide.').optional(),
    role: z.enum(Role)
})
export type UserType = z.infer<typeof userSchema>