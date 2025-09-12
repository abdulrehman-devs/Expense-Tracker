import React, { useState } from "react";
import "./transaction.css";
import axios from "axios";
import fetchData from '../pages/dashboard.jsx'

const Transaction = ({ onClose, onSubmit }) => {
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const res = await axios.post("http://localhost:2000/dashboard/transaction", { type, amount, description },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            console.log(res.data)


            if (res.status === 205) {
                alert("Not enough balance in your account.")
            }

            else {
                alert("Done")
                fetchData();
            }
        }
        catch (e) {
            console.log("Can't save the transaction", e)
        }
        onClose();
    };

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                {/* Cross Button */}
                <button onClick={onClose} className="popup-close-btn">✕</button>

                {/* Title */}
                <h2 className="popup-title">New Transaction</h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="popup-form">

                    {/* Transaction Type */}
                    <div className="popup-options">
                        <label className="popup-label">Transaction Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                            className="popup-input"
                        >
                            <option value="">Select Type</option>
                            <option value="add">Add</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="popup-label">Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            placeholder="Enter amount"
                            className="popup-input"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="popup-label">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="Write a short description..."
                            rows="3"
                            className="popup-input textarea"
                        ></textarea>
                    </div>

                    {/* Buttons */}
                    <div className="popup-actions">
                        <button type="button" onClick={onClose} className="btn cancel">
                            Cancel
                        </button>
                        <button type="submit" className="btn save">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Transaction;
