
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function RequireAuth() {
    const auth = useContext(AuthContext);
    const location = useLocation();

    if (auth.isLoading) {
        return (
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "90vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        auth.session
            ? <Outlet />
            : <Navigate to="/start" state={{ from: location }} replace />
    );
}