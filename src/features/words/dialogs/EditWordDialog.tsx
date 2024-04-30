
import { useState, useEffect, useContext } from "react";
import { useMutation } from "react-query";
import WordFormDualog from "./WordFormDialog";
import { WordsManagerContext } from "../../../store/WordsManagerContext";
import { updateWord } from "../../../services/api";

import type { Word } from "../../../services/api";

type EditWordDialogProps = {
    onEditWordSuccess: () => void;
};

export default function EditWordDialog({ onEditWordSuccess } : EditWordDialogProps) {
    const [open, setOpen] = useState(false);
    const { action, editWord, hideEditWordDialog } = useContext(WordsManagerContext);
    const { isLoading, isError, mutate } = useMutation(updateWord, {
        onSuccess: () => {
            hideEditWordDialog();
            setOpen(false);
            onEditWordSuccess();
        }
    });

    useEffect(() => {
        if (action === "edit" && editWord) {
            setOpen(true);
        }
    }, [action, editWord]);
    
     
    const handleSubmit = (word: Word) => {
        mutate(word);
    };
    const handleClose = () => {
        hideEditWordDialog();
        setOpen(false);
    };

    return (<WordFormDualog key={editWord?.word} editWord={editWord!} open={open} loading={isLoading} error={isError} onClose={handleClose} onSubmit={handleSubmit} />);
}