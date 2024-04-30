import { useState, useEffect, useContext } from "react";
import { useMutation } from "react-query";
import { WordsManagerContext } from "../../../store/WordsManagerContext";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import CircularProgress  from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";

import { deleteWord } from "../../../services/api";

type DeleteWordDialogProps = {
    onDeleteWordSuccess: () => void;
};

export default function DeleteWordDialog({ onDeleteWordSuccess } : DeleteWordDialogProps) {
    const [open, setOpen] = useState(false);
    const { action, removeWord, hideDeleteWordDialog } = useContext(WordsManagerContext);
    const { isLoading, isError, mutate } = useMutation(deleteWord, {
        onSuccess: () => {
            hideDeleteWordDialog();
            setOpen(false);
            onDeleteWordSuccess();
        }
    });

    const closeDialog = () => {
        hideDeleteWordDialog();
        setOpen(false);
    };

    const handleDelete = () => {
        mutate(removeWord!.word);
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
                    isLoading && <CircularProgress size={24}
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
                    {
                        isError && <Typography color="error" align="center" sx={{ pb: 1 }}>Вибачте, виникла помилка під час видалення слова. Будь ласка, спробуйте ще раз.</Typography>
                    }
                    Видалити слово {removeWord?.word} із словника?
                </DialogContentText>
                <DialogActions>
                    <Button disabled={isLoading} variant="contained" size="large" onClick={handleDelete}>Видалити</Button>
                    <Button disabled={isLoading} variant="contained" size="large" onClick={() => closeDialog()}>Скасувати</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}
