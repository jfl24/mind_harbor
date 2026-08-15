import { z } from "zod";
import { Role } from "../../generated/prisma/enums.js";

// Route POST /auth/register
export const regSchema = z.object({
  email: z.string().email("Format du courriel invalide."),
  passwordHash: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
    .regex(
      /[A-Z]/,
      "Le mot de passe doit contenir au moins une lettre majuscule.",
    )
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre."),
  pseudonyme: z.string().optional(),
  nom: z.string().optional(),
  prenom: z.string().optional(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
});
export type RegisterType = z.infer<typeof regSchema>;

// Route POST /auth/login
export const loginSchema = z.object({
  email: z.string().email("Format du courriel invalide."),
  passwordHash: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
    .regex(
      /[A-Z]/,
      "Le mot de passe doit contenir au moins une lettre majuscule.",
    )
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre."),
});
export type LoginType = z.infer<typeof loginSchema>;

// Route POST /auth/refresh
export const refreshTokenSchema = z.object({
  refreshToken: z.jwt("Veuillez vous connectez à votre compte."),
});
export type RefreshTokenType = z.infer<typeof refreshTokenSchema>;

// Route POST /auth/logout
export const tokenSchema = z.object({
  token: z.jwt("Veuillez vous connectez à votre compte."),
});
export type TokenType = z.infer<typeof tokenSchema>;

// Route GET /auth/me
export const userSchema = z.object({
  id: z.uuid("Format ID invalide."),
  email: z.string().email("Format du courriel invalide."),
  nom: z.string("Format du nom invalide.").optional(),
  prenom: z.string("Format du nom invalide.").optional(),
  role: z.nativeEnum(Role),
});
export type UserType = z.infer<typeof userSchema>;
