import { useQuery } from "react-query";
import { getProfile } from "../../services/api";
import Typography from "@mui/material/Typography";

export default function WelcomeMessage() {
    const {data : profile} = useQuery(["profile"], () => getProfile());

    return (
        <Typography component={"span"}>
            {profile? `Привіт, ${profile.name}!` : ""}
        </Typography>
    );
}