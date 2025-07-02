const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Buyer = require('../models/Buyer')
const Vendor = require('../models/Vendor')

router.post("/", async (req, res) => {
    const { formData, userType } = req.body;
    console.log(formData)

    try {
        const existingBuyer = await Buyer.findOne({ email: formData.email });
        const existingVendor = await Vendor.findOne({ email: formData.email });

        if(existingBuyer || existingVendor) {
            return res.status(409).json({ message: "Email already exists." })
        }

        formData.password = await bcrypt.hash(formData.password, saltRounds);
        let newUser;
        if(userType == "Buyer") {
            newUser = new Buyer(formData);
        } else if(userType == "Vendor") {
            newUser = new Vendor(formData);
        } else {
            return res.status(400).json({ message: "Invalid UserType."});
        }

        await newUser.save();
        
        res.status(201).json({ message: "User created successfully.", user: newUser })
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error." })
    }
})

module.exports = router;