import { Outlet } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Container } from "@mui/material";
import ProfileButton from "../../features/auth/ProfileButton ";


export default function MainLayout() {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography sx={{ flexGrow: 1 }}>
                            Learn Slovak
                        </Typography>

                        <ProfileButton />
                    </Toolbar>
                </AppBar>
            </Box>
            <Container>
                <Outlet />            
            </Container>
        </>
    );
}
