import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function ProtectedRoute({ children }) {
    const { isLoggedIn, loading } = useUser();

    if(loading) {
        return <div>Loading...</div>
    }

    if (!isLoggedIn) {
        return <Navigate to="/" replace />
    }

    return children;
}

export default ProtectedRoute;