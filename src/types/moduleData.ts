import type {ChallengeData} from "@/types/challengeData.ts";

export interface ModuleData {
    name: string;
    description?: string;
    imageUrl?: string;
    challenges?: ChallengeData[];
}