import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import Quiz from "../features/quiz/Quiz";

export default function Lesson() {
    const { id } = useParams();

    return (
        <Container component="main" sx={{ mt: 4 }}>
            <Quiz topicId={+id!} />
        </Container>
    );
}