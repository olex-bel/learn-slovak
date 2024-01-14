
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import useTopics from "../../hooks/useTopics";
import TopicCard from "./TopicCard";

export default function TopicsGrid() {
    const { topics, isLoading, errorMessage } = useTopics();

    if (isLoading && !topics) {
        return (
            <Box>Loading...</Box>
        );
    }

    if (errorMessage) {
        return (
            <Box>{errorMessage}</Box>
        );
    }

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {topics?.map((topic) => {
                return (
                    <Grid item xs={6} key={topic.id}>
                        <TopicCard {...topic} />
                    </Grid>
                );
            })}
        </Grid>
    );
} 