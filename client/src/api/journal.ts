import { api } from "../api/axios";
import {
  type CreateJournalRequest,
  type JournalEntry,
} from "../../../shared/types/journal";

// L'appel axios pour POST un entrée de journal vers le backend
export async function postEntreeJournal(
  data: CreateJournalRequest,
): Promise<JournalEntry> {
  try {
    const response = await api.post("/journal", data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
