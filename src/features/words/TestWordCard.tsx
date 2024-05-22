import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

enum AnswerStatus {
    Unanswered,
    Correct,
    Incorrect,
}

type TestCardProps = {
    question: string;
    answer: string;
    isLastQuestion: boolean;
    onNextCard: () => void;
}

export default function TestWordCard({ question, answer, isLastQuestion, onNextCard } : TestCardProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [answerStatus, setAnswerStatus] = useState<AnswerStatus>(AnswerStatus.Unanswered);
    const isAnswered = answerStatus !== AnswerStatus.Unanswered;
    let statusMessage = null;

    if (isAnswered) {
        statusMessage = answerStatus === AnswerStatus.Correct? 
            <Typography color="success.main">Це правильна відповідь.</Typography> : 
            <Typography color="error">Це не правильно. Правильна відповідь <strong>{answer}</strong>.</Typography>;
    }

    const handleCheck = () => {
        if (!inputRef.current?.value) {
            return;
        }

        const userAnswer = inputRef.current.value.toLowerCase().trim();

        if (userAnswer !== answer) {
            setAnswerStatus(AnswerStatus.Incorrect);
        } else {
            setAnswerStatus(AnswerStatus.Correct);
        }
    };

    return (
        <Card sx={{
            width: { xs: "360px", md: "480px" },
        }}>
            <CardContent sx={{
                minHeight: "200px",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Typography variant="h4">{question}</Typography>
                <TextField 
                    label="Your Answer"
                    variant="outlined"
                    size="small"
                    fullWidth
                    inputProps={{
                        autoCapitalize: "none",
                    }}
                    inputRef={inputRef}
                />
                {statusMessage && statusMessage}
            </CardContent>
            <CardActions  sx={{
                marginRight: "1rem",
                justifyContent: "end",
            }}>
                {isAnswered?
                    <Button onClick={onNextCard}>{isLastQuestion? "Завершити" : "Далі"}</Button>
                    :
                    <Button onClick={handleCheck}>Перевірити</Button>
                }
            </CardActions>
        </Card>
    );
}
