
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress  from "@mui/material/CircularProgress";
import { addWord } from "../../services/api";

type AddWordDialog = {
    open: boolean;
    onClose: () => void;
};

export default function AddWordDialog({ open, onClose } : AddWordDialog) {
    const [loading, setLoading] = useState(false);
     
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);

        setLoading(true);
        await addWord({
            word: formData.get("word") as string,
            translation: formData.get("translation") as string,
            example: formData.get("example") as string,
            meaning: formData.get("meaning") as string,
        });
       
        setLoading(false);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                component: "form",
                autoComplete: "off",
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>Додати слово до славника</DialogTitle>
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
                    Щоб додати слово до словника, заповніть поля форми.
                </DialogContentText>
                <TextField name="word" label="Слово" required variant="standard" />
                <TextField name="translation" label="Переклад" required variant="standard" />
                <TextField name="example" label="Приклад використання" required variant="standard" />
                <TextField name="meaning" label="Значення слова" required variant="standard" />
            </DialogContent>
            <DialogActions>
                <Button disabled={loading} type="submit" variant="contained" size="large">Додати</Button>
                <Button disabled={loading} variant="contained" size="large" onClick={onClose}>Скасувати</Button>
            </DialogActions>
        </Dialog>
    );
}