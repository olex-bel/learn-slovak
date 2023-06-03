
import { Box, Button, Stack, TextField, Typography, Card, CardContent, CardActions } from "@mui/material";
import { useRef, useState } from "react";
import reactStringReplace from "react-string-replace";

export default  function QuestionCard({question, translation, correctAnswer, hint, isLastQuestion, nextQuestion}) {
    const userInputRef = useRef();
    const [userAnswer, setUserAnswer] = useState('');
    const [showHint, setShowHint] = useState(false);
    const isAnswered = !!userAnswer;
    const isCorrectAnswer = isAnswered && correctAnswer === userAnswer;

    const checkAnswerHandler = function () {
        const answer = userInputRef.current.value;
        
        if (!answer) {
            return;
        }
        
        setUserAnswer(answer.toLowerCase());
        setShowHint(false);
    }

    const hintHandler = function () {
        setShowHint(true);
    }

    return (
        <Card sx={
            {
                width: { xs: '360px' },
            }
        }>
            <CardContent sx={{
                minHeight: '180px',
            }}>
                <Stack 
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box mt="1.5rem">
                        {reactStringReplace(question, /(\(.+\))/, (match) => <>{match}<TextField variant="standard" sx={{input: {textAlign: "center"}}} inputRef={userInputRef} size="small"/></> )}
                    </Box>
                    <Box mt="0.8rem">({translation})</Box>
                    {showHint && <Typography variant="body2" mt="2rem" color="success.main">{hint}</Typography>}
                    {isAnswered && 
                        <Box>
                            {isCorrectAnswer? 
                                <Typography variant="body2" mt="2rem" color="success.main">Correct answer</Typography>
                                :
                                <Typography variant="body2" mt="2rem" color="error.main">Sorry...the correct answer is "{correctAnswer}"</Typography>
                            }
                        </Box>
                    }
                </Stack>
            </CardContent>
            <CardActions>
                <Button variant="outlined" onClick={hintHandler}>Hint</Button>
                {isAnswered? 
                    <Button variant="contained" onClick={() => nextQuestion(isCorrectAnswer)}>{isLastQuestion? "Finish" : "Next"}</Button>
                    :
                    <Button variant="contained" onClick={checkAnswerHandler}>Check</Button>
                }
            </CardActions>
        </Card>
    );
}