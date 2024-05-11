
import { useState, useRef, useId, FormEvent } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Form, useNavigate, Link as RouterLink } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";

export default function LoginForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    const id = useId();

    const handleSubmit = async function (e: FormEvent) {
        e.preventDefault();

        const email = emailRef.current ? emailRef.current.value : "";
        const password = passwordRef.current ? passwordRef.current.value : "";

        if (!email || !password) {
            setErrorMessage("Будь ласка, введіть електронну адресу та пароль.");
            return;
        }

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setErrorMessage(error.message || "Ой! Помилка входу. Перевірте ваше ім'я користувача/пароль та спробуйте ще раз.");
            return;
        }
    
        navigate("/");
    };

    return (
        <Box
            sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Введіть свої дані для входу
            </Typography>

            {errorMessage && <Typography color="error">{errorMessage}</Typography>}

            <Box component={Form} method="post" sx={{ mt: 1 }} onSubmit={handleSubmit}>
                <TextField
                    inputRef={emailRef}
                    margin="normal"
                    required
                    fullWidth
                    id={`${id}-email`}
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    inputRef={passwordRef}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id={`${id}-password`}
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Увійти в систему
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link component={RouterLink} to='/reset-password' variant="body2">
                            Забули пароль?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link component={RouterLink} to='/register' variant="body2">
                            {"Не маєте облікового запису? Зареєструйтесь."}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}