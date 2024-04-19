import Box from "@mui/material/Box";
import WordMenuItem from "./WordMenuItem";

export default function LearnWordsMenu() {
    return (
        <Box sx={{
            display: "flex",
            gap: 4,
            justifyContent: "center",
            flexDirection: {
                xs: "column",
                md: "row",
            },
            flexWrap: "wrap",
        }}>
            <WordMenuItem name="Вивчення слів" url="/words/learn" sx={{ flexBasis: "300px" }} />
            <WordMenuItem name="Перевірка знань" url="/words/test" sx={{ flexBasis: "300px" }} />
            <WordMenuItem name="Керування словником" url="/words/manage-words" sx={{ flexBasis: "300px" }} />
        </Box>
    );
}