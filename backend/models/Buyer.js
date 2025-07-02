const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
    name: {
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
    contactNumber: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    batchName: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Buyer', buyerSchema);