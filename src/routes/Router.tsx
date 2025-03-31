import { createBrowserRouter } from "react-router";
import { AuthLayout } from "../layout/AuthLayout";
import Login from "../pages/Login.page";
import Layout from "../layout/Layout";

export const Router = createBrowserRouter([
    {
        path:"/auth",
        element: <AuthLayout/>,
        children: [
            {
                path:'login',
                element:<Login/>
            }
        ]
    },
    {
        path:'/',
        element: <Layout/>
    }
])