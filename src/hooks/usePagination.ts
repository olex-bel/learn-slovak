
import { useState } from "react";

export default function usePagination (initialRowsPerPage: number) {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(initialRowsPerPage);

    const handleChangePage = (_: unknown, newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    const updateCurrentPage = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return { currentPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage, updateCurrentPage };
}
