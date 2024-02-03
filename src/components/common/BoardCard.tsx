
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import { Link as RouterLink } from "react-router-dom";
import type { SxProps } from "@mui/material";
import BoardImg from "../../assets/board.png";
import { blueGrey } from "@mui/material/colors";
import { ReactNode } from "react";

type BoardCardProps = {
    children: ReactNode;
    imageText: string;
    linkUrl: string;
    sx?: SxProps;
}

export default function BoardCard({ imageText, children, linkUrl, sx = [] } : BoardCardProps) {
    return (
        <Card sx={[
            ...(Array.isArray(sx) ? sx : [sx])
        ]}>
            <CardActionArea component={RouterLink} to={linkUrl}>
                <Box sx={{ position: "relative" }}>
                    <CardMedia
                        component="img"
                        image={BoardImg}
                        alt={imageText}
                        sx={{
                            p: 1,
                            minHeight: "200px",
                        }}
                    />
                    <Box sx={{
                        position: "absolute",
                        color: blueGrey[50],
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                        width: "90%",
                    }}>
                        <Typography variant="boardtitle">{imageText}</Typography>
                    </Box>
                </Box>
                <CardContent>
                    {children}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
