
import { Button, Typography, Stack } from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function QuizResult({ score, handlerRestartQuiz }) {
    return (
        <Stack>
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