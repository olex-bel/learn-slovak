import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

export default function NotFound() {
    return (
        <Box 
            sx={
                { 
                    mt: 4, 
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }
            }
        >
            <Typography variant="h1">404 не знайдено</Typography>
            <Typography sx={{ my: 4 }}>Сторінка, яку ви шукали не існує або ще не створена.</Typography>
            <Button variant="contained" component={RouterLink} to="/">Повернутись на головну сторінку</Button>
        </Box>
    );
}