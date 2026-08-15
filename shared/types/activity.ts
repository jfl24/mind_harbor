export type ActivityCategory =
  | "EXERCICE"
  | "BIEN_ETRE"
  | "LOISIR"
  | "SORTIE";

export interface Activity {
  id: number;
  name: string;
  categorie: ActivityCategory | null;
  description: string | null;
  createdAt: string;
}

export interface ActivityPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ActivityListResponse {
  data: Activity[];
  meta: ActivityPaginationMeta;
}