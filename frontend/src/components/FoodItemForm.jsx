import { useState, useEffect } from "react";
import { Plus, Trash2, X } from "lucide-react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

function FoodItemForm({ item, onSubmit, onCancel }) {
    const [foodItem, setFoodItem] = useState({
        name: '',
        price: '',
        category: 'Non-Veg',
        addons: [],
        tags: []
    })
    const [newAddon, setNewAddon] = useState({ name: '', price: '' });
    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        if (item) {
            setFoodItem(item);
        }
    }, [item]);

    const addAddon = (e) => {
        setFoodItem((prev) => ({
            ...prev,
            addons: [...prev.addons, {...newAddon}]
        }))
        setNewAddon({ name: '', price: '' });
    }

    const removeAddon = (index) => {
        setFoodItem((prev) => ({
            ...prev,
            addons: prev.addons.filter((_, i) => i !== index)
        }))
    }

    const addTag = () => {
        setFoodItem((prev) => ({
            ...prev,
            tags: [...prev.tags, newTag]
        }))
        setNewTag('');
    }

    const removeTag = (index) => {
        setFoodItem((prev) => ({
            ...prev,
            tags: prev.tags.filter((_, i) => i !== index)
        }))
    }

    const handleChange = (e) => {
        let { name, value, checked } = e.target;
        if (name === 'category') {
            value = checked == true ? "Veg" : "Non-Veg";
        }
        setFoodItem((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(foodItem);
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{item ? "Edit Food Item" : "Add New Food Item"}</h2>
                <button 
                    onClick={onCancel} 
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                        <input
                            type="text"
                            name="name"
                            value={foodItem.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Enter item name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            value={foodItem.price}
                            onChange={handleChange}
                            min="1"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Enter price"
                        />
                    </div>
                </div>

                <div>
                    <label className="flex items-center">
                        <input type="checkbox" name="category" checked={foodItem.category == "Veg"} onChange={handleChange} className="mr-2" />
                        <span className="text-sm font-medium text-gray-700">Vegetarian</span>
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                    <div className="flex space-x-2 mb-3">
                        <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder="Add a tag"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        <button
                            type="button"
                            onClick={addTag}
                            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md transition-colors flex items-center"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {foodItem.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center">
                                {tag}
                                <button type="button" onClick={() => removeTag(tag)} className="ml-2 text-gray-500">
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Add-ons</label>
                    <div className="flex space-x-2 mb-3">
                        <input
                            type="text"
                            value={newAddon.name}
                            onChange={(e) => setNewAddon((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="Add-on name"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        <input
                            type="number"
                            value={newAddon.price}
                            onChange={(e) => setNewAddon((prev) => ({ ...prev, price: e.target.value }))}
                            placeholder="Price"
                            min="1"
                            className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        <button
                            type="button"
                            onClick={addAddon}
                            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md transition-colors flex items-center"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="space-y-2">
                        {foodItem.addons.map((addon, index) => (
                            <div key={index} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-md">
                                <span className="text-sm">
                                    {addon.name} (+₹{addon.price})
                                </span>
                                <button
                                    type="button"
                                    onClick={() => removeAddon(index)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex space-x-4 pt-6">
                    <button
                        type="submit"
                        className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        {item ? "Update Item" : "Add Item"}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FoodItemForm;