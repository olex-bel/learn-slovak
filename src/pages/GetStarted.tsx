import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Link as RouterLink } from "react-router-dom";

export default function GetStarted() {
    return (
        <Container component="main">
            <Box sx={
                { 
                    height: "calc(100vh - 64px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 6,
                        flexDirection: {
                            xs: "column",
                            md: "row",
                        }
                    }}
                >
                    <Stack sx={{ flexBasis: "50%" }}>
                        <Typography mb={2} variant="h6" sx={{ textAlign: { xs: "center", md: "start"}}}>Welcome to Your Slovak Language Learning Journey!</Typography>
                        <Typography mb={1}>Start mastering Slovak effortlessly with our interactive app.</Typography>
                        <Typography mb={1}>
                            Boost your Slovak skills with interactive grammar exercises.
                            Our interactive platform helps you automate correct usage, making grammar second nature.
                            Plus, you can easily add new words and learn them seamlessly on our site.
                        </Typography>
                    </Stack>

                    <Stack gap={2} sx={{ alignSelf: "center" }}>
                        <Button component={RouterLink} to="/register" variant="contained">Create a new account</Button>
                        <Button component={RouterLink} to="/login" variant="outlined">I already have an account</Button>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
}