import apiClient from "@/services/axiosService";
import type { UserEcicareDto, UserEcicareResponseDTO } from "@/types/userEcicareData";

export const createEcicareUser = async (
  user: UserEcicareDto
): Promise<UserEcicareResponseDTO> => {
  const response = await apiClient.post("/ecicareusers", user);
  return response.data;
};

export const deleteEcicareUserById = async (id: number): Promise<void> => {
  await apiClient.delete(`/ecicareusers/${id}`);
};

export const getEcicareUserById = async (id: number): Promise<UserEcicareResponseDTO> => {
  const response = await apiClient.get(`/ecicareusers/${id}`);
  return response.data;
};

export const medicalApproveUserEcicare = async (id: number): Promise<void> => {
  await apiClient.patch(`/ecicareusers/${id}/approve`);
};