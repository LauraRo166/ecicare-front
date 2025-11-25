import apiClient from "@/services/axiosService";
import type { ChallengeData } from "@/types/challengeData";
import type { ModuleWithChallenges } from "@/types/moduleWithChallenges";
import type { AwardData } from "@/types/awardData";

export const createChallenge = async (challenge: ChallengeData): Promise<ChallengeData> => {
    const response = await apiClient.post("/challenges/", challenge);
    return response.data;
};

export const getChallenges = async (
    page?: number,
    size?: number
): Promise<ChallengeData[] | undefined> => {
    if (page !== undefined && size !== undefined) {
        const response = await apiClient.get(`/challenges/?page=${page}&size=${size}`);
        return response.data; // backend devuelve Page<Challenge>
    }
    const response = await apiClient.get("/challenges/");
    return response.data; // lista completa
};

export const searchChallenges = async (query: string): Promise<ModuleWithChallenges[]> => {
    if (!query.trim()) return [];
    const response = await apiClient.get(`/challenges/search?q=${encodeURIComponent(query)}`);
    return response.data;
};

export const getChallengeByName = async (name: string): Promise<ChallengeData> => {
    const response = await apiClient.get(`/challenges/${encodeURIComponent(name)}`);
    return response.data;
};

export const getAwardsByChallenge = async (name: string): Promise<AwardData[]> => {
    const response = await apiClient.get(`/challenges/${encodeURIComponent(name)}/awards`);
    return response.data;
};

export const getChallengeByDuration = async (duration: string): Promise<ChallengeData[]> => {
    const response = await apiClient.get(`/challenges/duration/${encodeURIComponent(duration)}`);
    return response.data;
};

export const getChallengesByUser = async (userEmail: string): Promise<ChallengeData[]> => {
    const response = await apiClient.get(`/challenges/users/${encodeURIComponent(userEmail)}`);
    return response.data;
};

export const getConfirmedChallengesByUser = async (userEmail: string): Promise<ChallengeData[]> => {
    const response = await apiClient.get(`/challenges/confirmed/${encodeURIComponent(userEmail)}`);
    return response.data;
};

export const updateChallenge = async (challenge: ChallengeData): Promise<ChallengeData> => {
    const response = await apiClient.put("/challenges/", challenge);
    return response.data;
};

export const deleteChallenge = async (name: string): Promise<void> => {
    await apiClient.delete(`/challenges/${encodeURIComponent(name)}`);
};

export const addUserToChallenge = async (userEmail: string, name: string): Promise<void> => {
    await apiClient.put(`/challenges/users/${encodeURIComponent(userEmail)}/challenges/${encodeURIComponent(name)}`);
};

export const confirmUserInChallenge = async (userEmail: string, name: string): Promise<void> => {
    await apiClient.put(`/challenges/users/${encodeURIComponent(userEmail)}/challenges/${encodeURIComponent(name)}/confirm`);
};

export const getAllChallenges = async () => {
    const response = await apiClient.get("/challenges/");
    return response.data;
};

export const getRegisteredUsersByChallenge = async (challengeName: string) => {
    const response = await apiClient.get(`/challenges/${encodeURIComponent(challengeName)}/registered-users`);
    return response.data;
};

export const getConfirmedUsersByChallenge = async (challengeName: string) => {
    const response = await apiClient.get(`/challenges/${encodeURIComponent(challengeName)}/confirmed-users`);
    return response.data;
};