import apiClient from "@/services/axiosService";
import type { RedeemableData } from "@/types/redeemableData";

export const getAllRedeemables = async (): Promise<RedeemableData[]> => {
    const response = await apiClient.get("/redeemables");
    return response.data;
};

export const getRedeemableById = async (challengeName: string, awardId: number): Promise<RedeemableData> => {
    const response = await apiClient.get(`/redeemables/${challengeName}/${awardId}`);
    return response.data;
};

export const createRedeemable = async (dto: RedeemableData): Promise<RedeemableData> => {
    const response = await apiClient.post("/redeemables", dto);
    return response.data;
};

export const updateRedeemable = async (challengeName: string, awardId: number, dto: RedeemableData): Promise<RedeemableData> => {
    const response = await apiClient.put(`/redeemables/${challengeName}/${awardId}`, dto);
    return response.data;
};

export const deleteRedeemable = async (challengeName: string, awardId: number): Promise<void> => {
    await apiClient.delete(`/redeemables/${challengeName}/${awardId}`);
};