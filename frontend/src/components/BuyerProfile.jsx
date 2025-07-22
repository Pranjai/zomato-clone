import { useEffect, useState } from "react"
import { User, Mail, Phone, Calendar, Edit, Save, X } from "lucide-react"
import api from "../api/axiosInstance"

function BuyerProfile() {
    const [isEditing, setIsEditing] = useState(false)
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        contactNumber: "",
        age: "",
        batchName: "",
    })

    const fetchProfileData = async () => {
        try {
            const res = await api.get('/buyers/profile')
            const data = res.data
            setProfileData(data)
        } catch (error) {
            console.error("Error fetching profile data:", error)
        }
    }

    useEffect(() => {
        fetchProfileData()
    }, [])

    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSave = async () => {
        try {
            const res = await api.put('/buyers/profile', profileData)
            if (res.status === 200) {
                fetchProfileData()
            }
            setIsEditing(false)
        } catch (error) {
            console.error("Error saving profile data:", error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-orange-600">
                                    {profileData.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="ml-4">
                                    <h1 className="text-2xl font-bold text-white">{profileData.name}</h1>
                                    <p className="text-orange-100">{profileData.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-black px-4 py-2 rounded-lg transition-colors flex items-center"
                            >
                                {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                                {isEditing ? "Cancel" : "Edit Profile"}
                            </button>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-6">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <User className="w-4 h-4 inline mr-2" />
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profileData.name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
                                        }`}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Mail className="w-4 h-4 inline mr-2" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
                                        }`}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Phone className="w-4 h-4 inline mr-2" />
                                    Contact Number
                                </label>
                                <input
                                    type="tel"
                                    name="contactNumber"
                                    value={profileData.contactNumber}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
                                        }`}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Calendar className="w-4 h-4 inline mr-2" />
                                    Age
                                </label>
                                <input
                                    type="number"
                                    name="age"
                                    value={profileData.age}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
                                        }`}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Batch</label>
                                <select
                                    name="batch"
                                    value={profileData.batch}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
                                        }`}
                                >
                                    <option value="UG1">UG1</option>
                                    <option value="UG2">UG2</option>
                                    <option value="UG3">UG3</option>
                                    <option value="UG4">UG4</option>
                                    <option value="UG5">UG5</option>
                                </select>
                            </div>

                            {isEditing && (
                                <button
                                    onClick={handleSave}
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BuyerProfile
