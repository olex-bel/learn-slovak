import { useRef, useId, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { Form } from "react-router-dom";
import type { FormEvent } from "react";
import { supabase } from "../../services/supabaseClient";

export default function SetPasswordForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const passwordRef = useRef<HTMLInputElement>();
    const passwordConfirmRef = useRef<HTMLInputElement>();
    const id = useId();
    const fieldType = showPassword? "text" : "password";

    const handleSubmit = async function (e: FormEvent) {
        e.preventDefault();

        const password = passwordRef.current? passwordRef.current.value : "";
        const confirmPassword = passwordConfirmRef.current? passwordConfirmRef.current.value: "";

        if (!password) {
            setErrorMessage("Будь ласка, введіть новий пароль");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Паролі не співпадають. Будь ласка, перевірте правильність введення та повторіть спробу.");
            return;
        }

        const { error } = await supabase.auth.updateUser({
            password,
        });

        if (error) {
            setErrorMessage("Ой! Не вдалося зберегти пароль. Будь ліска, спробуйте ще раз.");
            return;
        }

        setIsSubmitted(true);
    };

    const handlePasswordVisibility = () => {
        setShowPassword((prevFlag) => !prevFlag);
    };

    if (isSubmitted) {
        return (
            <Paper sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "300px",
                mx: "auto",
                p: 3,
                gap: 1,
            }}>
                <Typography variant="h6" color="success.main">Пароль було змінено.</Typography>
                <Link component={RouterLink} to="/">Перейти на головну сторінку</Link>
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
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                <TextField
                    inputRef={passwordRef}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Новий пароль"
                    type={fieldType}
                    id={`${id}-password`}
                    autoComplete="current-password"
                    autoFocus
                />
                <TextField
                    inputRef={passwordConfirmRef}
                    margin="normal"
                    required
                    fullWidth
                    name="confirm-password"
                    label="Новий пароль"
                    type={fieldType}
                    id={`${id}-confirm-password`}
                />
                <FormControlLabel 
                    control={<Checkbox checked={showPassword} onChange={handlePasswordVisibility} inputProps={{ "aria-label": "controlled" }}/>} 
                    label="Показати пароль" 
                />
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