import express from "express";
import auth from "../middleware/auth.js";
import Transaction from '../models/transaction.js';
import Signup from "../models/signup.js";

const router = express.Router();

// Route to get all transaction details of a user
router.get("/", auth, async (req, res) => {
    const userId = req.user.id;
    const user = await Signup.findById(userId);

    try {
        const userDetails = await Transaction.find({ userId }).sort({ date: -1 });
        res.json({ userDetails, totalBalance: user.totalBalance })
    }

    catch (e) {
        res.send("Error fetching transactions.")
    }
});

// Route to make a transaction
router.post("/transaction", auth, async (req, res) => {

    const { type, amount, description } = req.body;
    const userId = req.user.id;
    const user = await Signup.findById(userId)

    try {
        const newTransaction = new Transaction({ userId, type, amount: Number(amount), description });
        const numAmount = Number(amount);

        if (type === "add") {
            await newTransaction.save();
            user.totalBalance += numAmount;
        }

        else if (type === 'expense') {
            if (numAmount <= user.totalBalance) {

                await newTransaction.save();
                user.totalBalance -= numAmount;
                res.send("Successful Expense")
            }

            else {
                res.status(205).json({ message: 'Not enough Balance' })
            }
        }

        else {
            res.send("Invalid Type Selected")
        }

        await user.save()

        res.json({ message: "Transaction Successful", transaction: newTransaction, totalbal: user.totalBalance })
    }

    catch (e) {
        res.status(500).json({ message: "Error Saving Transaction.", error: e });
    }
});

router.delete("/:id", auth, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTxn = await Transaction.findByIdAndDelete(id);

        if (!deletedTxn) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.status(200).json({ message: "Deleted Transaction" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting transaction", error });
    }
});

export default router;
