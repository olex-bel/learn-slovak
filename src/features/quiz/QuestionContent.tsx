
import { forwardRef } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import reactStringReplace from "react-string-replace";
import { ReactNode } from "react";

type QuestionContentProps = {
    children: ReactNode;
    question: string;
    translation: string;
}

const QuestionContent = forwardRef(function QuestionContent({ question, translation, children } : QuestionContentProps, ref) {
    return (
        <CardContent sx={{
            minHeight: "200px",
        }}>
            <Stack 
                justifyContent="center"
                alignItems="center"
            >
                <Box mt="1.5rem" width="80%">
                    <Typography variant="h6" align="center" gutterBottom>{reactStringReplace(question, /(\(.+\))/, (match) => " ... " + match)}</Typography>
                    <TextField 
                        label="Your Answer"
                        variant="outlined"
                        size="small"
                        fullWidth
                        inputProps={{
                            autoCapitalize: "none",
                        }}
                        inputRef={ref}
                    />
                </Box>
                <Box mt="0.8rem">({translation})</Box>
                {children}
            </Stack>
        </CardContent>
    );
});

export default QuestionContent;
