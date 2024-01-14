import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import QuestionCard from "./QuestionCard";
import QuizResult from "./QuizResult";

export type QuestionType = {
    id: number;
    question: string;
    translation: string;
    answer: string;
    hint: string;
}

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
            <Typography variant='h4' mt={3}>Question: {currentQuestionIndex + 1} out of {questions.length}</Typography>
            <QuestionCard 
                key={currentQuestion.id}
                question={currentQuestion.question} 
                translation={currentQuestion.translation} 
                correctAnswer={currentQuestion.answer}
                hint={currentQuestion.hint}
                nextQuestion={nextQuestion}
                isLastQuestion={isLastQuestion}
            />
        </Stack>
    );
}