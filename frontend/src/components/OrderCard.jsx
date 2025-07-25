import { useState } from "react"
import { Star, Clock } from "lucide-react"

const OrderCard = ({ order, onPickup, onRating }) => {
  const [showRating, setShowRating] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)

  const getStatusColor = (status) => {
    const colors = {
      PLACED: "bg-blue-100 text-blue-800",
      ACCEPTED: "bg-yellow-100 text-yellow-800",
      COOKING: "bg-orange-100 text-orange-800",
      "READY FOR PICKUP": "bg-green-100 text-green-800",
      COMPLETED: "bg-gray-100 text-gray-800",
      REJECTED: "bg-red-100 text-red-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const handleRatingSubmit = () => {
    if (selectedRating > 0) {
      onRating(order.id, selectedRating)
      setShowRating(false)
      alert("Rating submitted successfully!")
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div className="flex items-center space-x-3 mb-2 sm:mb-0">
          <h3 className="text-lg font-semibold text-gray-900">Order #{order._id}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          Time
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Vendor:</span> {order.vendor.shopName}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Item:</span> {order.foodItem.name}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Quantity:</span> {order.quantity}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-orange-600">₹{order.totalAmount}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
        <div>
          {order.status === "READY FOR PICKUP" && (
            <button
              onClick={() => onPickup(order._id)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Mark as Picked Up
            </button>
          )}

          {order.status === "COMPLETED" && !order.rating && (
            <div>
              {!showRating ? (
                <button
                  onClick={() => setShowRating(true)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Rate Item
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        className={`p-1 ${selectedRating >= star ? "text-yellow-400" : "text-gray-300"}`}
                        onClick={() => setSelectedRating(star)}
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleRatingSubmit}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setShowRating(false)}
                    className="text-gray-500 hover:text-gray-700 px-3 py-1 text-sm transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {order.status === "COMPLETED" && order.rating && (
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Your rating:</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${star <= order.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderCard
