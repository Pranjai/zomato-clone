import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { User, Mail, Lock, Phone, Calendar, Store, Clock } from "lucide-react";
import axios from 'axios';
import { useUser } from "../context/UserContext";

function Signup() {
    const [userType, setUserType] = useState("Buyer");
    const [name, setName] = useState("name");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        contactNumber: '',
        age: '',
        batchName: '',
        managerName: '',
        shopName: '',
        openingTime: '',
        closingTime: ''
    });
    const batchNames = ["UG1", "UG2", "UG3", "UG4", "UG5"];    
    
    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
        setFormData((prev) => {
            Object.keys(prev).forEach(key => {
                prev[key] = '';
            })
            return prev;
        })
        if (e.target.value === "Buyer") {
            setName("name");
        } else {
            setName("managerName");
        }
    }

    // const { isLoggedIn } = useUser();
    // if (isLoggedIn) {
    //     return <Navigate to="/" replace />
    // }

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
            const res = await axios.post('http://localhost:5000/signup', { formData, userType });
            console.log(res.data.message);
        } catch(err) {
            console.log(err.response?.data?.message);
        }
    }
    
    return (
        // <div className="flex justify-center items-center h-screen">
        //     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        //         <input
        //             placeholder="Name"
        //             name="name"
        //             value={formData.name}
        //             required
        //             onChange={handleChange}
        //             className="px-4 py-2 border rounded"
        //         />
        //         <input
        //             placeholder="Email"
        //             name="email"
        //             type="email"
        //             value={formData.email}
        //             required
        //             onChange={handleChange}
        //             className="px-4 py-2 border rounded"
        //         />
        //         <input
        //             placeholder="Password"
        //             name="password"
        //             type="password"
        //             value={formData.password}
        //             required
        //             onChange={handleChange}
        //             className="px-4 py-2 border rounded"
        //         />
        //         <input
        //             placeholder="Contact Number"
        //             name="contactNumber"
        //             type="tel"
        //             value={formData.contactNumber}
        //             required
        //             onChange={handleChange}
        //             className="px-4 py-2 border rounded"
        //         />
        //         <input
        //             placeholder="Age"
        //             name="age"
        //             type="number"
        //             min={0}
        //             max={100}
        //             value={formData.age}
        //             required
        //             onChange={handleChange}
        //             className="px-4 py-2 border rounded"
        //         />
        //         <select
        //             placeholder="Batch Name"
        //             name="batchName"
        //             value={formData.batchName}
        //             required
        //             onChange={handleChange}
        //             className="px-4 py-2 border rounded"
        //         >
        //         {batchNames.map((batchName, index) => (
        //                 <option key={index} value={batchName}>{batchName}</option>
        //         ))}
        //         </select>
        //         <button type="submit" className="px-4 py-2 bg-blue-500 rounded text-white">
        //             Submit
        //         </button>
        //     </form>
        // </div>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                        <p className="text-gray-600">Join IIIT Food Portal today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
                            <select
                            value={userType}
                            onChange={handleUserTypeChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                            <option value="Buyer">Buyer</option>
                            <option value="Vendor">Vendor</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            {userType === "Buyer" ? "Name" : "Manager's Name"}
                            </label>
                            <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder={`Enter ${userType === "Buyer" ? "your" : "manager's"} name`}
                                required
                            />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="Enter your email"
                                required
                            />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="Create a password"
                                required
                            />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                            <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                                type="tel"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="Enter contact number"
                                required
                            />
                            </div>
                        </div>

                        {userType === "Buyer" ? (
                            <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                                <div className="relative">
                                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="Enter your age"
                                    required
                                />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Batch</label>
                                <select
                                    name="batchName"
                                    value={formData.batchName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    required
                                    >
                                    <option value="">Select Batch</option>
                                    {batchNames.map((batchName, index) => (
                                        <option key={index} value={batchName}>{batchName}</option>
                                    ))}
                                </select>
                            </div>
                            </>
                        ) : (
                            <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Shop Name</label>
                                <div className="relative">
                                <Store className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    name="shopName"
                                    value={formData.shopName}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="e.g., JC, VC, BBC"
                                    required
                                />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Opening Time</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <input
                                    type="time"
                                    name="openingTime"
                                    value={formData.openingTime}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    required
                                    />
                                </div>
                                </div>
                                <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Closing Time</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <input
                                    type="time"
                                    name="closingTime"
                                    value={formData.closingTime}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    required
                                    />
                                </div>
                                </div>
                            </div>
                            </>
                        )}
                        </div>

                        <button
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                        >
                        Create Account
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/" className="text-orange-600 hover:text-orange-700 font-medium">
                            Login here
                        </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;