
import Typography from "@mui/material/Typography";
import type { SxProps } from "@mui/material";
import BoardCard from "../../components/common/BoardCard";

type LearningCategoryProps = {
    imageText: string;
    title: string;
    description: string;
    linkUrl: string;
    sx: SxProps;
}

export default function LearningCategory({ imageText, title, description, linkUrl, sx = [] } : LearningCategoryProps) {
    return (
        <BoardCard imageText={imageText} linkUrl={linkUrl} sx={sx}>
            <Typography gutterBottom variant="h5" component="div">
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {description}
            </Typography>
        </BoardCard>
    );
}
