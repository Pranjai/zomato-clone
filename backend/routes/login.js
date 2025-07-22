const express = require('express');
const router = express.Router();
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Buyer = require('../models/Buyer')
const Vendor = require('../models/Vendor')

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        let userType = "Buyer";
        let user = await Buyer.findOne({ email });

        if(!user) {
            userType = "Vendor"
            user = await Vendor.findOne({ email });
        }

        if(!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid Password"});
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        const { password: _, ...userData } = { ...user._doc, userType: userType };
        console.log(userData);

        return res.status(200).json({
            message: "Login Succesful",
            user: userData,
            token
        })
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server error."});
    }
})

module.exports = router;