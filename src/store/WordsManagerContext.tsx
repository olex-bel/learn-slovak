import { createContext, useState } from "react";
import type { ReactNode } from "react";

import type { Word } from "../services/api";

type WordsManagerContextProviderProps = {
    children: ReactNode;
};

type Action = "" | "add" | "edit" | "remove";

type WordsManagerContextType = {
    action: Action;
    editWord: Word | null;
    showEditWordDialog: (_: Word) => void;
    hideEditWordDialog: () => void;
    showAddWordDialog: () => void;
    hideAddWordDialog: () => void;
};

export const WordsManagerContext = createContext<WordsManagerContextType>({
    action: "",
    editWord: null,
    showEditWordDialog: (_: Word) => {},
    hideEditWordDialog: () => {},
    showAddWordDialog: () => {},
    hideAddWordDialog: () => {},
});

export default function WordsManagerContextProvider({ children } : WordsManagerContextProviderProps) {
    const [action, setAction] = useState<Action>("");
    const [editWord, setEditWord] = useState<Word | null>(null);
    const showEditWordDialog = (word: Word) => {
        setEditWord(word);
        setAction("edit");
    };
    const hideEditWordDialog = () => {
        setEditWord(null);
        setAction("");
    };
    const showAddWordDialog = () => {
        setAction("add");
    };
    const hideAddWordDialog = () => {
        setAction("");
    };

    const wordsManagerContext: WordsManagerContextType = {
        action,
        editWord,
        showAddWordDialog,
        hideAddWordDialog,
        showEditWordDialog,
        hideEditWordDialog,
    };

    return (
        <WordsManagerContext.Provider value={wordsManagerContext}>
            {children}
        </WordsManagerContext.Provider>
    );
}