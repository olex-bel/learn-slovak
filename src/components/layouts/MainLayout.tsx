import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CustomAppBar from "../../features/appbar/CustomAppBar";

export default function MainLayout() {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <CustomAppBar /> 
            </Box>
            <Container>
                <Outlet />            
            </Container>
        </>
    );
}
