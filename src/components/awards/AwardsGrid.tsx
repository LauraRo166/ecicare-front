import {AwardCard} from "@/components/awards/AwardsCard.tsx";
import type {AwardData} from "@/types/awardData.ts";

interface AwardsGridProps {
    awards: AwardData[];
    onEdit: (award: AwardData) => void;
    onDelete: (award: AwardData) => void;
}

export const AwardsGrid = ({ awards, onEdit, onDelete }: AwardsGridProps) => {
    return (
        <div className="grid grid-cols-4 gap-6">
            {awards.map((award) => (
                <AwardCard
                    key={award.name}
                    award={award}
                    onEdit={() => onEdit(award)}
                    onDelete={() => onDelete(award)}
                />
            ))}
        </div>
    );
};