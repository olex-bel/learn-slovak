import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TopicsGrid from "../features/topics/TopicsGrid";

export default function Topics() {
    const { level } = useParams();

    return (
        <Container component="main" sx={{ mt: 4 }}>
            <Typography variant="h3" sx={{ textAlign: "center", mt: 2, mb: 4 }}>
                Оберіть вправу для вивчення словацької мови.
            </Typography>
            <TopicsGrid level={level!}></TopicsGrid>
        </Container>
    );
}