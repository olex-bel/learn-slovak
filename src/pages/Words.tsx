import { useState } from "react";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import LearnWordsMenu from "../features/words/LearnWordsMenu";
import AddWordDialog from "../features/words/dialogs/AddWordDialog";

export function Component() {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleClose = () => {
        setModalOpen(false);
    };

    const handleOpen = () => {
        setModalOpen(true);
    };
    
    return (
        <>
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
        </>
    );
}

Component.displayName = "Words";