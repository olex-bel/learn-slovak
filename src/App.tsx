import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import useAuth from "./hooks/useAuth";
import { AuthContext } from "./context/AuthContext";
import MainLayout from "./components/layouts/MainLayout";
import RequireAuth from "./features/auth/RequireAuth";
import NotFound from "./pages/NotFound";
import Typography from "@mui/material/Typography";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const router = createBrowserRouter([
    {
        element: (<MainLayout />),
        children: [
            {
                path: "/",
                element: <RequireAuth />,
                handle: {
                    crumb: () => "Головна",
                },
                children: [
                    {
                        index: true,
                        lazy: () => import("./pages/Home"),
                    },
                    {
                        path: "/lesson/:id",
                        lazy: () => import("./pages/Lesson"),
                        handle: {
                            crumb: () => "Вправа",
                        },
                    },
                    {
                        path: "/topics/:level",
                        lazy: () => import("./pages/Topics"),
                        handle: {
                            crumb: () => "Вправи",
                        },
                    },
                    {
                        path: "/words",
                        children: [{
                            index: true,
                            lazy: () => import("./pages/Words"),
                            handle: {
                                crumb: () => "Словник",
                            },
                        },
                        {
                            path: "learn",
                            lazy: () => import("./pages/LearnWords"),
                            handle: {
                                crumb: () => "Вивчення слів",
                            },
                        },  {
                            path: "test",
                            lazy: () => import("./pages/TestWords"),
                            handle: {
                                crumb: () => "Перевірка знань",
                            },
                        }]
                    },
                ]
            },
            {
                path: "/start",
                lazy: () => import("./pages/GetStarted"),
            },
            {
                path: "/login",
                lazy: () => import("./pages/Login"),
            },
            {
                path: "/register",
                lazy: () => import("./pages/Register"),
            },
            {
                path: "*",
                element: <NotFound />
            }
        ],
    },
], {
    basename: "/learn-slovak",
});

function App() {
    const auth = useAuth();

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContext.Provider value={auth}>
                <RouterProvider router={router} />
            </AuthContext.Provider>
        </QueryClientProvider>
    );
}

export default App;
