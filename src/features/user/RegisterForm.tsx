import { useState, useRef, FormEvent, useId } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Form, useNavigate, Link as RouterLink } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";


export default function RegisterForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const isLoading = false;
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    const id = useId();

    const handleSubmit = async function (e: FormEvent) {
        e.preventDefault();

        const email = emailRef.current?.value || "";
        const password = passwordRef.current?.value || "";

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (!error) {
            navigate("/login");
        }
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
                Sign up
            </Typography>

            {errorMessage && <Typography color="error">{errorMessage}</Typography>}

            <Box component={Form} method="post" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            inputRef={emailRef}
                            required
                            fullWidth
                            id={`${id}-email`}
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            inputRef={passwordRef}
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id={`${id}-password`}
                            autoComplete="new-password"
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isLoading}
                >
                    Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link component={RouterLink} to='/login' variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}