import { useState, useEffect } from "react"
import OrderCard from "./OrderCard"
import api from "../api/axiosInstance"

const MyOrders = ({ user }) => {
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        try {
            const res = await api.get('/buyers/orders');
            setOrders(res.data);
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    const handlePickup = async (orderId) => {
        try {
            const res = await api.put(`/orders/${orderId}`, { status: "COMPLETED" })
            setOrders((prev) => 
                prev.map((order) => {
                    if (order._id === orderId) {
                        return res.data;
                    }
                    return order
                })
            )
        } catch(error) {
            console.log(error)
        }
    }

    const handleRating = (orderId, rating) => {
        setOrders((prev) => prev.map((order) => (order._id === orderId ? { ...order, rating } : order)))
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
                <div className="space-y-6">
                    {orders.map((order) => (
                        <OrderCard key={order._id} order={order} onPickup={handlePickup} onRating={handleRating} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyOrders
