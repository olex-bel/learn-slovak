import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import QuestionCard from "./QuestionCard";
import QuizResult from "./QuizResult";

import type { QuestionType } from "../../services/api";

type QuestionsProps = {
    questions: QuestionType[];
    handlerStartAgain: () => void;
}

export default function Questions({ questions, handlerStartAgain } : QuestionsProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const currentQuestion =  questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    
    const nextQuestion = function (isCorrectAnswer: boolean) {
        if (currentQuestionIndex < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }

        if (isCorrectAnswer) {
            setScore(score + 1);
        }
    };

    if (currentQuestionIndex === questions.length) {
        return (<QuizResult score={score} handlerRestartQuiz={handlerStartAgain} />);
    }

    return (
        <Stack 
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <Typography variant='h4' mt={3}>Питання {currentQuestionIndex + 1} з {questions.length}</Typography>
            <QuestionCard 
                key={currentQuestion.id}
                question={currentQuestion.question} 
                translation={currentQuestion.translation} 
                correctAnswer={currentQuestion.answer}
                hint={currentQuestion.answer}
                nextQuestion={nextQuestion}
                isLastQuestion={isLastQuestion}
            />
        </Stack>
    );
}