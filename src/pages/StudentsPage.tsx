import { DashboardStudents } from "@/components/dashboards/DashboardStudents.tsx";
import {Header} from "@/components/common/Header.tsx";

export const StudentsPage = () => {
    return (
        <div className="flex flex-col h-screen w-full">
            <div className="min-h-screen w-full bg-[#fceceb] p-0">
                {/* Header */}
                <Header/>
                {/* Módulos */}
                <DashboardStudents />
            </div>
        </div>
    );
};