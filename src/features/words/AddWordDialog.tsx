
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type AddWordDialog = {
    open: boolean;
    onClose: () => void;
};

export default function AddWordDialog({ open, onClose } : AddWordDialog) {
     
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //const formData = new FormData(event.currentTarget);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                component: "form",
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>Додати слово до славника</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Щоб додати слово до словника, заповніть поля форми.
                </DialogContentText>
                <TextField name="word" label="Слово" required variant="standard" />
                <TextField name="translation" label="Переклад" required variant="standard" />
                <TextField name="example" label="Приклад використання" required variant="standard" />
                <TextField name="meaning" label="Значення слова" required variant="standard" />
            </DialogContent>
            <DialogActions>
                <Button type="submit" variant="contained" size="large">Додати</Button>
                <Button variant="contained" size="large" onClick={onClose}>Скасувати</Button>
            </DialogActions>
        </Dialog>
    );
}