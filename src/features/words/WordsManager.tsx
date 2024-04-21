import { useState, useContext } from "react";
import { useQuery } from "react-query";
import Box from "@mui/material/Box";
import { getWords } from "../../services/api";
import WordsTable from "./WordsTable";
import { WordsManagerContext } from "../../store/WordsManagerContext";
import AddWordDialog from "./dialogs/AddWordDialog";
import EditWordDialog from "./dialogs/EditWordDialog";
import DeleteWordDialog from "./dialogs/DeleteWordDIalog";
import type { Word } from "../../services/api";

export default function WordsManager() {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const from = currentPage * rowsPerPage;
    const to = from + rowsPerPage - 1;
    const {isLoading, isError, data} = useQuery(["words", from, to], () => getWords(true, {
        from,
        to,
    }));
    const { showAddWordDialog, showEditWordDialog, showDeleteWordDialog } = useContext(WordsManagerContext);

   
    const handleChangePage = (_: unknown, newPage: number) => {
        setCurrentPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };
    const handleAddWord = () => {
        showAddWordDialog();
    };
    const handleEditWord = (word: Word) => {
        showEditWordDialog(word);
    };
    const handleDeleteWord = (word: Word) => {
        showDeleteWordDialog(word);
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
            <AddWordDialog />
            <EditWordDialog />
            <DeleteWordDialog />
        </>
    );
}