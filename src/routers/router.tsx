import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import UserList from "../components/userList";
import AuthGuard from "../components/authGuard"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/users",
    element: (
        <AuthGuard>
          <UserList />
        </AuthGuard>
    ),
  },
  {
    path: "/*",
    element: <Navigate to="/login" />, 
  },
]);

export default router;

