const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Buyer',
        required: true,
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true,
    },
    foodItem: {
        type: {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'FoodItem',
            },
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
        required: true,
    },
    addons: [{
        name: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        }
    }],
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['PLACED', 'ACCEPTED', 'COOKING', 'READY FOR PICKUP', 'COMPLETED', 'REJECTED'],
        default: 'PLACED',
    },
})

module.exports = mongoose.model('Order', orderSchema);