
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { useRef, useState } from "react";
import QuestionContent from "./QuestionContent";

type QuestionCardProps = {
    question: string;
    translation: string;
    correctAnswer: string;
    hint: string;
    isLastQuestion: boolean;
    nextQuestion: (isCorrectAnswer: boolean) => void;
}

export default  function QuestionCard({question, translation, correctAnswer, hint, isLastQuestion, nextQuestion} : QuestionCardProps) {
    const userInputRef = useRef<HTMLInputElement>();
    const [userAnswer, setUserAnswer] = useState("");
    const [showHint, setShowHint] = useState(false);
    const isAnswered = !!userAnswer;
    const isCorrectAnswer = isAnswered && correctAnswer === userAnswer;
    const isInteractionComplete = isAnswered || showHint;

    const handleCheckAnswer = function () {
        const answer = userInputRef.current!.value;
        
        if (!answer) {
            return;
        }
        
        setUserAnswer(answer.toLowerCase().trim());
        setShowHint(false);
    };

    const handlerShowHint = function () {
        setShowHint(true);
    };

    const handleNext = function () {
        nextQuestion(showHint? false : isCorrectAnswer);
    };

    return (
        <Card sx={
            {
                width: { xs: "360px", md: "480px" },
            }
        }>
            <QuestionContent ref={userInputRef} question={question} translation={translation}>
                <Box>
                    {showHint && <Typography variant="body2" mt="2rem" color="success.main">{hint}</Typography>}
                    {isAnswered &&  
                        <>
                            {isCorrectAnswer? 
                                <Typography variant="body2" mt="2rem" color="success.main">Правильна відповідь</Typography>
                                : 
                                <Typography variant="body2" mt="2rem" color="error.main">Невірно. Правильна відповідь: &quot;{correctAnswer}&quot;</Typography>
                            }
                        </>
                    }
                </Box>
            </QuestionContent>
            <CardActions sx={{
                marginRight: "1rem",
                justifyContent: "end",
            }}>
                {!isInteractionComplete && <Button variant="outlined" onClick={handlerShowHint}>Підказка</Button>}
                {isInteractionComplete? 
                    <Button variant="contained" size="large" onClick={handleNext}>{isLastQuestion? "Завершити" : "Наступне"}</Button>
                    :
                    <Button variant="contained" size="large" onClick={handleCheckAnswer}>Перевірити</Button>
                }
            </CardActions>
        </Card>
    );
}
