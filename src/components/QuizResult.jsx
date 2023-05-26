
import { Button, Typography, Stack } from "@mui/material";

export default function QuizResult({ score, handlerRestartQuiz }) {
    return (
        <Stack>
            <Typography>
                You score is {score}
            </Typography>
            <Button onClick={handlerRestartQuiz}>Try again</Button>
        </Stack>
    );
}