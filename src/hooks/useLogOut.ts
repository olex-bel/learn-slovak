import { useMutation, useQueryClient } from "react-query";
import { logout } from "../services/api";

export default function useLogOut() {
    const queryClient = useQueryClient();

    return useMutation(() => logout(), {
        onSuccess: () => {
            queryClient.removeQueries();
        }
    });
}
