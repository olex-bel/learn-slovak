
import { useState, useEffect, useContext } from "react";
import WordFormDualog from "./WordFormDialog";
import { WordsManagerContext } from "../../../store/WordsManagerContext";
import { updateWord } from "../../../services/api";

import type { Word } from "../../../services/api";

export default function EditWordDialog() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { action, editWord, hideEditWordDialog } = useContext(WordsManagerContext);

    useEffect(() => {
        if (action === "edit" && editWord) {
            setOpen(true);
        }
    }, [action, editWord]);
    
     
    const handleSubmit = async (word: Word) => {
        setLoading(true);
        await updateWord(word);
        setLoading(false);
        hideEditWordDialog();
        setOpen(false);
    };
    const handleClose = () => {
        hideEditWordDialog();
        setOpen(false);
    };

    return (<WordFormDualog key={editWord?.word} editWord={editWord!} open={open} loading={loading} onClose={handleClose} onSubmit={handleSubmit} />);
}