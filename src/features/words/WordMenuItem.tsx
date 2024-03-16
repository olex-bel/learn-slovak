
import Typography from "@mui/material/Typography";
import BoardCard from "../../components/common/BoardCard";
import type { SxProps } from "@mui/material";

type WordMenuItemProps = {
    url: string;
    name: string;
    sx?: SxProps;
}

export default function WordMenuItem({ url, name, sx = [] } : WordMenuItemProps) {
    return (
        <BoardCard imageText={name} linkUrl={url} sx={sx} >
            <Typography>{name}</Typography>
        </BoardCard>
    );
}
