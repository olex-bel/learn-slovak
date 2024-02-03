import Typography from "@mui/material/Typography";
import type { SxProps } from "@mui/material";
import BoardCard from "../../components/common/BoardCard";

type TopicCardProps = {
    id: number;
    name: string;
    sx?: SxProps;
}

export default function TopicCard({ id, name, sx = [] } : TopicCardProps) {
    return (
        <BoardCard imageText={name} linkUrl={`/lesson/${id}`} sx={sx}>
            <Typography>{name}</Typography>
        </BoardCard>
    );
}