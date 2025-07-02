const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    managerName: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    openingTime: {
        type: String,
        required: true,
    },
    closingTime: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Vendor', vendorSchema)