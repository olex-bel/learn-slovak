import { useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import Box from "@mui/material/Box";
import { getWords } from "../../services/api";
import WordsTable from "./WordsTable";
import { WordsManagerContext } from "../../store/WordsManagerContext";
import AddWordDialog from "./dialogs/AddWordDialog";
import EditWordDialog from "./dialogs/EditWordDialog";
import DeleteWordDialog from "./dialogs/DeleteWordDIalog";
import type { Word } from "../../services/api";
import usePagination from "../../hooks/usePagination";

export default function WordsManager() {
    const { currentPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage, updateCurrentPage } = usePagination(5);
    const from = currentPage * rowsPerPage;
    const to = from + rowsPerPage - 1;
    const {isLoading, isError, data} = useQuery(["words", from, to], () => getWords(true, {
        from,
        to,
    }));
    const { showAddWordDialog, showEditWordDialog, showDeleteWordDialog } = useContext(WordsManagerContext);
    const queryClient = useQueryClient();

    const invalidateCache = () => queryClient.invalidateQueries({ queryKey: ["words" , from, to] });
    const handleAddWord = () => showAddWordDialog();
    const handleEditWord = (word: Word) => showEditWordDialog(word);
    const handleDeleteWord = (word: Word) => showDeleteWordDialog(word);
    const handleDeleteWordSuccess = () => {
        if (!data || !data.total) { return; }

        const lastIndexOfCurrentPage = currentPage * rowsPerPage + 1;
        if (currentPage> 0 && lastIndexOfCurrentPage === data.total) {
            updateCurrentPage(currentPage - 1);
        }
        invalidateCache();
    };

    if (isLoading && !data) {
        return (
            <Box>Завантаження...</Box>
        );
    }

    if (isError || !data) {
        return (
            <Box sx={{ color: "error" }}>Ой...виникла помилка.</Box>
        );
    }

    if (data.words.length === 0) {
        <Box>У вас ще нема слів для вивченняю Додайте нове слово.</Box>;
    }

    return (
        <>
            <WordsTable 
                words={data.words} 
                totalWordsCount={data.total} 
                currentPage={currentPage} 
                rowsPerPage={rowsPerPage} 
                onChangePage={handleChangePage} 
                onChangeRowsPerPage={handleChangeRowsPerPage}
                onAddWord={handleAddWord}
                onEditWord={handleEditWord}
                onDeleteWord={handleDeleteWord}
            />
            <AddWordDialog onAddWordSuccess={() => invalidateCache()} />
            <EditWordDialog onEditWordSuccess={() => invalidateCache()} />
            <DeleteWordDialog onDeleteWordSuccess={handleDeleteWordSuccess} />
        </>
    );
}