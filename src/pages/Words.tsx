import Typography from "@mui/material/Typography";
import LearnWordsMenu from "../features/words/LearnWordsMenu";

export function Component() {    
    return (
        <>
            <Typography variant="h3" sx={{ textAlign: "center", mt: 2, mb: 4 }}>
                Словацький словник.
            </Typography>
            <LearnWordsMenu />
        </>
    );
}

Component.displayName = "Words";