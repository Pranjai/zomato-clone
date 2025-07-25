import { useState, useEffect } from "react"
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import api from "../api/axiosInstance"

const VendorOrders = ({ user }) => {
    const [orders, setOrders] = useState([])
    const [activeOrders, setActiveOrders] = useState(0)

    const fetchOrders = async () => {
        try {
            const res = await api.get('/vendors/orders');
            setOrders(res.data);
            const active = res.data.filter((order) => ["ACCEPTED", "COOKING"].includes(order.status)).length
            setActiveOrders(active)
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    const getNextStatus = (currentStatus) => {
        const statusFlow = {
            PLACED: "ACCEPTED",
            ACCEPTED: "COOKING",
            COOKING: "READY FOR PICKUP",
        }
        return statusFlow[currentStatus]
    }

    const getButtonText = (status) => {
        const buttonTexts = {
            PLACED: "Accept Order",
            ACCEPTED: "Start Cooking",
            COOKING: "Ready for Pickup",
        }
        return buttonTexts[status] || "Move to Next Stage"
    }

    const updateStatus = async (orderId, status) => {
        try {
            const res = await api.put(`/orders/${orderId}`, { status });
            setOrders((prev) => 
                prev.map((order) => {
                    if (order._id === orderId) {
                        return res.data;
                    }
                    return order
                })
            )
            if (status === "PLACED") {
                setActiveOrders((prev) => prev + 1)
            } else if (status === "COOKING") {
                setActiveOrders((prev) => prev - 1)
            }
        } catch(error) {
            console.error(error);
        }
    }

    const handleMoveToNextStage = (orderId) => {
        const order = orders.find((o) => o._id === orderId)

        if (order.status === "PLACED" && activeOrders >= 10) {
            alert("Cannot accept more orders! You have reached the maximum limit of 10 active orders.")
            return
        }

        updateStatus(orderId, getNextStatus(order.status))
    }

    const handleRejectOrder = (orderId) => {
        if (window.confirm("Are you sure you want to reject this order?")) {
            updateStatus(orderId, "REJECTED")
        }
    }

    const getStatusColor = (status) => {
        const colors = {
            PLACED: "bg-blue-100 text-blue-800",
            ACCEPTED: "bg-yellow-100 text-yellow-800",
            COOKING: "bg-orange-100 text-orange-800",
            "READY FOR PICKUP": "bg-green-100 text-green-800",
            COMPLETED: "bg-gray-100 text-gray-800",
            REJECTED: "bg-red-100 text-red-800",
        }
        return colors[status] || "bg-gray-100 text-gray-800"
    }

    const getStatusIcon = (status) => {
        const icons = {
            PLACED: <Clock className="w-4 h-4" />,
            ACCEPTED: <AlertCircle className="w-4 h-4" />,
            COOKING: <AlertCircle className="w-4 h-4" />,
            "READY FOR PICKUP": <CheckCircle className="w-4 h-4" />,
            COMPLETED: <CheckCircle className="w-4 h-4" />,
            REJECTED: <XCircle className="w-4 h-4" />,
        }
        return icons[status] || <Clock className="w-4 h-4" />
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Order Management</h1>
                    <div className="bg-white rounded-lg shadow-md px-4 py-2">
                        <span className="text-sm text-gray-600">Active Orders: </span>
                        <span className={`font-bold ${activeOrders >= 10 ? "text-red-600" : "text-green-600"}`}>
                            {activeOrders}/10
                        </span>
                    </div>
                </div>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                                <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                                    <h3 className="text-lg font-semibold text-gray-900">Order #{order._id}</h3>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(order.status)}`}
                                    >
                                        {getStatusIcon(order.status)}
                                        <span className="ml-1">{order.status}</span>
                                    </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <Clock className="w-4 h-4 mr-1" />
                                    Time
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                <div>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Customer:</span> {order.buyer.name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Item:</span> {order.foodItem.name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Quantity:</span> {order.quantity}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-orange-600">₹{order.totalAmount}</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                                <div className="flex space-x-3">
                                    {order.status === "PLACED" && (
                                        <>
                                            <button
                                                onClick={() => handleMoveToNextStage(order._id)}
                                                disabled={activeOrders >= 10}
                                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeOrders >= 10
                                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                        : "bg-green-600 hover:bg-green-700 text-white"
                                                    }`}
                                            >
                                                {getButtonText(order.status)}
                                            </button>
                                            <button
                                                onClick={() => handleRejectOrder(order._id)}
                                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}

                                    {["ACCEPTED", "COOKING"].includes(order.status) && (
                                        <button
                                            onClick={() => handleMoveToNextStage(order._id)}
                                            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                                        >
                                            {getButtonText(order.status)}
                                        </button>
                                    )}

                                    {["READY FOR PICKUP", "COMPLETED", "REJECTED"].includes(order.status) && (
                                        <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium">{order.status}</div>
                                    )}
                                </div>

                                {activeOrders >= 10 && order.status === "PLACED" && (
                                    <div className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded-md">
                                        Maximum active orders reached
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default VendorOrders
