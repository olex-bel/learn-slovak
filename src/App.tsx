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
                handle: {
                    crumb: () => "Головна",
                },
                children: [
                    {
                        index: true,
                        lazy: () => import("./pages/Home"),
                    },
                    {
                        path: "set-password",
                        lazy: () => import("./pages/SetPassword"),
                        handle: {
                            crumb: () => "Змінити пароль",
                        },
                    },
                    {
                        path: "/lesson/:id",
                        lazy: () => import("./pages/Lesson"),
                        handle: {
                            crumb: () => "Урок",
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
                        handle: {
                            crumb: () => "Словник",
                        },
                        children: [
                            {
                                index: true,
                                lazy: () => import("./pages/Words"),
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
                            }, {
                                path: "manage-words",
                                lazy: () => import("./pages/ManageWords"),
                                handle: {
                                    crumb: () => "Керування словником",
                                },
                            }
                        ]
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
                path: "/reset-password",
                lazy: () => import("./pages/ResetPassword"),
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
