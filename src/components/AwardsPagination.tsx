interface AwardsPaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const AwardsPagination = ({ page, totalPages, onPageChange }: AwardsPaginationProps) => {
    return (
        <div className="flex justify-center items-center mt-8 gap-2">
            <button
                type="button"
                className="p-2 rounded-full border border-gray-300 bg-white text-gray-700 disabled:opacity-40"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                aria-label="Anterior"
            >
                &lt;
            </button>
            {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i}
                    type="button"
                    className={`w-2 h-2 rounded-full mx-1 ${page === i + 1 ? "bg-[#d84239]" : "bg-gray-300"}`}
                    onClick={() => onPageChange(i + 1)}
                    aria-label={`Página ${i + 1}`}
                />
            ))}
            <button
                type="button"
                className="p-2 rounded-full border border-gray-300 bg-white text-gray-700 disabled:opacity-40"
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                aria-label="Siguiente"
            >
                &gt;
            </button>
        </div>
    );
};