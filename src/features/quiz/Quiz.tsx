
import { useState } from "react";
import Questions from "./Questions";
import { Stack, Box } from "@mui/material";
import useQuestions from "../../hooks/useQuestions";

type QuizProps = {
    topicId: number;
};

export default function Quiz( { topicId } : QuizProps ) {
    const [quizCounter, setQuizCounter] = useState(1);
    const {questions, isLoading, errorMessage} = useQuestions(topicId);
   
    const startQuiz = () => {
        setQuizCounter(quizCounter + 1);
    };

    if (isLoading) {
        return (
            <Box>Loading...</Box>
        );
    }

    if (errorMessage) {
        return (
            <Box>{errorMessage}</Box>
        );
    }

    if (!questions) {
        return (
            <Box>Something when wron!</Box>
        );
    }

    return (
        <Stack 
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >  
            <Questions questions={questions} handlerStartAgain={startQuiz} />
        </Stack>
    );
}