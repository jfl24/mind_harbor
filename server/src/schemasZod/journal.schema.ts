import { z } from "zod";

// POST pour faire une entrée de journal
export const createJournalSchema = z.object({
  date: z
    .string()
    .date("Format de la date invalide.  Le format doit être 'YYYY-MM-DD'"),
  // Pour transforme la date donnée en frotend en format de date valide en backend

  humeur: z
    .number({ message: "L'humeur doit être un nombre." })
    .int({ message: "L'humeur doit être un nombre entier." })
    .min(1, { message: "L'humeur doit être supérieure ou égale à 1." })
    .max(5, { message: "L'humeur doit être inférieure ou égale à 5." }),

  energie: z
    .number({ message: "L'énergie doit être un nombre." })
    .int({ message: "L'énergie doit être un nombre entier." })
    .min(1, { message: "L'énergie doit être supérieure ou égale à 1." })
    .max(5, { message: "L'énergie doit être inférieure ou égale à 5." }),

  sommeil: z
    .number({ message: "Le sommeil doit être un nombre." })
    .int({ message: "Le sommeil doit être un nombre entier." })
    .min(1, { message: "Le sommeil doit être supérieur ou égal à 1." })
    .max(5, { message: "Le sommeil doit être inférieur ou égal à 5." }),

  anxiete: z
    .number({ message: "L'anxiété doit être un nombre." })
    .int({ message: "L'anxiété doit être un nombre entier." })
    .min(1, { message: "L'anxiété doit être supérieure ou égale à 1." })
    .max(5, { message: "L'anxiété doit être inférieure ou égale à 5." }),

  activities: z.array(
    z
      .number({ message: "Chaque ID d'activité doit être un nombre." })
      .int({ message: "Chaque ID d'acitivité doit être un entier." }),
  ),

  evenements: z.string().optional(),

  gratitude: z.string().optional(),
});

export type CreateJournalEntryType = z.infer<typeof createJournalSchema>;

// PATCH pour modifier une entrée de journal
export const modifierJournalSchema = z
  .object({
    humeur: z
      .number({ message: "L'humeur doit être un nombre." })
      .int({ message: "L'humeur doit être un nombre entier." })
      .min(1, { message: "L'humeur doit être supérieure ou égale à 1." })
      .max(5, { message: "L'humeur doit être inférieure ou égale à 5." }),

    energie: z
      .number({ message: "L'énergie doit être un nombre." })
      .int({ message: "L'énergie doit être un nombre entier." })
      .min(1, { message: "L'énergie doit être supérieure ou égale à 1." })
      .max(5, { message: "L'énergie doit être inférieure ou égale à 5." }),

    sommeil: z
      .number({ message: "Le sommeil doit être un nombre." })
      .int({ message: "Le sommeil doit être un nombre entier." })
      .min(1, { message: "Le sommeil doit être supérieur ou égal à 1." })
      .max(5, { message: "Le sommeil doit être inférieur ou égal à 5." }),

    anxiete: z
      .number({ message: "L'anxiété doit être un nombre." })
      .int({ message: "L'anxiété doit être un nombre entier." })
      .min(1, { message: "L'anxiété doit être supérieure ou égale à 1." })
      .max(5, { message: "L'anxiété doit être inférieure ou égale à 5." }),

    activities: z.array(
      z
        .number({ message: "Chaque ID d'activité doit être un nombre." })
        .int({ message: "Chaque ID d'acitivité doit être un entier." }),
    ),

    evenements: z.string().optional(),

    gratitude: z.string().optional(),
  })
  .partial(); // partial rend les champs facultatif pour le PATCH

export type ModifierJournal = z.infer<typeof modifierJournalSchema>;
