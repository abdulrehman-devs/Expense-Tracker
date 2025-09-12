import express from 'express';
import Signup from '../models/signup.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { username, email, password, totalBalance } = req.body;

    try {
        const userExists = await Signup.findOne({ email });

        if (userExists) {
            return res.status(201).json({ message: "User already exists." })
        }

        else {
            const newUser = new Signup({ username, email, password, totalBalance });
            await newUser.save();

            res.status(200).json({
                message: "User created successfully",
                user: newUser
            })
        }
    }
    catch (e) {
        res.status(500).json({
            message: "Error creating the user",
            error: e.message
        })
    }
})

export default router;