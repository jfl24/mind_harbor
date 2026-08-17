import type { Activity } from "./activity.js";

export interface JournalActivity {
  id: number;
  journalEntryId: number;
  activityId: number;
  activity: Activity;
}

export interface JournalEntry {
  id: number;
  userId: string;
  date: string;
  humeur: number;
  energie: number;
  sommeil: number;
  anxiete: number;
  evenements: string | null;
  gratitude: string | null;
  createdAt: string;
  updatedAt: string;
  activities: JournalActivity[];
}

export interface CreateJournalRequest {
  date: string;
  humeur: number;
  energie: number;
  sommeil: number;
  anxiete: number;
  activities: number[];
  evenements?: string;
  gratitude?: string;
}

export interface UpdateJournalRequest {
  humeur?: number;
  energie?: number;
  sommeil?: number;
  anxiete?: number;
  activities?: number[];
  evenements?: string;
  gratitude?: string;
}

export interface JournalPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface JournalListResponse {
  data: JournalEntry[];
  meta: JournalPaginationMeta;
}

export interface JournalAverages {
  humeur: number;
  energie: number;
  sommeil: number;
  anxiete: number;
}

export interface JournalRangeResponse {
  averages: JournalAverages;
  entrees: JournalEntry[];
}
