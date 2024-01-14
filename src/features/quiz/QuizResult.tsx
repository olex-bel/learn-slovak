
import { Button, Typography, Stack } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

type QuizResultProps = {
    score: number;
    handlerRestartQuiz: () => void;
}

export default function QuizResult({ score, handlerRestartQuiz } : QuizResultProps) {
    return (
        <Stack paddingTop={"10rem"}>
            <Typography>
                You score is {score}
            </Typography>
            <Button 
                color="success" 
                size="large" 
                startIcon={<RestartAltIcon/>} 
                onClick={handlerRestartQuiz}
            >
                Try again
            </Button>
        </Stack>
    );
}