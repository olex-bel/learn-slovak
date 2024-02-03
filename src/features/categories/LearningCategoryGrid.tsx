
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LearningCategory from "./LearningCategory";

type LearnngCategoryGridProps = {
    title: string;
};

export default function LearnngCategoryGrid({ title } : LearnngCategoryGridProps) {
    return (
        <>
            <Typography variant="h3" sx={{ textAlign: "center", mt: 2, mb: 4 }}>{title}</Typography>
            <Box sx={{
                display: "flex",
                gap: 4,
                justifyContent: "center",
                flexDirection: {
                    xs: "column",
                    md: "row",
                },
            }}>
                <LearningCategory sx={{ flex: 1 }} title="Граматичні вправи." description="Рівень A1" imageText="Gramatika A1" linkUrl="/topics/a1"/>
                <LearningCategory sx={{ flex: 1 }} title="Вивчення слів." description="Вивчайте нові слова, використовуючи інтерактивні вправи." imageText="Slová" linkUrl="/words"/>
            </Box>
        </>
    );
}
