import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import LernWordCardList from "../features/words/LearnWordCardList";

export default function LeanWords() {
    const navigate = useNavigate();

    const handleFinish = () => {
        navigate(-1);
    };

    return (
        <Container component="main" sx={{ mt: 4 }}>
            <LernWordCardList onFinish={handleFinish} />
        </Container>
    );
}