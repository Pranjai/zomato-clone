const express = require('express');
const router = express.Router();
const Buyer = require('../models/Buyer');
const auth = require('../middlewares/auth');

router.get('/profile', auth, async (req, res) => {
    const buyerId = req.userId;
    try {
        const buyer = await Buyer.findById(buyerId).select('-password');
        if (!buyer) {
            return res.status(404).json({ message: "Buyer not found." });
        }
        return res.status(200).json(buyer);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.put('/profile', auth, async (req, res) => {
    const buyerId = req.userId;
    try {
        const updatedBuyer = await Buyer.findByIdAndUpdate(buyerId, req.body, { new: true }).select('-password');
        if (!updatedBuyer) {
            return res.status(404).json({ message: "Buyer not found." });
        }
        return res.status(200).json({ message: "Profile updated successfully.", buyer: updatedBuyer });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;