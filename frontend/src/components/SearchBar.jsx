import { useState } from "react"
import { Search } from "lucide-react"

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearch(searchTerm)
    }

    const handleChange = (e) => {
        const value = e.target.value
        setSearchTerm(value)
        onSearch(value)
    }

    return (
        <form onSubmit={handleSubmit} className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
                type="text"
                placeholder="Search for food items..."
                value={searchTerm}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            />
        </form>
    )
}

export default SearchBar
