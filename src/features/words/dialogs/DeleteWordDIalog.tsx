import { useState, useEffect, useContext } from "react";
import { WordsManagerContext } from "../../../store/WordsManagerContext";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import CircularProgress  from "@mui/material/CircularProgress";

import { deleteWord } from "../../../services/api";

export default function DeleteWordDialog() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { action, removeWord, hideDeleteWordDialog } = useContext(WordsManagerContext);

    const closeDialog = () => {
        hideDeleteWordDialog();
        setOpen(false);
    };

    const handleDelete = async () => {
        setLoading(true);
        await deleteWord(removeWord!.word);
        setLoading(false);
        closeDialog();
    };

    useEffect(() => {
        if (action === "remove" && removeWord) {
            setOpen(true);
        }
    }, [action]);

    return (
        <Dialog
            open={open}
            onClose={() => closeDialog()}
        >
            <DialogTitle>Видалення слова.</DialogTitle>
            <DialogContent
                sx={{
                    position: "relative",
                }}
            >
                {
                    loading && <CircularProgress size={24}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            marginTop: "-12px",
                            marginLeft: "-12px",
                        }}
                    />
                }
                <DialogContentText>
                    Видалити слово {removeWord?.word} із словника?
                </DialogContentText>
                <DialogActions>
                    <Button disabled={loading} variant="contained" size="large" onClick={handleDelete}>Видалити</Button>
                    <Button disabled={loading} variant="contained" size="large" onClick={() => closeDialog()}>Скасувати</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}
