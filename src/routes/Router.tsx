import { createBrowserRouter } from "react-router";
import { AuthLayout } from "../layout/AuthLayout";
import Login from "../pages/Login.page";
import Layout from "../layout/Layout";
import ProtectedRoute from "./ProtectedRoute";

export const Router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoute element={<Layout />}/>,
  },
]);
