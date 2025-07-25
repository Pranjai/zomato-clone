const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');
const FoodItem = require('../models/FoodItem');
const auth = require('../middlewares/auth');
const Order = require('../models/Order');

router.get('/profile', auth, async (req, res) => {
    const vendorId = req.userId;
    try {
        const vendor = await Vendor.findById(vendorId).select('-password');
        if(!vendor) {
            return res.status(404).json({ message: "Vendor not found." });
        }
        return res.status(200).json(vendor);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.put('/profile', auth, async (req, res) => {
    const vendorId = req.userId;
    try {
        const updatedVendor = await Vendor.findByIdAndUpdate(vendorId, req.body, { new: true }).select('-password');
        if(!updatedVendor) {
            return res.status(404).json({ message: "Vendor not found." });
        }
        return res.status(200).json({ message: "Profile updated successfully.", vendor: updatedVendor });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/foods', auth, async (req, res) => {
    const item = req.body;
    
    try {
        const vendorExists = await Vendor.exists({ _id: req.userId });
        if(!vendorExists) {
            return res.status(404).json({ message: "Vendor not found."});
        }
        
        const foodItem = new FoodItem({
            ...item,
            vendor: req.userId
        })
        await foodItem.save();
        return res.status(201).json({ message: "Food Item created.", foodItem })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
})

router.get('/foods', auth, async (req, res) => {
    const vendorId = req.userId;
    try {
        const foodItems = await FoodItem.find({ vendor: vendorId });
        return res.status(200).json(foodItems);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." })
    }
})

router.delete('/foods/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await FoodItem.findByIdAndDelete(id);
        if(!deleted) {
            return res.status(404).json({ message: "Food Item not found." })
        }
        return res.status(200).json({ message: "Item deleted successfully." })
    } catch {
        return res.status(500).json({ message: "Internal Server error." })
    }
})

router.put('/foods/:id', auth, async (req, res) => {
    const { id } = req.params;
    const item = req.body;
    try {
        const updatedItem = await FoodItem.findByIdAndUpdate(id, item, { new: true });
        if(!updatedItem) {
            return res.status(404).json({ message: "Food Item not found." })
        }
        return res.status(200).json({ message: "Item updated successfully.", foodItem: updatedItem });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/orders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ vendor: req.userId }).populate('buyer', 'name');
        return res.status(200).json(orders);
    } catch(error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error "})
    }
})

module.exports = router;