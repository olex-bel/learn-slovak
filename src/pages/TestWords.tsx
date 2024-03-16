import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import TestWordCardList from "../features/words/TestWordCardList";

export default function LeanWords() {
    const navigate = useNavigate();

    const handleFinish = () => {
        navigate(-1);
    };

    return (
        <Container component="main" sx={{ mt: 4 }}>
            <TestWordCardList onFinish={handleFinish} />
        </Container>
    );
}