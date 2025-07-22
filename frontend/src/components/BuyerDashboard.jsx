import { Heart } from "lucide-react"
import { useUser } from "../context/UserContext";
import FoodItemCard from "./FoodItemCard";
import WalletSection from "./WalletSection";
import SearchBar from "./SearchBar";
import FilterSection from "./FilterSection";
import { useState, useEffect } from "react";

function BuyerDashboard() {
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState("all");
    const [favorites, setFavorites] = useState([]);
    const [walletBalance, setWalletBalance] = useState(0);
    const [foodItems, setFoodItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    const handleSearch = (searchTerm) => {
        const filtered = foodItems.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredItems(filtered)
    }

    const handleFilter = (filters) => {
        let filtered = [...foodItems]

        if (filters.category !== "") {
            filtered = filtered.filter((item) => item.category === filters.category)
        }

        if (filters.vendors.length > 0) {
            filtered = filtered.filter((item) => filters.vendors.includes(item.vendor))
        }

        if (filters.tags.length > 0) {
            filtered = filtered.filter((item) => item.tags.some((tag) => filters.tags.includes(tag)))
        }

        if (filters.priceRange.min !== null || filters.priceRange.max !== null) {
            filtered = filtered.filter(
                (item) =>
                    item.price >= (filters.priceRange.min || 0) &&
                    item.price <= (filters.priceRange.max || Number.POSITIVE_INFINITY),
            )
        }

        if (filters.sortBy === "price-asc") {
            filtered.sort((a, b) => a.price - b.price)
        } else if (filters.sortBy === "price-desc") {
            filtered.sort((a, b) => b.price - a.price)
        } else if (filters.sortBy === "rating-asc") {
            filtered.sort((a, b) => a.rating - b.rating)
        } else if (filters.sortBy === "rating-desc") {
            filtered.sort((a, b) => b.rating - a.rating)
        }

        setFilteredItems(filtered)
    }

    const displayItems =
        activeTab === "favorites" ? filteredItems.filter((item) => favorites.includes(item._id)) :
            filteredItems

    const toggleFavorite = (itemId) => {
        setFavorites((prev) => {
            if (prev.includes(itemId)) {
                return prev.filter((id) => id !== itemId)
            } else {
                return [...prev, itemId]
            }
        })
    }

    const handleOrder = (item, quantity, addons) => {
        const totalPrice = item.price * quantity + addons.reduce((sum, addon) => sum + addon.price, 0)
        if (walletBalance < totalPrice) {
            alert("Insufficient wallet balance. Please add money to your wallet.")
            return
        }
        setWalletBalance((prev) => prev - totalPrice)
        alert(`Order placed for ${item.name} with quantity ${quantity} and addons: ${addons.map(a => a.name).join(", ")}. Total: ₹${totalPrice}.`)
    }

    useEffect(() => {
        const mockFoodItems = [
            {
                _id: 1,
                name: "Cheese Maggi",
                price: 50,
                rating: 4.5,
                category: "Veg",
                vendor: "BBC",
                tags: ["Hot", "Noodles"],
                image: "/placeholder.svg?height=200&width=200",
                addons: [
                    { name: "Extra Cheese", price: 20 },
                    { name: "Sauce", price: 10 },
                ],
            },
            {
                _id: 2,
                name: "Chicken Biryani",
                price: 120,
                rating: 4.8,
                category: "Non-Veg",
                vendor: "JC",
                tags: ["Hot", "Rice"],
                addons: [
                    { name: "Extra Raita", price: 15 },
                    { name: "Pickle", price: 5 },
                ],
            },
            {
                _id: 3,
                name: "Cold Coffee",
                price: 40,
                rating: 4.2,
                category: "Veg",
                vendor: "VC",
                tags: ["Cold", "Drinks"],
                addons: [
                    { name: "Extra Shot", price: 10 },
                    { name: "Whipped Cream", price: 15 },
                ],
            },
        ]
        setFoodItems(mockFoodItems)
        setFilteredItems(mockFoodItems)
    }, [])

        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Food Dashboard</h1>
                        <WalletSection walletBalance={walletBalance} setWalletBalance={setWalletBalance} />
                    </div>

                    <div className="mb-8 space-y-4">
                        <SearchBar onSearch={handleSearch} />
                        <div className="flex space-x-4">
                            <button
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === "all"
                                    ? "bg-orange-600 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                                    }`}
                                onClick={() => setActiveTab("all")}
                            >
                                All Items
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${activeTab === "favorites"
                                    ? "bg-orange-600 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                                    }`}
                                onClick={() => setActiveTab("favorites")}
                            >
                                <Heart className="w-4 h-4 mr-2" />
                                Favorites ({favorites.length})
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-64 flex-shrink-0">
                            <FilterSection onFilter={handleFilter} />
                        </div>

                        <div className="flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {displayItems.map((item) => (
                                    <FoodItemCard
                                        key={item._id}
                                        item={item}
                                        isFavorite={favorites.includes(item._id)}
                                        onToggleFavorite={toggleFavorite}
                                        onOrder={handleOrder}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

export default BuyerDashboard;