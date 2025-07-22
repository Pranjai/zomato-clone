import { useState } from "react"
import { Filter } from "lucide-react"

const FilterSection = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        category: "",
        vendors: [],
        tags: [],
        priceRange: { min: null, max: null },
        sortBy: "",
    })

    const handleCategoryChange = (value) => {
        const newFilters = { ...filters, category: value }
        setFilters(newFilters)
        onFilter(newFilters)
    }

    const handleVendorChange = (vendor) => {
        const newVendors = filters.vendors.includes(vendor)
            ? filters.vendors.filter((v) => v !== vendor)
            : [...filters.vendors, vendor]
        const newFilters = { ...filters, vendors: newVendors }
        setFilters(newFilters)
        onFilter(newFilters)
    }

    const handleTagChange = (tag) => {
        const newTags = filters.tags.includes(tag) ? filters.tags.filter((t) => t !== tag) : [...filters.tags, tag]
        const newFilters = { ...filters, tags: newTags }
        setFilters(newFilters)
        onFilter(newFilters)
    }

    const handlePriceChange = (e) => {
        const { name, value } = e.target
        const newPriceRange = {
            ...filters.priceRange,
            [name]: value ? Number.parseInt(value) : null,
        }
        const newFilters = { ...filters, priceRange: newPriceRange }
        setFilters(newFilters)
        onFilter(newFilters)
    }

    const handleSortChange = (e) => {
        const newFilters = { ...filters, sortBy: e.target.value }
        setFilters(newFilters)
        onFilter(newFilters)
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
            </h3>

            <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Food Type</h4>
                <div className="space-y-2">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="category"
                            checked={filters.category === ""}
                            onChange={() => handleCategoryChange("")}
                            className="text-orange-600 focus:ring-orange-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">All</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="category"
                            checked={filters.category === "Veg"}
                            onChange={() => handleCategoryChange("Veg")}
                            className="text-orange-600 focus:ring-orange-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Vegetarian</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="vegType"
                            checked={filters.category === "Non-Veg"}
                            onChange={() => handleCategoryChange("Non-Veg")}
                            className="text-orange-600 focus:ring-orange-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Non-Vegetarian</span>
                    </label>
                </div>
            </div>

            <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Vendors</h4>
                <div className="space-y-2">
                    {["BBC", "JC", "VC"].map((vendor) => (
                        <label key={vendor} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.vendors.includes(vendor)}
                                onChange={() => handleVendorChange(vendor)}
                                className="text-orange-600 focus:ring-orange-500 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">{vendor}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Tags</h4>
                <div className="space-y-2">
                    {["Hot", "Cold", "Sweet", "Drinks", "Noodles", "Rice"].map((tag) => (
                        <label key={tag} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.tags.includes(tag)}
                                onChange={() => handleTagChange(tag)}
                                className="text-orange-600 focus:ring-orange-500 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">{tag}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Price Range</h4>
                <div className="flex space-x-2">
                    <input
                        type="number"
                        name="min"
                        placeholder="Min"
                        value={filters.priceRange.min || ""}
                        onChange={handlePriceChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <input
                        type="number"
                        name="max"
                        placeholder="Max"
                        value={filters.priceRange.max || ""}
                        onChange={handlePriceChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Sort By</h4>
                <select
                    value={filters.sortBy}
                    onChange={handleSortChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                    <option value="">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-asc">Rating: Low to High</option>
                    <option value="rating-desc">Rating: High to Low</option>
                </select>
            </div>
        </div>
    )
}

export default FilterSection
