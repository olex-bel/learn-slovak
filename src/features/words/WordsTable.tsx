
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TablePagination from "@mui/material/TablePagination";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { Word } from "../../services/api";

type WordsTableProps = {
    words: Word[];
    totalWordsCount: number | null;
    currentPage: number;
    rowsPerPage: number;
    onChangePage: (_: unknown, newPage: number) => void;
    onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onEditWord: (data: Word) => void;
    onAddWord: () => void;
    onDeleteWord: (data: Word) => void;
};

export default function WordsTable({ words, totalWordsCount, currentPage, rowsPerPage, onChangePage, onChangeRowsPerPage, onAddWord, onEditWord, onDeleteWord } : WordsTableProps) {
    return (
        <Paper sx={{ width: "100%", my: 2 }}>
            <Toolbar sx={{ justifyContent: "space-between", gap: 1 }}>
                <TextField label="Фільтр" variant="outlined" />
                <Button variant="contained" onClick={onAddWord}>Додати нове слово</Button>
            </Toolbar>
            <TableContainer>
                <Table aria-label="Your words table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Слово</TableCell>
                            <TableCell align="right">Переклад</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {words.map((item) => (
                            <TableRow
                                key={item.word}
                                hover={true}
                            >
                                <TableCell align="right" scope="row">
                                    {item.word}
                                </TableCell>
                                <TableCell align="right" scope="row">
                                    {item.translation}
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton aria-label="edit" onClick={() => onEditWord(item)}>
                                        <EditIcon />
                                    </IconButton>
                                
                                    <IconButton aria-label="delete" onClick={() => onDeleteWord(item)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {totalWordsCount && 
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalWordsCount}
                    rowsPerPage={rowsPerPage}
                    page={currentPage}
                    onPageChange={onChangePage}
                    onRowsPerPageChange={onChangeRowsPerPage}
                />
            }
        </Paper>
    );
}
