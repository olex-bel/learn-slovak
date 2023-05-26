
import { Box, AppBar, Toolbar } from "@mui/material"

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar></Toolbar>
            </AppBar>
        </Box>
    )
}