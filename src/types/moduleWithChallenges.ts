import type {ModuleData} from "@/types/moduleData.ts";
import type {ChallengeData} from "@/types/challengeData.ts";

export interface ModuleWithChallenges {
    module: ModuleData;
    challenges: ChallengeData[];
    totalChallenges: number;
}