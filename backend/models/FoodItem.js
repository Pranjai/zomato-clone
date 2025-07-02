const mongoose = require('mongoose');

const addonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const foodItemSchema = new mongoose.Schema({
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        enum: ["Veg", "Non-Veg"],
        required: true,
    },
    addons: {
        type: [addonSchema]
    },
    tags: {
        type: [String]
    }
})

module.exports = mongoose.model('FoodItem', foodItemSchema);