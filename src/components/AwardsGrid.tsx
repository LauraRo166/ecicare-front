import {AwardCard} from "@/components/AwardsCard.tsx";

interface AwardsGridProps {
    awards: { id: number; name: string; image: unknown }[];
    onEdit: (award: { id: number; name: string; image: unknown }) => void;
    onDelete: (award: { id: number; name: string; image: unknown }) => void;
}

export const AwardsGrid = ({ awards, onEdit, onDelete }: AwardsGridProps) => {
    return (
        <div className="grid grid-cols-4 gap-6">
            {awards.map((award) => (
                <AwardCard
                    key={award.id}
                    award={award}
                    onEdit={() => onEdit(award)}
                    onDelete={() => onDelete(award)}
                />
            ))}
        </div>
    );
};