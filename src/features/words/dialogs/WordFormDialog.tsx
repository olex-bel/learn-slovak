
import { createPortal } from "react-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress  from "@mui/material/CircularProgress";

import type { Word } from "../../../services/api";

type WordFormDualogProps = {
    editWord?: Word;
    open: boolean;
    loading: boolean;
    onClose: () => void;
    onSubmit: (word: Word) => void;
};

const initialValue: Word = {
    word: "",
    translation: "",
    example: "",
    meaning: "",
};

export default function WordFormDualog({ editWord, open, loading, onClose, onSubmit } : WordFormDualogProps) {
    const [formFields, setFormFields] = useState<Word>(editWord || initialValue);
    const isEditMode = !!editWord;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (isEditMode && event.target.name === "word") {
            return;
        }

        setFormFields((prevFormFields: Word) => ({
            ...prevFormFields,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(formFields);
    };

    return createPortal(
        <Dialog
            open={open}
            onClose={onClose}
            disableRestoreFocus
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
                    {isEditMode? "Будь ласка, внесіть необхідні зміни у відповідні поля." : "Щоб додати слово до словника, заповніть поля форми."}
                </DialogContentText>
                <TextField name="word" value={formFields.word} autoFocus={!isEditMode} label="Слово" required variant="standard" onChange={handleChange} InputProps={{ readOnly: isEditMode }} />
                <TextField name="translation" value={formFields.translation} autoFocus={isEditMode} label="Переклад" required variant="standard" onChange={handleChange} />
                <TextField name="example" value={formFields.example} label="Приклад використання" required variant="standard" onChange={handleChange} />
                <TextField name="meaning" value={formFields.meaning} label="Значення слова" required variant="standard" onChange={handleChange} />
            </DialogContent>
            <DialogActions>
                <Button disabled={loading} type="submit" variant="contained" size="large">{isEditMode? "Зберегти" :"Додати"}</Button>
                <Button disabled={loading} variant="contained" size="large" onClick={onClose}>Скасувати</Button>
            </DialogActions>
        </Dialog>, document.getElementById("modal")!
    );
}
