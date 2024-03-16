import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import useAuth from "./hooks/useAuth";
import { AuthContext } from "./context/AuthContext";
import MainLayout from "./components/layouts/MainLayout";
import RequireAuth from "./features/auth/RequireAuth";
import Home from "./pages/Home";
import GetStarted from "./pages/GetStarted";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Lesson from "./pages/Lesson";
import Topics from "./pages/Topics";
import Words from "./pages/Words";
import LeanWords from "./pages/LearnWords";
import TestWords from "./pages/TestWords";
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
                        element: <Home />,
                    },
                    {
                        path: "/lesson/:id",
                        element: <Lesson />,
                    },
                    {
                        path: "/topics/:level",
                        element: <Topics />,
                    },
                    {
                        path: "/words",
                        children: [{
                            index: true,
                            element: <Words />,
                        },
                        {
                            path: "learn",
                            element: <LeanWords />
                        },  {
                            path: "test",
                            element: <TestWords />
                        }]
                    },
                ]
            },
            {
                path: "/start",
                element: <GetStarted />,

            },
            {
                path: "/login",
                element: <Login />,

            },
            {
                path: "/register",
                element: <Register />,
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
