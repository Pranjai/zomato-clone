import { useState } from "react";
import axios from 'axios';

function VendorSignup() {
    const [formData, setFormData] = useState({
        shopName: '',
        email: '',
        password: '',
        managerName: '',
        contactNumber: '',
        openingTime: '',
        closingTime: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const res = await axios.post('http://localhost:5000/signup', { formData, userType: "Vendor" });
            console.log(res.data.message);
        } catch(err) {
            console.log(err.response?.data?.message);
        }
    }
    
    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    placeholder="Shop Name"
                    name="shopName"
                    value={formData.shopName}
                    required
                    onChange={handleChange}
                    className="px-4 py-2 border rounded"
                />
                <input
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    required
                    onChange={handleChange}
                    className="px-4 py-2 border rounded"
                />
                <input
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    required
                    onChange={handleChange}
                    className="px-4 py-2 border rounded"
                />
                <input
                    placeholder="Manager Name"
                    name="managerName"
                    value={formData.managerName}
                    required
                    onChange={handleChange}
                    className="px-4 py-2 border rounded"
                />
                <input
                    placeholder="Contact Number"
                    name="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    required
                    onChange={handleChange}
                    className="px-4 py-2 border rounded"
                />
                <input
                    placeholder="Opening Time"
                    name="openingTime"
                    type="time"
                    value={formData.openingTime}
                    required
                    onChange={handleChange}
                    className="px-4 py-2 border rounded"
                />
                <input
                    placeholder="Closing Time"
                    name="closingTime"
                    type="time"
                    value={formData.closingTime}
                    required
                    onChange={handleChange}
                    className="px-4 py-2 border rounded"
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 rounded text-white">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default VendorSignup;