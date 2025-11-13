import apiClient from "@/services/axiosService";
import type { AwardData } from "@/types/awardData.ts";

interface RawAward {
    id: number;
    name: string;
    description?: string;
    inStock?: number;
    imageUrl?: string;
}

export const getAwards = async (page: number = 1, size: number = 8): Promise<AwardData[]> => {
    try {
        const response = await apiClient.get(`/awards?page=${page}&size=${size}`);
        const raw = response.data;

        // raw puede ser un array directo o un objeto paginado { content: [...] }
        const items: RawAward[] = Array.isArray(raw)
            ? raw
            : (raw?.content ?? raw?.data ?? []);

        if (!Array.isArray(items)) return [];

        return items.map((a) => ({
            id: a.id,
            awardId: a.id,
            name: a.name,
            description: a.description,
            inStock: a.inStock,
            imageUrl: a.imageUrl,
        }));
    } catch (error) {
        console.error("Error en getAwards:", error);
        throw error; // dejar que el componente maneje el error
    }
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
    const response = await apiClient.put(`/awards/${award.awardId}`, award);
    return response.data;
};

export const deleteAward = async (awardId: number): Promise<void> => {
    await apiClient.delete(`/awards/${awardId}`);
};