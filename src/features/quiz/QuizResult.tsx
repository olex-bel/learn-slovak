
import { Button, Typography, Stack } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

type QuizResultProps = {
    score: number;
    handlerRestartQuiz: () => void;
}

export default function QuizResult({ score, handlerRestartQuiz } : QuizResultProps) {
    return (
        <Stack paddingTop={"10rem"} gap={2}>
            <Typography variant="h3">
                Ви набрали {score} балів
            </Typography>
            <Button 
                color="success" 
                size="large"
                startIcon={<RestartAltIcon />} 
                onClick={handlerRestartQuiz}
            >
                Спробувати ще раз
            </Button>
        </Stack>
    );
}