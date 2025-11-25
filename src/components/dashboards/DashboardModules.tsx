import { useEffect, useState } from "react";
import { AccordionModule } from "@/components/modules/AccordionModule.tsx";
import { Challenge } from "@/components/challenges/Challenge.tsx";
import type { ChallengeData } from "@/types/challengeData.ts";
import type { ModuleData } from "@/types/moduleData.ts";
import {
    getAllModules,
    getModuleChallenges,
    getTotalModules,
    getModulesByAdministrator
} from "@/services/moduleService";
import { getAwardsByChallenge } from "@/services/challengeService";
import { Pagination } from "@/components/common/Pagination.tsx";
import type { RedeemableData } from "@/types/redeemableData.ts";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardModulesProps {
    newModule?: ModuleData;
}

export const DashboardModules = ({ newModule }: DashboardModulesProps) => {
    const { role, email } = useAuth();

    const [modules, setModules] = useState<ModuleData[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const PAGE_SIZE = 5;

    const fetchModules = async (pageNumber: number) => {
        setLoading(true);

        try {
            let modulesResponse;
            let total;

            if (role === "COLLABORATOR") {
                if (!email) {
                    console.error("No email available for collaborator");
                    setLoading(false);
                    return;
                }

                const data = await getModulesByAdministrator(
                    email,
                    pageNumber - 1,
                    PAGE_SIZE
                );

                modulesResponse = data.content;
                total = data.totalElements;
            } else {
                const totalModules = await getTotalModules();
                total = totalModules;

                const all = await getAllModules(pageNumber - 1, PAGE_SIZE);
                modulesResponse = all.content;
            }

            setTotalPages(Math.ceil(total / PAGE_SIZE));

            // Cargar retos + premios
            const modulesWithChallenges: ModuleData[] = await Promise.all(
                modulesResponse.map(async (mod: ModuleData) => {
                    const challenges: ChallengeData[] = await getModuleChallenges(mod.name);

                    const challengesWithAwards = await Promise.all(
                        challenges.map(async (c) => {
                            try {
                                const awards = await getAwardsByChallenge(c.name);

                                const redeemables: RedeemableData[] = (awards ?? []).map(a => ({
                                    challengeName: c.name,
                                    awardId: a.awardId,
                                    name: a.name,
                                    description: a.description,
                                    inStock: a.inStock,
                                    imageUrl: a.imageUrl
                                }));

                                return { ...c, redeemables };
                            } catch (error) {
                                console.error("Error loading awards:", c.name, error);
                                return { ...c, redeemables: [] };
                            }
                        })
                    );

                    return { ...mod, challenges: challengesWithAwards };
                })
            );

            setModules(modulesWithChallenges);
        } catch (error) {
            console.error("Error loading modules:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔥 Ahora depende de email también
    useEffect(() => {
        if (role === "COLLABORATOR" && !email) return; // Evita llamada inválida
        fetchModules(page);
    }, [page, role, email]);

    useEffect(() => {
        if (newModule) {
            setModules(prev => [...prev, newModule]);
        }
    }, [newModule]);

    const handleAddChallenge = (moduleName: string, newChallenge: ChallengeData) => {
        setModules(prev =>
            prev.map(mod =>
                mod.name === moduleName
                    ? {
                        ...mod,
                        challenges: [...(mod.challenges || []), { ...newChallenge, redeemables: [] }]
                    }
                    : mod
            )
        );
    };

    const handleUpdateChallenge = (updatedChallenge: ChallengeData) => {
        setModules(prevModules =>
            prevModules.map(mod => ({
                ...mod,
                challenges:
                    mod.challenges?.map(ch =>
                        ch.name === updatedChallenge.name ? updatedChallenge : ch
                    ) || []
            }))
        );
    };

    const handleDeleteModule = (name: string) => {
        setModules(prev => prev.filter(m => m.name !== name));
    };

    const handleEditModule = (updatedModule: ModuleData) => {
        setModules(prev =>
            prev.map(m => (m.name === updatedModule.name ? updatedModule : m))
        );
    };

    const handleDeleteChallenge = (challengeName: string) => {
        setModules(prevModules =>
            prevModules.map(mod => ({
                ...mod,
                challenges: mod.challenges?.filter(ch => ch.name !== challengeName) || []
            }))
        );
    };

    if (loading) return <p className="text-center mt-6">Cargando módulos...</p>;

    return (
        <div className="min-h-screen w-full bg-[#fceceb] px-10">
            {modules.length > 0 ? (
                modules.map(mod => (
                    <AccordionModule
                        key={mod.name}
                        module={mod}
                        onAddChallenge={handleAddChallenge}
                        onDeleteModule={handleDeleteModule}
                        onEditModule={handleEditModule}
                    >
                        {mod.challenges && mod.challenges.length > 0 ? (
                            mod.challenges.map(challenge => (
                                <Challenge
                                    key={challenge.name}
                                    challenge={challenge}
                                    onUpdate={handleUpdateChallenge}
                                    onDelete={handleDeleteChallenge}
                                />
                            ))
                        ) : (
                            <p>Sin retos disponibles</p>
                        )}
                    </AccordionModule>
                ))
            ) : (
                <p className="text-center mt-6">No hay módulos disponibles</p>
            )}

            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
    );
};