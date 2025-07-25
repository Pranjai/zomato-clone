const express = require('express');
const auth = require('../middlewares/auth');
const Order = require('../models/Order');
const router = express.Router();

router.post('/', auth, async (req, res) => {
    console.log(req.body)
    const { item, quantity, addons } = req.body
    const totalAmount = (item.price + addons.reduce((sum, addon) => sum + addon.price, 0)) * quantity;
    const order = new Order({
        buyer: req.userId,
        vendor: item.vendor,
        foodItem: {
            itemId: item._id,
            name: item.name,
            price: item.price,
        },
        addons,
        quantity,
        totalAmount,
    })
    try {
        await order.save();
        return res.status(201).json({ message: "Success", order })
    } catch(error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

router.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        order.status = req.body.status
        await order.save();
        return res.status(200).json(order)
    } catch(error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error" })
    }
})

module.exports = router;