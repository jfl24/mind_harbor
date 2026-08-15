import api from "./axios.js";

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "../../../shared/types/index.js";


// ========================================================
// Connexion
// ========================================================

export async function login(
  data: LoginRequest
): Promise<LoginResponse> {

  const response = await api.post<LoginResponse>(
    "/auth/login",
    data
  );

  return response.data;
}


// ========================================================
// Inscription
// ========================================================

export async function register(
  data: RegisterRequest
) {

  const response = await api.post(
    "/auth/register",
    data
  );

  return response.data;
}