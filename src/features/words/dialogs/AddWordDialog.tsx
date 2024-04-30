
import { useState, useEffect, useContext } from "react";
import { useMutation } from "react-query";
import { WordsManagerContext } from "../../../store/WordsManagerContext";
import { addWord } from "../../../services/api";
import WordFormDualog from "./WordFormDialog";

import type { Word } from "../../../services/api";

type AddWordDialogProps = {
    onAddWordSuccess: () => void;
};

export default function AddWordDialog({ onAddWordSuccess } : AddWordDialogProps) {
    const [open, setOpen] = useState(false);
    const [key, setKey] = useState(0);
    const { action, hideAddWordDialog } = useContext(WordsManagerContext);
    const { isLoading, isError, mutate } = useMutation(addWord, {
        onSuccess: () => {
            hideAddWordDialog();
            setOpen(false);
            onAddWordSuccess();
        }
    });

    useEffect(() => {
        if (action === "add") {
            setOpen(true);
            setKey((prevKey) => prevKey + 1);
        }
    }, [action]);
    
     
    const handleSubmit = (word: Word) => {
        mutate(word);  
    };

    const handleClose = () => {
        hideAddWordDialog();
        setOpen(false);
    };

    return (<WordFormDualog key={key} open={open} loading={isLoading} error={isError} onClose={handleClose} onSubmit={handleSubmit} />);
}