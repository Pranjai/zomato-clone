import { useUser } from "../context/UserContext";

function BuyerDashboard() {
    const { logout } = useUser();

    return (
        <div className="">
            <p>Buyer Dashboard</p>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default BuyerDashboard;