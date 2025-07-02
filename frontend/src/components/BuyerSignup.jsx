import { useState } from "react";
import axios from 'axios';

function BuyerSignup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        contactNumber: '',
        age: '',
        batchName: 'UG1'
    });
    const batchNames = ["UG1", "UG2", "UG3", "UG4", "UG5"];

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
            const res = await axios.post('http://localhost:5000/signup', { formData, userType: "Buyer"});
            console.log(res.data.message);
        } catch(err) {
            console.log(err.response?.data?.message);
        }
    }
    
    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    placeholder="Name"
                    name="name"
                    value={formData.name}
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
                    placeholder="Contact Number"
                    name="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    required
                    onChange={handleChange}
                    className="px-4 py-2 border rounded"
                />
                <input
                    placeholder="Age"
                    name="age"
                    type="number"
                    min={0}
                    max={100}
                    value={formData.age}
                    required
                    onChange={handleChange}
                    className="px-4 py-2 border rounded"
                />
                <select
                    placeholder="Batch Name"
                    name="batchName"
                    value={formData.batchName}
                    required
                    onChange={handleChange}
                    className="px-4 py-2 border rounded"
                >
                {batchNames.map((batchName, index) => (
                        <option key={index} value={batchName}>{batchName}</option>
                ))}
                </select>
                <button type="submit" className="px-4 py-2 bg-blue-500 rounded text-white">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default BuyerSignup;