import express from 'express';
import jwt from "jsonwebtoken";
import Signup from '../models/signup.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Signup.findOne({email});

        if (user) {
            if (user.password === password) {

                const token = jwt.sign({id: user._id},  process.env.SECRET_KEY, { expiresIn: '30m'})

                res.json({message: "User Verified.", token: token})
            }
            else {
                res.status(202).json({message: "Invalid Password"})
            }
        }
        else (
            res.send("User Doesn't exist. Sign Up first.")
        )
    }
    catch (e) {
        res.json({
            message: "Error Validating the user",
            e: e.message
        })
    }
})

export default router;

 