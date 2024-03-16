import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import LearnWordsMenu from "../features/words/LearnWordsMenu";
import AddWordDialog from "../features/words/AddWordDialog";

export default function Words() {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleClose = () => {
        setModalOpen(false);
    };

    const handleOpen = () => {
        setModalOpen(true);
    };
    
    return (
        <Container component="main" sx={{ mt: 4 }}>
            <Typography variant="h3" sx={{ textAlign: "center", mt: 2, mb: 4 }}>
                Словацький словник.
            </Typography>
            <LearnWordsMenu />

            <Fab 
                size="medium" 
                color="primary" 
                aria-label="add" 
                sx={{
                    position: "absolute",
                    right: 10,
                    bottom: 10,
                }}
                onClick={handleOpen}
            >
                <AddIcon />
            </Fab>

            <AddWordDialog open={modalOpen} onClose={handleClose} />
        </Container>
    );
}