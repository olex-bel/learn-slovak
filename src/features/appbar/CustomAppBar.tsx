import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ProfileMenu from "./ProfileMenu";
import WelcomeMessage from "../../features/appbar/WelcomeMessage";

export default function CustomAppBar() {
    const auth = useContext(AuthContext);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography sx={{ flexGrow: 1 }}>
                    {auth.session? <WelcomeMessage /> : "Learn Slovak!"}
                </Typography>

                {auth.session? <ProfileMenu />  : <Button component={RouterLink} to="/login" color="inherit">Login</Button>}
            </Toolbar>
        </AppBar>
    );
}