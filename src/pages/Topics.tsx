import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TopicsGrid from "../features/topics/TopicsGrid";

export function Component() {
    const { level } = useParams();

    return (
        <>
            <Typography variant="h3" sx={{ textAlign: "center", mt: 2, mb: 4 }}>
                Оберіть вправу для вивчення словацької мови.
            </Typography>
            <TopicsGrid level={level!}></TopicsGrid>
        </>
    );
}

Component.displayName = "Topics";