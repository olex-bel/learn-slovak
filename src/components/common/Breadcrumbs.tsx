import { useMatches, UIMatch } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

type Handler = {
    crumb: () => string;
}

export default function AppBreadcrumbs() {
    const matches = useMatches();
    const crumbs = (matches as UIMatch<unknown, Handler>[])
        .filter((match) => Boolean(match.handle?.crumb))
        .map((match) => ({
            title: match.handle.crumb(),
            path: match.pathname,
        }));
    const lastIndex = crumbs.length - 1;

    console.log(crumbs);

    return (
        <Breadcrumbs aria-label="breadcrumb">
            {
                crumbs.map((crumb, index) => {
                    if (index === lastIndex) {
                        return <Typography key={index} color="text.primary">{crumb.title}</Typography>;
                    } else {
                        return <Link key={index} component={RouterLink} to={crumb.path}>{crumb.title}</Link>;
                    }
                })
            }
        </Breadcrumbs>
    );
}