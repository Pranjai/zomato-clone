import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function ProtectedRoute({ children }) {
    const { isLoggedIn, user } = useUser();

    if (!isLoggedIn) {
        return <Navigate to="/" replace />
    }

    return children;
}

export default ProtectedRoute;