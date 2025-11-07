import apiClient from "@/services/axiosService";
import type { AwardData } from "@/types/awardData.ts";

export const getAwards = async (page: number = 1, size: number = 8): Promise<AwardData[]> => {
    const response = await apiClient.get(`/awards?page=${page}&size=${size}`);
    return response.data;
};

export const getAwardsTotal = async (): Promise<number> => {
    const response = await apiClient.get("/awards/total");
    return response.data.total;
};

export const getAwardById = async (id: number): Promise<AwardData> => {
    const response = await apiClient.get(`/awards/${id}`);
    return response.data;
};

export const createAward = async (award: AwardData): Promise<AwardData> => {
    const response = await apiClient.post("/awards", award);
    return response.data;
};

export const updateAward = async (award: AwardData): Promise<AwardData> => {
    const response = await apiClient.put(`/awards/${award.id}`, award);
    return response.data;
};

export const deleteAward = async (awardId: number): Promise<void> => {
    await apiClient.delete(`/awards/${awardId}`);
};

export const searchAwardsByName = async (
    search: string,
    page: number = 0,
    size: number = 8
): Promise<AwardData[]> => {
    if (!search.trim()) return []; // evitar llamadas vacías
    const response = await apiClient.get(`/awards/search?q=${encodeURIComponent(search)}&page=${page}&size=${size}`);
    return response.data.content ?? []; // manejar Page<Award> correctamente
};