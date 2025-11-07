interface DashboardHeaderProps {
    title: string;
}

export const Header = ({ title }: DashboardHeaderProps) => {
    return (
        <div className="flex items-center justify-between px-8 py-6 bg-white border-b border-gray-200">
            <h1 className="text-2xl font-bold text-black">{title}</h1>
        </div>
    );
};