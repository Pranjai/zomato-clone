import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

function VendorDashboard() {
    const { token, logout } = useUser();
    const [showModal, setShowModal] = useState(false);
    const [foodItems, setFoodItems] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "Veg",
        addons: [],
        tags: []
    })

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

    const deleteFoodItem = async (foodItem) => {
        try {
            const res = await axios.delete(`${API}/vendors/foods/${foodItem._id}`, {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${API}/vendors/foods`, { item: formData }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res.data.message);
            fetchData();
            setShowModal(false)
        } catch (error) {
            console.error(error.response?.data?.message);
        }
    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleAddonChange = (index, e) => {
        let { name, value } = e.target;
        const updated = [...formData.addons];
        updated[index][name] = value;
        setFormData((prev) => ({
            ...prev,
            addons: [...updated]
        }))
    }

    const addAddonField = () => {
        setFormData((prev) => ({
            ...prev,
            addons: [...formData.addons, { name: "", price: ""}]
        }))
    }

    const removeAddonField = (index) => {
        const updated = [...formData.addons];
        updated.splice(index, 1);
        setFormData((prev) => ({
            ...prev,
            addons: [...updated]
        }))
    }

    const handleTagChange = (e, index) => {
        const updated = [...formData.tags]
        updated[index] = e.target.value;
        setFormData((prev) => ({
            ...prev,
            tags: [...updated]
        }))
    }

    const addTagField = () => {
        setFormData((prev) => ({
            ...prev,
            tags: [...formData.tags, ""]
        }))
    }

    const removeTagField = (index) => {
        const updated = [...formData.tags];
        updated.splice(index, 1);
        setFormData((prev) => ({
            ...prev,
            tags: [...updated]
        }))
    }

    return (
        <div>
            <p>Vendor Dashboard</p>
            <button onClick={logout}>Logout</button>
            <div>
                    {foodItems.map((foodItem, index) => (
                        <div key={index}>
                            {foodItem.name} {foodItem.price}
                            <button onClick={() => deleteFoodItem(foodItem)}>
                                Delete
                            </button>
                        </div>
                    ))}
            </div>
            <div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Add Food Item
                </button>

                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
                        <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl relative">
                            <h2 className="text-xl font-semibold mb-4">Add Food Item</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Food Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded"
                                />
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="Veg">Veg</option>
                                    <option value="Non-Veg">Non-Veg</option>
                                </select>
                                
                                <p>Addons</p>
                                {formData.addons.map((addon, index) => (
                                    <div key={index}>
                                        <input 
                                            name="name"
                                            placeholder="Addon Name"
                                            value={addon.name}
                                            onChange={(e) => handleAddonChange(index, e)}                                         
                                        />
                                        <input 
                                            name="price"
                                            type="Number"
                                            placeholder="Price"
                                            value={addon.price}                  
                                            onChange={(e) => handleAddonChange(index, e)}                                         
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeAddonField(index)}
                                            className="text-red-500"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addAddonField}
                                    className="text-blue-500 hover:underline"
                                >
                                    ➕ Add Addon
                                </button>

                                <p>Tags</p>
                                {formData.tags.map((tag, index) => (
                                    <div key={index}>
                                        <input 
                                            value={tag}
                                            placeholder="Tag Name"
                                            onChange={(e) => handleTagChange(e, index)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeTagField(index)}
                                            className="text-red-500"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addTagField}
                                    className="text-blue-500 hover:underline"
                                >
                                    ➕ Add Tag
                                </button>

                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-gray-400 text-white rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                            <button
                                className="absolute top-2 right-3 text-xl"
                                onClick={() => setShowModal(false)}
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default VendorDashboard;