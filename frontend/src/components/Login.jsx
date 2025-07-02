import { useState } from "react";
import axios from 'axios';
import { useUser } from "../context/UserContext";

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { login } = useUser();

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
            const res = await axios.post('http://localhost:5000/login', formData);
            console.log(res.data.message);
            if(res.status === 200) {
                login(res.data.token, res.data.userType);
            }
        } catch(err) {
            console.log(err.response?.data?.message);
        }
    }
    
    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded"
                />
                <input
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={formData.password}
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

export default Login;