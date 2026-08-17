export type ResourceType =
  | "ARTICLE"
  | "VIDEO"
  | "AUDIO"
  | "EXERCICE"
  | "FICHE";

export type ResourceCategory =
  | "ANXIETE"
  | "SOMMEIL"
  | "RELATIONS"
  | "TRAVAIL"
  | "DEUIL";

export interface Resource {
  id: string;
  titre: string;
  description: string;
  type: ResourceType;
  categorie: ResourceCategory;
  url: string;
  duree: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateResourceRequest {
  titre: string;
  description: string;
  type: ResourceType;
  categorie: ResourceCategory;
  url: string;
  duree: number;
}

export interface SearchResourceRequest {
  q?: string;
  categorie?: ResourceCategory;
  type?: ResourceType;
  duree?: number;
}

export interface ResourcePaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ResourceListResponse {
  data: Resource[];
  meta: ResourcePaginationMeta;
}

export interface ResourceResponse {
  data: Resource;
}