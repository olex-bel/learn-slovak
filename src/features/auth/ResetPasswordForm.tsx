import { useRef, useId, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Form } from "react-router-dom";
import type { FormEvent } from "react";
import { supabase } from "../../services/supabaseClient";

export default function ResetPasswordForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const emailRef = useRef<HTMLInputElement>();
    const id = useId();

    const handleSubmit = async function (e: FormEvent) {
        e.preventDefault();

        const email = emailRef.current ? emailRef.current.value : "";

        if (!email) {
            setErrorMessage("Будь ласка, введіть електронну адресу.");
            return;
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}${import.meta.env.BASE_URL}/set-password`,
        });

        if (error) {
            setErrorMessage("Ой! Не вдалося скинути пароль. Перевірте свою електронну пошту та спробуйте ще раз.");
            return;
        }

        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <Paper sx={{
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "300px",
                mx: "auto",
                p: 3,
            }}>
                <Typography variant="h6" color="success.main" textAlign="center">Лист із інструкціями для скидання пароля надіслано успішно. Перевірте свою електронну пошту.</Typography>
            </Paper>
        );
    }

    return (
        <Paper sx={{
            maxWidth: "300px",
            mx: "auto",
            p: 2,
        }}>
            <Box
                component={Form} 
                method="post"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                onSubmit={handleSubmit}
            >
                <TextField
                    inputRef={emailRef}
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Електронна пошта"
                    type="email"
                    id={`${id}-email`}
                    autoComplete="current-email"
                    autoFocus
                />
                {errorMessage && <Typography align="center" py={1} color="error">{errorMessage}</Typography>}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Змінити пароль
                </Button>
            </Box>
        </Paper>
    );
}