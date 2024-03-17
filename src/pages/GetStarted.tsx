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
                        <Typography mb={2} variant="h6" sx={{ textAlign: { xs: "center", md: "start"}}}>Ласкаво просимо до вивчення словацької мови!</Typography>
                        <Typography mb={1}>Почніть вивчати словацьку мову без особливих зусиль з нашим інтерактивним додатком.</Typography>
                        <Typography mb={1}>
                            Покращуйте свої навички словацької за допомогою інтерактивних граматичних вправ.
                            Наша інтерактивна платформа допоможе вам автоматизувати правильне вживання слів, зробивши граматику другою натурою.
                            Крім того, ви можете легко додавати нові слова та вивчати їх на нашому сайті.
                        </Typography>
                    </Stack>

                    <Stack gap={2} sx={{ alignSelf: "center" }}>
                        <Button component={RouterLink} to="/register" variant="contained">Створити обліковий запис</Button>
                        <Button component={RouterLink} to="/login" variant="outlined">У мене вже є обліковий запис</Button>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
}