import { api } from "../api/axios";
import {
  type CreateJournalRequest,
  type JournalEntry,
} from "../../../shared/types/journal";
import type { ActivityListResponse, Activity } from "../../../shared/types";

// L'appel axios pour POST une entrée de journal vers le backend
export async function postEntreeJournal(
  data: CreateJournalRequest,
): Promise<JournalEntry> {
  try {
    const token = localStorage.getItem("token"); // Pour récupérer le token dans le local storage

    const response = await api.post("/journal", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// L'appel axios pour GET les activités disponibles dans la BDD
export async function getActivities(): Promise<Activity[]> {
  try {
    const response = await api.get<ActivityListResponse>("/activities");

    return response.data.data;
  } catch (error) {
    throw error;
  }
}
