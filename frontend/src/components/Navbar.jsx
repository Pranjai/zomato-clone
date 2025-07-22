import { Link, useNavigate } from "react-router-dom"
import { User, LogOut, ShoppingCart, Store, BarChart3 } from "lucide-react"
import { useUser } from "../context/UserContext"

const Navbar = () => {
    const navigate = useNavigate()
    const { user, logout } = useUser()

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    if (!user) {
        return (
            <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="text-2xl font-bold text-orange-600">
                            🍕 IIIT Food Portal
                        </Link>
                        <div className="flex space-x-4">
                            <Link
                                to="/"
                                className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-orange-600"
                    >
                        🍕 IIIT Food Portal
                    </Link>

                    <div className="flex items-center space-x-6">
                        {user.userType === "Buyer" ? (
                            <>
                                <Link
                                    to="/"
                                    className="flex items-center text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    Dashboard
                                </Link>
                                <Link
                                    to="/orders"
                                    className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    My Orders
                                </Link>
                                <Link
                                    to="/profile"
                                    className="flex items-center text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    <User className="w-4 h-4 mr-2" />
                                    Profile
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/"
                                    className="flex items-center text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    <Store className="w-4 h-4 mr-2" />
                                    Menu
                                </Link>
                                <Link
                                    to="/orders"
                                    className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Orders
                                </Link>
                                <Link
                                    to="/statistics"
                                    className="flex items-center text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    <BarChart3 className="w-4 h-4 mr-2" />
                                    Statistics
                                </Link>
                                <Link
                                    to="/profile"
                                    className="flex items-center text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    <User className="w-4 h-4 mr-2" />
                                    Profile
                                </Link>
                            </>
                        )}

                        <span className="text-sm text-gray-600">Welcome, {user.userType == "Buyer" ? user.name.toUpperCase() : user.shopName.toUpperCase()}</span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center text-red-600 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
