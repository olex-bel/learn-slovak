import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import useAuth from "./hooks/useAuth";
import { AuthContext } from "./context/AuthContext";
import MainLayout from "./components/layouts/MainLayout";
import RequireAuth from "./features/auth/RequireAuth";
import NotFound from "./pages/NotFound";

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
                children: [
                    {
                        index: true,
                        lazy: () => import("./pages/Home"),
                    },
                    {
                        path: "/lesson/:id",
                        lazy: () => import("./pages/Lesson"),
                    },
                    {
                        path: "/topics/:level",
                        lazy: () => import("./pages/Topics"),
                    },
                    {
                        path: "/words",
                        children: [{
                            index: true,
                            lazy: () => import("./pages/Words"),
                        },
                        {
                            path: "learn",
                            lazy: () => import("./pages/LearnWords"),
                        },  {
                            path: "test",
                            lazy: () => import("./pages/TestWords"),
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
