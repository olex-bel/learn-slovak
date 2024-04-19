
import { useState, useEffect, useContext } from "react";
import { WordsManagerContext } from "../../../store/WordsManagerContext";
import { addWord } from "../../../services/api";
import WordFormDualog from "./WordFormDialog";

import type { Word } from "../../../services/api";

export default function AddWordDialog() {
    const [open, setOpen] = useState(false);
    const [key, setKey] = useState(0);
    const [loading, setLoading] = useState(false);
    const { action, hideAddWordDialog } = useContext(WordsManagerContext);

    useEffect(() => {
        if (action === "add") {
            setOpen(true);
            setKey((prevKey) => prevKey + 1);
        }
    }, [action]);
    
     
    const handleSubmit = async (word: Word) => {
        setLoading(true);
        await addWord(word);
        setLoading(false);
        hideAddWordDialog();
        setOpen(false);
    };
    const handleClose = () => {
        hideAddWordDialog();
        setOpen(false);
    };

    return (<WordFormDualog key={key} open={open} loading={loading} onClose={handleClose} onSubmit={handleSubmit} />);
}