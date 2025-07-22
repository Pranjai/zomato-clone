import { useState } from "react"
import { Heart, Star, MapPin, ShoppingCart, Plus, Minus } from "lucide-react"

const FoodItemCard = ({ item, isFavorite, onToggleFavorite, onOrder }) => {
    const [quantity, setQuantity] = useState(1)
    const [selectedAddons, setSelectedAddons] = useState([])
    const [showOrderForm, setShowOrderForm] = useState(false)

    const handleAddonChange = (addon) => {
        setSelectedAddons((prev) =>
            prev.find((a) => a.name === addon.name) ? prev.filter((a) => a.name !== addon.name) : [...prev, addon],
        )
    }

    const calculateTotal = () => {
        const basePrice = item.price * quantity
        const addonPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0)
        return basePrice + addonPrice
    }

    const handleOrder = () => {
        onOrder(item, quantity, selectedAddons)
        setShowOrderForm(false)
        setQuantity(1)
        setSelectedAddons([])
    }

    return (
        <div
            className={'bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105'}
        >
            <div className="relative">
                <button
                    className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${isFavorite ? "bg-red-500 text-white" : "bg-white text-gray-400 hover:text-red-500"
                        }`}
                    onClick={() => onToggleFavorite(item._id)}
                >
                    <Heart className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} />
                </button>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    {/* <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${item.category == "Veg" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                    >
                        {item.category == "Veg" ? "🟢 Veg" : "🔴 Non-Veg"}
                    </span> */}
                </div>

                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{item.vendor}</span>
                    </div>
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${item.category == "Veg" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                    >
                        {item.category == "Veg" ? "🟢 Veg" : "🔴 Non-Veg"}
                    </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-orange-600">₹{item.price}</span>
                    <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">{item.rating}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>

                {!showOrderForm ? (
                    <button
                        className={'w-full py-2 px-4 rounded-lg font-medium transition-colors bg-orange-600 hover:bg-orange-700 text-white'}
                        onClick={() => setShowOrderForm(true)}
                    >
                        Order Now
                    </button>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Quantity:</span>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {item.addons.length > 0 && (
                            <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Add-ons:</h4>
                                <div className="space-y-2">
                                    {item.addons.map((addon) => (
                                        <label key={addon.name} className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedAddons.find((a) => a.name === addon.name)}
                                                    onChange={() => handleAddonChange(addon)}
                                                    className="text-orange-600 focus:ring-orange-500 rounded"
                                                />
                                                <span className="ml-2 text-sm text-gray-700">{addon.name}</span>
                                            </div>
                                            <span className="text-sm text-gray-600">+₹{addon.price}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="border-t pt-3">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-semibold text-gray-900">Total: ₹{calculateTotal()}</span>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleOrder}
                                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                                >
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    Confirm Order
                                </button>
                                <button
                                    onClick={() => setShowOrderForm(false)}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FoodItemCard
