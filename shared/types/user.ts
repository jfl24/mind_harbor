export type Role =
  | "UTILISATEUR"
  | "MODERATEUR"
  | "ADMINISTRATEUR";

export interface User {
  id: string;
  email: string;
  nom?: string;
  prenom?: string;
  role: Role;
}