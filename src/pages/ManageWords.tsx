
import WordsManagerContextProvider from "../store/WordsManagerContext";
import WordsManager from "../features/words/WordsManager";

export function Component() {
    return (
        <WordsManagerContextProvider>
            <WordsManager />
        </WordsManagerContextProvider>
    );
}

Component.displayName = "ManageWords";
