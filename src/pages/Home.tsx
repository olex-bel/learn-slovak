import Container from "@mui/material/Container";
import LearnngCategoryGrid from "../features/categories/LearningCategoryGrid";

export default function Home() {
    return (
        <Container component="main">
            <LearnngCategoryGrid title="Навчальні блоки" />
        </Container>
    );
}