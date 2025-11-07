import apiClient from "@/services/axiosService";
import type { ModuleData } from "@/types/moduleData";
import type { ChallengeData } from "@/types/challengeData";

export const createModule = async (module: ModuleData) => {
    const response = await apiClient.post("/modules/", module);
    return response.data;
};

export const getTotalModules = async (): Promise<number> => {
    const response = await apiClient.get<{ total: number }>("/modules/total");
    return response.data.total;
};

export const getAllModules = async (page?: number, size?: number) => {
    const response = await apiClient.get("/modules/", {
        params: page !== undefined && size !== undefined ? { page, size } : {},
    });
    return response.data;
};

export const getModuleChallenges = async (moduleName: string): Promise<ChallengeData[]> => {
    const response = await apiClient.get(`/modules/challenges/${encodeURIComponent(moduleName)}`);
    return response.data;
};

export const updateModule = async (module: ModuleData) => {
    const response = await apiClient.put("/modules/", module);
    return response.data;
};

export const deleteModule = async (moduleName: string) => {
    const response = await apiClient.delete(`/modules/${encodeURIComponent(moduleName)}`);
    return response.data;
};