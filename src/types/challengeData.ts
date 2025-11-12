import type {RedeemableData} from "@/types/redeemableData.ts";

export interface ChallengeData {
    name: string;
    description: string;
    imageUrl?: string;
    phrase?: string;
    tips?: string[];
    duration?: string;
    goals?: string[];
    moduleName?: string;
    redeemables?: RedeemableData[];
}

