import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material";

type TopicCardProps = {
    id: number;
    name: string;
}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: "60px",
    padding: "16px",
}));
  

export default function TopicCard({ id, name } : TopicCardProps) {
    return (
        <Item>
            <Typography>{name}</Typography>
            <Link component={RouterLink} to={`lesson/${id}`}>Start quiz</Link>
        </Item>
    );
}