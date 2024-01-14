import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TopicsGrid from "../features/topics/TopicsGrid";

export default function Home() {
    return (
        <Container component="main">
            <Typography variant="h3" sx={{ textAlign: "center", my: 2 }}>Please select a topic to practice</Typography>

            <TopicsGrid />
        </Container>
    );
}