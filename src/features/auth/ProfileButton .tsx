import { useContext } from "react";
import { Button } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import ProfileMenu from "./ProfileMenu";

export default function ProfileButton() {
    const auth = useContext(AuthContext);

    return (
        <div>
            {
                auth.session?
                    <ProfileMenu /> 
                    :
                    <Button color="inherit">Login</Button>

            }
        </div>
    );
}