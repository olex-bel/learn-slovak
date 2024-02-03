
import { useState } from "react";
import { useQuery } from "react-query";
import Questions from "./Questions";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { getRandomQuestions } from "../../services/api";

type QuizProps = {
    topicId: number;
};

export default function Quiz( { topicId } : QuizProps ) {
    const [quizCounter, setQuizCounter] = useState(1);
    const {isLoading, isError, data} = useQuery(["topics", topicId], () => getRandomQuestions(topicId));
   
    const startQuiz = () => {
        setQuizCounter(quizCounter + 1);
    };

    if (isLoading) {
        return (
            <Box>Loading...</Box>
        );
    }

    if (isError) {
        return (
            <Box sx={{ color: "error" }}>Cannot get questions</Box>
        );
    }

    return (
        <Stack 
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >  
            <Questions key={quizCounter} questions={data!} handlerStartAgain={startQuiz} />
        </Stack>
    );
}