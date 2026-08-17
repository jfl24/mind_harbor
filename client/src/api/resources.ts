import { api } from "../api/axios";
import {
  type Resource,
  type ResourceListResponse,
} from "../../../shared/types";

// L'appel axios pour GET les ressources disponibles dans la BDD
export async function getResources(): Promise<Resource[]> {
  try {
    const response = await api.get<ResourceListResponse>("/resources");

    return response.data.data;
  } catch (error) {
    throw error;
  }
}
