import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
    const token = localStorage.getItem("token");

    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    if (!token) {
        return <Navigate to="/" />;
    }

    if (role !== allowedRole) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;