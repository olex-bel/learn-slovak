import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import useAuth from "./hooks/useAuth";
import { AuthContext } from "./context/AuthContext";
import MainLayout from "./components/layouts/MainLayout";
import RequireAuth from "./features/auth/RequireAuth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Lesson from "./pages/Lesson";


const queryClient = new QueryClient()
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
                    }
                ]
            },
            {
                path: "/login",
                element: <Login />,

            },
            {
                path: "/register",
                element: <Register />,
            }
        ],
    },
]);

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
