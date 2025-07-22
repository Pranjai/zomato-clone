import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import { useUser } from "../context/UserContext";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;
import FoodItemForm from "./FoodItemForm";

function VendorDashboard() {
    const { token, logout } = useUser();
    const [showModal, setShowModal] = useState(false);
    const [foodItems, setFoodItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${API}/vendors/foods`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setFoodItems(res.data)
            // console.log(res.data)
        } catch (error) {
            console.error(error.response?.data?.message);
        }
    };

    const deleteFoodItem = async (foodItemId) => {
        try {
            const res = await axios.delete(`${API}/vendors/foods/${foodItemId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res.data.message);
            fetchData();
        } catch(err) {
            console.error(err.response?.data?.message)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleAddItem = async (formData) => {
        try {
            const res = await axios.post(`${API}/vendors/foods`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data.message);
            setShowModal(false);
            fetchData();
        } catch (error) {
            console.error(error.response?.data?.message);
        }
    }

    const handleEditItem = async (formData) => {
        try {
            const res = await axios.put(`${API}/vendors/foods/${editingItem._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data.message);
            setEditingItem(null);
            setShowModal(false);
            fetchData();
        } catch (error) {
            console.error(error.response?.data?.message);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Food Menu Dashboard</h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Item
                    </button>
                </div>

                {(showModal || editingItem) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <FoodItemForm
                            item={editingItem}
                            onSubmit={editingItem ? handleEditItem : handleAddItem}
                            onCancel={() => {
                            setShowModal(false)
                            setEditingItem(null)
                            }}
                        />
                    </div>
                </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foodItems.map((item) => (
                    <div key={item._id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-2xl font-bold text-orange-600">₹{item.price}</p>
                        </div>
                        <div className="flex space-x-2">
                        <button
                            onClick={() => setEditingItem(item)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => deleteFoodItem(item._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.category == "Veg" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                        >
                            {item.category == "Veg" ? "🟢 Veg" : "🔴 Non-Veg"}
                        </span>
                        <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm text-gray-600">{item.rating}/5</span>
                        </div>
                        </div>

                        <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Tags:</p>
                        <div className="flex flex-wrap gap-1">
                            {item.tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                {tag}
                            </span>
                            ))}
                        </div>
                        </div>

                        <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Add-ons:</p>
                        <div className="space-y-1">
                            {item.addons.map((addon) => (
                            <div key={addon.name} className="flex justify-between text-sm text-gray-600">
                                <span>{addon.name}</span>
                                <span>+₹{addon.price}</span>
                            </div>
                            ))}
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default VendorDashboard;