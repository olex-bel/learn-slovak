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
    removeWord: Word | null;
    showEditWordDialog: (word: Word) => void;
    hideEditWordDialog: () => void;
    showAddWordDialog: () => void;
    hideAddWordDialog: () => void;
    showDeleteWordDialog: (word: Word) => void;
    hideDeleteWordDialog: () => void;
};

export const WordsManagerContext = createContext<WordsManagerContextType>({
    action: "",
    editWord: null,
    removeWord: null,
    showEditWordDialog: (_: Word) => {},
    hideEditWordDialog: () => {},
    showAddWordDialog: () => {},
    hideAddWordDialog: () => {},
    showDeleteWordDialog: (_: Word) => {},
    hideDeleteWordDialog: () => {},
});

export default function WordsManagerContextProvider({ children } : WordsManagerContextProviderProps) {
    const [action, setAction] = useState<Action>("");
    const [editWord, setEditWord] = useState<Word | null>(null);
    const [removeWord, setRemoveWord] = useState<Word | null>(null);
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
    const showDeleteWordDialog = (word: Word) => {
        setRemoveWord(word);
        setAction("remove");
    };
    const hideDeleteWordDialog = () => {
        setRemoveWord(null);
        setAction("");
    };

    const wordsManagerContext: WordsManagerContextType = {
        action,
        editWord,
        removeWord,
        showAddWordDialog,
        hideAddWordDialog,
        showEditWordDialog,
        hideEditWordDialog,
        showDeleteWordDialog,
        hideDeleteWordDialog,
    };

    return (
        <WordsManagerContext.Provider value={wordsManagerContext}>
            {children}
        </WordsManagerContext.Provider>
    );
}