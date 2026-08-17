import type { Resource } from "./resource.js";

export interface Favorite {
  id: number;
  userId: string;
  resourceId: string;
}

export interface FavoriteWithResource extends Favorite {
  resource: Resource;
}

export interface FavoritePaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface FavoriteListResponse {
  data: FavoriteWithResource[];
  meta: FavoritePaginationMeta;
}

export interface FavoriteResponse {
  data: Favorite;
  message: string;
}

export interface FavoriteSuggestionsResponse {
  data: FavoriteWithResource[];
}