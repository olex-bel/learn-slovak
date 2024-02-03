
import { useQuery } from "react-query";
import Box from "@mui/material/Box";
import Topic from "./Topic";
import { getTopics } from "../../services/api";

type TopicsGridProps = {
    level: string;
};

const CACHE_TIME = 60 * 60 * 1000; // the time to keep data after unmount
const STALE_TIME = 15 * 60 * 1000;

export default function TopicsGrid({ level }: TopicsGridProps) {
    const {isLoading, isError, data} = useQuery(["topics", level], () => getTopics(level), {
        cacheTime: CACHE_TIME,
        staleTime: STALE_TIME,
        keepPreviousData: true,
    });

    if (isLoading && !data) {
        return (
            <Box>Loading...</Box>
        );
    }

    if (isError) {
        return (
            <Box sx={{ color: "error" }}>Cannot get list of topics</Box>
        );
    }

    return (
        <Box sx={{
            display: "flex",
            gap: 4,
            justifyContent: "center",
            flexDirection: {
                xs: "column",
                md: "row",
            },
            flexWrap: "wrap",
        }}>
            {data?.map((topic) => {
                return (
                    <Topic key={topic.id} {...topic} sx={{ flexBasis: "300px" }} />
                );
            })}
        </Box>
    );
} 